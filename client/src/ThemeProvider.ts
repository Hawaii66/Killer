import { createTheme } from "@mui/material";
import { blue, orange, red } from "@mui/material/colors";

export const theme = createTheme({
    palette:{
        primary:{
            main:"#A10035"
        },
        secondary:{
            main:"#CB3B3B"
        },
        error:{
            main:red[900]
        }
    },
    typography:{
        h1:{
            fontWeight:600
        },
        h5:{
            fontWeight:500,

        },
        body2:{
            fontSize:"1.2rem"
        }
    }
});