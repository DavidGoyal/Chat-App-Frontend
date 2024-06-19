import { useInputValidation } from "6pp";
import { Button, Dialog, DialogTitle, Skeleton, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useAsyncMutation, useErrors } from '../../hooks/hook';
import { useCreateGroupMutation, useGetMyFriendsQuery } from '../../redux/api/api';
import { toggleNewGroup } from '../../redux/reducers/misc';
import UserItem from '../shared/UserItem';

const NewGroups = () => {
  const dispatch=useDispatch();

  const [selectedMembers,setSelectedMembers]=useState([]);

  const {isNewGroup}=useSelector(state=>state.misc)

  const groupName=useInputValidation("");


  const myFriends=useGetMyFriendsQuery("");
  const [createGroup,isLoading]=useAsyncMutation(useCreateGroupMutation);

  const errors=[
    {
      isError:myFriends.isError,
      error:myFriends.error
    }
  ]

  useErrors(errors)

  const selectMemberHandler=(_id)=>{
    setSelectedMembers((prev)=>prev.includes(_id)?prev.filter((i)=>i!==_id):([...prev,_id]));
  }

  const submitHandler=()=>{
    if(!groupName.value||!selectedMembers.length) return toast.error("Group Name and at least 2 members are required");
    createGroup("Creating Group",{name:groupName.value,members:selectedMembers});
    closeNewGroupHandler();
  }

  const closeNewGroupHandler=()=>{
    dispatch(toggleNewGroup(false));
  }

  return (
    <Dialog open={isNewGroup} onClose={closeNewGroupHandler}>
      <Stack p={{ xs: "1rem", sm: "3rem" }} width={"25rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"} variant='h4'>New Group</DialogTitle>

        <TextField value={groupName.value} onChange={groupName.changeHandler} label='Group Name' />

        <Typography variant='body1'>Members</Typography>

        <Stack>
          {myFriends.isLoading?<Skeleton/>:myFriends.data.friends.map((user)=>(
              <UserItem key={user._id} user={user} handler={selectMemberHandler} addIcon={selectedMembers&&selectedMembers.includes(user._id)?false:true}/>
            ))}
        </Stack>

        <Stack direction={"row"} justifyContent={"space-between"}>
          <Button variant='outlined' color='error' onClick={closeNewGroupHandler}>Cancel</Button>
          <Button variant='contained' onClick={submitHandler} disabled={isLoading}>Create</Button>
        </Stack>

      </Stack>
    </Dialog>
  )
}

export default NewGroups