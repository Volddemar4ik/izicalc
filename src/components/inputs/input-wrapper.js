
import { Box, Typography } from '@mui/material';
import './style.scss'

export default function InputWrapper({ isOnFocused, helperText, startIcon, child }) {
    const isActive = `${isOnFocused ? '#42a5f5' : '#c4c4c4'}`
    const isActiveStartIconColor = `${isOnFocused ? '#FFF' : 'inherit'}`

    return (
        <Box
            className='input-wrapper'
        >
            <Typography
                variant='subtitle2'
                component='p'
                className='input-wrapper__helper-text'
            >
                {helperText}
            </Typography>

            <Box
                id='input-wrapper-field'
                className='input-wrapper__input-field'
                sx={{ border: `1px solid ${isActive}` }}
            >
                <Box
                    className='input-wrapper__start-icon'
                    sx={{
                        backgroundColor: isActive,
                        color: isActiveStartIconColor
                    }}
                >
                    {startIcon}
                </Box>

                {child}
            </Box>
        </Box >
    )
}