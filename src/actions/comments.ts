"use server";

import { COMMENT_PER_PAGE } from "@/constants";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/get-current-user";
import { commentSchema, CommentValues } from "@/lib/validations";
import { CommentDataInclude, CommentsPage, TweetData } from "@/types";

export const createComment = async ({
  values,
  tweet,
}: {
  values: CommentValues;
  tweet: TweetData;
}) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      throw new Error("Unauthenticated");
    }

    const [newComment] = await db.$transaction([
      db.comment.create({
        data: {
          content: values.content,
          userId: currentUser.id,
          tweetId: tweet.id,
        },
        include: CommentDataInclude,
      }),
      ...(tweet.userId !== currentUser.id
        ? [
            db.notification.create({
              data: {
                issuerId: currentUser.id,
                recipientId: tweet.userId,
                type: "COMMENT",
              },
            }),
          ]
        : []),
    ]);

    return newComment;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};

export const getComments = async ({
  cursor,
  tweetId,
}: {
  cursor: string | null;
  tweetId: string;
}) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("Unauthenticated");
  }

  const comments = await db.comment.findMany({
    where: {
      tweetId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: COMMENT_PER_PAGE + 1,
    cursor: cursor ? { id: cursor } : undefined,
    include: CommentDataInclude,
  });

  const nextCursor =
    comments.length > COMMENT_PER_PAGE ? comments[COMMENT_PER_PAGE].id : null;

  const data: CommentsPage = {
    comments: comments.slice(0, COMMENT_PER_PAGE),
    nextCursor,
  };

  return data;
};

export const deleteComment = async (id: string) => {
  const user = await getCurrentUser();

  if (!user) throw new Error("Unauthorized");

  const comment = await db.comment.findUnique({
    where: {
      id,
    },
  });

  if (!comment) throw new Error("Comment not found");

  if (comment.userId !== user.id) throw new Error("Unauthorized");

  const deletedComment = await db.comment.delete({
    where: {
      id,
    },
  });

  return deletedComment;
};

export const updateComment = async ({
  values,
  commentId,
}: {
  values: CommentValues;
  commentId: string;
}) => {
  try {
    const { content } = commentSchema.parse(values);
    const user = await getCurrentUser();

    if (!user) throw new Error("Unauthorized");

    const updatedComment = await db.comment.update({
      where: {
        id: commentId,
      },
      data: {
        content,
        isEdited: true,
      },
      include: CommentDataInclude,
    });

    return updatedComment;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};
