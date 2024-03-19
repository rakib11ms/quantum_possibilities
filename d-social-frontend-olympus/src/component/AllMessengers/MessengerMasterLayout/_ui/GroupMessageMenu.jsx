import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';

import axiosInstance from '../../../../../utils/axios';
import MessengerIcon from './icons/MessengerIcon';
import EditIcon from './icons/EditIcon';
import ImageIcon from './icons/ImageIcon';
import MembersIcon from './icons/MembersIcon';
import AddMember from './icons/AddMember';
import LeaveIcon from './icons/LeaveIcon';

function GroupMessageMenu({ groupId, groupMessageMenu, openGroupMessageMenu, handleCloseGroupMessageMenu, handleGroupNameEdit, handleImageClick }) {
    const [groupMemberMenu, setGroupMemberMenu] = React.useState(null);
    const openGroupMemberMenu = Boolean(groupMemberMenu);
    const handleOpenGroupMemberMenu = (event) => {
        setGroupMemberMenu(event.currentTarget);

    };

    const handleCloseGroupMemberMenu = () => {
        setGroupMemberMenu(null);
        handleCloseGroupMessageMenu()
    };

    const [groupInfo, setGroupInfo] = React.useState("");

    React.useEffect(() => {
        if (groupId) {
            axiosInstance.get(`/api/get-group-chat-infomation/${groupId}`).then((res) => {
                if (res.data.status == 200) {
                    setGroupInfo(res.data.group_messages)
                }
            });
        }

    }, [groupId])

    return (
        <Menu
            id="basic-menu"
            anchorEl={groupMessageMenu}
            open={openGroupMessageMenu}
            onClose={handleCloseGroupMessageMenu}
            MenuListProps={{
                'aria-labelledby': 'basic-button',
            }}
            PaperProps={{
                style: {
                    width: '18rem',
                },
            }}
            sx={{
                marginRight: '30rem',
            }}
        >
            <MenuItem onClick={handleCloseGroupMessageMenu}>
                <ListItemIcon>
                    <MessengerIcon />
                </ListItemIcon>
                <ListItemText
                    primary={
                        <Typography fontWeight="bold" color="#373737">
                            Open in Messenger
                        </Typography>
                    }
                />
            </MenuItem>
            <MenuItem onClick={handleGroupNameEdit}>
                <ListItemIcon>
                    <EditIcon />
                </ListItemIcon>
                <ListItemText
                    primary={
                        <Typography fontWeight="bold" color="#373737">
                            Group Name
                        </Typography>
                    }
                />
            </MenuItem>
            <MenuItem onClick={handleImageClick}>
                <ListItemIcon>
                    <ImageIcon />
                </ListItemIcon>
                <ListItemText
                    primary={
                        <Typography fontWeight="bold" color="#373737">
                            Change Photo
                        </Typography>
                    }
                />
            </MenuItem>
            <MenuItem onClick={handleOpenGroupMemberMenu}>
                <ListItemIcon>
                    <MembersIcon />
                </ListItemIcon>
                <ListItemText
                    primary={
                        <Typography fontWeight="bold" color="#373737">
                            Members
                        </Typography>
                    }
                />

            </MenuItem>
            <MenuItem onClick={handleCloseGroupMessageMenu}>
                <ListItemIcon>
                    <AddMember />
                </ListItemIcon>
                <ListItemText
                    primary={
                        <Typography fontWeight="bold" color="#373737">
                            Add Members
                        </Typography>
                    }
                />
                <Menu
                    id="basic-menu"
                    anchorEl={groupMemberMenu}
                    open={openGroupMemberMenu}
                    onClose={handleCloseGroupMemberMenu}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                    PaperProps={{
                        style: {
                            width: '18rem',
                        },
                    }}
                    sx={{
                        marginRight: '30rem',
                    }}
                >
                    {groupInfo?.members?.map(item => {
                        return <MenuItem onClick={handleCloseGroupMemberMenu}>
                            <ListItemText
                                primary={
                                    <Typography fontWeight="bold" color="#373737">
                                        {item.first_name} {item.last_name}
                                    </Typography>
                                }
                            />
                        </MenuItem>
                    })}
                </Menu>
            </MenuItem>
            <MenuItem onClick={handleCloseGroupMessageMenu}>
                <ListItemIcon>
                    <LeaveIcon />
                </ListItemIcon>
                <ListItemText
                    primary={
                        <Typography fontWeight="bold" color="#373737">
                            Leave from Group
                        </Typography>
                    }
                />
            </MenuItem>
        </Menu>
    );
}

export default GroupMessageMenu;