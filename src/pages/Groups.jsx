/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from '@mui/icons-material/Edit';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import MenuIcon from '@mui/icons-material/Menu';
import { Backdrop, Box, Button, Drawer, Grid, IconButton, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { Suspense, lazy, memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { LayoutLoader } from "../components/layout/Loaders";
import AvatarCard from "../components/shared/AvatarCard";
import UserItem from "../components/shared/UserItem";
import { LinkComponent } from "../components/styles/StyledComponents";
import { useAsyncMutation, useErrors } from "../hooks/hook";
import { useAddGroupMembersMutation, useDeleteChatMutation, useGetChatDetailsQuery, useGetMyGroupsQuery, useRemoveGroupMemberMutation, useRenameGroupMutation } from "../redux/api/api";
import { toggleAddMember } from "../redux/reducers/misc";


const AddMemberDialog =lazy(()=>import("../components/dialog/AddMemberDialog"));
const ConfirmDeleteDialog = lazy(()=>import("../components/dialog/ConfirmDeleteDialog"));

const Groups = () => {
  const chatId=useSearchParams()[0].get("group");

  const {isAddMember}=useSelector(state=>state.misc)

  const [isMobileOpen,setIsMobileOpen]=useState(false);
  const [isEdit,setIsEdit]=useState(false);
  const [groupName,setGroupName]=useState("");
  const [updatedGroupName,setUpdatedGroupName]=useState("");
  const [openDeleteMemberDialog,setOpenDeleteMemberDialog]=useState(false);
  const [members,setMembers]=useState([]);

  const navigate=useNavigate();
  const dispatch=useDispatch();


  const getGroups=useGetMyGroupsQuery("");
  const groupDetails=useGetChatDetailsQuery({chatId,populate:true},{skip:!chatId})
  const [renameGroup,isLoading]=useAsyncMutation(useRenameGroupMutation);
  const [removeMember,isRemoveMemberLoading]=useAsyncMutation(useRemoveGroupMemberMutation);
  const [addMembers,isAddMemberLoading]=useAsyncMutation(useAddGroupMembersMutation);
  const [deleteGroup,isDeleteGroupLoading]=useAsyncMutation(useDeleteChatMutation);

  const errors=[
    {
      isError:getGroups.isError,
      error:getGroups.error
    },
    {
      isError:groupDetails.isError,
      error:groupDetails.error
    }
  ]

  useErrors(errors)

  const navigateBack=()=>{
    navigate("/");
  }


  const handleMobile=()=>{
    setIsMobileOpen(prev=>!prev)
  }

  const handleMobileClose=()=>{
    setIsMobileOpen(false)
  }

  const openDeleteHandler=()=>{
    setOpenDeleteMemberDialog(true);
  }

  const closeDeleteHandler=()=>{
    setOpenDeleteMemberDialog(false);
  }

  const deleteHandler=()=>{
    deleteGroup("Deleting the Group",chatId);
    closeDeleteHandler();
    navigate("/groups")
  }

  const renameGroupHandler=()=>{
    renameGroup("Renaming the Group",{id:chatId,name:updatedGroupName})
    setIsEdit(false)
  }

  const removeMemberHandler=(id)=>{
    removeMember("Removing member from group", {chatId, userId:id})
  }

  const AddMember=(selectedMembers)=>{
    addMembers("Adding members to group", {chatId,members:selectedMembers})
  }

  useEffect(() => {
    const groupData=groupDetails.data;

    if(groupData){
      setGroupName(groupData.chat.name)
      setUpdatedGroupName(groupData.chat.name)
      setMembers(groupData.chat.members);
    }

    return () => {
      setGroupName("");
      setUpdatedGroupName("");
      setIsEdit(false);
      setMembers([]);
    }
  }, [groupDetails.data])


  useEffect(() => {
    if (chatId&&!groupDetails.data) {
      setGroupName(`Group Name ${chatId}`);
      setUpdatedGroupName(`Group Name ${chatId}`);
    }

    return () => {
      setGroupName("");
      setUpdatedGroupName("");
      setIsEdit(false);
    };
  }, [chatId]);
  

  const IconBtns=<>

  <Box sx={{
      display:{
        xs:"block",
        sm:"none",
      },
      position:"absolute",
      top:"2rem",
      right:"2rem",
    }}>
    <IconButton onClick={handleMobile}>
      <MenuIcon />
    </IconButton>
  </Box>

  <Tooltip title="Back">
    <IconButton sx={{
      position:"absolute",
      top:"2rem",
      left:"2rem",
      bgcolor:"rgba(0,0,0,0.8)",
      color:"white",
      "&:hover":{
        bgcolor:"rgba(0, 0, 0, 0.7)"
      },
    }}
    onClick={navigateBack}
    >
      <KeyboardBackspaceIcon/>
    </IconButton>
  </Tooltip>
  </>

  const GroupName = (
    <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} spacing={"1rem"} padding={"3rem"}>
      {isEdit ? (
        <>
          <TextField value={updatedGroupName} onChange={(e)=>setUpdatedGroupName(e.target.value)}/>
          <IconButton onClick={renameGroupHandler} disabled={isLoading}><DoneIcon/></IconButton>
        </>
      ) : (
        <>
          <Typography variant="h4">{groupName}</Typography>
          <IconButton disabled={isLoading} onClick={()=>setIsEdit(true)}><EditIcon/></IconButton>
        </>
      )}
    </Stack>
  );


  const ButtonGroup = (
    <Stack
      direction={{
        xs: "column-reverse",
        sm: "row",
      }}
      spacing={"1rem"}
      p={{
        sm: "1rem",
        xs: "0",
        md: "1rem 4rem",
      }}
    >
      <Button
        size="large"
        variant="outlined"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={openDeleteHandler}
        onClose={closeDeleteHandler}
      >
        Delete Group
      </Button>
      <Button size="large" variant="contained" onClick={()=>dispatch(toggleAddMember(true))} startIcon={<AddIcon />}>
        Add Members
      </Button>
    </Stack>
  );

  return getGroups.isLoading?<LayoutLoader/>: (
    <Grid container height={"100vh"}>
      <Grid
        item
        sm={4}
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
      >
        <GroupLists myGroups={getGroups.data.groups} chatId={chatId} />
      </Grid>

      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        {IconBtns}
        {groupName && (
          <>
            {GroupName}

            <Typography
              margin={"2rem"}
              alignSelf={"flex-start"}
              variant="body1"
            >
              Members
            </Typography>

            <Stack
              maxWidth={"45rem"}
              width={"100%"}
              boxSizing={"border-box"}
              padding={{
                sm: "1rem",
                xs: "0",
                md: "1rem 4rem",
              }}
              spacing={"2rem"}
              height={"50vh"}
              overflow={"auto"}
            >
              {members.length > 0 ? (
                members.map((user) => (
                  <UserItem
                    key={user._id}
                    user={user}
                    addIcon={false}
                    styling={{ 
                      boxShadow: "0 0 0.5rem rgba(0,0,0,0.2)",
                      padding: "1rem 2rem",
                      borderRadius: "1rem",
                    }}
                    handler={removeMemberHandler}
                    handlerIsLoading={isRemoveMemberLoading}
                  />
                ))
              ) : (
                <Typography>No Members</Typography>
              )}
            </Stack>

            {ButtonGroup}
          </>
        )}
      </Grid>

      {openDeleteMemberDialog && (
        <Suspense fallback={<Backdrop open />}>
          <ConfirmDeleteDialog
            open={openDeleteMemberDialog}
            handleClose={closeDeleteHandler}
            deleteHandler={deleteHandler}
            deleteHandlerLoading={isDeleteGroupLoading}
          />
        </Suspense>
      )}

      {isAddMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddMemberDialog chatId={chatId} AddMember={AddMember} isLoadingAddMember={isAddMemberLoading}/>
        </Suspense>
      )}

      <Drawer
        open={isMobileOpen}
        onClose={handleMobileClose}
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
        }}
      >
        <GroupLists myGroups={getGroups.data.groups} chatId={chatId} w="50vw" />
      </Drawer>
    </Grid>
  );
}

const GroupLists = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack width={w} sx={{bgcolor:"bisque"}} height={"100%"}>
    {myGroups.length > 0 ? (
      myGroups.map((group) => (
        <GroupListItem group={group} chatId={chatId} key={group._id} />
      )
     ) 
    ) : (
      <Typography textAlign={"center"} padding={"1rem"}>
        No Groups
      </Typography>
    )}
  </Stack>
);


const GroupListItem=memo(({group,chatId})=>{
  const {name,avatar,_id}=group;

  return <LinkComponent to={`?group=${_id}`} onClick={(e)=>{if(chatId===_id) e.preventDefault()}}>
    <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
      <AvatarCard avatar={avatar}/>
      <Typography>{name}</Typography>
    </Stack>
  </LinkComponent>

})

export default Groups