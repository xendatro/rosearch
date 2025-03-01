import { Typography, Drawer, Toolbar, Box, List, ListItem, ListItemButton, ListItemText, Container, Paper, ListSubheader, ListItemIcon, FormGroup, FormControlLabel, Checkbox, Divider, Collapse, Button, IconButton, Grid, Card, CardMedia, CardContent, Stepper} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { ExpandLess } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { grey } from "@mui/material/colors";
import Stat from "./Stat";
import GameCard from "./GameCard";


const drawerWidth = 240

let roleSubsStrings = {
    Owner: "owner",
    Founder: "founder",
    Creator: "creator",
    Director: "director",
    Leader: "lead",
    Manager: "manage",
    Marketing: "marketing",
    Analytics: "analytic",
    Engineer: "engineer",
    Developer: "dev",
    Designer: "design",
    Programmer: "programm",
    Scripter: "script",
    Builder: "build",
    Modeler: "model",
    Animator: "animat",
    GFX: "gfx",
    UI: "ui",
    Artist: "art",
    Contributor: "contr",
    "Voice Actor": "voice",
}


function isValidGroup(group, criteria, displayName, username) {
    const userRole = group.userRole
    if (group.rankMemberCount >= 100) return false
    if (group.userRank >= criteria.MinRank) return true
    if (criteria.DisplayNameAllowed) {

        if (displayName === userRole || username === userRole) return true
    }
    let arr = Object.keys(roleSubsStrings).filter((role) => {
        return criteria.Roles[role] === true && userRole.toLowerCase().includes(roleSubsStrings[role])
    })
    return arr[0] !== undefined
}


// followers, user visits, group visits, group members, user playing, group playing
function normalizeData(data, criteria, displayName, username) {
    if (data.id === undefined) return null
    let newData = JSON.parse(JSON.stringify(data))
    newData.groupsData = newData.groupsData.filter((group) => isValidGroup(group, criteria, displayName, username))
    let userVisits = 0
    let groupVisits = 0
    let groupMembers = 0  
    let userPlaying = 0
    let groupPlaying = 0
    
    userVisits = newData.userGames.reduce((acc, val) => acc + val.placeVisits, 0)
    groupVisits = newData.groupsData.reduce((acc, val) => acc + val.games.reduce((acc2, val2) => acc2 + val2.visits, 0) ,0)
    groupMembers = newData.groupsData.reduce((acc, val) => acc + val.groupMemberCount, 0)
    userPlaying = newData.userGames.reduce((acc, val) => acc + val.playing, 0)
    groupPlaying = newData.groupsData.reduce((acc, val) => acc + val.games.reduce((acc2, val2) => acc2 + val2.playing, 0) ,0)

    newData.totalUserVisits = userVisits
    newData.totalGroupVisits = groupVisits
    newData.totalGroupMembers = groupMembers
    newData.totalUserPlaying = userPlaying
    newData.totalGroupPlaying = groupPlaying

    let games = []
    newData.userGames.forEach((game) => games.push(game))
    newData.groupsData.forEach((group) => group.games.forEach((game => {
        let newGame = JSON.parse(JSON.stringify(game))
        newGame.userRank = group.userRank
        games.push(newGame)
    })))
    games.sort((a, b) => b.placeVisits - a.placeVisits)

    console.log(games)

    newData.allGames = games

    return newData
}

function Profile(props) {
    let {username} = useParams()
    if (username === undefined) {
        username = props.username
    }

    const [allowedRolesOpen, setAllowedRolesOpen] = useState(false)
    const [allowedRanksOpen, setAllowedRanksOpen] = useState(false)

    const [data, setData] = useState({})
    const [useData, setUseData] = useState({})

    const [criteria, setCriteria] = useState({
        Roles: {
            Owner: true,
            Founder: true,
            Creator: true,
            Director: true,
            Leader: true,
            Manager: true,
            Marketing: true,
            Analytics: true,
            Engineer: true,
            Developer: true,
            Designer: true,
            Programmer: true,
            Scripter: true,
            Builder: true,
            Modeler: true,
            Animator: true,
            GFX: true,
            UI: true,
            Artist: true,
            Contributor: true,
            "Voice Actor": true
        },
        DisplayNameAllowed: true,
        MinRank: 254
    })

    useEffect(() => {
        fetch(`https://rosearch.batchfile1.workers.dev/?username=${username}`)
            .then(response => {
                console.log("Raw Response:", response); // Logs the Response object
                return response.json(); // Convert response to JSON
            })
            .then(data => {
                setData(data)
                setUseData(normalizeData(data, criteria, data.displayName, data.username))
            })
            .catch(error => console.error("Fetch error:", error));
    }, []);

    useEffect(() => {
        console.log(data)
        const newData = normalizeData(data, criteria, data.displayName, data.username)
        console.log(newData)
        if (newData !== null) {
            setUseData(newData)
        }
    }, [criteria])

    return (
        <>
            <Container sx={{
                alignItems: "true",
                pt: 0
            }}>
                <Typography variant="h4"><b>Profile</b></Typography>
                <Box sx={{
                    display: "flex",
                    width: "100%",
                    gap: 2,
                    mt: 0,
                    height: 500, 
                    pb: 3
                }}>
                    <Paper sx={{
                        height: "100%",
                        flexGrow: 1,
                        boxShadow: 6,
                        justifyContent: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 2,  // Add space between elements
                        }}>
                        <img 
                            src={data.avatarThumbnail}
                            style={{
                            height: "200px",
                            width: "200px"
                            }} 
                        />
                        <Typography variant="h5"><b>{useData.username}</b></Typography>
                        <Divider sx={{ width: "100%" }} />  {/* Ensure the divider takes full width */} 
                        <Box sx={{
                            display: "flex",
                            gap: 10 
                        }}>
                            <Box>
                                <Stat type="Followers" value={useData.followers}/>
                                <Stat type="User Visits" value={useData.totalUserVisits}/>
                                <Stat type="Group Visits" value={useData.totalGroupVisits}/>
                            </Box>
                            <Box>
                                <Stat type="Members" value={useData.totalGroupMembers}/>
                                <Stat type="User Active" value={useData.totalUserPlaying}/>
                                <Stat type="Group Active" value={useData.totalGroupPlaying}/>
                            </Box>
                        </Box>

                    </Paper>

                    <Paper sx={{
                        height: "100%",
                        flexGrow: 5,
                        boxShadow: 6,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Typography variant="h5" sx={{
                            color: grey
                        }}><i>Vouches do not exist yet. Coming soon!</i></Typography>
                    </Paper>
                </Box>
                <Typography variant="h4"><b>Games</b></Typography>
                <Paper sx={{
                    boxShadow: 6
                }}>
                    <Box sx={{
                        display: "flex",
                        padding: 4,
                        overflowX: "auto" // Ensure the Box can scroll if necessary
                    }}>
                        <List sx={{
                            display: "flex",
                            gap: 3,
                            flexDirection: "row",
                            overflowX: "auto",
                            whiteSpace: "nowrap",
                            width: "100%",  // Ensure List takes up the full width
                        }}>
                            {useData === null ? <></> : useData.allGames === undefined ? <></> : useData.allGames.map((game, i) => {
                                return <GameCard key={i} visits={game.placeVisits} favorites={game.favoritedCount} active={game.playing} rank={
                                    game.creator.type === "User" ? 255 : game.userRank
                                } thumbnail={game.thumbnails[0].imageUrl} name={game.name} rootPlaceId={game.rootPlaceId} />
                            })}
                        </List>
                    </Box>
                </Paper>

            </Container>
            <Drawer open={true} variant="persistent" 
            sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                    },
            }}>
                <Toolbar />
                <Box>
                    <List>
                        <ListSubheader variant="">
                            <b>Filters</b>
                        </ListSubheader>
                        <Divider />
                        <ListItemButton disable onClick={() => setAllowedRolesOpen(!allowedRolesOpen)}>
                            <ListItemText primary="Allowed Roles" />
                            {allowedRolesOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <ListItem>
                            <Collapse in={allowedRolesOpen}>
                                <FormGroup>
                                {Object.keys(criteria.Roles).map((x) => (
                                    <FormControlLabel 
                                        key={x} // Ensure each element has a unique key
                                        onChange={(e) => {
                                            let newCriteria = JSON.parse(JSON.stringify(criteria));
                                            newCriteria.Roles[x] = e.target.checked;
                                            setCriteria(newCriteria);
                                        }} 
                                        control={<Checkbox checked={criteria.Roles[x]} />} // Use 'checked' instead of 'defaultChecked'
                                        label={x} 
                                    />
                                ))}
                                <FormControlLabel
                                    key="DisplayName"
                                    onChange={(e) => {
                                        let newCriteria = JSON.parse(JSON.stringify(criteria));
                                        newCriteria.DisplayNameAllowed = e.target.checked;
                                        setCriteria(newCriteria);
                                    }}
                                    control={<Checkbox checked={criteria.DisplayNameAllowed} />}
                                    label="Display/Username"
                                />
                                </FormGroup>
                            </Collapse>

                        </ListItem>
                        <ListItemButton disable onClick={() => setAllowedRanksOpen(!allowedRanksOpen)}>
                            <ListItemText primary="Allowed Ranks" />
                            {allowedRanksOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <ListItem>
                            <Collapse in={allowedRanksOpen} >
                                <Box sx={{
                                    display: "flex",
                                    justifyContent: "space-between", // Pushes items to opposite sides
                                    alignItems: "center",
                                    width: "100%"  // Ensures the Box takes full width
                                    }}>
                                    <ListItemText primary={`Minimum Rank: ${criteria.MinRank}`} />
                                    {/*<IconButton sx={{
                                        ml: 2
                                    }}>
                                        <Edit />
                                    </IconButton> */}
                                </Box>
                            </Collapse>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    )
}

export default Profile;