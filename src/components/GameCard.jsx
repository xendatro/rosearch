import { Card, CardMedia, Typography, CardContent, Box } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';

function formatCompactNumber(num) {
    const formatter = new Intl.NumberFormat('en-US', {
      notation: 'compact',
      compactDisplay: 'short', // 'short' is the typical K, M, B format
    });
    return formatter.format(num);
  }

function GameCard(props) {
    return (
        <Card sx={{
            boxShadow: 6,
            width: 300, // Set a fixed width to each card for horizontal scrolling
            flexShrink: 0, // Prevent shrinking,
        }}>
            <CardMedia 
                component="img" 
                height="170" 
                image={props.thumbnail}
            />
            <CardContent sx={{
                alignItems: "center"
            }}>
                <Typography variant="h5"><b><a href={`https://www.roblox.com/games/${props.rootPlaceId}` } target="_blank">{props.name}</a></b></Typography>
                <Box sx={{
                    display: "flex",
                    gap: 4,
                    mt: 1
                }}>
                    <Box>
                        <Box sx={{
                            display: "flex",
                            alignItems: "center",  
                            gap: 2  
                        }}>
                            <PersonIcon sx={{ fontSize: 40 }} />
                            <Box>
                                <Typography variant="body2" color="text.secondary">Visits</Typography>
                                <Typography variant="h6" fontWeight="bold">{formatCompactNumber(props.visits)}</Typography>
                            </Box>
                        </Box>
                        <Box sx={{
                            display: "flex",
                            alignItems: "center",  
                            gap: 2  
                        }}>
                            <PersonIcon sx={{ fontSize: 40 }} />
                            <Box>
                                <Typography variant="body2" color="text.secondary">Active</Typography>
                                <Typography variant="h6" fontWeight="bold">{formatCompactNumber(props.active)}</Typography>
                            </Box>
                        </Box>
                    </Box>
                    <Box>
                        <Box sx={{
                            display: "flex",
                            alignItems: "center",  
                            gap: 2  
                        }}>
                            <StarIcon sx={{ fontSize: 40 }} />
                            <Box>
                                <Typography variant="body2" color="text.secondary">Favorites</Typography>
                                <Typography variant="h6" fontWeight="bold">{formatCompactNumber(props.favorites)}</Typography>
                            </Box>
                        </Box>
                        <Box sx={{
                            display: "flex",
                            alignItems: "center",  
                            gap: 2  
                        }}>
                            <MilitaryTechIcon sx={{ fontSize: 40 }} />
                            <Box>
                                <Typography variant="body2" color="text.secondary">Rank</Typography>
                                <Typography variant="h6" fontWeight="bold">{props.rank}</Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    )
}

export default GameCard;
