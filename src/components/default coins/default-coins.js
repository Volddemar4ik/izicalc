
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { List, ListItem, ListItemButton, ListItemText, ListItemAvatar, Avatar, Badge, IconButton, Typography } from "@mui/material";
import { AttachMoney, Cancel } from '@mui/icons-material';
import coinsListJson from '../../defaults/coinsList.json'
import useData from "../../hook/use-data";
import CoinSearch from "./coins-search.js";
import { styled } from '@mui/material/styles';
import './style.scss'
import functions from '../../functions';

const StyledBadge = styled(Badge)(() => ({
    '& .MuiBadge-badge': {
        right: 3,
        top: 3,
        padding: 0,
        backgroundColor: '#fff'
    },
}))

export default function DefaultCoins() {
    const { requestData, setRequestData } = useData()
    const navigate = useNavigate()
    const params = useParams()
    const [addedCoin, setAddedCoin] = useState(null)
    const [showBadge, setShowBadge] = useState(true)

    useEffect(() => {
        if (addedCoin?.id) {
            handlerCoinSelect(addedCoin)
        }
    }, [addedCoin])

    useEffect(() => {
        addedCoin?.id === requestData?.id
            ? setShowBadge(false)
            : setShowBadge(true)
    }, [addedCoin, requestData])

    useEffect(() => {
        functions.isValidUrl(params?.id, coinsListJson, setAddedCoin)
    }, [params])

    function handleDisabledIconBlock(coinId) {
        return (coinId && requestData?.id !== coinId && requestData?.id !== ''
            ? 'coins-list__coin-block_chosen_disabled'
            : '')
    }

    function handlerCoinSelect(coin) {
        if (coin?.id) {
            navigate(`/${coin?.id}`)
        }
    }

    function handleResetAddedCoin() {
        setRequestData(prevState => ({
            ...prevState,
            id: ''
        }))
        setAddedCoin(null)
    }

    function coinWithoutAvatar(id) {
        if (!id) {
            return 'coins-list__coin-avatar_disabled_main'
        }
        return
    }

    function isAddedCoinUrl(url) {
        if (url) {
            return `/img/${url}`
        }
        return
    }

    return (
        <List className='coins-list'>
            {coinsListJson?.map((coin) => (
                coin?.default &&
                <ListItem
                    key={coin?.id}
                    className={`coins-list__coin-block ${handleDisabledIconBlock(coin?.id)}`}
                    sx={{ order: coin?.order }}
                >
                    <ListItemButton
                        className='coins-list__coin-block-button'
                        onClick={() => handlerCoinSelect(coin)}
                    >
                        <ListItemAvatar className='coins-list__coin-avatar-block'>
                            <Avatar
                                variant="circular"
                                className={`coins-list__coin-avatar ${coinWithoutAvatar(coin?.url)}`}
                                title={coin?.name}
                                alt={coin?.name}
                                src={`/img/${coin?.url}`}
                            >
                                <AttachMoney sx={{ backgroundColor: '#42a5f5' }} />
                            </Avatar>
                        </ListItemAvatar>

                        <ListItemText className='coins-list__coin-text-block'>
                            <Typography className='coins-list__coin-text' variant='body1'>
                                {functions.capitalize(coin?.symbol)}
                            </Typography>
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
            ))}

            <ListItem
                className={`coins-list__coin-block ${handleDisabledIconBlock(addedCoin?.id)} `}
                sx={{ order: 1 }}
            >
                <StyledBadge
                    overlap="rectangular"
                    invisible={!addedCoin || showBadge}
                    variant='10px'
                    badgeContent={
                        <IconButton
                            title='Delete coin'
                            size="small"
                            sx={{ padding: 0, color: '#ef5350' }}
                            onClick={handleResetAddedCoin}
                        >
                            <Cancel fontSize="small" />
                        </IconButton>
                    }
                >
                    {addedCoin
                        ? <ListItemButton
                            className='coins-list__coin-block-button'
                            onClick={() => handlerCoinSelect(addedCoin)}
                        >
                            <ListItemAvatar className='coins-list__coin-avatar-block'>
                                <Avatar
                                    className={`coins-list__coin-avatar ${coinWithoutAvatar(addedCoin?.url)}`}
                                    title={addedCoin?.name}
                                    alt={addedCoin?.name}
                                    src={isAddedCoinUrl(addedCoin?.url)}
                                />
                            </ListItemAvatar>

                            <ListItemText className='coins-list__coin-text-block'>
                                <Typography className='coins-list__coin-text' variant='body1'>
                                    {addedCoin?.symbol.toUpperCase()}
                                </Typography>
                            </ListItemText>
                        </ListItemButton>
                        : <CoinSearch setAddedCoin={setAddedCoin} />
                    }
                </StyledBadge>
            </ListItem >
        </ List >
    )
}