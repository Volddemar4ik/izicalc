import { Typography, Box } from "@mui/material";

export default function Instruction({ isMobile }) {
    const headerTextSize = isMobile ? '1.125em' : '1.5em'

    return (
        <Box sx={{ marginTop: '20px' }}>
            <Typography variant='h2' fontSize={headerTextSize} gutterBottom fontWeight='500'>
                How to Use Profit crypto calculator?
            </Typography>

            <Typography gutterBottom>
                You can use Crypto Profit Calculator to calculate the potential profit or loss from your cryptocurrency investments like Bitcoin, Ethereum, Dogecoin, Ripple, Matic, Arbitrum and more than 5000 another coins. It's the ultimate Bitcoin calculator.
            </Typography>

            <Box sx={{ marginTop: '15px' }}>
                <Typography fontWeight='500' gutterBottom>
                    Follow the following steps to calculate crypto profit/loss:
                </Typography>

                <Typography gutterBottom>
                    <Typography component='span' fontWeight='500'>Step 1: </Typography>
                    Choose a cryptocurrency you'd like to check from the default list. Alternatively, click on the search icon to select any other cryptocurrency: in the opened window type the name or symbol of the cryptocurrency in the search field and click on the desired coin to add it to the default list.
                </Typography>

                <Typography gutterBottom>
                    <Typography component='span' fontWeight='500'>Step 2: </Typography>
                    In the "Initial Investment" field please enter the amount in USD (fiat) that you are willing to spend on purchasing the chosen coin (for example, it could be $100). Alternatively, you can select one of the default amount options.
                </Typography>

                <Typography gutterBottom>
                    <Typography component='span' fontWeight='500'>Step 3: </Typography>
                    In the "Additional Contribution" field, choose how often you are willing to invest in buying the selected coin. Select one of the following options: "Day" "Month" or "Year," indicating how frequently you will purchase the chosen coin for the amount specified in the previous field. Alternatively, you can select "Without investment" if you want to buy the cryptocurrency only once.
                </Typography>

                <Typography gutterBottom>
                    <Typography component='span' fontWeight='500'>Step 4: </Typography>
                    In the "Years to Grow" field, enter the purchase date or select one of the default options.
                </Typography>

                <Typography gutterBottom>
                    <Typography component='span' fontWeight='500'>Step 5: </Typography>
                    Choose whether to include graphic animation or not.
                </Typography>

                {isMobile
                    ? <>
                        <Typography gutterBottom>
                            <Typography component='span' fontWeight='500'>Step 6: </Typography>
                            Press the "UPDATE" button to calculate your potential profit or loss.
                        </Typography>

                        <Typography gutterBottom>
                            <Typography component='span' fontWeight='500'>Step 7: </Typography>
                            Finally, your profit or loss for your investment will be displayed in the screen.
                        </Typography>
                    </>
                    : <Typography gutterBottom>
                        <Typography component='span' fontWeight='500'>Step 6: </Typography>
                        Finally, your profit or loss for your investment will be displayed in the screen.
                    </Typography>
                }
            </Box>
        </Box>
    )
}