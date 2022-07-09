import { configDB } from "./Database";

type ChangeStartTimeType = (time:string) => Promise<void>;
type GetStartTimeType = () => Promise<void>;

export const ChangeStartTime:ChangeStartTimeType = async (time) => {
    await configDB.findOneAndUpdate({},{
        $set:{
            startTime:time
        }
    });
}

export const GetStartTime:GetStartTimeType = async () => {
    const data = await configDB.findOne();
    return data.startTime;
}