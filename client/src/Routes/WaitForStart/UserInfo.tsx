import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, SxProps, Typography, Container } from '@mui/material';
import React, { useContext } from 'react'
import { UserContext } from '../../Contexts/UserContext';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { DefaultUser } from '../../Interfaces/User';

interface Props {
    show:boolean,
    setShow:(state:boolean)=>void
}

const dialog:SxProps = {
}

const dialogTitle:SxProps = {
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-around"
}

const center = {
    marginTop:"1rem",
    width:"100%",
    display:"flex",
    justifyContent:"center"
}

const username:SxProps = {
    textDecorationStyle:"solid",
    textDecorationColor:"white",
    textDecorationWidth:"1px",
    textDecorationLine:"underline"
}

function UserInfo({show,setShow}:Props) {
    const {user, setUser} = useContext(UserContext);
  
    return (
        <Dialog 
            sx={dialog} 
            open={show} 
            onClose={()=>setShow(false)}
            PaperProps={{
                style:{backgroundColor:"#1B2430",width:"80%"}
            }}
        >
            <DialogTitle sx={dialogTitle}>
                <Typography noWrap variant="h5" color="white" sx={username}>{user.forename + " " + user.lastname}</Typography>
                <IconButton color="primary" onClick={()=>setShow(false)} aria-label="close">
                    <CloseRoundedIcon fontSize="medium"/>
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <DialogContentText color="white" variant="h6" component="p">{user.email}</DialogContentText>
                <DialogContentText color="white" variant="h6" component="p">{user.phone}</DialogContentText>
                <Container sx={center}>
                    <Button onClick={()=>{setShow(false);setUser(DefaultUser);}} variant="contained" color="primary">Logga ut</Button>
                </Container>
            </DialogContent>
        </Dialog>
    )
}

export default UserInfo