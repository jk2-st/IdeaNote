import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { toggle } from '../redux/navigationBarSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function ButtonAppBar({ signOut }) {
  const dispatch = useDispatch();
  const handleDrawerToggle = () => {
    dispatch(toggle());
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ノートブック
          </Typography>
          {/* <Button color="inherit">Login</Button> */}
          <Button color="inherit" onClick={signOut}>Sign Out</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}