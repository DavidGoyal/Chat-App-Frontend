import { Avatar, Skeleton, Stack } from "@mui/material"
import { useEffect, useState } from "react"
import AdminLayout from "../../components/layout/AdminLayout"
import AvatarCard from "../../components/shared/AvatarCard"
import Table from "../../components/shared/Table"
import { useErrors } from "../../hooks/hook"
import { transformImage } from "../../lib/features"
import { useAdminChatsQuery } from "../../redux/api/api"


const columns=[
  {
    field:"id",
    headerName:"ID",
    width:200,
    headerClassName:"table-header"
  },
  {
    field:"avatar",
    headerName:"Avatar",
    width:150,
    headerClassName:"table-header",
    renderCell:(params)=>{
      return <AvatarCard avatar={params.row.avatar}/>
    }
  },
  {
    field:"name",
    headerName:"Name",
    width:300,
    headerClassName:"table-header"
  },
  {
    field:"groupChat",
    headerName:"Group Chat",
    width:100,
    headerClassName:"table-header"
  },
  {
    field:"totalMembers",
    headerName:"Total Members",
    width:120,
    headerClassName:"table-header"
  },
  {
    field:"members",
    headerName:"Members",
    width:400,
    headerClassName:"table-header",
    renderCell:(params)=>{
      return <AvatarCard max={100} avatar={params.row.members}/>
    }
  },
  {
    field:"totalMessages",
    headerName:"Total Messages",
    width:120,
    headerClassName:"table-header"
  },
  {
    field:"creator",
    headerName:"Created By",
    width:250,
    headerClassName:"table-header",
    renderCell:(params)=>{
      return <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <Avatar src={params.row.creator.avatar} alt={params.row.creator.name}/>
        <span>{params.row.creator.name}</span>
      </Stack>
    }
  }
]


const ChatManagement = () => {

  const [rows,setRows]=useState([])

  const {isLoading,isError,error,data}=useAdminChatsQuery();

  useErrors([{isError,error}])

  useEffect(() => {
    if(data){
      setRows(data.chats.map((chat)=>{
        return {
          ...chat,
          id:chat._id,
          avatar:chat.avatar.map((img)=>transformImage(img,50)),
          members:chat.members.map((img)=>transformImage(img,50)),
          creator:{
            name:chat.creator.name,
            avatar:transformImage(chat.creator.avatar, 50)
          }
        }
      }))
    }
  }, [data])
  

  return isLoading?<Skeleton height={"100vh"}/>:(
    <AdminLayout>
        <Table heading={"All chats"} columns={columns} rows={rows}/>
    </AdminLayout>
  )
}

export default ChatManagement