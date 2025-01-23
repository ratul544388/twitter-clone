import { PageHeader } from "@/components/page-header";
import { TweetInput } from "@/components/tweets/tweet-input";
import { TweetFeed } from "@/components/tweet-feed";
import { getCurrentUser } from "@/lib/get-current-user";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "Home",
  };
};

const Home = async () => {
  const currentUser = await getCurrentUser();
  return (
    <>
      <PageHeader label="Home" />
      {currentUser && <TweetInput />}
      <TweetFeed tabs={["for-you-tweets", "following-users-tweets"]}/>
    </>
  );
};

export default Home;
