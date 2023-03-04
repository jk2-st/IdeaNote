import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
} from "@aws-amplify/ui-react";
import React from 'react';
import Box from '@mui/material/Box';
import { createServer } from "miragejs";
import { ThemeList } from './components/ThemeList';
import { CommentList } from './components/CommentList';
import { AddComment } from "./components/CommentForm";
import ButtonAppBar from "./components/AppBar";
import { AddTheme } from "./components/ThemeForm";

let server = createServer();
server.get("/theme", [{ entity_id: "theme-1", title: "モックのタイトルです" },{ entity_id: "theme-2", title: "タイトル悩むね" }, { entity_id: "theme-3", title: "3番目だぜ" }]);
server.get("/theme/1", [{ entity_id: "comment-1", comment: "コメントのモック" }, { entity_id: "comment-2", comment: "コメントその２"}]);
server.get("/theme/2", [{ entity_id: "comment-4", comment: "テーマ２のコメント" }, { entity_id: "comment-5", comment: "the  aaaaa"}]);
server.get("/theme/3", [{ entity_id: "comment-9", comment: "テID=3ｄｄｄｄ" }, { entity_id: "comment-8", comment: "33333l"}, { entity_id: "comment-10", comment: "3コメントＺＷ"}]);
server.post("/comment", [{ entity_id: "comment-13 ", comment: "コメント追加成功１"}, { entity_id: "comment-20", comment: "ＺＷ"}]);
server.post("/theme", [{ entity_id: "theme-6", title: "テーマ追加新しく成功下モック" },{ entity_id: "theme-9", title: "適当追加タイトル" }]);

function App({ signOut }) {
  return (
    <>
      <ButtonAppBar signOut={signOut}/>
      <Box sx={{display: 'flex', height:"calc(100% - 64px)"}}>
        <Box flex="1" sx={{width: 1/6}}>
          <ThemeList />
          <AddTheme />
        </Box>
        <Box flex="2">
          <CommentList />
          <AddComment />
        </Box>
      </Box>
    </>
  );
}

export default withAuthenticator(App);