import React, { useEffect, useState, useMemo } from "react";
import { createTheme, styled, ThemeProvider, useTheme,} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import { Brightness4, Brightness7, Dashboard, KingBed, Logout, MarkChatUnread, NotificationsActive, PeopleAlt } from "@mui/icons-material";
import HomeIcon from '@mui/icons-material/Home';
import  {firebaseApp, db} from '../../firebase';
import SettingsIcon from '@mui/icons-material/Settings';

import Users from './AdminComponents/users/Users';
import Messages from './AdminComponents/messages/Messages';
import Requests from './AdminComponents/requests/Requests';
import Rooms from './AdminComponents/rooms/Rooms';
import Main from './AdminComponents/main/Main';
import Settings from './AdminComponents/settings/settings';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const handleLogout = () => {
  firebaseApp.auth().signOut();
};

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] =   useState(false);
  const [dark, setDark] = useState(true);

const [selectedLink, setSelectedLink] = useState('');

  const list = useMemo (() => [
    {title:'Main', icon:<Dashboard/>, link:'', component: <Main {...{setSelectedLink, link: ''}}/>},
    {title:'Users', icon:<PeopleAlt/>, link:'users', component: <Users {...{setSelectedLink, link: 'users'}}/>},
    {title:'Rooms', icon:<KingBed/>, link:'rooms', component: <Rooms {...{setSelectedLink, link: 'rooms'}}/>},
    {title:'Requests', icon:<NotificationsActive/>, link:'requests', component: <Requests {...{setSelectedLink, link: 'requests'}}/>},
    {title:'Messages', icon:<MarkChatUnread/>, link:'messages', component: <Messages {...{setSelectedLink, link: 'messages'}}/>},
    {title:'Settings', icon:<SettingsIcon/>, link:'settings', component: <Settings {...{setSelectedLink, link: 'settings'}}/>},
  ], [])




  const darkTheme = useMemo (() => createTheme({
    palette: {
      mode: dark ? 'dark' : 'light'
    }

  }), [dark])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate()

  return (
    <ThemeProvider theme={darkTheme}>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Tooltip title="Go back to homepage">
            <IconButton sx = {{mr:1}} onClick={()=>navigate('/')}>
              <HomeIcon/>
            </IconButton>
          </Tooltip>
          <Typography variant="h6" noWrap component="div" sx = {{flexGrow:1}}>
            Dashboard
          </Typography>
          <IconButton onClick= {()=> setDark(!dark)}>
            {dark ? <Brightness7/> : <Brightness4/>}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
          {list.map((item) => (
            <ListItem key={item.title} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={() => navigate(item.link)}
                selected={selectedLink === item.link}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx ={{flexGrow: 1}} />
       
        {/* <Box sx ={{textAlign:'flex-start'}}>
          <Tooltip title='Logout'sx={{mt:1}}> 
            <IconButton onClick={handleLogout} 
            sx ={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}> 
              <Logout/>
            </IconButton>
          </Tooltip>
        </Box> */}


        <List sx ={{alignItems: 'flex-start'}}>
          {['Logout'].map((text, index) => (
            <ListItem key={text} disablePadding 
            sx={{ 
              display: 'flex',
              flexWrap: 'wrap',
              alignContent: 'flex-end',
              borderRadius: 1,
              }}>
              <ListItemButton onClick={handleLogout} 
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {<Logout  />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>


      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Routes>
          {list.map(item=>(
            <Route key ={item.title} path ={item.link} element ={item.component}/>
          ))}
        </Routes>

      </Box>
    </Box>
    </ThemeProvider>
  );
}
