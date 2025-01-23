"use client";

import Avatar from "@/components/avatar";
import { cn } from "@/lib/utils";
import { NotificationData } from "@/types";
import { NotificationType } from "@prisma/client";
import Link from "next/link";
import { JSX } from "react";
import { FaComment, FaHeart, FaUserCheck } from "react-icons/fa";

interface NotificationProps {
  notification: NotificationData;
}

export const Notification = ({ notification }: NotificationProps) => {
  const notificationTypeMap: Record<
    NotificationType,
    {
      message: string;
      icon: JSX.Element;
      href: string;
    }
  > = {
    LIKE: {
      message: "liked Your tweet",
      icon: <FaHeart className="size-4 text-white" />,
      href: `/tweets/${notification.tweetId}`,
    },
    FOLLOW: {
      message: "followed You",
      icon: <FaUserCheck className="size-4 text-white" />,
      href: `/${notification.issuer.username}`,
    },
    COMMENT: {
      message: "commented on your tweet",
      icon: <FaComment className="size-4 text-white" />,
      href: `/tweets/${notification.tweetId}`,
    },
  };

  const { message, href, icon } = notificationTypeMap[notification.type];

  return (
    <article className="relative transition-colors hover:bg-secondary">
      <Link href={href} className="flex items-center gap-3 py-5 pl-16">
        <p
          className={cn(
            "text-sm font-medium",
            notification.read && "text-muted-foreground",
          )}
        >
          <span className="font-semibold">{notification.issuer.name}</span>{" "}
          {message}
        </p>
      </Link>
      <Link
        href={`/${notification.issuer.username}`}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2"
      >
        <Avatar src={notification.issuer.image} alt="Avatar" />
        <span className="absolute bottom-0 right-0 translate-x-1 translate-y-1 rounded-full bg-primary p-1.5">
          {icon}
        </span>
      </Link>
    </article>
  );
};
