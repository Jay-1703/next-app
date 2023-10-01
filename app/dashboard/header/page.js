'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { signOut } from "next-auth/react";
import { useSession } from 'next-auth/react';

function Header(props) {
  const { data: session } = useSession();
  const { onDrawerToggle } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <AppBar sx={{background:'#2563eb'}} position="sticky" className='py-3' elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center" className="flex justify-end">
            {/* --------------- Sidebar open button -------------- */}
            <Box sx={{ display: { sm: 'none', xs: 'block' } }}>
              <IconButton color="inherit" aria-label="open drawer" onClick={onDrawerToggle}>
                <MenuIcon />
              </IconButton>
            </Box>
            {/* --------------- User profile -------------- */}
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
              <Tooltip title="Account settings">
                <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }} aria-controls={open ? 'account-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined}>
                  {
                    session.user.image ? <Avatar className='h-10 w-10'>
                      <img src={session.user.image}></img>
                    </Avatar> : <AccountCircleIcon fontSize="large" />
                  }
                </IconButton>
              </Tooltip>
            </Box>
            {/* --------------- Other options for user -------------- */}
            <Menu anchorEl={anchorEl} id="account-menu" open={open} onClose={handleClose} onClick={handleClose} transformOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
              <Box className='py-3'>
                <menuItem className='flex justify-center'>
                  {
                    session.user.image ? <Avatar className='h-14 w-14'>
                      <img src={session.user.image}></img>
                    </Avatar> : <AccountCircleIcon className='w-14 h-14' />
                  }
                </menuItem>
                <Box className='text-black text-md text-center py-1'>
                  {
                    session.user.name ? <p>Hii, {session.user.name}</p> :
                      <div className='text-center'>
                        <p>Hii,</p>
                        <p>{session.user.email}</p>
                      </div>
                  }
                </Box>
              </Box>
              <Box className='px-0'>
                <MenuItem onClick={handleClose}>
                  <AccountCircleIcon className='mr-3' fontSize='medium' /><span>Profile</span>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <AccountCircleIcon className='mr-3' fontSize='medium' /><span>My Account</span>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleClose}>
                  <Settings className='mr-3' fontSize="medium" /><span>Settings</span>
                </MenuItem>
                <MenuItem onClick={() => signOut()}>
                  <Logout className='mr-3' fontSize="medium" /><span>Logout</span>
                </MenuItem>
              </Box>
            </Menu>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};
export default Header;