import {
  Bell,
  Bookmark,
  Home,
  MessageCircle,
  Search,
  User2,
} from "lucide-react";
import {} from "react-icons/fa";

export function getNavLinks(username?: string) {
  const navLinks = [
    {
      label: "Home",
      href: "/",
      icon: Home,
      showOnBottomNavigation: true,
    },
    {
      label: "Search",
      href: "/search",
      icon: Search,
      showOnBottomNavigation: true,
    },
    ...(username
      ? [
          {
            label: "Bookmarks",
            href: "/bookmarks",
            icon: Bookmark,
          },
          {
            label: "Notifications",
            href: "/notifications",
            icon: Bell,
            showOnBottomNavigation: true,
            count: true,
          },
          {
            label: "Messages",
            href: "/messages",
            icon: MessageCircle,
          },
          {
            label: "Profile",
            href: `/${username}`,
            icon: User2,
            showOnBottomNavigation: true,
          },
        ]
      : []),
  ];

  return navLinks;
}

export const placeholderAvatar = "/placeholder-avatar.webp";

export const queries = [
  {
    label: "For You",
    key: "for-you-tweets",
    emptyTitle: "No Tweets To Show",
    emptyDescription:
      "There are no tweets available for you right now. Follow more users or create your own tweets to see content here.",
  },
  {
    label: "Following",
    key: "following-users-tweets",
    emptyTitle: "No Followed Users",
    emptyDescription:
      "You haven't followed anyone yet, or the users you follow have no tweets to show. Start following some users to see their posts.",
  },
  {
    label: "Tweets",
    key: "user-tweets",
    emptyTitle: "No Tweets Yet",
    emptyDescription:
      "You haven't posted any tweets yet. Start tweeting to share your thoughts with others.",
  },
  {
    label: "Likes",
    key: "user-liked-tweets",
    emptyTitle: "No Liked Tweets",
    emptyDescription: "You haven't liked any tweets yet. Explore content and show your support with likes.",
  },
  {
    label: "Media",
    key: "user-tweets-contains-media",
    emptyTitle: "No Media Posts",
    emptyDescription: "You have no tweets containing media like photos or videos yet.",
  },
  {
    label: "Users",
    key: "searched-users",
    emptyTitle: "No Users Found",
    emptyDescription: "No users match your search criteria. Try a different search or explore popular users.",
  },
  {
    label: "Tweets",
    key: "searched-tweets",
    emptyTitle: "No Tweets Found",
    emptyDescription: "There are no tweets matching your search. Try searching for something else.",
  },
  {
    label: "Who to Follow",
    key: "who-to-follow",
    emptyTitle: "Everyone is Followed",
    emptyDescription:
      "You have already followed all the users in the app. Check back later for new users to follow.",
  },
  {
    label: "Followers",
    key: "followers",
    emptyTitle: "No Followers Yet",
    emptyDescription: "No one has followed this user yet. Share more and engage to attract followers.",
  },
  {
    label: "Following",
    key: "following",
    emptyTitle: "Not Following Anyone",
    emptyDescription: "This user isn't following anyone yet. Start following other users to see their tweets.",
  },
] as const;

export const TWEET_PER_PAGE = 10;
export const COMMENT_PER_PAGE = 10;
export const NOTIFICATIONS_PER_PAGE = 10;
