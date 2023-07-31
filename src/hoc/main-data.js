import React, { useState } from "react";
import { createContext } from "react";
import { useMediaQuery } from "@mui/material";
import configs from "../config";
export const MainData = createContext(null)

export default function MainDataProvider({ children }) {
    const isMobile = useMediaQuery('(max-width: 767px)')
    const [downloadData, setDownloadData] = useState(null)
    const [requestData, setRequestData] = useState(configs.defaultRequestData)
    const value = { downloadData, setDownloadData, requestData, setRequestData, isMobile }
    // console.log('MainData', downloadData)
    // console.log('RequestData', requestData)
    // console.log('isMobile', isMobile)

    return (
        <MainData.Provider value={value}>
            {children}
        </MainData.Provider>
    )
}