import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../../Contexts/SocketContext'
import { UserContext } from '../../Contexts/UserContext';
import { StaticContext } from '../../Contexts/StaticContext';

function TargetDeathAnimation() {
    const [active, setActive] = useState(false);
    const {socket} = useContext(SocketContext);
    const {user, setUser, getAccessToken} = useContext(UserContext);
    const {api} = useContext(StaticContext);

    useEffect(()=>{
        if(socket === null) return;

        socket.on("death", ()=>{
            setActive(true);
        });
    },[]);

    const acceptDeath = async () => {
        if(socket === null) return;

        socket.emit("deathAccepted", {
            userDied:true
        });

        const token = await getAccessToken();
        const deadUser = await fetch(`${api}/users/${user.id}/all`,{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            }
        });

        setUser(await deadUser.json());
        setActive(false);
    }

    if(!active) return <></>;

    return (
        <Dialog
            open={active}
        >
            <DialogTitle>Du Dog!</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Du har dött och kommer inte kunna döda flera personer. Du kan däremot fortsätta att följa matchen genom statistiken och dina kompisar. Tack för att du var med!
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>acceptDeath()}>Ok</Button>
            </DialogActions>
        </Dialog>
    )
}

export default TargetDeathAnimation