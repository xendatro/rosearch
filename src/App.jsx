import { useState } from "react";
import { AppBar, Box, Button, Toolbar, Typography, IconButton, Container, Drawer, Input, Paper, Divider, InputBase } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Outlet, useNavigate } from "react-router";
import { Search } from "@mui/icons-material";
import SendIcon from '@mui/icons-material/Send';


function App() {
  const [username, setUsername] = useState("")
  const navigate = useNavigate()

  function handleSubmit(e) {
    navigate(`/user/${username}`)
  }

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          </Box>
          <form onSubmit={handleSubmit} >
            <Paper sx={{
                      display: 'flex',
                      alignItems: 'center'
                  }}>
                      <IconButton>
                          <Search />
                      </IconButton>
                      <InputBase placeholder="Enter a username..." sx={{
                          flexGrow: 1
                      }}
                      onChange={(e) => setUsername(e.target.value)}
                      
                      >
                      {username}
                      </InputBase>
                      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                      <IconButton onClick={handleSubmit}>
                          <SendIcon />
                      </IconButton>
                  </Paper>
          </form>
          
        </Toolbar>
      </AppBar>
      <Box sx={{
        mt: 10
      }}>
        <Outlet />
      </Box>
    </>
  );
}

export default App;