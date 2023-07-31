// import { useState, useEffect } from "react";
// import { Box, Tooltip, Typography, Zoom, Badge, IconButton, Avatar } from "@mui/material";
// import { tooltipClasses } from '@mui/material/Tooltip';
// import { Cancel } from "@mui/icons-material";
// import { styled } from '@mui/material/styles';
// import functions from "../../../functions";

// const StyledBadge = styled(Badge)(() => ({
//     '& .MuiBadge-badge': {
//         right: -24,
//         top: -8,
//         padding: 0,
//         backgroundColor: '#fff'
//     },
// }))

// const StyledTooltip = styled(({ className, ...props }) => (
//     <Tooltip {...props} classes={{ popper: className }} />
// ))({
//     [`& .${tooltipClasses.tooltip}`]: {
//         backgroundColor: 'rgba(0,0,0,0.5)',
//         padding: '8px 24px',
//         borderRadius: '8px'
//     },
// });

// function FinalTooltipData({ renderTooltipData, investmentPeriod }) {
//     const setCoinId = renderTooltipData?.id || 'bitcoin'
//     const startInvestmentTime = renderTooltipData.startTime
//     const finishInvestmentTime = renderTooltipData.time
//     const renderInvestmentPeriod = functions.periodsBetweenTimestamps(startInvestmentTime, finishInvestmentTime, investmentPeriod)

//     const finalTooltipCoinUrl = `/img/${setCoinId}.png`
//     const finallTooltopCoinName = functions.capitalizeFirstLetter(setCoinId)
//     const finalTooltipAmount = renderTooltipData?.amount.toFixed(renderTooltipData?.amount > 1000 ? 0 : 10)
//     const finalTooltipBalance = renderTooltipData?.balance.toFixed(2)
//     const finalTooltipInvestSum = renderTooltipData?.investSum.toFixed(2)
//     const finalTooltipDiff = renderTooltipData?.diff.toFixed(2)

//     return (
//         <Box>
//             <Box>
//                 <Typography align="center" variant="subtitle1" gutterBottom={true}>
//                     {renderInvestmentPeriod}
//                 </Typography>
//             </Box>

//             <Box>
//                 <Typography align="center" variant="h5" gutterBottom={true}>
//                     {`Profit, $: ${finalTooltipDiff}`}
//                 </Typography>
//             </Box>

//             <Box display='flex'>
//                 <Box>
//                     <Typography variant="subtitle2">
//                         {'Coin: '}
//                     </Typography>
//                 </Box>

//                 <Avatar
//                     alt={setCoinId}
//                     src={finalTooltipCoinUrl}
//                     sx={{
//                         width: '20px',
//                         height: '20px',
//                         display: 'inline-block',
//                         marginLeft: '10px'
//                     }}
//                 />

//                 <Box sx={{ marginLeft: '5px', minWidth: 0, maxWidth: '180px' }}>
//                     <Typography noWrap variant="subtitle2">
//                         {finallTooltopCoinName}
//                     </Typography>
//                 </Box>
//             </Box>

//             <Box>
//                 <Typography variant="subtitle2">
//                     {`Current balance, $: ${finalTooltipBalance}`}
//                 </Typography>
//             </Box>

//             <Box>
//                 <Typography variant="subtitle2">
//                     {`Investment, $: ${finalTooltipInvestSum}`}
//                 </Typography>
//             </Box>

//             <Box>
//                 <Typography variant="subtitle2">
//                     {`Coin amount: ${finalTooltipAmount}`}
//                 </Typography>
//             </Box>
//         </Box>
//     )
// }

// export default function FinalTooltip({ isOpenToolTip, setIsOpenTooltip, renderTooltipData, investmentPeriod }) {
//     const handleClose = () => {
//         setIsOpenTooltip(false)
//         console.log('close')
//     }

//     const handleOpen = () => {
//         setIsOpenTooltip(true)
//         console.log('open')
//     }

//     return (
//         <StyledTooltip
//             open={isOpenToolTip}
//             // onClose={handleClose}
//             // onOpen={handleOpen}
//             placement="bottom"
//             TransitionComponent={Zoom}
//             // disableFocusListener
//             // disableHoverListener
//             // disableTouchListener
//             // disableInteractive
//             title={
//                 <StyledBadge
//                     overlap="rectangular"
//                     variant='10px'
//                     badgeContent={
//                         <IconButton
//                             title='Delete coin'
//                             sx={{ padding: 0, color: '#ef5350', backgroundColor: '#fff' }}
//                             onClick={handleClose}
//                         >
//                             <Cancel />
//                         </IconButton>
//                     }
//                 >
//                     <FinalTooltipData
//                         renderTooltipData={renderTooltipData}
//                         investmentPeriod={investmentPeriod}
//                     />
//                 </StyledBadge>
//             }
//         >
//             <Box sx={{ width: '100%', height: 0 }} />
//         </StyledTooltip>
//     )
// }
import React, { useState, useEffect, useRef } from "react";
import { Box, Tooltip, Typography, Zoom, Badge, IconButton, Avatar, Button } from "@mui/material";
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

function FinalTooltipData({ renderTooltipData, investmentPeriod }) {
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
        <Box>
            <Box>
                <Typography align="center" variant="subtitle1" gutterBottom={true}>
                    {renderInvestmentPeriod}
                </Typography>
            </Box>

            <Box>
                <Typography align="center" variant="h5" gutterBottom={true}>
                    {`Profit, $: ${finalTooltipDiff}`}
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
                    {`Current balance, $: ${finalTooltipBalance}`}
                </Typography>
            </Box>

            <Box>
                <Typography variant="subtitle2">
                    {`Investment, $: ${finalTooltipInvestSum}`}
                </Typography>
            </Box>

            <Box>
                <Typography variant="subtitle2">
                    {`Coin amount: ${finalTooltipAmount}`}
                </Typography>
            </Box>
        </Box>
    )
}

export default function FinalTooltip({ isOpenToolTip, setIsOpenToolTip, renderTooltipData, investmentPeriod }) {
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
                    />
                </StyledBadge>
            }
        >
            <Box sx={{ width: '100%', height: 0 }} onBlur={() => console.log('blur')} />
        </StyledTooltip>
    )
}
