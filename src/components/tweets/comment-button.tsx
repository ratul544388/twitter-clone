"use client";

import { TweetData } from "@/types";
import { useState } from "react";
import { FiMessageCircle } from "react-icons/fi";
import CommentModal from "../modals/comment-modal";

interface CommentButtonProps {
  tweet: TweetData;
}

export const CommentButton = ({ tweet }: CommentButtonProps) => {
  const [openCommentModal, setOpenCommentModal] = useState(false);
  return (
    <>
      <button
        onClick={() => {
          if (openCommentModal) return;
          setOpenCommentModal(true);
        }}
        className="flex items-center text-sm text-muted-foreground hover:text-primary"
      >
        <span className="rounded-full p-1.5">
          <FiMessageCircle className="size-5" />
        </span>
        {tweet._count.comments}
      </button>
      {openCommentModal && (
        <CommentModal
          tweet={tweet}
          onClose={() => setOpenCommentModal(false)}
        />
      )}
    </>
  );
};
