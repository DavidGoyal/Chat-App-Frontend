import DashboardIcon from "@mui/icons-material/Dashboard"
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts"
import GroupsIcon from "@mui/icons-material/Groups"
import MessageIcon from "@mui/icons-material/Message"


export const adminTabs=[
    {
        name:'Dashboard',
        path:'/admin/dashboard',
        icon:DashboardIcon
    },
    {
        name:'Users',
        path:'/admin/user-management',
        icon:ManageAccountsIcon
    },
    {
        name:'Chats',
        path:'/admin/chat-management',
        icon:GroupsIcon
    },
    {
        name:'Messages',
        path:'/admin/message-management',
        icon:MessageIcon
    },
]