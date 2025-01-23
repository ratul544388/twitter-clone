"use server";
import { signIn, signOut } from "@/auth";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/get-current-user";
import { DEFAULT_LOGOUT_REDIRECT } from "@/lib/routes";
import { UTApi } from "uploadthing/server";

import {
  loginSchema,
  registerSchema,
  registerValues,
  updateProfileSchema,
  UpdateProfileValues,
} from "@/lib/validations";
import { getUserDataSelect, QueryKey, UsersPage } from "@/types";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const getUserById = async (userId: string) => {
  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  return user;
};

export const register = async (values: registerValues) => {
  try {
    const { name, email, password } = registerSchema.parse(values);

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(values);

    const userExist = await db.user.findFirst({
      where: {
        email,
      },
    });

    if (userExist) {
      return { error: "User already exists" };
    }

    const username = email.split("@")[0];

    await db.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
      },
    });

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: "Register Successful" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const login = async (values: z.infer<typeof loginSchema>) => {
  try {
    const { email, password } = loginSchema.parse(values);

    const existingUser = await db.user.findFirst({
      where: {
        email,
      },
      select: {
        email: true,
        password: true,
      },
    });

    if (!existingUser) {
      return { error: "User does not exist" };
    }

    if (existingUser.password) {
      const isPasswordMatched = bcrypt.compareSync(
        password,
        existingUser.password,
      );
      if (!isPasswordMatched) {
        return { error: "Incorrect Email or Password" };
      }
    }

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: "Login Successful" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const googleLogin = async () => {
  await signIn("google");
};

export const logout = async () => {
  await signOut({ redirectTo: DEFAULT_LOGOUT_REDIRECT });
};

export const updateProfile = async (values: UpdateProfileValues) => {
  const { image, coverPhoto } = updateProfileSchema.parse(values);

  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("Unauthenticated");
  }

  if (image && currentUser.image && image !== currentUser.image) {
    const oldImage = currentUser.image.split("/f/")[1];
    await new UTApi().deleteFiles(oldImage);
  }

  if (
    coverPhoto &&
    currentUser.coverPhoto &&
    coverPhoto !== currentUser.coverPhoto
  ) {
    const oldCoverPhoto = currentUser.coverPhoto.split("/f/")[1];
    await new UTApi().deleteFiles(oldCoverPhoto);
  }

  const user = await db.user.update({
    where: {
      id: currentUser.id,
    },
    data: values,
    select: getUserDataSelect(currentUser.id),
  });

  return user;
};

export const getUserList = async ({
  cursor,
  take = 20,
  type,
  q,
  username,
}: {
  cursor?: string | null;
  take?: number;
  type?: QueryKey;
  q?: string;
  username?: string;
}) => {
  const currentUser = await getCurrentUser();

  const users = await db.user.findMany({
    where: {
      ...(type === "who-to-follow"
        ? {
            NOT: {
              id: currentUser?.id,
            },
            followers: {
              none: {
                followerId: currentUser?.id,
              },
            },
          }
        : {}),
      ...(type === "followers" && username
        ? {
            username,
            following: {
              some: {
                followerId: currentUser?.id,
              },
            },
          }
        : {}),
      ...(type === "following" && username
        ? {
            username,
            followers: {
              some: {
                followerId: currentUser?.id,
              },
            },
          }
        : {}),
      ...(type === "searched-users" && q
        ? {
            OR: [
              {
                name: {
                  contains: q,
                  mode: "insensitive",
                },
              },
              {
                username: {
                  contains: q,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {}),
    },
    take: take + 1,
    select: getUserDataSelect(currentUser?.id),
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: {
      followers: {
        _count: "desc",
      },
    },
  });

  const nextCursor = users.length > take ? users[take].id : null;

  const data: UsersPage = {
    users: users.slice(0, take),
    nextCursor,
  };

  return data;
};

export const loginWithGoogle = async () => {
  await signIn("google");
};
