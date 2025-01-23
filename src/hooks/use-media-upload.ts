import { useUploadThing } from "@/lib/uploadthing";
import { TweetData } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

export type Attachment = {
  file: File;
  mediaId?: string;
  isUploading: boolean;
};

export const useMediaUpload = (post?: TweetData) => {
  const [uploadProgress, setUploadProgress] = useState<number>();
  const [attachments, setAttachments] = useState<Attachment[]>([]);

  const fetchImageAsBlob = useCallback(async (imageUrl: string) => {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    const blob = await response.blob();
    return blob;
  }, []);

  useEffect(() => {
    if (!!!post?.attachments.length) return;
    const initializeAttachments = async () => {
      const attachmentPromises = post.attachments.map(async (a) => {
        const blob = await fetchImageAsBlob(a.url);
        const file = new File([blob], `attachment_${crypto.randomUUID()}`, {
          type: blob.type,
        });
        return { file, mediaId: a.id, isUploading: false };
      });

      const resolvedAttachments = await Promise.all(attachmentPromises);
      const validAttachments = resolvedAttachments.filter(Boolean);
      setAttachments(validAttachments);
    };
    initializeAttachments();
  }, [fetchImageAsBlob, post]);

  const { isUploading, startUpload } = useUploadThing("attachment", {
    onBeforeUploadBegin(files) {
      const renamedFiles = files.map((file) => {
        const extension = file.name.split(".").pop();
        return new File(
          [file],
          `attachment_${crypto.randomUUID()}.${extension}`,
          {
            type: file.type,
          },
        );
      });

      setAttachments((prev) => [
        ...prev,
        ...renamedFiles.map((file) => ({
          file,
          isUploading: true,
        })),
      ]);

      return renamedFiles;
    },
    onUploadProgress: setUploadProgress,
    onClientUploadComplete(res) {
      setAttachments((prev) =>
        prev.map((a) => {
          const updateResult = res.find((r) => r.name === a.file.name);
          if (!updateResult) return a;
          return {
            ...a,
            mediaId: updateResult.serverData.mediaId,
            isUploading: false,
          };
        }),
      );
      setUploadProgress(undefined);
    },
    onUploadError() {
      toast.error("Error while uploading attachments");
    },
  });

  const handleStartUpload = (files: File[]) => {
    if (attachments.length + files.length > 5) {
      return toast.error("You can only upload up to 5 attachments per post.");
    }

    startUpload(files);
  };

  const removeAttachment = (fileName: string) => {
    setAttachments((prev) => prev.filter((a) => a.file.name !== fileName));
  };

  const reset = () => {
    setAttachments([]);
    setUploadProgress(undefined);
  };

  return {
    isUploading,
    startUpload: handleStartUpload,
    attachments,
    uploadProgress,
    removeAttachment,
    reset,
  };
};
