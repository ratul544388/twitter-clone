import { TweetData } from "@/types";
import { useEffect, useRef } from "react";
import { CommentInput } from "../comment-input";
import { Comments } from "../comments";
import { Tweet } from "../tweets/tweet";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

export default function CommentModal({
  tweet,
  onClose,
}: {
  tweet: TweetData;
  onClose: () => void;
}) {
  const scrollTargetRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (scrollTargetRef.current && scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({
          top: scrollTargetRef.current.scrollHeight * 0.8,
          behavior: "smooth",
        });
      }
    }, 100);
  }, []);


  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="gap-0 p-0 outline-none">
        <DialogHeader className="flex h-16 flex-row items-center border-b bg-background px-3">
          <DialogTitle>Ratul&apos;s Tweet</DialogTitle>
        </DialogHeader>
        <div
          ref={scrollContainerRef}
          className="thin-scrollbar max-h-[calc(100dvh_-_4rem)] sm:max-h-[80vh] overflow-y-auto"
        >
          <div ref={scrollTargetRef}>
            <Tweet
              tweet={tweet}
              openUserTooltip={false}
              viewTweet
              className="rounded-lg border"
            />
          </div>
          <Comments tweet={tweet} />
          <div className="sticky bottom-0 bg-background p-3">
            <CommentInput tweet={tweet} autoFocus />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
