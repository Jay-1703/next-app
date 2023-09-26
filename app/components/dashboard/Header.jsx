'use client';
import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { signOut, useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
function Header(props) {
  const { onDrawerToggle } = props;
  const {data :session} = useSession();
  if (session) {
    return (
      <React.Fragment>
        <AppBar color="primary" position="sticky" className='py-3' elevation={0}>
          <Toolbar>
            <Grid container spacing={1} alignItems="center" className="flex justify-end">
              <Box sx={{ display: { sm: 'none', xs: 'block' } }}>
                <IconButton color="inherit" aria-label="open drawer" onClick={onDrawerToggle}>
                  <MenuIcon />
                </IconButton>
              </Box>
  
              <Box>
                <IconButton color="inherit" sx={{ p: 0.5 }} onClick={()=>signOut()}>
                  <Avatar alt="My Avatar" />
                </IconButton>
              </Box>
            </Grid>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }
  else{
    const router = useRouter();
    router.push('/');
  }
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};
export default Header;