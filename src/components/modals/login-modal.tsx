import { LoginForm } from "@/app/auth/login/login-form";
import { useModalStore } from "@/hooks/use-modal-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export default function LoginModal() {
  const { onClose, isOpen, type } = useModalStore();

  return (
    <Dialog open={isOpen && type === "login"} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="hidden">
          <DialogTitle>Welcome Back</DialogTitle>
          <DialogDescription>
            Discover, connect, and share moments.
          </DialogDescription>
        </DialogHeader>
        <LoginForm />
      </DialogContent>
    </Dialog>
  );
}
