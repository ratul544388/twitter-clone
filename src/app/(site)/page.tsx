import { PageHeader } from "@/components/page-header";
import { TweetFeed } from "@/components/tweet-feed";
import { TweetInput } from "@/components/tweets/tweet-input";
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
      <TweetFeed
        tabs={currentUser ? ["for-you-tweets", "following-users-tweets"] : []}
      />
    </>
  );
};

export default Home;
