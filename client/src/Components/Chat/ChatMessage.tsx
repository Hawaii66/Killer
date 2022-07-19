import { ListItem, Button, Badge, Avatar, Typography, ListItemText } from '@mui/material'
import React, { useContext } from 'react'
import { UserContext } from '../../Contexts/UserContext'
import { Chat, Message } from '../../Interfaces/Chat'

interface Props
{
    chat:Message,
    initials:string
}

function ChatMessage({chat, initials}:Props) {
    const {user} = useContext(UserContext);

    const isSender = user.id === chat.sender;

    return (
        <ListItem
            sx={{
                paddingLeft:"0rem",
                marginBottom:"0.5rem",
                marginRight:isSender ? "0rem" : "",
                marginLeft:isSender ? "auto" : "",
                width:isSender ? "80%" : "80%"
            }}
        >
            {!isSender && <Avatar
                sx={{
                    width:28,
                    height:28,
                    marginRight:"1rem"
                }}
            >
                <Typography color="#243558" variant="h6" fontSize={16} fontWeight={600}>{initials}</Typography>
            </Avatar>}
            <ListItemText
                sx={{
                    borderColor:"#00000055",
                    borderWidth:"2px",
                    borderStyle:"solid",
                    borderRadius:"0.4rem",
                    padding:"0.2rem"
                }}
            >{chat.text}</ListItemText>
        </ListItem>
    )
}

export default ChatMessage