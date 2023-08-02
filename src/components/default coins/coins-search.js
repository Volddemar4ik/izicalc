import React, { useState, useEffect, useRef } from 'react';
import { Box, Avatar, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Backdrop, Modal, Fade, IconButton, ListSubheader, TextField, InputAdornment, Typography, Zoom, Fab } from '@mui/material';
import { CurrencyExchange, Cancel, Search, KeyboardArrowUp } from '@mui/icons-material';
import functions from '../../functions';
import coinsListJson from '../../defaults/coinsList.json'
import { styled } from '@mui/material/styles';
import configs from '../../config';
// import { useTheme } from '@mui/material/styles';
import './style.scss'
import ProgressBars from '../progress-bar';
import { useParams } from 'react-router-dom';
import useData from '../../hook/use-data';

const StyledTextField = styled(TextField)(() => ({
    '& .MuiOutlinedInput-input': {
        padding: '5px 18px',
        paddingLeft: 0,
    },
}))

function SearchInput({ setSearchText, searchText }) {
    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current.focus()
    }, [inputRef.current])

    function handleSearchText(e) {
        const inputValue = e.target.value;
        setSearchText(inputValue);
    }

    return (
        <StyledTextField
            ref={inputRef}
            placeholder='Search...'
            onChange={handleSearchText}
            value={searchText}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <Search />
                    </InputAdornment>
                ),
            }}
            sx={{
                width: '100%',
                marginLeft: '-6px'
            }}
        />
    )
}

export default function CoinSearch({ setAddedCoin }) {
    const { setRequestData } = useData()
    const modalRef = useRef(null)
    const params = useParams()
    const [openModal, setOpenModal] = useState(false)
    const [coinsList, setCoinsList] = useState(null)
    const [coinsRenderedList, setCoinsRenderedList] = useState(null)
    const [coinsLoaded, setCoinsLoaded] = useState(0)
    const [searchText, setSearchText] = useState('')
    const [isNewCoinsLoaded, setIsNewCoinsLoaded] = useState(true)
    const [isSearching, setIsSearching] = useState(false)
    const [isUpButtonOnSearchListActive, setIsUpButtonOnSearchListActive] = useState(false)
    const coinsLoadingLength = configs.coinsLoadingLength

    useEffect(() => {
        setCoinsList(coinsListJson?.filter(coin => coin?.default !== true))
    }, [])

    useEffect(() => {
        if (searchText !== '' && searchText.length >= 2) {
            setCoinsLoaded(0)

            const filteredCoins = coinsList?.filter((coin) =>
                coin.name.toLowerCase().includes(searchText.toLowerCase()) ||
                coin.id.toLowerCase().includes(searchText.toLowerCase()) ||
                coin.symbol.toLowerCase().includes(searchText.toLowerCase())
            )
            setCoinsRenderedList(filteredCoins)
            setIsSearching(true)
        }

        if (searchText === '') {
            const loadedCoins = coinsList?.slice(coinsLoaded, coinsLoaded + coinsLoadingLength)
            setCoinsRenderedList(loadedCoins)
            setCoinsLoaded(coinsLoaded + coinsLoadingLength)
        }
    }, [searchText])

    useEffect(() => {
        if (openModal && coinsList) {
            const loadedCoins = coinsList.slice(coinsLoaded, coinsLoaded + coinsLoadingLength)
            setCoinsRenderedList(loadedCoins)
            setCoinsLoaded(coinsLoaded + coinsLoadingLength)
        }

        if (!openModal) {
            setCoinsRenderedList(null)
            setCoinsLoaded(0)
            setSearchText('')
        }
    }, [openModal])


    useEffect(() => {
        if (coinsRenderedList?.length >= coinsLoadingLength) {
            setIsNewCoinsLoaded(true)
        }
        if (coinsRenderedList?.length >= coinsList?.length ||
            coinsRenderedList?.length < coinsLoadingLength) {
            setIsNewCoinsLoaded(false)
        }
    }, [coinsRenderedList, coinsList, coinsLoadingLength])

    const handleScroll = (e) => {
        const { scrollTop, clientHeight, scrollHeight } = e.target

        if (scrollTop && scrollTop > 0) {
            setIsUpButtonOnSearchListActive(true)
        } else {
            setIsUpButtonOnSearchListActive(false)
        }

        if (
            openModal &&
            searchText === '' &&
            coinsRenderedList &&
            coinsList &&
            coinsRenderedList?.length < coinsList?.length
        ) {
            if (scrollTop + clientHeight === scrollHeight) {
                const addedNewCoinsTimeout = setTimeout(() => {
                    setCoinsRenderedList((prevState) => [
                        ...prevState,
                        ...coinsList.slice(coinsLoaded, coinsLoaded + coinsLoadingLength)
                    ])

                    setCoinsLoaded((prevCoinsLoaded) => prevCoinsLoaded + coinsLoadingLength)
                }, 500)
                // clearTimeout(addedNewCoinsTimeout);
            }
        }
    }

    function handleOpen() {
        setOpenModal(true)
    }
    function handleClose() {
        setOpenModal(false)
    }

    function handleClickOnCoinForAddingToDefaultList(value) {
        if (value?.id === params?.id) {
            setRequestData(prevState => ({
                ...prevState,
                id: value?.id
            }))
            setAddedCoin(value)
        }
        setAddedCoin(value)
    }

    return (
        <React.Fragment>
            <ListItemButton
                className='coins-list__coin-block-button'
                onClick={handleOpen}
            >
                <ListItemAvatar className='coins-list__coin-avatar-block'>
                    <Avatar
                        className={`coins-list__coin-avatar`}
                        title={'Add coin'}
                        alt={'Add coin'}
                    >
                        <Search />
                    </Avatar>
                </ListItemAvatar>

                <ListItemText className='coins-list__coin-text-block'>
                    <Typography className='coins-list__coin-text' variant='body1'>
                        {'Add'}
                    </Typography>
                </ListItemText>
            </ListItemButton>

            <Modal
                className='coins-list__modal'
                disableAutoFocus={true}
                open={openModal}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}

            >
                <Box
                    sx={{
                        position: 'relative',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '90%',
                        maxWidth: 500,
                        height: '90%',
                        maxHeight: 500,
                        bgcolor: 'background.paper',
                        borderRadius: '4px',
                    }}
                >
                    <Fade in={openModal} className='coins-list__modal-container'>
                        <Box
                            ref={modalRef}
                            onScroll={handleScroll}
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '100%',
                                height: '100%',
                                borderRadius: '4px',
                                overflowY: 'scroll',
                            }}
                        >
                            <List
                                sx={{ pt: 0 }}
                                subheader={
                                    <ListSubheader
                                        component='div'
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            padding: '4px 8px',
                                            paddingRight: '4px',
                                            backgroundColor: '#f6f7f8',
                                        }}
                                    >
                                        <SearchInput
                                            searchText={searchText}
                                            setSearchText={setSearchText}
                                        />

                                        <IconButton
                                            sx={{
                                                backgroundColor: '#fff',
                                                color: '#ef5350',
                                                padding: 0
                                            }}
                                            title='Close coins list'
                                            onClick={handleClose}
                                        >
                                            <Cancel />
                                        </IconButton>
                                    </ListSubheader>
                                }
                            >
                                {
                                    coinsRenderedList?.length
                                        ? coinsRenderedList?.map((coin) => (
                                            <ListItem disableGutters key={coin?.id}>
                                                <ListItemButton onClick={() => handleClickOnCoinForAddingToDefaultList(coin)}>
                                                    <ListItemAvatar>
                                                        <Avatar src={`/img/${coin?.url}`}>
                                                            <CurrencyExchange />
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText primary={`${coin?.name} (${functions.capitalize(coin?.symbol)})`} />
                                                </ListItemButton>
                                            </ListItem>
                                        ))
                                        : <Box sx={{ padding: '16px', textAlign: 'center' }}>
                                            <Typography variant='body1' component='p'>
                                                Nothing found...
                                            </Typography>
                                        </Box>
                                }

                                {!isSearching && isNewCoinsLoaded &&
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        padding: '5px',
                                    }}>
                                        <ProgressBars size={30} />
                                    </Box>
                                }
                            </List>
                        </Box>
                    </Fade>

                    <UpButtonOnSearchList isUpButtonOnSearchListActive={isUpButtonOnSearchListActive} modalRef={modalRef} />
                </Box>
            </Modal>
        </React.Fragment>
    );
}



function UpButtonOnSearchList({ isUpButtonOnSearchListActive, modalRef }) {
    const modal = modalRef.current

    function handleScrollToTop() {
        modal.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        })
    }

    return (
        <Zoom in={isUpButtonOnSearchListActive}>
            <Fab
                size="small"
                onClick={handleScrollToTop}
                sx={{
                    position: 'absolute',
                    bottom: 12,
                    right: 12,
                    color: '#fff',
                    bgcolor: '#42a5f5',
                    '&:hover': {
                        bgcolor: '#1565c0',
                    },
                }}
            >
                <KeyboardArrowUp />
            </Fab>
        </Zoom>
    )
}