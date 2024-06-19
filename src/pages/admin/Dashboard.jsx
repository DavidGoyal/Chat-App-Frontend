import { AdminPanelSettings as AdminPanelSettingsIcon, Group as GroupIcon, Message as MessageIcon, Notifications as NotificationsIcon, Person as PersonIcon } from '@mui/icons-material'
import { Box, Container, Paper, Stack, Typography } from '@mui/material'
import moment from 'moment'
import AdminLayout from '../../components/layout/AdminLayout'
import { LayoutLoader } from '../../components/layout/Loaders'
import { DoughnutChart, LineChart } from '../../components/specific/Charts'
import { ButtonComponent, SearchField } from "../../components/styles/StyledComponents"
import { useErrors } from '../../hooks/hook'
import { useAdminStatsQuery } from '../../redux/api/api'

const Dashboard = () => {

  const {isLoading,isError,error,data}=useAdminStatsQuery();


  useErrors([{isError,error}])

  const AppBar=()=>(
    <Paper
      elevation={3}
      sx={{
        padding:'2rem',
        margin:"2rem 0",
        borderRadius:"1rem"
      }}
    >
      <Stack direction={"row"} alignItems={"Center"} spacing={"1rem"}>
        <AdminPanelSettingsIcon sx={{fontSize:"3rem"}}/>

        <SearchField/>

        <ButtonComponent>Search</ButtonComponent>

        <Box flexGrow={1}></Box>
        <Typography
          sx={{
            display:{
              xs:"none",
              lg:"block"
            }
          }}
          color={"rgba(0,0,0,0.7)"}
          textAlign={"center"}
        >{
          moment().format('dddd,D MMMM YYYY')}
        </Typography>

        <NotificationsIcon/>

      </Stack>
    </Paper>
  )


  const Widgets=()=>(
    <Stack direction={{xs:"column",sm:"row"}} justifyContent={"space-between"} spacing={"2rem"} alignItems={"center"} margin={"2rem 0"}>
      <Widget title={"Users"} value={data.users} Icon={PersonIcon}/>
      <Widget title={"Chats"} value={data.chats} Icon={GroupIcon}/>
      <Widget title={"Messages"} value={data.messages} Icon={MessageIcon}/>
    </Stack>
  )

  return isLoading?<LayoutLoader/>: (
    <>
      <AdminLayout>
        <Container component={"main"}>

          <AppBar/>

          <Stack 
            direction={{
              xs:"column",
              lg:"row"
            }} 
            flexWrap={"wrap"} 
            justifyContent={"center"}
            alignItems={{
              xs:"center",
              lg:"stretch"
            }}
            sx={{
              gap:"2rem"
            }}
          >

            <Paper
              elevation={3}
              sx={{
                padding:"2rem 3.5rem",
                borderRadius:"1rem",
                width:"100%",
                maxWidth:"45rem"
              }}
            >
              <Typography margin={"2rem 0"} variant='h4'>Last Messages</Typography>
              <LineChart value={data.messagesPerDay}/>
            </Paper>

            <Paper
              elevation={3}
              sx={{
                padding:"1rem",
                borderRadius:"1rem",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                width:{xs:"100%",sm:"30%"},
                position:"relative",
                maxWidth:"25rem"
              }}
            >

              <DoughnutChart value={[data.singleChats,data.groupChats]} labels={["Single Chats","Group Chats"]}/>

              <Stack
                position={"absolute"}
                direction={"row"}
                justifyContent={"center"}
                alignItems={"center"}
                spacing={"0.5rem"}
                width={"100%"}
                height={"100%"}
              >

                <GroupIcon/>
                <Typography>Vs</Typography>
                <PersonIcon/>

              </Stack>

            </Paper>

          </Stack>

          <Widgets/>

        </Container>
      </AdminLayout>
    </>
  )
}


const Widget=({title,value,Icon})=>(
  <Paper
    elevation={3}
    sx={{
      padding:"2rem",
      margin: "2rem 0",
      borderRadius:"1.5rem",
      width:"20rem",
    }}
  >
    <Stack spacing={"1rem"} alignItems={"center"}>
    <Typography
      sx={{
        color:"rgba(0, 0, 0, 0.7)",
        borderRadius:"50%",
        border: "5px solid rgba(0,0,0,0.9)",
        width:"5rem",
        height:"5rem",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
      }}
    >{value}</Typography>
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <Icon/>
        <Typography>{title}</Typography>
      </Stack> 
    </Stack>
  </Paper>
)

export default Dashboard