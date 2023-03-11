
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { close } from '../redux/navigationBarSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AddTheme } from "./ThemeForm";
import { ThemeList } from './ThemeList';
const drawerWidth = 240;

export const NavigationBar = () => {
  const isOpen = useSelector((state) => state.navigationBar.isOpen);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(close(false));
  };
    return (
        <nav>
          <Drawer
            variant="temporary"
            open={isOpen}
            onClose={handleClose}
            // classes={{
            //   paper: classes.drawerPaper,
            // }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            <ThemeList />
            <AddTheme />
          </Drawer>
        </nav>
    );
}