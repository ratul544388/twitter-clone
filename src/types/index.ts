import { queries } from "@/constants";
import { Prisma } from "@prisma/client";

export type SearchParamsType = Promise<{
  [key: string]: string | undefined;
}>;

export type ParamsType = Promise<{ [key: string]: string }>;

export const getUserDataSelect = (loggedInUserId?: string) => {
  return {
    id: true,
    username: true,
    name: true,
    image: true,
    bio: true,
    coverPhoto: true,
    createdAt: true,
    followers: {
      where: {
        followerId: loggedInUserId,
      },
      select: {
        followerId: true,
      },
    },
    _count: {
      select: {
        tweets: true,
        followers: true,
        following: true,
      },
    },
  } satisfies Prisma.UserSelect;
};

export const getTweetDataInclude = (loggedInUserId?: string) => {
  return {
    user: {
      select: getUserDataSelect(loggedInUserId),
    },
    attachments: true,
    likes: {
      where: {
        userId: loggedInUserId,
      },
      select: {
        userId: true,
      },
    },
    bookmarks: {
      where: {
        userId: loggedInUserId,
      },
      select: {
        userId: true,
      },
    },
    _count: {
      select: {
        likes: true,
        comments: true,
      },
    },
  } satisfies Prisma.TweetInclude;
};

export const CommentDataInclude = {
  user: {
    select: {
      name: true,
      username: true,
      image: true,
    },
  },
} satisfies Prisma.CommentInclude;

export const NotificationDataInclude = {
  issuer: {
    select: {
      name: true,
      username: true,
      image: true,
    },
  },
} satisfies Prisma.NotificationInclude;

export type UserData = Prisma.UserGetPayload<{
  select: ReturnType<typeof getUserDataSelect>;
}>;

export type TweetData = Prisma.TweetGetPayload<{
  include: ReturnType<typeof getTweetDataInclude>;
}>;

export type CommentData = Prisma.CommentGetPayload<{
  include: typeof CommentDataInclude;
}>;

export type NotificationData = Prisma.NotificationGetPayload<{
  include: typeof NotificationDataInclude;
}>;

export type CurrentUser =
  | {
      id: string;
      name?: string | null;
      username: string;
      email?: string | null;
      image?: string | null;
    }
  | null
  | undefined;

export type TweetsPage = {
  tweets: TweetData[];
  nextCursor: string | null;
};

export type UsersPage = {
  users: UserData[];
  nextCursor: string | null;
};

export type CommentsPage = {
  comments: CommentData[];
  nextCursor: string | null;
};

export type NotificationsPage = {
  notifications: NotificationData[];
  nextCursor: string | null;
};

export type FollowerInfo = {
  followers: number;
  isFollowing: boolean;
};

export type TabType =
  | "all"
  | "for you"
  | "following"
  | "user-tweets"
  | "user-media"
  | "user-liked"
  | "searched-tweets"
  | "searched-users";

export type QueryKey = (typeof queries)[number]["key"];
