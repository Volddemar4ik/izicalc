import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import './style.scss'

export default function Main() {
    return (
        <main className='main container'>
            <Box className='main-container'>
                <Outlet />
            </Box>
        </main >
    )
}