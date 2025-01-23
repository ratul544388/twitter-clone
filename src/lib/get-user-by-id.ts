import { db } from "./db";

export const getUserById = async (userId: string) => {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        image: true,
        coverPhoto: true,
        name: true,
        username: true,
      }
    });
  
    return user;
  };