import Avatar from "@/components/avatar";
import { CoverPhoto } from "@/components/cover-photo";
import { PageHeader } from "@/components/page-header";
import { FollowButton } from "@/components/right-sidebar/follow-button";
import { TweetFeed } from "@/components/tweet-feed";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/get-current-user";
import { isFollowing } from "@/lib/utils";
import { getUserDataSelect, ParamsType } from "@/types";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { EditProfileButton } from "./_components/edit-profile-button";

const getUserByUsername = cache(async (username: string) => {
  const currentUser = await getCurrentUser();
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: getUserDataSelect(currentUser?.id),
  });

  return user;
});

export const generateMetadata = async ({
  params,
}: {
  params: ParamsType;
}): Promise<Metadata> => {
  const { username } = await params;

  const user = await getUserByUsername(username);

  return {
    title: `${user?.name} (@${user?.username})`,
  };
};

const Page = async ({ params }: { params: ParamsType }) => {
  const { username } = await params;

  const currentUser = await getCurrentUser();

  const user = await getUserByUsername(username);

  if (!user) {
    return notFound();
  }

  return (
    <>
      <PageHeader
        label={`@${user.username}`}
        showBackButton
        postCount={user._count.tweets}
      />
      <CoverPhoto src={user.coverPhoto}/>
      <Avatar
        src={user.image}
        alt={user.name}
        className="absolute ml-3 size-40 -translate-y-1/2 border-[5px]"
      />
      <div className="px-4">
        <div className="flex justify-between">
          <h2 className="mt-24 text-lg font-medium">{user.name}</h2>
          <div className="mt-3">
            {user.id === currentUser?.id ? (
              <EditProfileButton user={user} />
            ) : (
              <FollowButton
                userId={user.id}
                initialState={{
                  followers: user._count.followers,
                  isFollowing: isFollowing(user, currentUser?.id),
                }}
              />
            )}
          </div>
        </div>
        <p className="leading-3 text-secondary-foreground">@{user.username}</p>
        <div className="mt-3 flex gap-3">
          <Link
            href="/followers"
            className="text-muted-foreground hover:underline"
          >
            Followers:{" "}
            <span className="font-bold text-foreground">
              {user._count.followers}
            </span>
          </Link>
          <Link
            href="/following"
            className="text-muted-foreground hover:underline"
          >
            Following:{" "}
            <span className="font-bold text-foreground">
              {user._count.following}
            </span>
          </Link>
        </div>
        <p className="mt-3 whitespace-pre-line break-words">{user.bio}</p>
      </div>
      <TweetFeed
        tabs={[
          "user-tweets",
          "user-liked-tweets",
          "user-tweets-contains-media",
        ]}
        userId={user.id}
        className="mt-10"
      />
    </>
  );
};

export default Page;
