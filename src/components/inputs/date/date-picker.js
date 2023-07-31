import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import useData from '../../../hook/use-data';
import configs from '../../../config';
import './style.scss'

const defautlDates = configs.dateShortcuts

export default function MainDatePicker({ handleBlur, handleFocus }) {
    const { requestData, setRequestData } = useData()
    const maxDate = dayjs()

    function handleChangeDate(newValue) {
        setRequestData(prevState => ({
            ...prevState,
            startTime: dayjs(newValue).valueOf()
        }))
    }

    // минимальная дата, которую отдает бек
    // Sun Apr 28 2013 03:00:00 GMT +0300(GMT +03:00)
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
                <DatePicker
                    maxDate={maxDate}
                    value={dayjs(requestData?.startTime)}
                    slotProps={{
                        textField: {
                            size: 'small',
                            onFocus: handleFocus,
                            onBlur: handleBlur
                        },
                        shortcuts: {
                            items: defautlDates
                        }
                    }}
                    onChange={handleChangeDate}
                />
            </DemoContainer>
        </LocalizationProvider>
    )
}