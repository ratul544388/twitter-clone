"use client";
import DeleteCommentModal from "@/components/modals/delete-comment-modal";
import DeleteTweetModal from "@/components/modals/delete-tweet-modal";
import LoginModal from "@/components/modals/login-modal";
import RegisterModal from "@/components/modals/register-modal";
import TweetModal from "@/components/modals/tweet-modal";
import { useEffect, useState } from "react";
export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <DeleteTweetModal />
      <LoginModal />
      <RegisterModal />
      <TweetModal />
      <DeleteCommentModal />
    </>
  );
};
