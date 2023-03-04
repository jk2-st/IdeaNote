import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Flex, List, Spacer, Heading, Button , ListItem, Text } from '@chakra-ui/react';
import { setThemeList } from "../redux/themeListSlice";
import { setSelectedThemeId } from '../redux/selectedThemeSlice';
const apiUrl = process.env.REACT_APP_API_BASE_URL;

export const ThemeList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // APIリクエストを送信する処理
    fetch(apiUrl + '/theme')
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

  return (
    <Box bg="gray">
      <List spacing={1}>
        {
          !(theme_list) ? <></> :
          <>
            {theme_list.map(item => (
            <ListItem key={item.entity_id}>
              <button onClick={() => handleClick(item.entity_id)} >{item.title}</button>
            </ListItem>
            ))}
          </>
        }
      </List>
    </Box>
  );
};
