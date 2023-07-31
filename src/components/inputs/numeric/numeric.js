import { useState } from 'react';
import { Box, Chip, InputBase, Popover } from '@mui/material';
import configs from '../../../config';
import './style.scss'

const defaultNumeric = configs.numericShortcuts

export default function NumericInput({ requestData, setRequestData, numericInputWidth, handleBlur, handleFocus }) {
    const [anchorEl, setAnchorEl] = useState(false)

    const handleOpenPopover = (e) => {
        setAnchorEl(e.currentTarget)
    }
    const handleClosePopover = () => {
        setAnchorEl(null)
    }
    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    function handleIsChipActive(value) {
        setRequestData(prevState => ({
            ...prevState,
            investValue: value
        }))
        handleClosePopover()
    }

    const popoverWidth = `${numericInputWidth - 42}px`

    function handleChangeInvestValue(e) {
        setRequestData(prevState => ({
            ...prevState,
            investValue: e.target.value
        }))
    }

    function isActiveChip(item) {
        return (
            (item === requestData?.investValue) ? 'numeric-input-block_chosed_active' : undefined
        )
    }

    return (
        <>
            <InputBase
                className='numeric-input-block'
                type='number'
                inputProps={{
                    min: 0,
                    inputMode: 'numeric',
                    pattern: '[0-9]*'
                }}
                value={requestData?.investValue}
                onChange={handleChangeInvestValue}
                onClick={handleOpenPopover}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClosePopover}
                onFocus={handleFocus}
                onBlur={handleBlur}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Box
                    className='numeric-input-block__popover'
                    sx={{ width: popoverWidth }}
                >
                    {defaultNumeric?.map(item => (
                        <Chip
                            className={`numeric-input-block__chip ${isActiveChip(item?.investValue)}`}
                            key={item?.id}
                            label={item?.investValue}
                            onClick={() => handleIsChipActive(item?.investValue)}
                        />
                    ))}
                </Box>
            </Popover>
        </>
    )
}