import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { hashString, randomString } from "../../lib/crypto";
import { prisma } from "../../lib/prisma";
import { CreateProjectDto, UpdateProjectDto } from "./project.schema";
import { PRISMA_CODES } from "../../constants";
import {
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
} from "../../utils/errors";

export class ProjectService {
  private prefix = "sk_live_";

  async create(userId: string, data: CreateProjectDto) {
    try {
      const token = this.prefix + randomString(12);
      const tokenHash = hashString(token);
      await prisma.project.create({
        data: {
          name: data.name,
          userId,
          tokenHash,
          expiredAt: data.expireAt,
        },
      });
      return { token, name: data.name };
    } catch (error: unknown) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PRISMA_CODES.CONFLICT) {
          throw new ConflictException(
            `Project with name ${data.name} already exists. Please try a different name.`,
          );
        }
      }
      throw new InternalServerErrorException();
    }
  }

  async findAll(userId: string) {
    const projects = await prisma.project.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        status: true,
        lastUsedAt: true,
        usedCount: true,
        createdAt: true,
        expiredAt: true,
      },
    });
    return { projects };
  }

  async findOne(userId: string, id: string) {
    const project = await prisma.project.findFirst({
      where: { userId, id },
      omit: {
        tokenHash: true,
        userId: true,
      },
    });
    if (project) return project;

    throw new ForbiddenException(
      `You don't have access to this project. Please try again with a valid project id.`,
    );
  }

  async update(userId: string, id: string, data: UpdateProjectDto) {
    try {
      return await prisma.project.update({
        where: { userId, id },
        data: {
          name: data.name,
        },
        select: {
          id: true,
          name: true,
        },
      });
    } catch (error: unknown) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PRISMA_CODES.NOT_FOUND) {
          throw new ForbiddenException(
            `You don't have access to this project. Please try again with a valid project id.`,
          );
        }
      }
      throw new InternalServerErrorException();
    }
  }

  async delete(userId: string, id: string): Promise<void> {
    try {
      await prisma.project.update({
        where: { userId, id, status: "active" },
        data: {
          expiredAt: new Date(),
          revoked: true,
          status: "revoked",
        },
      });
    } catch (error: unknown) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PRISMA_CODES.NOT_FOUND) {
          throw new ForbiddenException(
            `You don't have access to this project. Please try again with a valid project id.`,
          );
        }
      }
      throw new InternalServerErrorException();
    }
  }

  async verifyKey(token: string): Promise<string> {
    try {
      const tokenHash = hashString(token);
      const project = await prisma.project.update({
        where: {
          tokenHash,
          revoked: false,
          status: "active",
        },
        data: {
          usedCount: { increment: 1 },
          lastUsedAt: new Date(),
        },
        select: {
          id: true,
        },
      });
      return project.id;
    } catch (error: unknown) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === PRISMA_CODES.NOT_FOUND) {
          throw new ForbiddenException(
            "Invalid Upload API Key. Please try again.",
          );
        }
      }
      throw new InternalServerErrorException();
    }
  }
}
