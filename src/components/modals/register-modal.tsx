import { RegisterForm } from "@/app/auth/register/register-form";
import { useModalStore } from "@/hooks/use-modal-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export default function RegisterModal() {
  const { isOpen, type, onClose } = useModalStore();

  return (
    <Dialog open={isOpen && type === "register"} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="hidden">
          <DialogTitle>Register</DialogTitle>
          <DialogDescription>Register</DialogDescription>
        </DialogHeader>
        <RegisterForm />
      </DialogContent>
    </Dialog>
  );
}
