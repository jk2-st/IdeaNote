import React, { useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
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
  //送信ボタンクリック後の処理
  const handleSubmit = async () => {
    await axios.post(
      apiUrl + '/comment',
      {
        'theme_id': theme_id,
        'comment': "this comments",
      }
    );
    setValues({ isSubmitted: true });
  };
  //画面表示内容
  return values.isSubmitted ? (
    <section>
      {/* 送信済みフラグが true であれば 送信しました画面 を表示 */}
      <h2>コメント</h2>
      <p>コメントを送信しました。</p>
    </section>
  ) : (
    <section>
      {/* 送信済みフラグが false であれば 入力画面 を表示 */}
      <Box component="form" noValidate autoComplete="off">
        <ThemeProvider theme={theme}>
          <FormControl fullWidth>
            <TextField
              name="theme_id"
              id="theme_id"
              sx={{ display : 'none'}}
              InputProps={{ style: textfieldStyles }}
              InputLabelProps={{ style: textlabelStyles }}
              value={values.theme_id}
              onChange={handleChange}
            />
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
          </FormControl>
          <br />
          <br />
          <Button
            variant="contained"
            size="large"
            endIcon={<SendIcon />}
            disabled={(values.theme_id && values.comment) ? false : true}
            onClick={handleSubmit}
          >
            メモを追加する
          </Button>
        </ThemeProvider>
      </Box>
    </section>
  );
};