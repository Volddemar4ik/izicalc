import { Box } from "@mui/material";
import Header from "./header";
import Footer from "./footer";
import Main from "./main";

export default function Layouts() {

    return (
        <Box className='wrapper container'>
            <Header />
            <Main />
            <Footer />
        </Box>
    )
}