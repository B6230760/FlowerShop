import React, { useEffect,useState } from "react";
import { Link } from 'react-router-dom';
import { Link as RouterLink } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import { createStyles, makeStyles, useTheme, Theme, } from "@material-ui/core/styles";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import SignIn from './Signin'
import { UsersInterface } from "../models/Imodel";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    center: {
      display: "flex",
      justifyContent: "center",
      alignItems: 'center',

    },
    iconcenter: {
      justifyContent: "center",
      alignItems: 'center',
      margin: theme.spacing(2)
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    a: {
      textDecoration: "none",
      color: "inherit",
    },
  }),
);


export default function NavBar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [token, setToken] = React.useState<String>("");
  const [role, setRole] = React.useState<String>("");
  const [user, setUser] = useState<UsersInterface[]>([]);
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const pages = [
    { name: "เปรียบเทียบสินค้า", path: "/compareselect" },
    { name: "ตะกร้า", path: "/cart" },
    { name: "รายการคำสั่งซื้อ", path: "/billlist" },
  ];
  const settings = ['Logout'];
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  const getUser = async () => {
    let uid = localStorage.getItem("uid");
    fetch(`${apiUrl}/users/${uid}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          setUser(res.data);
        } else {
          console.log("else");
        }
      });
  };
  useEffect(() => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");
    if (token && role) {
      setToken(token);
      setRole(role);
    }
    getUser();
  }, []);

  if (!token) {
    return <SignIn />;
  }

  const signout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };
  const Theme = createTheme({
    palette: {
      primary: {
        light: '#f48fb1',
        main: '#f48fb1',
        dark: '#f48fb1',
        contrastText: '#fff',
      },
     
    },
  });
  
  return (
    <ThemeProvider theme={Theme}>
    <AppBar position="static" >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LocalFloristIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            style={{ fontFamily: "Source Code Pro" }}
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            FlowerShop
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu

              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" >
                    <Link style={{ fontFamily: "Source Code Pro" }} to={page.path}>{page.name}</Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            style={{ fontFamily: "Source Code Pro" }}
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Flower Shop
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          {user.map((item: UsersInterface) => (
          <Button color="inherit"
            component={RouterLink}
            to="/account">
          {item.Name}</Button>
))}
          <Box sx={{ flexGrow: 0 }}>
           
            {user.map((item: UsersInterface) => (
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={item.ImgPath} />
              </IconButton>
            </Tooltip>
            ))}
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={signout}>
                  <Typography style={{ fontFamily: "Source Code Pro" }} textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}

            </Menu>
          </Box>
        </Toolbar>
      
      </Container>
    </AppBar>
    </ThemeProvider>
  );

}

