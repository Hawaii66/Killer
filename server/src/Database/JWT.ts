import { tokenDB } from "./Database";

type AddTokenType = (token:string) => Promise<void>;
type RemoveTokenType = (token:string) => Promise<void>;
type HasTokenType = (token:string) => Promise<boolean>;

export const AddToken:AddTokenType = async (token) => {
    if(await HasToken(token)) return;

    await tokenDB.insert({token:token});
}

export const RemoveToken:RemoveTokenType = async (token) => {
    await tokenDB.findOneAndDelete({token:token});
}

export const HasToken:HasTokenType = async (token) => {
    const dbToken = await tokenDB.findOne({token:token});
    return dbToken !== null && dbToken !== "";
}