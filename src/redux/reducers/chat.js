import { createSlice } from "@reduxjs/toolkit";
import { getOrSaveNewMessagesAlert } from "../../lib/features";
import { NEW_MESSAGE_ALERT } from "../../constants/events";


const initialState={
    notificationsCount:0,
    newMessagesAlert:getOrSaveNewMessagesAlert({key:NEW_MESSAGE_ALERT,get:true})||[]
}


const chatSlice=createSlice({
    name:"chat",
    initialState,
    reducers:{
        incrementNotification:(state)=>{
            state.notificationsCount++;
        },
        resetNotification:(state)=>{
            state.notificationsCount=0;
        },
        setNewMessagesAlert:(state,action)=>{
            const index=state.newMessagesAlert.findIndex((i)=>i.chatId===action.payload);

            if(index!=-1){
                state.newMessagesAlert[index].count+=1;
            }
            else{
                state.newMessagesAlert.push({chatId:action.payload,count:1});
            }
        },
        removeNewMessagesAlert:(state,action)=>{
            state.newMessagesAlert=state.newMessagesAlert.filter((i)=>i.chatId!==action.payload);
        }
    }
})

export default chatSlice;
export const {
  incrementNotification,
  resetNotification,
  setNewMessagesAlert,
  removeNewMessagesAlert
} = chatSlice.actions;