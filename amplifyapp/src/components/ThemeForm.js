import React, { useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { addThemeList } from "../redux/themeListSlice";
import axios from 'axios';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// 参考URL：https://blog.usize-tech.com/sendmail-form-by-react-mui/
const apiUrl = process.env.REACT_APP_API_BASE_URL;

export const AddTheme = () => {
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
      title: "",
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
      apiUrl + '/themes',
      {
        'title': values.title
      }
    )
    .then(result => {
        console.log('テーマ追加APIに成功しました。', result);
        dispatch(addThemeList(result.data));
    })
    .catch(error => {
        console.error('テーマ追加APIに失敗しました。', error);
    });
    setValues({ isSubmitted: true });
  };

  const displayAddButton = () => {
    setValues({ isSubmitted: false});
  };
  //画面表示内容
  return values.isSubmitted ? (
    // 送信済みフラグが false であれば 入力画面 を表示
    <Button 
        fullWidth
        color="secondary"
        variant="contained"
        size="large"
        endIcon={<AddCircleOutlineIcon />}
        onClick={displayAddButton}
    >新しいテーマを追加する</Button>
  ) : (
    <section>
      <Box component="form" noValidate autoComplete="off">
        <ThemeProvider theme={theme}>
          <FormControl >
            <TextField
              name="title"
              id="title"
              label="新タイトル"
              multiline
              minRows={3}
              placeholder="○○について"
              variant="filled"
              margin="dense"
              size="small"
              InputProps={{ style: textfieldStyles }}
              InputLabelProps={{ style: textlabelStyles }}
              value={values.title}
              onChange={handleChange}
            />
          </FormControl>
          <br />
          <br />
          <Button
            variant="contained"
            size="large"
            endIcon={<SendIcon />}
            disabled={(values.title) ? false : true}
            onClick={handleSubmit}
          >
            テーマを追加する
          </Button>
        </ThemeProvider>
      </Box>
    </section>
  );
};