import BirthDay from '@/component/BirthDay';
import FriendList from '@/component/Friends/FriendList';
import FriendRequestList from '@/component/Friends/FriendRequestList';
import GroupConversations from '@/component/NewsFeed/GroupConversations';
import Sponsored from '@/component/SideBar/Sponsored';


/* 

Danger Zone, Don't Touch 
- Banna 

*/
export const navContainer = [
    {
        id: '1',
        title: 'Explore',
        icon_url: '/custom-svg-icon/explore_icon.svg',
        url: '/explore',
    },
    {
        id: '2',
        title: 'Friends',
        icon_url: '/custom-svg-icon/friends.svg',
        url: '/friend',
    },
    {
        id: '3',
        title: 'Groups',
        url: '/grouppage',
        icon_url: '/custom-svg-icon/groups.svg',
    },
    {
        id: '4',
        title: 'Pages',
        url: '/quantumpage',
        icon_url: '/custom-svg-icon/pages.svg',
    },
    {
        id: '5',
        title: 'Bookmarks',
        url: '/bookmark',
        icon_url: '/custom-svg-icon/bookmark.svg',
    },
    {
        id: '6',
        title: 'Market place',
        url: '/marketplace',
        icon_url: '/custom-svg-icon/marketplace.svg',
    },
    {
        id: '7',
        title: 'Wallet',
        url: '/wallet',
        icon_url: '/custom-svg-icon/Wallet.svg',
    },
    {
        id: '8',
        title: 'Seller Panel',
        url: '/marketplace/seller',
        icon_url: '/seller_panel.svg',
    },
    {
        id: '9',
        title: 'Buyer Panel',
        url: '/marketplace/buyer',
        icon_url: '/buyer_panel.svg',
    },
    {
        id: '10',
        title: 'Ads Manager',
        url: '/manage-ads',
        icon_url: '/ads.svg',
    },
];
export const rightSidebarContainer = [
    {
        id: '1',
        title: 'sponsored',
        content: <Sponsored />,
        img_url: '/custom-svg-icon/sponsored.png',
    },
    {
        id: '2',
        title: 'friendrequestlist',
        content: <FriendRequestList />,
        img_url: '/custom-svg-icon/friend_req.png',
    },
    {
        id: '3',
        title: 'birthday',
        content: <BirthDay />,
        img_url: '/custom-svg-icon/birthday.png',
    },
    {
        id: '4',
        title: 'friendlist',
        content: <FriendList />,
        img_url: '/custom-svg-icon/friend_list.png',
    },
    {
        id: '5',
        title: 'groupConversations',
        content: <GroupConversations />,
        img_url: '/custom-svg-icon/group_cova.png',
    },
];
