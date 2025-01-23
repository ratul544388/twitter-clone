import { PageHeader } from "@/components/page-header";
import { UserList } from "@/components/user-list";
import { ParamsType } from "@/types";
import { Metadata } from "next";
import React from "react";

export const generateMetadata = (): Metadata => {
  return {
    title: "Following",
  };
};

const Page = async ({params} : {params: ParamsType}) => {
  const {username} = await params;
  return (
    <>
      <PageHeader showBackButton label="Following"/>
      <UserList type="following" username={username}/>
    </>
  );
};

export default Page;
