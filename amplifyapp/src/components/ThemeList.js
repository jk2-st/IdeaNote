import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Box, Flex, List, Spacer, Heading, Button , ListItem, Text } from '@chakra-ui/react';
import { setThemeList } from "../redux/themeListSlice";
import { setSelectedThemeId } from '../redux/selectedThemeSlice';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { teal } from '@mui/material/colors';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

export const ThemeList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // APIリクエストを送信する処理
    fetch(apiUrl + '/themes')
      .then(response => response.json())
      .then(result => {
        dispatch(setThemeList(result));
      })
      .catch(error => {
        console.error('テーマ取得APIでの通信に失敗しました。', error);
      });
  }, []);

  const theme_list = useSelector((state) => state.themeList);

  const handleClick = (entity_id) => {
    const id = entity_id.replace('theme-', '');
    dispatch(setSelectedThemeId(id));
  };

  return !theme_list ? (
    <></>
  ):(
    <>
    <List sx={{bgcolor: teal[50]}}>
      {theme_list.map((item) => (
        <ListItem key={item.entity_id} disablePadding>
          <ListItemButton onClick={() => handleClick(item.entity_id)}>
            <ListItemText primary={item.title} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    </>
  );
};
