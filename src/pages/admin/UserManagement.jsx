import { Avatar, Skeleton } from "@mui/material"
import { useEffect, useState } from "react"
import AdminLayout from "../../components/layout/AdminLayout"
import Table from "../../components/shared/Table"
import { useErrors } from "../../hooks/hook"
import { transformImage } from "../../lib/features"
import { useAdminUsersQuery } from "../../redux/api/api"


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
      return <Avatar src={params.row.avatar} alt={params.row.name}/>
    }
  },
  {
    field:"name",
    headerName:"Name",
    width:200,
    headerClassName:"table-header"
  },
  {
    field:"username",
    headerName:"UserName",
    width:200,
    headerClassName:"table-header"
  },
  {
    field:"friends",
    headerName:"Friends",
    width:150,
    headerClassName:"table-header"
  },
  {
    field:"groups",
    headerName:"Groups",
    width:150,
    headerClassName:"table-header"
  }
]


const UserManagement = () => {

  const [rows,setRows]=useState([])

  const {isLoading,isError,error,data}=useAdminUsersQuery();

  useErrors([{isError,error}])

  useEffect(() => {
    if(data){
      setRows(data.users.map((user)=>{
        return {
          ...user,
          id:user._id,
          avatar:transformImage(user.avatar,50)
        }
      }))
    }
  }, [data])
  

  return isLoading?<Skeleton height={"100vh"}/>:(
    <AdminLayout>
        <Table heading={"All users"} columns={columns} rows={rows}/>
    </AdminLayout>
  )
}

export default UserManagement