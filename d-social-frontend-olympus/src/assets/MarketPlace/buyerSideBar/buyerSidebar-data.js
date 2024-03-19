import {
    dashboard,
    dashboardWhite,
    message,
    messageWhite,
    order,
    orderWhite,

} from "../index.js";
export const buyerSubSidebar = [
    {
        title: "Dashboard",
        path: "/marketplace/buyer",
        icon: dashboard,
        hoverIcon: dashboardWhite,
    },
    {
        title: "Order",
        path: "/marketplace/buyer/order",
        icon: order,
        hoverIcon: orderWhite,
    },
    {
        title: "Messages",
        path: "#",
        icon: message,
        hoverIcon: messageWhite,
    },
];