import dayjs from "dayjs"
const defaulStartDate = dayjs().subtract(5, 'year').valueOf()
const today = dayjs()

const configs = {
    referencePointsOnChart: {
        mobile: 31,
        desktop: 100
    },
    coinsLoadingLength: 15,
    defaultRequestData: {
        id: '',
        investValue: 100,
        startTime: defaulStartDate,
        period: 'M'
    },
    screenMarkPoint: 765,
    numericShortcuts: [
        {
            id: 0,
            investValue: 100,
        },
        {
            id: 1,
            investValue: 200,
        },
        {
            id: 2,
            investValue: 500,
        },
        {
            id: 3,
            investValue: 1000,
        },
        {
            id: 4,
            investValue: 5000,
        },
        {
            id: 5,
            investValue: 10000,
        },
    ],
    selectShortcuts: [
        {
            id: 0,
            period: '',
            value: 'Without investment'
        },
        {
            id: 1,
            period: 'd',
            value: 'Day'
        },
        {
            id: 2,
            period: 'w',
            value: 'Week'
        },
        {
            id: 3,
            period: 'M',
            value: 'Month'
        },
        {
            id: 4,
            period: 'y',
            value: 'Year'
        },
    ],
    dateShortcuts: [
        {
            label: "3 months",
            getValue: () => {
                return today.subtract(3, 'month')
            },
        },
        {
            label: "6 months",
            getValue: () => {
                return today.subtract(6, 'month')
            },
        },
        {
            label: "3 years",
            getValue: () => {
                return today.subtract(3, 'year')
            },
        },
        {
            label: "4 years",
            getValue: () => {
                return today.subtract(4, 'year')
            },
        },
        {
            label: "5 years",
            getValue: () => {
                return today.subtract(5, 'year')
            },
        },
        {
            label: "Max",
            getValue: () => {
                return today.set('year', 2013).set('month', 0).set('date', 1)
            },
        },
    ]
}

export default configs