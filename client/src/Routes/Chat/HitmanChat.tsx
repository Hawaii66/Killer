import { IconButton, Typography, Divider, List, ListItem, Container, ListItemText, AppBar, Paper, CircularProgress } from '@mui/material'
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
import { StaticContext } from '../../Contexts/StaticContext';


function HitmanChat() {
    const [loading, setLoading] = useState(true);
    const [text, setText] = useState("");

    const {hitman} = useContext(OpponentContext);
    const {user, getAccessToken} = useContext(UserContext);

    const [chat, setChat] = useState<Chat>({
        messages:[],
        target:user.id,
        hitman:hitman.id
    });

    const navigate = useNavigate();
    const {socket} = useContext(SocketContext);
    const {api} = useContext(StaticContext);
    
    const scrollRef = useRef<HTMLLIElement>(null);

    const scrollToBottom = () => {
        setTimeout(()=>{
            if (scrollRef.current) {
                scrollRef.current.scrollIntoView({behavior:"smooth"});
            }
        },100)
    }

    useEffect(() => {
        scrollToBottom();
    }, [scrollRef]);

    useEffect(()=>{
        if(socket === null) return;

        socket.on("chat", data => {
            console.log("Chat message received");
            setChat(prev => {
                if(prev.messages.every(message=>message.id === data.id)) return prev;
                return ({
                    hitman:prev.hitman,
                    target:prev.target,
                    messages:[...prev.messages, data]
                })
            })
            scrollToBottom()
        })

        return(()=>{
            if(socket === null) return;
            socket.removeListener("chat")
        })
    },[]);

    useEffect(()=>{
        getChats()
    },[]);

    useEffect(()=>{
		if(user.id === "")
		{
			navigate("/login");
		}
	},[user]);

    const getChats = async () => {
        const conversationResponse = await fetch(`${api}/chat/get`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${await getAccessToken()}`
            },
            body:JSON.stringify({
                hitman:hitman.id,
                target:user.id,
                isHitman:false,
            })
        });

        setChat(await conversationResponse.json());
        setLoading(false);
        scrollToBottom()
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
        scrollToBottom()

        await fetch(`${api}/chat/add`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${await getAccessToken()}`
            },
            body:JSON.stringify({
                hitman:hitman.id,
                target:user.id,
                isHitman:false,
                text:text
            })
        });
    }

    return (
        <div style={{
			display:"flex",
			flexDirection:"column",
			alignItems:"center",
            maxHeight:"100vh",
            height:"100vh"
		}}>
            <div
                style={{
                    position:"sticky",
                    display:"flex",
                    justifyContent:"flex-start",
                    marginTop:"1rem",
                    marginBottom:"0.5rem",
                    width:"100%",
                    flexGrow:9,
                    maxHeight:"6rem"
                }}
            >
                <IconButton sx={{paddingLeft:"1rem",width:"48px",height:"48px"}} onClick={()=>navigate("/")}>
                    <CancelIcon fontSize='large'/>
                </IconButton>
                <div style={{
                    paddingLeft:"1rem",
                    width:"auto"
                }}>
                    <Typography variant="h4" noWrap>Din Mördare</Typography>
                    <Typography variant="h5">Klass: ??</Typography>
                </div>
            </div>
            <Container sx={{flexGrow:1,maxHeight: "auto", overflow: 'auto',backgroundColor:`#${theme.palette.background.default}`}}>
                {
                    loading ? 
                        <div style={{
                            display:"flex",
                            justifyContent:"center",
                            alignItems:"center",
                            height:"20rem"
                        }}>
                            <CircularProgress color="primary" size={80} thickness={8}/>
                        </div>
                    : 
                        <List>
                        {chat.messages.map(message => {
                            return <ChatMessage 
                                chat={message}
                                initials="??"
                                key={message.id}
                            />
                        })}
                        <ListItem ref={scrollRef}></ListItem>
                    </List>
                }
                
            </Container>
            {!loading &&
                <div style={{
                    paddingBottom:"1rem",
                    paddingTop:"1rem",
                    flexGrow:900,
                    display:"flex",
                    flexDirection:"row",
                    width:"90%",
                    alignItems:"center",
                    justifySelf:"flex-end",
                    height:"6rem",
                    maxHeight:"6rem"
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
            }
        </div>
    )
}

export default HitmanChat