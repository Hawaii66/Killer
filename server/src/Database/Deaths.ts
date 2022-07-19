import GetRandomPin from "../Utils/Pin";
import { Death } from "../../../Shared/Death";
import { chatDB, deathDB, userDB } from "./Database";
import { GetUserTarget } from "./User";

type CreateDeathType = (userID:string,otherID:string,userDied:boolean) => Promise<Death>;
type CheckExistsType = (userID:string, userDied:boolean) => Promise<Death | null>;
type GetDeathType = (userID:string, otherID:string) => Promise<Death | null>;
type GetUserDeathsType = (userID:string) => Promise<{
    target:Death|null,
    hitman:Death|null
}>;
type AddUserType = (userID:string, otherID:string, userDied:boolean) => Promise<boolean>;
type ConfirmDeathType = (userID:string, otherID:string) => Promise<Death|null>;
type AcceptDeathType = (userID:string, userDied:boolean) => Promise<void>;

export const CheckExists:CheckExistsType = async (userID, userDied) => {
    if(userDied)
    {
        const hasTarget:Death = await deathDB.findOne({
            target:userID
        });
        return hasTarget
    }
    
    const hasHitman:Death = await deathDB.findOne({
        hitman:userID
    });
    return hasHitman;
}

export const CreateDeath:CreateDeathType = async (userID,otherID,userDied) => {
    const death:Death = {
        hitman: userDied ? otherID : userID,
        target: userDied ? userID : otherID,
        hNotification:false,
        tNotification:false,
        hVerified: !userDied,
        tVerified: userDied,
        murderTime:Date.now()
    }

    await deathDB.insert(death);
    return death;
}

export const GetDeath:GetDeathType = async (userID, otherID) => {
    var death = await deathDB.findOne({hitman:userID, target:otherID});
    if(death !== null) return death;

    death = await deathDB.findOne({hitman:otherID, target:userID});
    if(death !== null) return death;

    return null;
}

export const GetUserDeaths:GetUserDeathsType = async (userID) => {
    const deaths:Death[] = await deathDB.find();
    var target:Death|null = null;
    var hitman:Death|null = null;
    for(var i = 0; i < deaths.length; i ++)
    {
        if(deaths[i].hitman === userID) hitman = deaths[i];
        if(deaths[i].target === userID) target = deaths[i];
    }

    return {
        target,
        hitman
    }
}

export const AddUser:AddUserType = async (userID, otherID, userDied) => {
    var death = await GetDeath(userID, otherID);
    if(death === null) return false;

    if(userDied && death.hitman === otherID)
    {
        death.tVerified = true;
        death.target = userID;
    }

    if(!userDied && death.target === otherID)
    {
        death.hVerified = true;
        death.hitman = userID;
    }

    await deathDB.findOneAndUpdate({
        hitman:userDied ? otherID : userID,
        target:userDied ? userID : otherID
    },{
        $set:death
    });

    return true;
}

export const ConfirmDeath:ConfirmDeathType = async (userID, otherID) => {
    const death = await GetDeath(userID, otherID);
    if(death === null) return null;

    const target = death.target;
    await userDB.findOneAndUpdate({
        id:target
    },{
        $set:{
            alive:false,
        }
    });

    const newTarget = await GetUserTarget(target);
    await userDB.findOneAndUpdate({
        id:newTarget.id
    },{
        $set:{
            hitman:death.hitman
        }
    })

    const hitman = death.hitman;
    await userDB.findOneAndUpdate({
        id:hitman
    },{
        $set:{
            target:(await GetUserTarget(target)).id,
            pin:GetRandomPin()
        },
        $inc:{
            kills: 1
        }
    });

    await chatDB.remove({
        hitman:death.hitman,
        target:death.target
    });
    await chatDB.insert({
        hitman:hitman,
        target:newTarget.id,
        messages:[]
    });

    return death;
}

export const AcceptDeath:AcceptDeathType = async (userID, userDied) => {
    if(userDied)
    {
        await deathDB.findOneAndUpdate({
            target:userID,
        },{
            $set:{
                tNotification:true
            }
        })
    }
    else
    {
        await deathDB.findOneAndUpdate({
            hitman:userID
        },{
            $set:{
                hNotification:true
            }
        })
    }
}