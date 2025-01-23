"use client";

import EditProfileModal from "@/components/modals/edit-profile-modal";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/hooks/use-modal-store";
import { UserData } from "@/types";

export const EditProfileButton = ({user} : {user: UserData}) => {
  const { onOpen } = useModalStore();
  return (
    <>
      <Button
        onClick={() => onOpen("editProfile", {user})}
        variant="outline"
        className="rounded-full"
      >
        Edit Profile
      </Button>
      <EditProfileModal />
    </>
  );
};
