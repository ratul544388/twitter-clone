import { useDeleteTweetMutation } from "@/hooks/use-delete-tweet-mutation";
import { useModalStore } from "@/hooks/use-modal-store";
import { TweetInput } from "../tweets/tweet-input";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";

export default function TweetModal() {
  const mutation = useDeleteTweetMutation();
  const { onClose, isOpen, data, type } = useModalStore();

  function handleOpenChange() {
    if ((!isOpen && type === "tweet") || !mutation.isPending) {
      onClose();
    }
  }

  return (
    <Dialog open={isOpen && type === "tweet"} onOpenChange={handleOpenChange}>
      <DialogContent className="top-28 translate-y-0 gap-0 p-0 outline-none">
        <DialogHeader className="sticky top-0 flex flex-row items-center gap-3 bg-background p-3">
          <DialogTitle>{data.tweet ? "Edit Tweet" : "Tweet"}</DialogTitle>
          <DialogDescription className="hidden">
            Modal Description
          </DialogDescription>
        </DialogHeader>
        <TweetInput tweet={data.tweet} autoFocus/>
      </DialogContent>
    </Dialog>
  );
}
