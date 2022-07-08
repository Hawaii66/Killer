import { KillerType } from "../../../Shared/User";

export function NumberToKillerType(number:number)
{
    switch(number)
    {
        case 0:
            return KillerType.Normal;
        case 1:
            return KillerType.Hardcore;
        case 2:
            return KillerType.Camper;
        case 3:
            return KillerType.Osynlig;
        default:
            return KillerType.Normal;
    }
}