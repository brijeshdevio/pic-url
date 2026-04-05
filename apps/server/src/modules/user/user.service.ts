import { prisma } from "../../lib/prisma";
import { UnauthorizedException } from "../../utils/errors";

export class UserService {
  constructor() {}

  findById = async (id: string) => {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
    if (user) return user;

    throw new UnauthorizedException();
  };
}
