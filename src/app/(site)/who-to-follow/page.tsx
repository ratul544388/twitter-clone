import { PageHeader } from "@/components/page-header";
import { UserList } from "@/components/user-list";
import { Metadata } from "next";
import React from "react";

export const generateMetadata = (): Metadata => {
  return {
    title: "Who To Follow",
  };
};

const Page = () => {
  return (
    <>
      <PageHeader showBackButton label="Who To Follow" />
      <UserList type="who-to-follow" />
    </>
  );
};

export default Page;
