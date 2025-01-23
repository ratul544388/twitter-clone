import NotFound from "@/app/not-found";
import { PageHeader } from "@/components/page-header";
import { TweetFeed } from "@/components/tweet-feed";
import { db } from "@/lib/db";
import { ParamsType } from "@/types";
import { Metadata } from "next";

export const generateMetadata = (): Metadata => {
  return {
    title: "tweet",
  };
};

const tweetPage = async ({ params }: { params: ParamsType }) => {
  const { tweetId } = await params;

  const tweet = await db.tweet.findUnique({
    where: { id: tweetId },
    select: {
      id: true,
    },
  });

  if (!tweet) {
    return <NotFound/>
  }

  return (
    <>
      <PageHeader showBackButton label="tweet" />
      <TweetFeed fetchOnce take={1} tweetId={tweetId} showComments />
    </>
  );
};

export default tweetPage;
