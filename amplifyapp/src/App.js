import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
} from "@aws-amplify/ui-react";
import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import { createServer } from "miragejs";
import { CommentList } from './components/CommentList';
import { AddComment } from "./components/CommentForm";
import ButtonAppBar from "./components/AppBar";

import { useDispatch, useSelector } from 'react-redux';
import { setCognitoAuth } from "./redux/cognitoAuthSlice";
import { Auth } from 'aws-amplify';
import { NavigationBar } from "./components/NavigationBar";

// let server = createServer();
// server.get("/themes", [{ entity_id: "theme-1", title: "モックのタイトルです" },{ entity_id: "theme-2", title: "タイトル悩むね" }, { entity_id: "theme-3", title: "3番目だぜ" }]);
// server.get("/comments/themes/1", [{ entity_id: "comment-1", comment: "コメントのモック" }, { entity_id: "comment-2", comment: "コメントその２"}]);
// server.get("/comments/themes/2", [{ entity_id: "comment-4", comment: "テーマ２のコメント" }, { entity_id: "comment-5", comment: "the  aaaaa"}]);
// server.get("/comments/themes/3", [{ entity_id: "comment-9", comment: "テID=3ｄｄｄｄ" }, { entity_id: "comment-8", comment: "33333l"}, { entity_id: "comment-10", comment: "3コメントＺＷ"}]);
// server.post("/comments", [{ entity_id: "comment-13 ", comment: "コメント追加成功１"}, { entity_id: "comment-20", comment: "ＺＷ"}]);
// server.post("/themes", [{ entity_id: "theme-6", title: "テーマ追加新しく成功下モック" },{ entity_id: "theme-9", title: "適当追加タイトル" }]);

function App({ signOut }) {
  const dispatch = useDispatch();
  const checkAuth = async () => {
    try {
      Auth.currentUserPoolUser()
        .then(response => {
          const token = response.signInUserSession.idToken.jwtToken;
          dispatch(setCognitoAuth(token));
        });
    } catch (error) {
      // 認証期限切れの場合はログイン画面にリダイレクトするなどの処理を行う
      // 例えば、React Routerのhistory.push('/')を使用してログイン画面に遷移することができます。
      await Auth.signOut();
    }
  };
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <>
      <ButtonAppBar signOut={signOut}/>
      <Box sx={{display: 'flex', height:"calc(100% - 64px)"}}>
        <Box flex="2">
        <NavigationBar />
          <CommentList />
          <AddComment />
        </Box>
      </Box>
    </>
  );
}

export default withAuthenticator(App);