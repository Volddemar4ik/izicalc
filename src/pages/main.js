import React, { useEffect, useState, useRef, useMemo } from "react";
import { useParams } from "react-router-dom";
import HelmetMetatags from "./helmet";
import { Box, Typography, Paper, Divider, Avatar } from "@mui/material";
import ProgressBars from "../components/progress-bar";
import DefaultCoins from "../components/default coins/default-coins";
import InputsField from "../components/inputs/inputs-field";
import ChartWrapper from "../components/chart/chart-wrapper";
import Instruction from "../components/instruction";
import functions from "../functions";
import configs from "../config";
import useData from "../hook/use-data";
import './style.scss'

export default function Mainpage() {
    const params = useParams()
    const mainpageRef = useRef(null)
    const [allowSendingRequestsOnMobile, setAllowSendingRequestsOnMobile] = useState(false)
    const [chartContainerWidth, setChartContainerWidth] = useState(null)
    const [isDownload, setIsDownload] = useState(false)
    const [filterData, setFilterData] = useState(null)
    const [filterDataKey, setFilterDataKey] = useState(0)
    const [isChartAnimated, setIsChartAnimated] = useState(true)
    const [metatagsData, setMetatagsData] = useState({ name: '', url: '' })
    const { downloadData, setDownloadData, requestData, setRequestData, isMobile } = useData()
    const coinId = params?.id
    const referencePointsOnChart = configs.referencePointsOnChart


    // отслеживание урла для метатегов и изменения данных запроса по урлу
    useEffect(() => {
        setRequestData(prevState => ({
            ...prevState,
            id: coinId || 'bitcoin'
        }))

        setAllowSendingRequestsOnMobile(true)

        const dataForMetatags = coinId
            ? functions.capitalizeFirstLetter(coinId)
            : 'Profit'

        const urlArray = (window.location.href).split('/')
        const canonicalUrl = urlArray[urlArray.length - 1] === 'bitcoin'
            ? '/'
            : window.location.href

        setMetatagsData({
            name: dataForMetatags,
            url: canonicalUrl
        })
    }, [coinId, setRequestData])

    // отслеживание изменения данных запроса и отправка его при определенных условиях
    async function request(dataForRequest, setter) {
        const result = await functions.getInvestmentData(dataForRequest)
        setter(result)
    }

    useEffect(() => {
        if (requestData?.id !== '') {
            if (!isMobile) {
                setFilterData(null)
                request(requestData, setDownloadData)
            }
            if (isMobile && allowSendingRequestsOnMobile) {
                setFilterData(null)
                request(requestData, setDownloadData)
                setAllowSendingRequestsOnMobile(false)
            }
        }
    }, [requestData, isMobile, allowSendingRequestsOnMobile, setDownloadData])

    // отслеживание ширин экрана
    useEffect(() => {
        function handleResize() {
            if (mainpageRef.current) {
                const width = mainpageRef.current.offsetWidth
                setChartContainerWidth(width)
            }
        }
        handleResize()

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    // фильтрация данных для графика
    const memoizedFilterData = useMemo(() => {
        return functions.filterDataForGraph(downloadData, chartContainerWidth, referencePointsOnChart)
    }, [downloadData, chartContainerWidth, referencePointsOnChart])

    useEffect(() => {
        // setFilterData(memoizedFilterData)
        // setIsDownload(memoizedFilterData ? true : false)
        // setFilterDataKey(prevKey => prevKey + 1)
        setFilterData(memoizedFilterData)
        setIsDownload(true)
        setFilterDataKey(prevKey => prevKey + 1)
        // if (memoizedFilterData) {
        //     setFilterData(memoizedFilterData)
        //     setIsDownload(memoizedFilterData ? true : false)
        //     setFilterDataKey(prevKey => prevKey + 1)
        // }
    }, [memoizedFilterData])

    // переписовка графика при включении/отключении секбокса
    useEffect(() => {
        if (!isMobile) {
            setFilterDataKey(prevKey => prevKey + 1)
        }
        if (isMobile && allowSendingRequestsOnMobile) {
            setFilterDataKey(prevKey => prevKey + 1)
        }
    }, [isChartAnimated, isMobile, allowSendingRequestsOnMobile])

    // влючение / отключение анимации графика
    function handleChangeChartAnimation(event) {
        setIsChartAnimated(event.target.checked);
    }

    return (
        <Paper className='mainpage' ref={mainpageRef} elevation={3}>
            <HelmetMetatags metatagsData={metatagsData} />

            <Box className='mainpage__header mainpage__item-container'>
                <Typography
                    variant="h1"
                    className='mainpage__header-text'
                >
                    {`${metatagsData.name} crypto calculator`}
                </Typography>
            </Box>

            <Box className='mainpage__coins mainpage__item-container'>
                <DefaultCoins />
            </Box>

            <Box className='mainpage__inputs mainpage__item-container'>
                <InputsField
                    setAllowSendingRequestsOnMobile={setAllowSendingRequestsOnMobile}
                    isChartAnimated={isChartAnimated}
                    handleChangeChartAnimation={handleChangeChartAnimation}
                />
            </Box>

            {/* {isDownload
                ? <Box className='mainpage__graph mainpage__item-container'>
                    <ChartWrapper
                        data={filterData}
                        coinId={coinId}
                        updateKey={filterDataKey}
                        width={chartContainerWidth}
                        height='77vh'
                        isChartAnimated={isChartAnimated}
                    />
                </Box>
                : <Box
                    className='mainpage__graph mainpage__item-container mainpage__progress-bar-container'
                    sx={{
                        width: chartContainerWidth,
                        height: '77vh'
                    }}
                >
                    <ProgressBars />
                </Box>
            } */}
            {isDownload && downloadData
                ? <React.Fragment>
                    {downloadData?.length !== 0
                        ? <Box className='mainpage__graph mainpage__item-container'>
                            <ChartWrapper
                                data={filterData}
                                coinId={coinId}
                                updateKey={filterDataKey}
                                width={chartContainerWidth}
                                height='77vh'
                                isChartAnimated={isChartAnimated}
                            />
                        </Box>
                        : <Box
                            className='mainpage__graph mainpage__item-container mainpage__not-found-container'
                            sx={{
                                width: chartContainerWidth,
                                height: '77vh',
                                padding: '60px',
                                backgroundColor: 'rgba(196, 196, 196, 0.2)',
                            }}
                        >
                            <Avatar
                                alt="Information not found"
                                src='/not-found.png'
                                sx={{ width: '100px', height: '100px' }}
                            />

                            <Typography variant='body1' component='p' fontSize='1.5em' textAlign='center'>
                                Information about the coin not found
                            </Typography>
                        </Box>
                    }
                </React.Fragment>
                : <Box
                    className='mainpage__graph mainpage__item-container mainpage__progress-bar-container'
                    sx={{
                        width: chartContainerWidth,
                        height: '77vh'
                    }}
                >
                    <ProgressBars />
                </Box>
            }

            <Box className='mainpage__instruction mainpage__item-container'>
                <Divider variant="middle" />

                <Instruction isMobile={isMobile} />
            </Box>
        </Paper>
    )
}


