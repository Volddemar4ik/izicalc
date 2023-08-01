import React, { useState, useEffect } from "react";
import { Box, Tooltip, Typography, Zoom, Badge, IconButton, Avatar, CircularProgress } from "@mui/material";
import { tooltipClasses } from '@mui/material/Tooltip';
import { Cancel } from "@mui/icons-material";
import { styled } from '@mui/material/styles';
import functions from "../../../functions";

const StyledBadge = styled(Badge)(() => ({
    '& .MuiBadge-badge': {
        right: -24,
        top: -8,
        padding: 0,
        backgroundColor: '#fff'
    },
}))

const StyledTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: '8px 24px',
        borderRadius: '8px'
    },
});

function FinalTooltipData({ renderTooltipData, investmentPeriod, delayTimerTooltip }) {
    const setCoinId = renderTooltipData?.id || 'bitcoin'
    const startInvestmentTime = renderTooltipData?.startTime
    const finishInvestmentTime = renderTooltipData?.time
    const renderInvestmentPeriod = functions.periodsBetweenTimestamps(startInvestmentTime, finishInvestmentTime, investmentPeriod)

    const finalTooltipCoinUrl = `/img/${setCoinId}.png`
    const finallTooltopCoinName = functions.capitalizeFirstLetter(setCoinId)
    const finalTooltipAmount = renderTooltipData?.amount.toFixed(renderTooltipData?.amount > 1000 ? 0 : 10)
    const finalTooltipBalance = renderTooltipData?.balance.toFixed(2)
    const finalTooltipInvestSum = renderTooltipData?.investSum.toFixed(2)
    const finalTooltipDiff = renderTooltipData?.diff.toFixed(2)

    return (
        <Box sx={{ position: 'relative' }}>
            <Box>
                <Typography align="center" variant="subtitle1" gutterBottom={true}>
                    {renderInvestmentPeriod}
                </Typography>
            </Box>

            <Box>
                <Typography align="center" variant="h5" gutterBottom={true}>
                    {`Profit: ${finalTooltipDiff}$`}
                </Typography>
            </Box>

            <Box display='flex'>
                <Box>
                    <Typography variant="subtitle2">
                        {'Coin: '}
                    </Typography>
                </Box>

                <Avatar
                    alt={setCoinId}
                    src={finalTooltipCoinUrl}
                    sx={{
                        width: '20px',
                        height: '20px',
                        display: 'inline-block',
                        marginLeft: '10px'
                    }}
                />

                <Box sx={{ marginLeft: '5px', minWidth: 0, maxWidth: '180px' }}>
                    <Typography noWrap variant="subtitle2">
                        {finallTooltopCoinName}
                    </Typography>
                </Box>
            </Box>

            <Box>
                <Typography variant="subtitle2">
                    {`Current balance: ${finalTooltipBalance}$`}
                </Typography>
            </Box>

            <Box>
                <Typography variant="subtitle2">
                    {`Investment: ${finalTooltipInvestSum}$`}
                </Typography>
            </Box>

            <Box>
                <Typography variant="subtitle2">
                    {`Coin amount: ${finalTooltipAmount}`}
                </Typography>
            </Box>

            <Box sx={{ position: 'absolute', bottom: '-8px', right: '-12px' }}>
                <CircularWithValueLabel delayTimerTooltip={delayTimerTooltip} />
            </Box>
        </Box>
    )
}

export default function FinalTooltip({ isOpenToolTip, setIsOpenToolTip, renderTooltipData, investmentPeriod, delayTimerTooltip }) {
    const handleCloseFinishTooltip = () => {
        setIsOpenToolTip(false)
    }

    const handleOpenFinishTooltip = () => {
        setIsOpenToolTip(true)
    }

    return (
        <StyledTooltip
            open={isOpenToolTip}
            onClose={handleCloseFinishTooltip}
            onOpen={handleOpenFinishTooltip}
            placement='bottom'
            TransitionComponent={Zoom}
            // disableHoverListener={true}
            title={
                <StyledBadge
                    overlap="rectangular"
                    variant='10px'
                    badgeContent={
                        <IconButton
                            title='Delete coin'
                            sx={{ padding: 0, color: '#ef5350', backgroundColor: '#fff' }}
                            onClick={handleCloseFinishTooltip}
                        >
                            <Cancel />
                        </IconButton>
                    }
                >
                    <FinalTooltipData
                        renderTooltipData={renderTooltipData}
                        investmentPeriod={investmentPeriod}
                        delayTimerTooltip={delayTimerTooltip}
                    />
                </StyledBadge>
            }
        >
            <Box sx={{ width: '100%', height: 0 }} />
        </StyledTooltip>
    )
}









function CircularProgressWithLabel({ progressCircle, progressValue }) {
    // const currentProgressValue = Math.round(progressValue / 1000)
    const currentProgressValue = Math.ceil(progressValue / 1000)
    const disableColor = 'rgba(196, 196, 196, 0.5)'
    const activeColor = '#fff'
    const currentTextColor = currentProgressValue > 0 ? activeColor : disableColor

    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `3.6px solid ${disableColor}`,
                    borderRadius: '50%'
                }}
            >
                <Typography variant="caption" component="div" color={currentTextColor}>
                    {`${currentProgressValue}s`}
                </Typography>
            </Box>
            <CircularProgress variant="determinate" color='inherit' size={30} value={progressCircle} />
        </Box>
    );
}

function CircularWithValueLabel({ delayTimerTooltip }) {
    const startProgressValue = 100
    const progressStep = 1
    const progressSlowdown = 0.95
    const progressTimeout = delayTimerTooltip / startProgressValue
    const [progressCircle, setProgressCircle] = useState(startProgressValue)
    const [progressValue, setProgresValue] = useState(delayTimerTooltip)

    useEffect(() => {
        const timer = setInterval(() => {
            setProgressCircle((prevProgress) => (prevProgress > 0 ? prevProgress - progressStep : 0))
            setProgresValue((prevProgressValue) => (prevProgressValue > 0 ? prevProgressValue - progressTimeout : 0))
        }, progressTimeout * progressSlowdown)
        return () => {
            clearInterval(timer)
        }
    }, [])

    return <CircularProgressWithLabel progressCircle={progressCircle} progressValue={progressValue} />
}