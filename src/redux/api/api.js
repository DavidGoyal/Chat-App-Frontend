import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {server} from "../../constants/config"



const api=createApi({
    reducerPath:"myApi",
    baseQuery:fetchBaseQuery({baseUrl:`${server}/api/v1/`}),
    tagTypes:["Chat","User"],
    endpoints:(builder)=>({
        myChats:builder.query({
            query:()=>({
                url:"chat/my",
                method:"GET",
                credentials:"include"
            }),
            keepUnusedDataFor:0
        }),

        searchUsers:builder.query({
            query:(name)=>({
                url:`user/search?name=${name}`,
                method:"GET",
                credentials:"include"
            }),
            providesTags:["User"]
        }),

        getNotifications:builder.query({
            query:()=>({
                url:`request/notifications`,
                method:"GET",
                credentials:"include"
            }),
            keepUnusedDataFor:0
        }),

        getChatDetails:builder.query({
            query:({chatId,populate=false})=>{
                let url=`chat/${chatId}`;
                if(populate) url+=`?populate=true`

                return {
                    url:url,
                    method:"GET",
                    credentials:"include",
                }
            },
            providesTags:["Chat"]
        }),


        getMyMessages:builder.query({
            query:({chatId,page})=>{
                let url=`message/${chatId}?page=${page}`;

                return {
                    url:url,
                    method:"GET",
                    credentials:"include",
                }
            },
            keepUnusedDataFor:0
        }),

        getMyGroups:builder.query({
            query:()=>({
                url:`chat/my/groups`,
                method:"GET",
                credentials:"include"
            }),
            providesTags:["Chat"]
        }),

        getMyFriends:builder.query({
            query:({chatId})=>{
                let url=`user/friends`;
                if(chatId) url+=`?chatId=${chatId}`

                return {
                    url:url,
                    method:"GET",
                    credentials:"include",
                }
            },
            providesTags:["Chat"]
        }),

        sendFriendRequest:builder.mutation({
            query:(data)=>({
                url:`request/send`,
                method:"PUT",
                credentials:"include",
                body:data
            }),
            invalidatesTags:["User"]
        }),

        acceptFriendRequest:builder.mutation({
            query:(data)=>({
                url:`request/accept`,
                method:"PUT",
                credentials:"include",
                body:data
            }),
            invalidatesTags:["Chat"]
        }),

        sendAttachments:builder.mutation({
            query:(data)=>({
                url:`message/attachments`,
                method:"POST",
                credentials:"include",
                body:data
            }),
        }),

        createGroup:builder.mutation({
            query:(data)=>({
                url:`chat/new`,
                method:"POST",
                credentials:"include",
                body:data
            }),
            invalidatesTags:["Chat"]
        }),

        renameGroup:builder.mutation({
            query:({id,name})=>({
                url:`chat/${id}`,
                method:"PUT",
                credentials:"include",
                body:{name}
            }),
            invalidatesTags:["Chat"]
        }),

        removeGroupMember:builder.mutation({
            query:(data)=>({
                url:`chat/removemember`,
                method:"PUT",
                credentials:"include",
                body:data
            }),
            invalidatesTags:["Chat"]
        }),

        addGroupMembers:builder.mutation({
            query:(data)=>({
                url:`chat/addmembers`,
                method:"PUT",
                credentials:"include",
                body:data
            }),
            invalidatesTags:["Chat"]
        }),

        deleteChat:builder.mutation({
            query:(chatId)=>({
                url:`chat/${chatId}`,
                method:"DELETE",
                credentials:"include",
            }),
            invalidatesTags:["Chat"]
        }),

        leaveGroup:builder.mutation({
            query:(chatId)=>({
                url:`chat/leave/${chatId}`,
                method:"DELETE",
                credentials:"include",
            }),
            invalidatesTags:["Chat"]
        }),

        adminLogin:builder.mutation({
            query:(secretKey)=>({
                url:`admin/login`,
                method:"POST",
                credentials:"include",
                body:secretKey
            }),
            invalidatesTags:["User"]
        }),

        adminLogout:builder.query({
            query:()=>({
                url:`admin/logout`,
                method:"GET",
                credentials:"include"
            }),
            providesTags:["User"]
        }),

        adminStats:builder.query({
            query:()=>({
                url:`admin/dashboard`,
                method:"GET",
                credentials:"include"
            }),
            providesTags:["User"]
        }),

        adminUsers:builder.query({
            query:()=>({
                url:`admin/users`,
                method:"GET",
                credentials:"include"
            }),
            providesTags:["User"]
        }),

        adminChats:builder.query({
            query:()=>({
                url:`admin/chats`,
                method:"GET",
                credentials:"include"
            }),
            providesTags:["Chat"]
        }),

        adminMessages:builder.query({
            query:()=>({
                url:`admin/messages`,
                method:"GET",
                credentials:"include"
            }),
            keepUnusedDataFor:0
        }),

    })
})



export default api;
export const {
  useMyChatsQuery,
  useLazySearchUsersQuery,
  useGetNotificationsQuery,
  useSendFriendRequestMutation,
  useAcceptFriendRequestMutation,
  useGetChatDetailsQuery,
  useGetMyMessagesQuery,
  useSendAttachmentsMutation,
  useGetMyGroupsQuery,
  useGetMyFriendsQuery,
  useCreateGroupMutation,
  useRenameGroupMutation,
  useRemoveGroupMemberMutation,
  useAddGroupMembersMutation,
  useDeleteChatMutation,
  useLeaveGroupMutation,
  useAdminLoginMutation,
  useLazyAdminLogoutQuery,
  useAdminStatsQuery,
  useAdminUsersQuery,
  useAdminChatsQuery,
  useAdminMessagesQuery,
} = api;