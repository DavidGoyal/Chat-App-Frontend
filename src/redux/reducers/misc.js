import { createSlice } from "@reduxjs/toolkit";


const initialState={
    isNewGroup:false,
    isAddMember:false,
    isNotification:false,
    isMobileMenuFriend:false,
    isSearch:false,
    isFileMenu:false,
    isDeleteMenu:false,
    uploadingLoader:false,
    selectedDeleteChat:{
        chatsId:"",
        groupChat:false
    }
}


const miscSlice=createSlice({
    name:"misc",
    initialState,
    reducers:{
        toggleNewGroup:(state,action)=>{
            state.isNewGroup=action.payload;
        },
        toggleAddMember:(state,action)=>{
            state.isAddMember=action.payload;
        },
        toggleNotification:(state,action)=>{
            state.isNotification=action.payload;
        },
        toggleMobileMenuFriend:(state,action)=>{
            state.isMobileMenuFriend=action.payload;
        },
        toggleSearch:(state,action)=>{
            state.isSearch=action.payload;
        },
        toggleFileMenu:(state,action)=>{
            state.isFileMenu=action.payload;
        },
        toggleDeleteMenu:(state,action)=>{
            state.isDeleteMenu=action.payload;
        },
        toggleUploadingLoader:(state,action)=>{
            state.uploadingLoader=action.payload;
        },
        setSelectedDeleteChat:(state,action)=>{
            state.selectedDeleteChat=action.payload;
        }
    }
})

export default miscSlice;
export const {
  toggleNewGroup,
  toggleAddMember,
  toggleDeleteMenu,
  toggleFileMenu,
  toggleMobileMenuFriend,
  toggleNotification,
  toggleSearch,
  toggleUploadingLoader,
  setSelectedDeleteChat,
} = miscSlice.actions;