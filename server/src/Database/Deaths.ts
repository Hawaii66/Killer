import { Death } from "../../../Shared/Death";
import { deathDB, userDB } from "./Database";

type CreateDeathType = (userID:string,otherID:string,userDied:boolean) => Promise<Death>;
type CheckExistsType = (userID:string, userDied:boolean) => Promise<Death | null>;
type GetDeathType = (userID:string, otherID:string) => Promise<Death | null>;
type AddUserType = (userID:string, otherID:string, userDied:boolean) => Promise<void>;

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
        tVerified: userDied
    }

    await deathDB.insert(death);
    return death;
}

export const GetDeath:GetDeathType = async (userID, otherID) => {
    var death = deathDB.findOne({hitman:userID, target:otherID});
    if(death !== null) return death;

    death = deathDB.findOne({hitman:otherID, target:userID});
    if(death !== null) return death;

    return null;
}

export const AddUser:AddUserType = async (userID, otherID, userDied) => {
    var death = await GetDeath(userID, otherID);
    if(death === null) return;

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
}