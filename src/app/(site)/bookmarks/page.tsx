import { PageHeader } from "@/components/page-header";
import { Metadata } from "next";
import React from "react";
import { BookmarkFeed } from "./bookmark-feed";

export const generateMetadata = (): Metadata => {
  return {
    title: "Bookmarks",
  };
};

const BookmarkPage = () => {
  return <>
    <PageHeader backButtonUrl="/" label="Bookmarks"/>
    <BookmarkFeed/>
  </>;
};

export default BookmarkPage;
