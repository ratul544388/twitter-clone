import { PageHeader } from "@/components/page-header";
import { Metadata } from "next";
import { SearchPageClient } from "./search-page-client";

export const generateMetadata = (): Metadata => {
  return {
    title: "Search",
  };
};

const Page = () => {
  return (
    <>
      <PageHeader
        label="Search"
        backButtonUrl="/"
        showSearchInput
        className="flex h-[110px] flex-col items-start justify-center"
      />
      <SearchPageClient />
    </>
  );
};

export default Page;
