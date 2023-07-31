import { AppBar, Toolbar, Typography, Avatar } from '@mui/material';
import './style.scss'

export default function Header() {

    return (
        <AppBar className='header container'>
            <Toolbar className='header-container'>
                <Avatar
                    className='header-container__logo'
                    variant='square'
                    alt='Crypto investment calculator'
                    title='Crypto investment calculator'
                    src='/img/logo.png'
                    component='a'
                    href='/'
                />

                <Typography
                    className='header-container__text'
                    variant="h6"
                    component='p'
                    noWrap
                >
                    Crypto Calc
                </Typography>
            </Toolbar>
        </AppBar>
    )
}