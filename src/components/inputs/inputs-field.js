import { useState, useEffect } from 'react'
import useData from '../../hook/use-data'
import { Box, Button } from "@mui/material"
import { AttachMoney, Addchart, CalendarMonth, Cached } from "@mui/icons-material"
import NumericInput from "./numeric/numeric"
import SelectInput from './select/select'
import MainDatePicker from './date/date-picker'
import InputWrapper from './input-wrapper'
import './style.scss'
import CustomCheckbox from './checkbox/checkbox'

export default function InputsField({ setAllowSendingRequestsOnMobile, isChartAnimated, handleChangeChartAnimation }) {
    const { requestData, setRequestData, isMobile } = useData()
    const [numericInputWidth, setNumericInputWidth] = useState(0)

    const [isNumericInputOnFocused, setIsNumericInputOnFocused] = useState(false)
    const handleNumericInputFocus = () => setIsNumericInputOnFocused(true)
    const handleNumericInputBlur = () => setIsNumericInputOnFocused(false)

    const [isSelectInputOnFocused, setIsSelectInputOnFocused] = useState(false)
    const handleSelectInputFocus = () => setIsSelectInputOnFocused(true)
    const handleSelectInputBlur = () => setIsSelectInputOnFocused(false)

    const [isDateInputOnFocused, setIsDateInputOnFocused] = useState(false)
    const handleDateInputFocus = () => setIsDateInputOnFocused(true)
    const handleDateInputBlur = () => setIsDateInputOnFocused(false)

    useEffect(() => {
        const handleResize = () => {
            const numericInputWidth = document?.getElementById('input-wrapper-field').offsetWidth
            setNumericInputWidth(numericInputWidth)
        }
        handleResize()
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    function handleSendRequest() {
        setAllowSendingRequestsOnMobile(true)
    }

    return (
        <Box className='inputs'>
            <Box className='inputs__item-container inputs__numeric-input'>
                <InputWrapper
                    isOnFocused={isNumericInputOnFocused}
                    helperText={'Initial Investment'}
                    startIcon={< AttachMoney />}
                    child={
                        <NumericInput
                            requestData={requestData}
                            setRequestData={setRequestData}
                            numericInputWidth={numericInputWidth}
                            handleFocus={handleNumericInputFocus}
                            handleBlur={handleNumericInputBlur}
                        />
                    }
                />
            </Box>

            <Box className='inputs__item-container inputs__select-input'>
                <InputWrapper
                    isOnFocused={isSelectInputOnFocused}
                    helperText={'Additional Contribution'}
                    startIcon={< Addchart />}
                    child={
                        <SelectInput
                            requestData={requestData}
                            setRequestData={setRequestData}
                            handleFocus={handleSelectInputFocus}
                            handleBlur={handleSelectInputBlur}
                        />
                    }
                />
            </Box>


            <Box className='inputs__item-container inputs__date-input'>
                <InputWrapper
                    isOnFocused={isDateInputOnFocused}
                    helperText={'Years to Grow'}
                    startIcon={< CalendarMonth />}
                    child={
                        <MainDatePicker
                            handleFocus={handleDateInputFocus}
                            handleBlur={handleDateInputBlur}
                        />
                    }
                />
            </Box>

            <Box className='inputs__item-container inputs__checkbox-input'>
                <CustomCheckbox
                    labelText='Enable chart animation'
                    checked={isChartAnimated}
                    onChange={handleChangeChartAnimation}
                />
            </Box>

            {isMobile &&
                <Box className='inputs__item-container inputs__button'>
                    <Button variant="contained"
                        startIcon={
                            <Cached className='confirm-button__start-icon' />
                        }
                        className='confirm-button'
                        onClick={handleSendRequest}
                    >
                        Update
                    </Button >
                </Box>
            }
        </Box >
    )
}