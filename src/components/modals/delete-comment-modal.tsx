import { useDeleteCommentMutation } from "@/hooks/use-delete-comment-mutation";
import { useModalStore } from "@/hooks/use-modal-store";
import { LoadingButton } from "../loading-button";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export default function DeleteCommentModal() {
  const mutation = useDeleteCommentMutation();
  const { onClose, isOpen, data, type } = useModalStore();

  function handleOpenChange() {
    if ((!isOpen && type === "deleteComment") || !mutation.isPending) {
      onClose();
    }
  }

  return (
    <Dialog
      open={isOpen && type === "deleteComment"}
      onOpenChange={handleOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Comment?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this comment? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={mutation.isPending}
          >
            Cancel
          </Button>
          <LoadingButton
            variant="destructive"
            onClick={() =>
              mutation.mutate(data?.id as string, { onSuccess: onClose })
            }
            isLoading={mutation.isPending}
          >
            Delete
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
