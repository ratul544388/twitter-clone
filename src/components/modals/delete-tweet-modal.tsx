import { useDeleteTweetMutation } from "@/hooks/use-delete-tweet-mutation";
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

export default function DeleteTweetModal() {
  const mutation = useDeleteTweetMutation();
  const { onClose, isOpen, data, type } = useModalStore();

  function handleOpenChange() {
    if ((!isOpen && type === "deleteTweet") || !mutation.isPending) {
      onClose();
    }
  }

  return (
    <Dialog
      open={isOpen && type === "deleteTweet"}
      onOpenChange={handleOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete tweet?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this tweet? This action cannot be
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
