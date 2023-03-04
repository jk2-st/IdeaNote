import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setComments } from "../redux/commentSlice";
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import { amber } from '@mui/material/colors';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

export const CommentList = () => {
  const theme_id = useSelector((state) => state.selectedTheme.id);
  const dispatch = useDispatch();

  useEffect(() => {
    // ここでAPIリクエストを行い、テーマを取得する等の処理を行う
    fetch(apiUrl + '/comments/themes/' + theme_id)
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
      <List spacing={1} sx={{bgcolor:amber[50]}}>
        {
          !(comment) ? <></>
          :
          <>
            {comment.map(item => (
              <ListItem key={item.entity_id}>
                <List>{item.comment}</List>
              </ListItem>
            ))}
          </>
      }
      </List>
    </Box>
  );
};