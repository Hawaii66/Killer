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
        },
        background:{
            default:"1B2430"
        },
        info:{
            main:"#243558"
        },
        text:{
            primary:"#b2bec3"
        }
    },
    typography:{
        h1:{
            fontWeight:800,
            color:"#A10035"
        },
        h3:{
            fontWeight:600
        },
        h4:{
            fontWeight:600
        },
        h5:{
            fontWeight:500,

        },
        body2:{
            fontSize:"1.2rem"
        }
    },
    components:{
        MuiSpeedDialAction:{
            styleOverrides:{
                staticTooltipLabel:{
                    backgroundColor:"transparent",
                    boxShadow:"none",
                    color:"#fff",
                    fontSize:"1.5rem",
                    textAlign:"right"
                }
            }
        }
    }
});