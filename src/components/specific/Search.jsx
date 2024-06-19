import { useInputValidation } from "6pp";
import SearchIcon from "@mui/icons-material/Search";
import { Dialog, DialogTitle, InputAdornment, List, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncMutation } from "../../hooks/hook";
import { useLazySearchUsersQuery, useSendFriendRequestMutation } from "../../redux/api/api";
import { toggleSearch } from "../../redux/reducers/misc";
import UserItem from "../shared/UserItem";


const Search = () => {
  const dispatch=useDispatch();

  const search=useInputValidation("");
  const [users,setUsers]=useState([]);

  const [searchUser]=useLazySearchUsersQuery()
  const [sendFriendRequest,handlerIsLoading]=useAsyncMutation(useSendFriendRequestMutation);

  const {isSearch}=useSelector(state=>state.misc)

  const searchCloseHandler=()=>{
    dispatch(toggleSearch(false))
  }

  const friendRequestHandler=async(id)=>{
    await sendFriendRequest("Sending Friend Request",{userId:id})
  }

  useEffect(() => {
    const timeoutId=setTimeout(()=>{
      searchUser(search.value).then(({data})=>setUsers(data.users)).catch((e)=>console.log(e));
    },1000)

    return ()=>clearTimeout(timeoutId)
  }, [search.value,searchUser])
  

  return (
    <Dialog open={isSearch} onClose={searchCloseHandler}>
      <Stack p={"2rem"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment:(
              <InputAdornment position="start">
                <SearchIcon/>
              </InputAdornment>
            )
          }}
        />

          <List>
            {users.map((user)=>(
              <UserItem key={user._id} user={user} handler={friendRequestHandler} handlerIsLoading={handlerIsLoading}/>
            ))}
          </List>

      </Stack>
    </Dialog>
  );
}

export default Search