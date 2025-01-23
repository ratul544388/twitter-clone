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
  },
  {
    label: "Following",
    key: "following-users-tweets",
  },
  {
    label: "Tweets",
    key: "user-tweets",
  },
  {
    label: "Likes",
    key: "user-liked-tweets",
  },
  {
    label: "Media",
    key: "user-tweets-contains-media",
  },
  {
    label: "Users",
    key: "searched-users",
  },
  {
    label: "Tweets",
    key: "searched-tweets",
  },
  {
    label: "Who to Follow",
    key: "who-to-follow",
  },
  {
    label: "Followers",
    key: "followers",
  },
  {
    label: "Following",
    key: "following",
  },
] as const;

export const TWEET_PER_PAGE = 10;
export const COMMENT_PER_PAGE = 10;
export const NOTIFICATIONS_PER_PAGE = 10;
