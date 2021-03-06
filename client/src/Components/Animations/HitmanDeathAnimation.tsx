import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { DefaultTarget, OpponentContext } from '../../Contexts/OpponentContext';
import { SocketContext } from '../../Contexts/SocketContext'
import { StaticContext } from '../../Contexts/StaticContext';
import { UserContext } from '../../Contexts/UserContext';
import { ITarget } from '../../Interfaces/Opponent';

function HitmanDeathAnimation() {
    const [active, setActive] = useState(false);
    const [nextTarget, setNextTarget] = useState(DefaultTarget);

    const {socket} = useContext(SocketContext);
    const {setTarget} = useContext(OpponentContext);
    const {user, setUser, getAccessToken} = useContext(UserContext);
    const {api} = useContext(StaticContext);

    useEffect(()=>{
        if(socket === null) return;

        socket.on("hitmanSuccess", (data)=>{
            const target:ITarget = {
                forename:data.nextTarget.firstName,
                lastname:data.nextTarget.lastName,
                group:data.nextTarget.group,
                type:data.nextTarget.type,
                id:data.nextTarget.id
            };
            setNextTarget(target);
            setTarget(target);
            setActive(true);
        });
    },[]);

    const acceptDeath = async () => {
        if(socket === null) return;

        socket.emit("deathAccepted", {
            userDied:false
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
            <DialogTitle>Du Lyckades med mordet!</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Du har lyckats med ditt mord. Hitta ditt n??sta offer nu och forts??tt p?? din v??g mot vinsten!
                </DialogContentText>
                <br/>
                <DialogContentText>
                    Ditt n??sta offer ??r: <br/>
                    Namn: {nextTarget.forename} {nextTarget.lastname} <br/>
                    Klass: {nextTarget.group} <br/>
                    <br/>
                    Lycka Till!
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>acceptDeath()}>Ok</Button>
            </DialogActions>
        </Dialog>
    )
}

export default HitmanDeathAnimation