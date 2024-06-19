import { Avatar, Box, Skeleton, Stack } from "@mui/material"
import moment from "moment"
import { useEffect, useState } from "react"
import AdminLayout from "../../components/layout/AdminLayout"
import RenderAttachment from "../../components/shared/RenderAttachment"
import Table from "../../components/shared/Table"
import { useErrors } from "../../hooks/hook"
import { fileFormat, transformImage } from "../../lib/features"
import { useAdminMessagesQuery } from "../../redux/api/api"


const columns=[
  {
    field:"id",
    headerName:"ID",
    width:200,
    headerClassName:"table-header"
  },
  {
    field:"attachments",
    headerName:"Attachments",
    width:250,
    headerClassName:"table-header",
    renderCell:(params)=>{
      const {attachments}=params.row;

      return attachments?.length>0?attachments.map((i)=>{
        const url=i.url;
        const file=fileFormat(url)

        return <Box key={i.public_id}>
          <a href={url} download target="_blank" style={{color:"black"}}>
            <RenderAttachment file={file} url={url}/>
          </a>
        </Box>
      }):"No Attachments"

    }
  },
  {
    field:"content",
    headerName:"Content",
    width:400,
    headerClassName:"table-header"
  },
  {
    field:"sender",
    headerName:"Sent By",
    width:200,
    headerClassName:"table-header",
    renderCell:(params)=>{
      return <Stack direction={"row"} spacing={"1rem"} alignItems={"center"} >
        <Avatar src={params.row.sender.avatar} alt={params.row.sender.name}/>
        <span>{params.row.sender.name}</span>
      </Stack>
    }
  },
  {
    field:"chat",
    headerName:"Chat",
    width:220,
    headerClassName:"table-header"
  },
  {
    field:"groupChat",
    headerName:"Group Chat",
    width:100,
    headerClassName:"table-header"
  },
  {
    field:"createdAt",
    headerName:"Time",
    width:250,
    headerClassName:"table-header"
  },
]


const MessageManagement = () => {

  const [rows,setRows]=useState([])

  const {isLoading,isError,error,data}=useAdminMessagesQuery();

  useErrors([{isError,error}])

  useEffect(() => {
    if(data){
      setRows(data.messages.map((message)=>{
        return {
          ...message,
          id:message._id,
          sender:{
            name:message.sender.name,
            avatar:transformImage(message.sender.avatar, 50)
          },
          createdAt:moment(message.createdAt).format("MMMM Do YYYY, h:mm:ss a")
        }
      }))
    }
  }, [data])
  

  return isLoading?<Skeleton height={"100vh"}/>:(
    <AdminLayout>
        <Table heading={"All messages"} columns={columns} rows={rows} rowHeight={150}/>
    </AdminLayout>
  )
}

export default MessageManagement