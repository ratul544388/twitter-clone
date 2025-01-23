import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";
import React from "react";

const MessagesPage = () => {
  return (
    <>
      <PageHeader label="Messages" showBackButton />
      <EmptyState
        title="Messaging Feature Coming Soon"
        description="We're working hard to bring you a seamless messaging experience. Stay tuned for updates!"
      />
    </>
  );
};

export default MessagesPage;
