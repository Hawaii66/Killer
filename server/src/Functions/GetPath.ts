const path = require("path");
export const GetPath = (dir:string) => path.resolve(__dirname + "../../../" + dir);