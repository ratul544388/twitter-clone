import { PageHeaderSkeleton } from "@/components/skeletons/page-header-skeleton";
import { TweetSkeleton } from "@/components/skeletons/tweet-skeleton";

const Loading = () => {
  return (
    <>
      <PageHeaderSkeleton />
      <TweetSkeleton />
    </>
  );
};

export default Loading;
