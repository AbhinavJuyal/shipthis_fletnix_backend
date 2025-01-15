import { env } from "@/common/utils/envConfig";
import { prisma } from "@/db";
import { Users } from "@prisma/client";
import bcrypt from "bcrypt";

const saltRounds = env.HASH_SALT_ROUNDS;

export class AuthRepository {
  async createUser({ email, password, age }: Users) {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        age,
      },
    });

    return {
      fullname: newUser.fullname,
      email: newUser.email,
      age: newUser.age,
    };
  }

  async validateUser({ email, password: userPassword }: Users) {
    const user = await prisma.users.findFirst({
      where: {
        email: {
          equals: email,
        },
      },
    });

    if (!user) return null;

    const { password: dbPassword } = user;
    const verified = await bcrypt.compare(userPassword, dbPassword);

    if (!verified) return;

    return {
      fullname: user.fullname,
      email: user.email,
      age: user.age,
    };
  }
}
