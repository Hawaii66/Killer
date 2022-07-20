import { Chat, Message } from "../../../Shared/Chat";
import { chatDB, GetRandomID, userDB } from "./Database";
import { BulkWriteOperationType } from "./User";

type CreateChatType = (hitman:string, target:string) => Promise<Chat>;
type GetConversationType = (hitman:string,target:string) => Promise<Chat|null>;
type AddChatType = (hitman:string, target:string, isHitman:boolean, text:string) => Promise<Message>;
type GenerateChatsType = () => Promise<void>;

export const GetConversation:GetConversationType = async (hitman, target) => {
    var chat:Chat|null = await chatDB.findOne({
        hitman:hitman,
        target:target
    });
    if(chat === null) return null;

    return chat;
}

export const CreateChat:CreateChatType = async (hitman, target) => {
    const chat:Chat = {
        hitman,
        target,
        messages:[]
    };

    await chatDB.insert(chat);
    return chat;
}

export const AddChat:AddChatType = async (hitman, target, isHitman, text) => {
    const message:Message = {
        date:Date.now(),
        id:GetRandomID("chat"),
        sender:isHitman ? hitman : target,
        text:text
    };
    
    chatDB.findOneAndUpdate({
        hitman,
        target
    },{
        $addToSet:{
            messages:message
        }
    });

    return message;
}

export const GenerateChats:GenerateChatsType = async () => {
    var ops:BulkGenerateChats[] = [];
    const users = await userDB.find();
    users.forEach((user,index) => {
        if(!user.alive) return;

        ops.push({
            insertOne:{
                document:{
                    hitman:user.id,
                    target:user.target,
                    messages:[]
                }
            }
        });
    });

    await chatDB.drop();
    await chatDB.bulkWrite(ops);
}

export type BulkGenerateChats = {
    insertOne:{
        document:Chat
    }
}