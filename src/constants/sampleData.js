export const sampleChats=[
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "Chat 1",
        _id: "1",
        groupChat: false,
        members: ["1", "2"]
    },
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "Chat 2",
        _id: "2",
        groupChat: false,
        members: ["1", "2"]
    }
]



export const sampleUsers=[
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "Chat 1",
        _id: "1",
    },
    {
        avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
        name: "Chat 2",
        _id: "2",
    }
]


export const sampleNotifications=[
    {
        sender:{
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            name: "Chat 1",
        },
        _id: "1",
    },
    {
        sender:{
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            name: "Chat 2",
        },
        _id: "2",
    }
]


export const sampleMessage=[
    {
        attachments:[
            {
                public_id:"asadsa",
                url:"https://www.w3schools.com/howto/img_avatar.png",
            }
        ],
        content:"Hello",
        _id:"edqwdwdwd",
        sender:{
            _id: "user._id",
            name: "Chaman",
        },
        chat: "chatId",
        createdAt: new Date(),
    },
    {
        attachments:[
            {
                public_id:"asadsa",
                url:"https://www.w3schools.com/howto/img_avatar.png",
            }
        ],
        content:"Hello 2",
        _id:"edqwdwdwd 2",
        sender:{
            _id: "xdscds",
            name: "Chaman 2",
        },
        chat: "chatId 2",
        createdAt: new Date(),
    }
]


export const dashboardData={
    users:[
        {
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            name: "Chat 1",
            _id: "1",
            username:"David",
            friends:20,
            groups:5
        }
    ],
    chats:[
        {
            avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
            name: "Chat 1",
            _id: "1",
            totalMembers:2,
            members:["https://www.w3schools.com/howto/img_avatar.png","https://www.w3schools.com/howto/img_avatar.png"],
            totalMessages:2,
            creator:{
                avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
                name: "Chat 1",
            }
        }
    ],
    messages:[
        {
            attachments:[
                {
                    public_id:"asadsa",
                    url:"https://www.w3schools.com/howto/img_avatar.png",
                }
            ],
            content:"Hello",
            _id:"edqwdwdwd",
            sender:{
                avatar:"https://www.w3schools.com/howto/img_avatar.png",
                name: "Chaman",
            },
            chat: "chatId",
            groupChat:false,
            createdAt: new Date(),
        }
    ]
}