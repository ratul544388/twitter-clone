import * as React from "react";

import { useCreateCommentMutation } from "@/hooks/use-create-comment-mutation";
import { cn } from "@/lib/utils";
import { MousePointer2 } from "lucide-react";
import { Button } from "./ui/button";
import { CommentData, TweetData } from "@/types";
import { useUpdateCommentMutation } from "@/hooks/use-update-comment-mutation";

export const CommentInput = ({
  tweet,
  comment,
  autoFocus,
  onEditingChange,
}: {
  tweet?: TweetData;
  comment?: CommentData;
  autoFocus?: boolean;
  onEditingChange?: () => void;
}) => {
  const [showSubmitButton, setShowSubmitButton] = React.useState(false);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = React.useState(comment?.content || "");
  const { mutate: createComment, isPending: isCreatingComment } =
    useCreateCommentMutation();
  const { mutate: updateComment, isPending: isUpdatingComment } =
    useUpdateCommentMutation();

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [value]);

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment) {
      return updateComment(
        { values: { content: value }, commentId: comment.id },
        {
          onSuccess: () => {
            onEditingChange?.();
          },
        },
      );
    }
    if (tweet) {
      createComment(
        { values: { content: value }, tweet },
        {
          onSuccess: () => {
            setValue("");
          },
        },
      );
    }
  };

  const isPending = isUpdatingComment || isCreatingComment;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col overflow-hidden rounded-xl border bg-background"
    >
      <textarea
        onFocus={() => setShowSubmitButton(true)}
        onBlur={() => setShowSubmitButton(false)}
        disabled={isPending}
        placeholder={comment ? "Write edited comment" : "Write a comment"}
        className={cn(
          "thin-scrollbar flex max-h-[200px] w-full resize-none overflow-y-auto rounded-none border border-none border-input bg-background px-3 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        )}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={1}
        ref={inputRef}
        autoFocus={autoFocus}
      />
      <div className="flex justify-end p-1">
        {onEditingChange && (
          <Button
            disabled={isPending}
            variant="ghost"
            onClick={onEditingChange}
          >
            Cancel
          </Button>
        )}
        <Button
          disabled={isPending || !!!value.trim()}
          variant="ghost"
          size="icon"
          className={cn(
            "hidden",
            (showSubmitButton || !!value.trim()) && "flex",
          )}
        >
          <MousePointer2 className="size-4 rotate-[135deg]" />
        </Button>
      </div>
    </form>
  );
};
