import * as React from 'react'
import { styled } from '@mui/material/styles'
import { Checkbox, FormGroup, FormControlLabel, Typography } from '@mui/material'
import { Check } from '@mui/icons-material'

const MainIcon = styled('span')({
    width: 16,
    height: 16,
    borderRadius: '4px',
    border: '1px solid #c4c4c4',
})

const checkedIconStyle = {
    width: 16,
    height: 16,
    borderRadius: '4px',
    border: '1px solid #42a5f5',
    backgroundColor: '#42a5f5',
    color: '#fff',
}

export default function CustomCheckbox({ labelText, checked, onChange }) {
    return (
        <FormGroup>
            <FormControlLabel
                label={
                    <Typography
                        variant='subtitle2'
                        component='p'
                        className='input-wrapper__helper-text inputs-wrapper__helper-text_checkbox-text'
                    >
                        {labelText}
                    </Typography>
                }
                control={
                    <Checkbox
                        disableRipple
                        checkedIcon={
                            <Check sx={checkedIconStyle} />
                        }
                        icon={< MainIcon />}
                        checked={checked}
                        onChange={onChange}
                    />
                }
            />
        </FormGroup>
    )
}