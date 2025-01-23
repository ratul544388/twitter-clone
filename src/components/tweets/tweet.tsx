"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useModalStore } from "@/hooks/use-modal-store";
import { cn } from "@/lib/utils";
import { TweetData } from "@/types";
import { Edit2, MoreVertical, SignalHigh, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaShare } from "react-icons/fa";
import Avatar from "../avatar";
import { CommentInput } from "../comment-input";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";
import { UserTooltip } from "../user-tooltip";
import { BookmarkButton } from "./bookmark-button";
import { CommentButton } from "./comment-button";
import { LikeButton } from "./like-button";

interface TweetProps {
  tweet: TweetData;
  viewTweet?: boolean;
  openUserTooltip?: boolean;
  className?: string;
  showCommentInput?: boolean;
}

export const Tweet = ({
  tweet,
  viewTweet,
  openUserTooltip,
  className,
  showCommentInput,
}: TweetProps) => {
  return (
    <div
      className={cn(
        "block border-b px-4 py-3 transition-colors hover:bg-secondary",
        className,
      )}
    >
      <div className="flex gap-2">
        <UserTooltip user={tweet.user} open={openUserTooltip}>
          <Link href={`/${tweet.user.username}`}>
            <Avatar src={tweet.user.image} alt={tweet.user.name} />
          </Link>
        </UserTooltip>
        <div className="flex flex-col text-sm">
          <UserTooltip user={tweet.user} open={openUserTooltip}>
            <Link
              href={`/${tweet.user.username}`}
              className="leading-4 hover:underline"
            >
              {tweet.user.name}
            </Link>
          </UserTooltip>
          <p className="leading-4">@{tweet.user.username}</p>
        </div>
        <MoreButton tweet={tweet} viewTweet={viewTweet} />
      </div>
      {viewTweet ? (
        <div className="mt-2 block whitespace-pre-line break-words">
          <ProcessedContent content={tweet.content} />
        </div>
      ) : (
        <Link
          href={`/tweets/${tweet.id}`}
          className="mt-2 block whitespace-pre-line break-words"
        >
          <ProcessedContent content={tweet.content} />
        </Link>
      )}
      {!!tweet.attachments.length && <MediaPreview tweet={tweet} />}
      <ReactButtons tweet={tweet} />
      {showCommentInput && (
        <>
          <Separator className="my-3" />
          <CommentInput tweet={tweet} />
        </>
      )}
    </div>
  );
};

const MediaPreview = ({ tweet }: { tweet: TweetData }) => {
  const attachments = tweet.attachments;

  return (
    <ul className={cn("mt-3 grid", attachments.length >= 2 && "grid-cols-2")}>
      {attachments.slice(0, 4).map(({ id, url, type }, index) => (
        <li
          key={id}
          className={cn(
            "relative block h-[450px] w-full overflow-hidden rounded-md",
            attachments.length === 3 &&
              "h-[225px] bg-secondary first:row-span-2 first:h-[450px]",
            attachments.length >= 4 && "h-[225px]",
          )}
        >
          {type === "IMAGE" && (
            <Link href={`/tweets/${tweet.id}/media/${index + 1}`}>
              <Image src={url} alt="attachment" fill className="object-cover" />
              {attachments.length > 4 && index === 3 && (
                <span className="absolute inset-0 flex items-center justify-center bg-neutral-900/70 text-lg font-bold text-muted-foreground">
                  {attachments.length - 4} more
                </span>
              )}
            </Link>
          )}
          {type === "VIDEO" && (
            <video controls className="max-h-[30rem]">
              <source src={url} type={type} />
            </video>
          )}
        </li>
      ))}
    </ul>
  );
};

const ReactButtons = ({ tweet }: { tweet: TweetData }) => {
  return (
    <ul className="mt-3 flex justify-between">
      <LikeButton tweet={tweet} />
      <CommentButton tweet={tweet} />
      <BookmarkButton tweet={tweet} />
      <li className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="hover:bg-blue-900/20">
          <FaShare className="size-5 text-muted-foreground" />
        </Button>
      </li>
    </ul>
  );
};

export const MoreButton = ({
  tweet,
  viewTweet,
}: {
  tweet: TweetData;
  viewTweet?: boolean;
}) => {
  const { onOpen } = useModalStore();
  const currentUser = useCurrentUser();
  const router = useRouter();

  const items = [
    ...(!viewTweet
      ? [
          {
            label: "View tweet",
            icon: SignalHigh,
            onClick: () => router.push(`/tweets/${tweet.id}`),
          },
        ]
      : []),
    ...(currentUser?.id === tweet.userId
      ? [
          {
            label: "Edit",
            icon: Edit2,
            onClick: () => onOpen("tweet", { tweet }),
          },
          {
            label: "Delete",
            icon: Trash2,
            onClick: () => onOpen("deleteTweet", { id: tweet.id }),
          },
        ]
      : []),
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto -translate-y-1 rounded-full hover:bg-background focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <MoreVertical className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="flex w-fit flex-col px-0 py-2"
        align="end"
      >
        {items.map(({ label, icon: Icon, onClick }) => (
          <DropdownMenuItem key={label} onClick={onClick}>
            <Icon className="size-4" />
            {label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ProcessedContent = ({ content }: { content: string }) => {
  const router = useRouter();
  const lines = content.split("\n");
  return lines.map((line, lineIndex) => (
    <div key={lineIndex}>
      {line.split(" ").map((word, index) => {
        if (word.startsWith("#") && word.length > 1) {
          return (
            <span
              onClick={() => router.push(`/search?q=${word}`)}
              key={index}
              className="whitespace-pre-line break-words text-primary hover:underline"
            >
              {word}{" "}
            </span>
          );
        } else {
          return word + " ";
        }
      })}
    </div>
  ));
};
