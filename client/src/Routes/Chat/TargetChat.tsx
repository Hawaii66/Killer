import { IconButton, Typography, Divider, List, ListItem, Container, ListItemText, AppBar, Paper } from '@mui/material'
import React, {useContext, useEffect, useRef, useState} from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../Contexts/UserContext';
import { OpponentContext } from '../../Contexts/OpponentContext';
import {theme} from "../../ThemeProvider";
import StyledTextField from '../WaitForStart/StyledTextField';
import { width } from '@mui/system';
import ChatMessage from '../../Components/Chat/ChatMessage';
import { SocketContext } from '../../Contexts/SocketContext';
import { Chat } from '../../Interfaces/Chat';


function TargetChat() {
    const [loading, setLoading] = useState(true);
    const [text, setText] = useState("");

    const {target} = useContext(OpponentContext);
    const {user, getAccessToken} = useContext(UserContext);

    const [chat, setChat] = useState<Chat>({
        messages:[],
        target:target.id,
        hitman:user.id
    });

    const navigate = useNavigate();
    const {socket} = useContext(SocketContext);
    
    const scrollRef = useRef<HTMLLIElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollIntoView({behavior:"smooth"});
        }
    }, [scrollRef]);

    useEffect(()=>{
        if(socket === null) return;

        socket.on("chat", data => {
            setChat(prev => {
                return ({
                    hitman:prev.hitman,
                    target:prev.target,
                    messages:[...prev.messages, data]
                })
            })
        })
    },[]);

    useEffect(()=>{
        getChats()
    },[]);

    const getChats = async () => {
        const conversationResponse = await fetch(`http://localhost:5000/chat/get`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${await getAccessToken()}`
            },
            body:JSON.stringify({
                hitman:user.id,
                target:target.id,
                isHitman:true,
            })
        });

        setChat(await conversationResponse.json());
    }

    const sendChat = async () => {
        setChat(prev => {
            return({
                hitman:prev.hitman,
                target:prev.target,
                messages:[...prev.messages, {
                    date:Date.now(),
                    id:"",
                    sender:user.id,
                    text:text
                }]
            })
        });
        setText("");

        await fetch(`http://localhost:5000/chat/add`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${await getAccessToken()}`
            },
            body:JSON.stringify({
                hitman:user.id,
                target:target.id,
                isHitman:true,
                text:text
            })
        });
    }

    return (
        <div style={{
			display:"flex",
			flexDirection:"column",
			alignItems:"center",
            maxHeight:"100vh"
		}}>
            <div
                style={{
                    position:"sticky",
                    display:"flex",
                    justifyContent:"flex-start",
                    marginTop:"1rem",
                    marginBottom:"0.5rem",
                    width:"100%",
                    flexGrow:9
                }}
            >
                <IconButton sx={{paddingLeft:"1rem",width:"48px",height:"48px"}} onClick={()=>navigate("/")}>
                    <CancelIcon fontSize='large'/>
                </IconButton>
                <div style={{
                    paddingLeft:"1rem",
                    width:"auto"
                }}>
                    <Typography variant="h4" noWrap>{target.forename} {target.lastname}</Typography>
                    <Typography variant="h5">{target.group}</Typography>
                </div>
            </div>
            <Container sx={{flexGrow:1,maxHeight: "auto", overflow: 'auto',backgroundColor:`#${theme.palette.background.default}`}}>
                <List>
                    {chat.messages.map(message => {
                        return <ChatMessage 
                            chat={message}
                            initials={target.forename[0] + target.lastname[0]}
                            key={message.id}
                        />
                    })}
                    <ListItem ref={scrollRef}></ListItem>
                </List>
            </Container>
            <div style={{
                paddingBottom:"1rem",
                paddingTop:"1rem",
                flexGrow:900,
                display:"flex",
                flexDirection:"row",
                width:"90%",
                alignItems:"center",
            }}>
                <div style={{
                    flexGrow:100,
                }}>
                    <StyledTextField
                        width="100%"
                        helper=''
                        label='Chat'
                        placeHolder='Skriv här...'
                        setText={(t)=>setText(t)}
                        text={text}
                        disabled={false}
                    />
                </div>
                <div>
			<div style={{marginTop:"7%",width:"1px",height:"1px"}} />
                <IconButton sx={{paddingLeft:"1rem",width:"48px",height:"48px",paddingBottom:"0px"}} onClick={()=>sendChat()}>
                    <SendIcon color="primary" fontSize='large'/>
                </IconButton>
                <Typography fontWeight={700} color={theme.palette.primary.main} sx={{marginLeft:"0.5rem"}}>Skicka</Typography>
                </div>
            </div>
        </div>
    )
}

export default TargetChat

function Array(arg0: number) {
    throw new Error('Function not implemented.');
}
