"use client";
import { useCreateTweetMutation } from "@/hooks/use-create-tweet-mutation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Attachment, useMediaUpload } from "@/hooks/use-media-upload";
import { useMounted } from "@/hooks/use-mounted";
import { useUpdateTweetMutation } from "@/hooks/use-update-tweet-mutation";
import { cn } from "@/lib/utils";
import { TweetData } from "@/types";
import { EditorContent, useEditor } from "@tiptap/react";

import { useModalStore } from "@/hooks/use-modal-store";
import StarterKit from "@tiptap/starter-kit";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import Avatar from "../avatar";
import { CircularProgressBar } from "../circular-progress-bar";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { HashTag } from "./tiptap-color-extension";

export const TweetInput = ({
  tweet,
  autoFocus = false,
}: {
  tweet?: TweetData;
  autoFocus?: boolean;
}) => {
  const currentUser = useCurrentUser();
  const { mutate: createTweet, isPending: isCreating } =
    useCreateTweetMutation();
  const { mutate: updateTweet, isPending: isUpdating } =
    useUpdateTweetMutation();
  const isMounted = useMounted();
  const { onClose } = useModalStore();
  const formattedContent = tweet?.content
    ? tweet.content.replace(/\n/g, "<br>")
    : "";

  const editor = useEditor({
    immediatelyRender: false,
    autofocus: autoFocus,
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      HashTag,
    ],
    content: formattedContent || "",
  });

  const {
    attachments,
    isUploading,
    startUpload,
    uploadProgress,
    removeAttachment,
    reset,
  } = useMediaUpload(tweet);

  const content =
    editor?.getText({
      blockSeparator: "\n",
    }) || "";

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values = {
      content,
      mediaIds: attachments.map((a) => a.mediaId).filter(Boolean) as string[],
    };
    if (tweet) {
      updateTweet(
        { values, tweetId: tweet.id },
        {
          onSuccess: () => {
            onClose();
          },
        },
      );
    } else {
      createTweet(values, {
        onSuccess: () => {
          editor?.commands.clearContent();
          reset();
          onClose();
        },
      });
    }
  };

  const isPending = isUpdating || isCreating;

  return (
    <form onSubmit={onSubmit} className="flex flex-col border-b p-4 pb-6">
      <div className="flex gap-3">
        <Link href={`/${currentUser?.username}`}>
          <Avatar src={currentUser?.image} alt={currentUser?.name} />
        </Link>
        <div className="relative w-full">
          {isMounted ? (
            <>
              <EditorContent
                editor={editor}
                className="mt-2 max-h-40 w-full overflow-y-auto break-all border-b"
              />
              <span
                className={cn(
                  "pointer-events-none absolute top-2.5 hidden text-muted-foreground",
                  !content && "block",
                )}
              >
                What&apos;s happening!?
              </span>
            </>
          ) : (
            <Skeleton className="h-14" />
          )}
        </div>
      </div>
      <div className="ml-auto mt-3 flex gap-3">
        {!!attachments.length && (
          <MediaPreviews
            isPending={isPending}
            attachments={attachments}
            removeAttachment={removeAttachment}
          />
        )}
        <div className="flex h-fit items-center gap-3">
          <UploadMediaButton
            isUploading={isUploading}
            startUpload={startUpload}
            uploadProgress={uploadProgress}
          />
          <div className="relative p-3">
            <CircularProgressBar
              value={content.length}
              maxValue={500}
              strokeWidth={16}
            />
          </div>
          <Button
            disabled={isPending || !!!content.trim()}
            className="rounded-full"
          >
            {tweet ? "Save" : "Tweet"}
          </Button>
        </div>
      </div>
    </form>
  );
};

const UploadMediaButton = ({
  isUploading,
  startUpload,
  uploadProgress,
}: {
  isUploading: boolean;
  startUpload: (files: File[]) => void;
  uploadProgress?: number;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative">
      <input
        type="file"
        ref={inputRef}
        className="sr-only hidden"
        accept="image/*"
        onChange={(e) => {
          const files = Array.from(e.target.files || []);
          if (!!!files.length) return;
          startUpload(files);
          e.target.value = "";
        }}
        multiple
      />
      <Button
        disabled={isUploading}
        type="button"
        onClick={() => inputRef.current?.click()}
        variant="ghost"
        size="icon"
        className="text-primary hover:bg-blue-500/10 hover:text-primary dark:hover:bg-blue-900/20"
      >
        <ImageIcon className="size-4" />
      </Button>
      {!!uploadProgress && <CircularProgressBar value={uploadProgress} />}
    </div>
  );
};

const MediaPreviews = ({
  attachments,
  removeAttachment,
  isPending,
}: {
  attachments: Attachment[];
  removeAttachment: (fileName: string) => void;
  isPending: boolean;
}) => {
  const getSrc = (file: File) => {
    return URL.createObjectURL(file);
  };

  return (
    <ul className="flex flex-wrap gap-3">
      {attachments.map(({ file, isUploading }) => (
        <li
          key={file.name}
          className="relative size-20 overflow-hidden rounded-md bg-secondary"
        >
          {file.type.includes("image") ? (
            <Image
              src={getSrc(file)}
              fill
              alt="Attachment Preview"
              className={cn(
                "border object-cover",
                isUploading && "animate-pulse",
              )}
            />
          ) : (
            <video controls className="relative z-50 mx-auto max-h-20">
              <source src={getSrc(file)} type={file.type} />
            </video>
          )}
          {!isUploading && (
            <Button
              disabled={isPending}
              type="button"
              variant="outline"
              size="icon"
              onClick={() => removeAttachment(file.name)}
              className="absolute right-0 top-0 size-5 rounded-md"
            >
              <X className="size-4" />
            </Button>
          )}
        </li>
      ))}
    </ul>
  );
};
