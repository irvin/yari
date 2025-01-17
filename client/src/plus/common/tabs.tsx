import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export enum TabVariant {
  NOTIFICATIONS,
  STARRED,
  WATCHING,
  COLLECTIONS,
  FREQUENTLY_VIEWED,
}

const NOTIFICATIONS_URL = "/plus/notifications";
const STARRED_URL = "/plus/notifications/starred";
const WATCHING_URL = "/plus/notifications/watching";
const COLLECTIONS_URL = "/plus/collection";
const FREQUENTLY_VIEWED_URL = "/plus/collection/frequently_viewed";

export const FILTERS = [
  {
    label: "Content updates",
    param: "content",
  },
  {
    label: "Browser compatibility",
    param: "compat",
  },
];

export const SORTS = [
  {
    label: "Date",
    param: "date",
  },
  {
    label: "Title",
    param: "title",
  },
];

export const TAB_INFO = {
  [TabVariant.NOTIFICATIONS]: {
    pageTitle: "Notifications",
    label: "All notifications",
    path: NOTIFICATIONS_URL,
  },

  [TabVariant.STARRED]: {
    label: "Starred",
    pageTitle: "My Starred Pages",
    path: STARRED_URL,
  },
  [TabVariant.WATCHING]: {
    label: "Watch list",
    pageTitle: "My Watched Pages",
    path: WATCHING_URL,
  },

  [TabVariant.COLLECTIONS]: {
    label: "Collections",
    pageTitle: "Collections",
    path: COLLECTIONS_URL,
  },

  [TabVariant.FREQUENTLY_VIEWED]: {
    label: "Frequently viewed articles",
    pageTitle: "Frequently viewed articles",
    path: FREQUENTLY_VIEWED_URL,
  },
};

export function useCurrentTab(locale): TabVariant {
  const location = useLocation();
  const initialTab = getInitialTab();

  const [currentTab, setTab] = useState<TabVariant>(initialTab);

  useEffect(() => {
    if (location.pathname === `/${locale}${STARRED_URL}`) {
      setTab(TabVariant.STARRED);
    } else if (location.pathname === `/${locale}${WATCHING_URL}`) {
      setTab(TabVariant.WATCHING);
    } else if (location.pathname === `/${locale}${COLLECTIONS_URL}`) {
      setTab(TabVariant.COLLECTIONS);
    } else if (location.pathname === `/${locale}${FREQUENTLY_VIEWED_URL}`) {
      setTab(TabVariant.FREQUENTLY_VIEWED);
    } else {
      setTab(TabVariant.NOTIFICATIONS);
    }
  }, [location, currentTab, locale]);

  return currentTab;
}

function getInitialTab() {
  if (window.location.pathname.endsWith(STARRED_URL)) {
    return TabVariant.STARRED;
  }
  if (window.location.pathname.endsWith(COLLECTIONS_URL)) {
    return TabVariant.COLLECTIONS;
  }
  if (window.location.pathname.endsWith(FREQUENTLY_VIEWED_URL)) {
    return TabVariant.FREQUENTLY_VIEWED;
  }
  if (window.location.pathname.endsWith(WATCHING_URL)) {
    return TabVariant.WATCHING;
  }
  return TabVariant.NOTIFICATIONS;
}
