import AddToCardSvgIcon from "../svg-component/AddToCardSvgIcon";
import GroupSvgIcon from "../svg-component/GroupSvgIcon";
import HomeSvg from "../svg-component/HomeSvg";
import MarketPlaceSvgIcon from "../svg-component/MarketPlaceSvgIcon";
import ReelsSvgIcon from "../svg-component/ReelsSvgIcon";

export const navigationData = [
   {
      href: "/newsfeed",
      icon: HomeSvg,
      level: "Home",
   },
   {
      href: "/reel/8000",
      icon: ReelsSvgIcon,
      level: "Reels",
   },
   {
      href: "/grouppage",
      icon: GroupSvgIcon,
      level: "Groups",
   },
   {
      href: "/marketplace",
      icon: MarketPlaceSvgIcon,
      level: "Market-Place",
   },
   {
      href: "/marketplace/seller/product/cart",
      icon: AddToCardSvgIcon,
      level: "cart",
   },
];
