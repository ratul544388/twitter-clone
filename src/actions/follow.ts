"use server";

import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/get-current-user";
import { FollowerInfo } from "@/types";

export const getFollowerInfo = async (userId: string) => {
  const currentUser = await getCurrentUser();

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      followers: {
        where: {
          followingId: currentUser?.id,
        },
        select: {
          followerId: true,
        },
      },
      _count: {
        select: {
          followers: true,
        },
      },
    },
  });

  const data: FollowerInfo = {
    followers: user?._count.followers || 0,
    isFollowing: !!user?.followers.length,
  };

  return data;
};

export const createFollow = async (userId: string) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return { error: "Unauthorized" };
    }

    await db.$transaction([
      db.follow.upsert({
        where: {
          followerId_followingId: {
            followerId: currentUser.id,
            followingId: userId,
          },
        },
        create: {
          followerId: currentUser.id,
          followingId: userId,
        },
        update: {},
      }),
      db.notification.create({
        data: {
          type: "FOLLOW",
          recipientId: userId,
          issuerId: currentUser.id,
        },
      }),
    ]);

    return { success: "Followed Successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export const deleteFollow = async (userId: string) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return { error: "Unauthorized" };
    }

    await db.$transaction([
      db.follow.deleteMany({
        where: {
          followerId: currentUser.id,
          followingId: userId,
        },
      }),
      db.notification.deleteMany({
        where: {
          issuerId: currentUser.id,
          recipientId: userId,
          type: "FOLLOW",
        },
      }),
    ]);

    return { success: "Unfollowed Successfully" };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};
