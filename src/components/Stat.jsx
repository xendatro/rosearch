import { Box, Typography } from "@mui/material"
import PersonIcon from '@mui/icons-material/Person';


function Stat(props) {
    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",  // Aligns items vertically in the center
            gap: 2  // Space between the icon and the text box
            }}>
            <PersonIcon sx={{ fontSize: 40 }} />  {/* Adjust icon size */}
            <Box>
                <Typography variant="body2" color="text.secondary">{props.type}</Typography>  {/* Use a muted color for the label */}
                <Typography variant="h6" fontWeight="bold">{isNaN(props.value) ? "--" : new Intl.NumberFormat().format(props.value)}</Typography>  {/* Make the value bold and larger */}
            </Box>
        </Box>
    )

}

export default Stat;