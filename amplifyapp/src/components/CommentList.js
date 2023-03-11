import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setComments } from "../redux/commentSlice";
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import { amber } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import BuildCircle from '@mui/icons-material/BuildCircle';
import { ListItemIcon } from '@mui/material';

const apiUrl = process.env.REACT_APP_API_BASE_URL;

export const CommentList = () => {
  const theme_id = useSelector((state) => state.selectedTheme.id);
  const dispatch = useDispatch();

  const token = useSelector((state) => state.cognitoAuth);
  useEffect(() => {
    // ここでAPIリクエストを行い、テーマを取得する等の処理を行う
    fetch(apiUrl + '/comments/themes/' + theme_id, {
      headers: {
        'Authorization': token,
      }
    })
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
  const isDisplay = false; // TODO: 編集モード時のみ変更削除アイコンを表示する
  const updateComment = ($id) => {
    // TODO: コメント更新APIをリクエスト＋編集モード解除
  };
  const deleteComment = ($id) => {
    // TODO: コメント削除APIをリクエスト＋編集モード解除
  };
  return (
    <Box>
      <List spacing={1} sx={{bgcolor:amber[50]}}>
        {
          !(comment) ? <></>
          :
          <>
            {comment.map(item => (
              <ListItem key={item.entity_id}>
                <List sx={{ alignItems: "center"}}>{item.comment}</List>
                <ListItemIcon sx={{ display: isDisplay ? "flex" : "none", justifyContent: "flex-end"}}>
                  <BuildCircle onClick={updateComment(item.entity_id)}/>
                  <DeleteIcon onClick={deleteComment(item.entity_id)}/>
                </ListItemIcon>
              </ListItem>
            ))}
          </>
      }
      </List>
    </Box>
  );
};