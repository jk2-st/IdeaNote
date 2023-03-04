import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Flex, List, Spacer, Heading, Button , ListItem, Text } from '@chakra-ui/react';
import { setComments } from "../redux/commentSlice";
const apiUrl = process.env.REACT_APP_API_BASE_URL;

export const CommentList = () => {
  const theme_id = useSelector((state) => state.selectedTheme.id);
  const dispatch = useDispatch();

  useEffect(() => {
    if (theme_id == 0) return;
    // ここでAPIリクエストを行い、テーマを取得する等の処理を行う
    fetch(apiUrl + '/theme/' + theme_id)
      .then(response => response.json())
      .then((result) => {
        dispatch(setComments(result));
      })
      .catch(error => {
        console.error(error);
        dispatch(setComments([]));
      });
  }, [theme_id]);


  const comment = useSelector((state) => state.comment);
  console.log('this is comments : ', comment);
  return (
    <Box>
      <List spacing={1}>
        {
          !(comment) ? <></>
          :
          <>
            {comment.map(item => (
              <ListItem key={item.entity_id}>
                <Text>{item.comment}</Text>
              </ListItem>
            ))}
          </>
      }
      </List>
    </Box>
  );
};