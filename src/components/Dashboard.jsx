import { Typography, Paper, IconButton, InputBase, Box, Divider, Button } from "@mui/material";
import { Search } from "@mui/icons-material";
import SendIcon from '@mui/icons-material/Send';


function Dashboard() {
    return (
        <>
            <Box sx={{
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex'
            }}>
                <Paper sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <IconButton>
                        <Search />
                    </IconButton>
                    <InputBase placeholder="Enter a username..." sx={{
                        flexGrow: 1
                    }}>

                    </InputBase>
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <IconButton>
                        <SendIcon />
                    </IconButton>
                </Paper>
            </Box>

        </>
    )
}

export default Dashboard;