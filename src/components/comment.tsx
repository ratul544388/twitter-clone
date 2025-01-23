"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { useModalStore } from "@/hooks/use-modal-store";
import { formatRelativeDate } from "@/lib/utils";
import { CommentData } from "@/types";
import { Edit2, MoreVertical, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Avatar from "./avatar";
import { CommentInput } from "./comment-input";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface CommentProps {
  comment: CommentData;
}

export const Comment = ({ comment }: CommentProps) => {
  const currentUser = useCurrentUser();
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="flex gap-2 px-3 py-2 text-sm">
      <Link href={`/${comment.user.username}`}>
        <Avatar src={comment.user.image} alt="Avatar" />
      </Link>
      <div className="rounded-xl bg-secondary px-2 py-1">
        <div className="">
          <div className="flex gap-2">
            <Link href={`/${comment.user.username}`}>
              <p className="font-semibold hover:underline">
                {comment.user.name}
              </p>
            </Link>
            <span className="text-muted-foreground">
              {formatRelativeDate(comment.createdAt)}
            </span>
            {comment.isEdited && (
              <span className="text-muted-foreground">Edited</span>
            )}
            {currentUser?.id === comment.userId && (
              <>
                <span className="h-fit rounded-full bg-blue-600 px-1 py-0.5 text-xs font-medium">
                  Author
                </span>
                <MoreButton
                  comment={comment}
                  onEditingChange={() => setIsEditing(true)}
                />
              </>
            )}
          </div>
          {isEditing ? (
            <CommentInput
              comment={comment}
              onEditingChange={() => setIsEditing(false)}
            />
          ) : (
            <p className="whitespace-pre-line break-all">{comment.content}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export const MoreButton = ({
  comment,
  onEditingChange,
}: {
  comment: CommentData;
  onEditingChange: () => void;
}) => {
  const { onOpen } = useModalStore();

  const items = [
    {
      label: "Edit",
      icon: Edit2,
      onClick: onEditingChange,
    },
    {
      label: "Delete",
      icon: Trash2,
      onClick: () => onOpen("deleteComment", { id: comment.id }),
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto size-6 rounded-full hover:bg-background"
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
