import {
  bookmarks,
  dashboard,
  dashboardWhite,
  explore,
  friends,
  groups,
  message,
  messageWhite,
  order,
  orderWhite,
  pages,
  payment,
  paymentWhite,
  product,
  productWhite,
  shop,
  store,
  storeWhite,
  wallet,
} from "./index.js";

export const userSidebarData = [
  {
    title: "Explore",
    path: "/explore",
    icon: explore,
  },
  {
    title: "Friends",
    path: "/friendsrequest",
    icon: friends,
  },
  {
    title: "Groups",
    path: "/grouppage",
    icon: groups,
  },
  {
    title: "Pages",
    path: "/quantumpage",
    icon: pages,
  },
  {
    title: "Bookmarks",
    path: "/bookmark",
    icon: bookmarks,
  },
  {
    title: "Wallet",
    path: "/wallet",
    icon: wallet,
  },
  {
    title: "Market Place",
    path: "/marketplace",
    icon: shop,
  },
  {
    title: "Seller Panel",
    path: "/seller-panel",
    icon: shop,
  },
  {
    title: "Buyer Panel",
    path: "/buyer-panel",
    icon: shop,
  },
];

export const subSidebar = [
  {
    title: "Dashboard",
    path: "/marketplace/seller",
    icon: dashboard,
    hoverIcon: dashboardWhite,
  },
  {
    title: "Order",
    path: "/marketplace/seller/order",
    icon: order,
    hoverIcon: orderWhite,
  },
  {
    title: "Product",
    path: "/marketplace/seller/product",
    icon: product,
    hoverIcon: productWhite,
  },
  {
    title: "Payment",
    path: "/marketplace/seller/payment",
    icon: payment,
    hoverIcon: paymentWhite,
  },
  {
    title: "Store",
    path: "/marketplace/seller/store",
    icon: store,
    hoverIcon: storeWhite,
  },
  {
    title: "Messages",
    path: "/marketplace/seller/messages",
    icon: message,
    hoverIcon: messageWhite,
  },
];
