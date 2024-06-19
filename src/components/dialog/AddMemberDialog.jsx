/* eslint-disable react/prop-types */
import { Button, Dialog, DialogTitle, Skeleton, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useErrors } from '../../hooks/hook';
import { useGetMyFriendsQuery } from '../../redux/api/api';
import { toggleAddMember } from '../../redux/reducers/misc';
import UserItem from '../shared/UserItem';

const AddMemberDialog = ({AddMember,isLoadingAddMember,chatId}) => {

  const members=useGetMyFriendsQuery({chatId});
  const [selectedMembers,setSelectedMembers]=useState([]);

  const {isAddMember}=useSelector(state=>state.misc)
  const dispatch=useDispatch();


  const addFriendHandler=(_id)=>{
    setSelectedMembers((prev)=>prev.includes(_id)?prev.filter((i)=>i!==_id):([...prev,_id]));
  }

  const addMemberSubmitHandler=()=>{
    AddMember(selectedMembers);
    closeHandler();
  }

  const closeHandler=()=>{
    setSelectedMembers([]);
    dispatch(toggleAddMember(false));
  }

  useErrors([{isError:members.isError,error:members.error}])

  return (
    <Dialog open={isAddMember} onClose={closeHandler}>
      <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
        <Stack spacing={"1rem"}>
          {members.isLoading?<Skeleton/>:members.data.friends.length>0?members.data.friends.map((user, index) => (
            <UserItem user={user} handler={addFriendHandler} handlerIsLoading={isLoadingAddMember} key={index} addIcon={selectedMembers.includes(user._id)?false:true}/>
          )):<Typography textAlign={"center"}>No Friends</Typography>}
        </Stack>
        <Stack direction={"row"} justifyContent={"space-between"}>
          <Button variant={"outlined"} color='error' onClick={closeHandler}>Cancel</Button>
          <Button variant={"contained"} onClick={addMemberSubmitHandler} disabled={isLoadingAddMember}>Submit</Button>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default AddMemberDialog