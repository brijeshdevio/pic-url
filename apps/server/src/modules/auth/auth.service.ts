import { PRISMA_CODES } from "../../constants";
import { PrismaClientKnownRequestError } from "../../generated/prisma/internal/prismaNamespace";
import { hashPassword, verifyPassword } from "../../lib/hash";
import { signJwt } from "../../lib/jwt";
import { prisma } from "../../lib/prisma";
import {
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
} from "../../utils/errors";
import { LoginDto, RegsiterDto } from "./auth.schema";

export const DUMMY_HASH =
  "$argon2id$v=19$m=65536,t=3,p=4$/y1jJS2H1+mZ1Sg77uvgAg$AYsdfipeVFRQxT2zXSCaw6581/ZdUV1I1MOjlng0fCM";

export class AuthService {
  constructor() {}

  register = async (data: RegsiterDto) => {
    try {
      const hashedPassword = await hashPassword(data.password);
      return await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          passwordHash: hashedPassword,
        },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
      });
    } catch (error: any) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PRISMA_CODES.CONFLICT
      ) {
        throw new ConflictException(
          `${data.email} already exists. Use another email.`,
        );
      }
      throw new InternalServerErrorException();
    }
  };

  login = async (data: LoginDto) => {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    const passwordHash = user?.passwordHash ?? DUMMY_HASH;
    const isPasswordValid = await verifyPassword(passwordHash, data.password);

    if (!user || !isPasswordValid) {
      throw new ForbiddenException("Invalid credentials");
    }

    const accessToken = signJwt({ sub: user.id });

    return { accessToken };
  };
}
