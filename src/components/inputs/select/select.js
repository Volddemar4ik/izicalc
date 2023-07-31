import { useState } from 'react';
import { MenuItem, FormControl, Select, } from '@mui/material';
import configs from '../../../config';
import './style.scss'

const defaultSelect = configs.selectShortcuts

export default function SelectInput({ requestData, setRequestData, handleBlur, handleFocus }) {
    const [period, setPeriod] = useState(requestData?.period)
    function handleChange(e) {
        setPeriod(e.target.value)
        setRequestData(prevState => ({
            ...prevState,
            period: e.target.value
        }))
    }

    return (
        <FormControl
            variant='standard'
            className='select-block'
        >
            <Select
                className='select-block__select-form'
                value={period}
                onChange={handleChange}
                displayEmpty
                onFocus={handleFocus}
                onBlur={handleBlur}
            >
                {defaultSelect?.map(menuItem => (
                    <MenuItem
                        key={menuItem?.id}
                        value={menuItem?.period}
                    >
                        {menuItem?.value}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}