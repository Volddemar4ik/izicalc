import React, { useEffect, useRef, useState } from "react";
import ChartRender from "./chart";
import { Box } from "@mui/material";
import useData from "../../hook/use-data";
import FinalTooltip from "./tooltip/final-tooltip"
import configs from "../../config";

export default function ChartWrapper({ data, updateKey, width, height, isChartAnimated }) {
    const { requestData } = useData()
    const delayTimerTooltip = configs.delayTimerTooltip
    const coinId = requestData.id
    const investmentPeriod = requestData.period
    const [isOpenToolTip, setIsOpenToolTip] = useState(false)
    const [renderTooltipData, setRenderTooltipData] = useState(null)

    useEffect(() => {
        if (data) {
            setRenderTooltipData({
                ...data[data?.length - 1],
                id: coinId,
                startTime: data[0].time
            })
        }
    }, [data, coinId])

    useEffect(() => {
        let timeoutId
        if (isOpenToolTip) {
            timeoutId = setTimeout(() => {
                setIsOpenToolTip(false)
            }, delayTimerTooltip + 100)
        }

        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
        }
    }, [isOpenToolTip])

    useEffect(() => {
        setIsOpenToolTip(false)
    }, [updateKey])

    return (
        <React.Fragment>
            {width &&
                <React.Fragment>
                    <FinalTooltip
                        isOpenToolTip={isOpenToolTip}
                        setIsOpenToolTip={setIsOpenToolTip}
                        renderTooltipData={renderTooltipData}
                        investmentPeriod={investmentPeriod}
                        delayTimerTooltip={delayTimerTooltip}
                    />

                    <Box
                        className='outer'
                        sx={{
                            width: width,
                            height: height
                        }}
                    >
                        {data &&
                            <ChartRender
                                key={updateKey}
                                data={data}
                                width={width}
                                height={height}
                                isChartAnimated={isChartAnimated}
                                setIsOpenTooltip={setIsOpenToolTip}
                            />
                        }
                    </Box>
                </React.Fragment>
            }
        </React.Fragment>
    )
}
