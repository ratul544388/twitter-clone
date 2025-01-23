import { PageHeader } from "@/components/page-header";
import { UserList } from "@/components/user-list";
import { Metadata } from "next";
import React from "react";

export const generateMetadata = (): Metadata => {
  return {
    title: "Followers",
  };
};

const Page = () => {
  return (
    <>
      <PageHeader showBackButton label="Followers" />
      <UserList type="followers" />
    </>
  );
};

export default Page;
