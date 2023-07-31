// import { KeyboardReturn } from "@mui/icons-material";
import { investmentDataRequest, allCoinsLIstRequest } from "./requests";
import configs from "./config";

const functions = {
    capitalize:
        function capitalize(word) {
            return word.toUpperCase()
        },

    capitalizeFirstLetter: function capitalizeFirstLetter(word) {
        return word.charAt(0).toUpperCase() + word.slice(1)
    },

    endpointCreator:
        function endpointCreator(obj) {
            const values = Object.entries(obj)
                .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
                .join('&');

            return values
        },

    rounded: function rounded(number) {
        const decimalPlaces = 2

        return parseFloat(number.toFixed(decimalPlaces))
    },

    filterDataForGraph: function filterDataForGraph(data, width, n = 10) {
        const result = []
        const isDataArrayOfOneDay = (data?.length - 2) || 1
        const screenMarkPoint = configs.screenMarkPoint
        const numberOfPoints = width < screenMarkPoint
            ? n.mobile
            : n.desktop
        const stepLength = Math.ceil(isDataArrayOfOneDay / (numberOfPoints - 2))

        if (data && data?.length !== 0) {
            result.push(data[0])

            for (let i = stepLength; i < data.length - 1; i += stepLength) {
                result.push(data[i])
            }

            result.push(data[data?.length - 1])

            result.forEach(item => {
                item.diff = item.balance - item.investSum
            })

            return result
        }
        return null
    },

    getInvestmentData: async function getInvestmentData(data) {
        const endpoint = this.endpointCreator(data)

        try {
            const investmentData = await investmentDataRequest(endpoint)

            if (investmentData?.length !== 0) {
                return investmentData
            }

            return []
        }
        catch (error) {
            console.error('Error fetching investment data:', error)
            return []
        }
    },
    getAllCoinsList: async function getAllCoinsList(endpoint) {
        try {
            const allCoinsList = await allCoinsLIstRequest(endpoint)

            if (allCoinsList) {
                return allCoinsList
            }

            return []
        }
        catch (error) {
            console.log('Error fetching all coins list data: ', error)
            return []
        }
    },
    getMinMaxForChart: function getMinMaxForChart(data) {
        let minValue = data[0].diff;
        let maxValue = data[0].diff;

        data.forEach(item => {
            minValue = Math.min(minValue, item.diff, item.investSum, item.balance)
            maxValue = Math.max(maxValue, item.diff, item.investSum, item.balance)
        })

        const roundedMinValue = this.roundNumber(minValue)
        const roundedMaxValue = this.roundNumber(maxValue)

        return [roundedMinValue, roundedMaxValue];
    },
    shortenNumber: function formatNumber(number) {
        if (number >= 1000000000) {
            return `$ ${(number / 1000000000).toFixed(1)}B`;
        } else if (number >= 1000000) {
            return `$ ${(number / 1000000).toFixed(1)}M`;
        } else if (number >= 1000) {
            return `$ ${(number / 1000).toFixed(1)}K`;
        } else {
            return `$ ${number.toLocaleString()}`;
        }
    },
    isValidUrl: function isValidUrl(url, coinsList, setter = undefined) {
        coinsList.forEach(coin => {
            if (coin?.id === url && coin?.default !== true) {
                setter(coin)
            }
        })
    },
    roundNumber: function roundNumber(number) {
        const roundingLimit = 100
        function rounding(number, roundingLimit) {
            return Math.ceil(number / roundingLimit) * roundingLimit
        }

        if (number >= 0) {
            return rounding(number, roundingLimit)
        } else {
            return (rounding(number, (-roundingLimit)))
        }
    },
    getBarColor: function getBarColor(value) {
        return value < 0 ? '#ef5350' : '#4caf50'
    },
    periodsBetweenTimestamps: function periodsBetweenTimestamps(startTimestamp, finishTimestamp, period) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const start = new Date(startTimestamp)
        const finish = new Date(finishTimestamp)

        const startYear = start.getFullYear()
        const startMonth = start.getMonth()
        const finishYear = finish.getFullYear()
        const finishMonth = finish.getMonth()

        const timeDiff = finishTimestamp - startTimestamp
        const yearDiff = finishYear - startYear
        const monthDiff = finishMonth - startMonth

        const purchaseDate = `${start.getDate()} ${months[start.getMonth()]} ${start.getFullYear()}`
        const totalPeriodInMonth = yearDiff * 12 + monthDiff
        function timestampToDays(timestamp) {
            return Math.floor(timestamp / (24 * 60 * 60 * 1000))
        }

        switch (period) {
            case 'd':
                return `Investment results for ${timestampToDays(timeDiff)} days:`
            case 'M':
                return `Investment results for ${totalPeriodInMonth} months:`
            case 'y':
                return `Investment results for ${yearDiff} years:`
            default:
                return `Purchase date: ${purchaseDate}`
        }
    }
}

export default functions

