import React, { useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { addComments } from "../redux/commentSlice";
import axios from 'axios';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// 参考URL：https://blog.usize-tech.com/sendmail-form-by-react-mui/
const apiUrl = process.env.REACT_APP_API_BASE_URL;

export const AddComment = () => {
  const theme_id = 1;
  //見た目の設定
  const theme = createTheme({
    typography: {
      fontFamily: "inherit",
      button: {
        textTransform: "none",
        fontFamily: "inherit"
      }
    }
  });
  const textfieldStyles = {
    backgroundColor: "#ffffff",
    fontFamily: "inherit"
  };
  const textlabelStyles = {
    fontFamily: "inherit"
  };
  //state定義
  const [values, setValues] = useState(
    {
      theme_id: theme_id,
      message: "",
      isSubmitted: false
    }
  );
  //文字入力の度にstate更新
  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setValues({ ...values, [name]: value });
  };

  const dispatch = useDispatch();
  //送信ボタンクリック後の処理
  const handleSubmit = async () => {

    await axios.post(
      apiUrl + '/comments',
      {
        'theme_id': theme_id,
        'comment': "this comments",
      }
    )
    .then(result => {
        console.log('コメント追加APIに成功しました。', result);
        dispatch(addComments(result.data));
    })
    .catch(error => {
        console.error('コメント追加APIに失敗しました。', error);
    });
    setValues({ isSubmitted: true });
  };

  const displayAddButton = () => {
    setValues({ isSubmitted: false});
  };
  //画面表示内容
  return values.isSubmitted ? (
    <Button 
        fullWidth
        color="secondary"
        variant="contained"
        size="large"
        endIcon={<AddCircleOutlineIcon />}
        onClick={displayAddButton}
    >コメントを追加する</Button>
  ) : (
    <section>
      {/* 送信済みフラグが false であれば 入力画面 を表示 */}
      <Box component="form" noValidate autoComplete="off">
        <ThemeProvider theme={theme}>
          <FormControl fullWidth>
            <TextField
              name="comment"
              id="comment"
              label="コメント"
              multiline
              minRows={3}
              placeholder="ここからメモ追加"
              variant="filled"
              margin="dense"
              size="small"
              InputProps={{ style: textfieldStyles }}
              InputLabelProps={{ style: textlabelStyles }}
              value={values.comment}
              onChange={handleChange}
            />
          <Button
            fullwidth
            variant="contained"
            size="large"
            endIcon={<SendIcon />}
            disabled={(theme_id && values.comment) ? false : true}
            onClick={handleSubmit}
          >
            メモを追加する
          </Button>
          </FormControl>
        </ThemeProvider>
      </Box>
    </section>
  );
};