"use server";

import { NOTIFICATIONS_PER_PAGE } from "@/constants";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/get-current-user";
import { NotificationDataInclude, NotificationsPage } from "@/types";

export const getNotifications = async (cursor: string | null) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("Unauthenticated");
  }

  const notifications = await db.notification.findMany({
    where: {
      recipientId: currentUser.id,
    },
    take: NOTIFICATIONS_PER_PAGE + 1,
    include: NotificationDataInclude,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: {
      createdAt: "desc",
    },
  });

  const nextCursor =
    notifications.length > NOTIFICATIONS_PER_PAGE
      ? notifications[NOTIFICATIONS_PER_PAGE].id
      : null;

  const data: NotificationsPage = {
    notifications: notifications.slice(0, NOTIFICATIONS_PER_PAGE),
    nextCursor,
  };

  return data;
};

export const markNotificationsAsRead = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    throw new Error("Unauthenticated");
  }

  await db.notification.updateMany({
    where: {
      recipientId: currentUser.id,
    },
    data: {
      read: true,
    },
  });
};

export const getUnreadNotificationCount = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthenticated");
  }
  const count = await db.notification.count({
    where: {
      read: false,
      recipientId: currentUser.id,
    },
  });

  return count;
};
