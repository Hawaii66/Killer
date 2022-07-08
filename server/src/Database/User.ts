import { DefaultUser, KillerType, User } from "../../../Shared/User";
import { GetRandomID, userDB } from "./Database";
import { faker } from "@faker-js/faker";

type GetAllUsersType = () => Promise<User[]>;
type AddRandomUserType = () => Promise<User>;
type UpdateUserCircleType = (users:User[]) => Promise<void>;
type RegisterUserType = (user:User) => Promise<User>;
type GetUserType = (key:string, access:AccessType) => Promise<User>;

export enum AccessType {
    EMAIL,
    ID
}
type BulkWriteOperationType = {
    updateOne:{
        filter:{
            id:string
        },
        update:{
            $set:{
                target:string,
                hitman:string,
                alive:true,
                kills:number
            }
        },
        upsert:boolean
    }
}

export const GetUser:GetUserType = async (key:string, access:AccessType) => {
    var user:User|null = null;
    switch(access)
    {
        case AccessType.EMAIL:
            user = await userDB.findOne({email:key});
            if (user === null) break;
            return user;
        case AccessType.ID:
            user = await userDB.findOne({id:key});
            if (user === null) break;
            return user;
        default:
            return DefaultUser;
    }

    return DefaultUser;
}

export const RegisterUser:RegisterUserType = async (user) => {
    const writeUser:User = {
        alive:false,
        group:user.group,
        email:user.email,
        forename:user.forename,
        hitman:"",
        id:GetRandomID("user"),
        kills:0,
        lastname:user.lastname,
        password:user.password,
        phone:user.phone,
        target:"",
        type:user.type,
        year:user.year
    };

    const dbUser:User = await userDB.insert(writeUser);
    return dbUser;
}

export const UpdateUserCircle:UpdateUserCircleType = async (users) => {
    const ops: BulkWriteOperationType[] =[];

    if(users.length === 0){return;}

    users.forEach(user => {
        ops.push({
            updateOne:{
                filter:{id:user.id},
                update:{
                    $set: {
                        target:user.target,
                        hitman:user.hitman,
                        alive:true,
                        kills:0
                    }
                },
                upsert:false
            }
        });
    });

    userDB.bulkWrite(ops, {ordered:false});
}

export const GetAllUsers:GetAllUsersType = async () => {
    const allUsers:User[] = await userDB.find();
    return allUsers;
}

export const AddRandomUser:AddRandomUserType = async () => {
    const randomName = faker.name.findName();
    const randomEmail = faker.internet.email();

    const user:User = {
        alive:true,
        group:"Na21B",
        email:randomEmail,
        forename:randomName.split(" ")[0],
        hitman:"",
        id:GetRandomID("user"),
        kills:0,
        lastname:randomName.split(" ")[1],
        password:"PASSWORD",
        phone:faker.phone.number("+46 ## ### ####"),
        target:"",
        type:KillerType.Normal,
        year:1
    };

    const dbUser:User = await userDB.insert(user);
    return dbUser;
}
