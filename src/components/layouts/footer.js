import { Typography, Box } from '@mui/material'
import './style.scss'

export default function Footer() {
    return (
        <footer className='footer container'>
            <Box className='footer-container'>
                <Typography className='footer__text' variant='body2' component='p'>
                    @ 2023 All rights reserved
                </Typography>
            </Box>
        </footer>
    )
}