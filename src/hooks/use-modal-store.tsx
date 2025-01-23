import { TweetData, UserData } from "@/types";
import { create } from "zustand";

export type ModalType =
  | "deleteTweet"
  | "editProfile"
  | "login"
  | "register"
  | "tweet"
  | "imageCrop"
  | "comment"
  | "deleteComment"
interface ModalData {
  id?: string;
  user?: UserData;
  tweet?: TweetData;
  imageToCrop?: string;
  onCropImage?: (blob: Blob | null) => void;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
