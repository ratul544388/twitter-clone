import { PageHeader } from "@/components/page-header";
import { UserList } from "@/components/user-list";
import { Metadata } from "next";
import React from "react";

export const generateMetadata = (): Metadata => {
  return {
    title: "Following",
  };
};

const Page = () => {
  return (
    <>
      <PageHeader showBackButton label="Following" />
      <UserList type="following" />
    </>
  );
};

export default Page;
