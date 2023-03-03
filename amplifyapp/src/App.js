import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  // Button,
  // Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";
import React, { useState, useEffect } from 'react';
import { Box, Flex, List, Spacer, Heading, Button , ListItem, Text } from '@chakra-ui/react';
import { createServer } from "miragejs";
import ThemeComponent from "./components/ThemeComponent";
import { useDispatch, useSelector } from 'react-redux';
import { setComments } from "./redux/commentSlice";
import { setThemeList } from "./redux/themeListSlice";
import { setSelectedThemeId } from './redux/selectedThemeSlice';

let server = createServer();
server.get("/theme", [{ entity_id: "theme-1", title: "モックのタイトルです" },{ entity_id: "theme-2", title: "タイトル悩むね" }, { entity_id: "theme-3", title: "3番目だぜ" }]);
server.get("/theme/1", [{ entity_id: "comment-1", comment: "コメントのモック" }, { entity_id: "comment-2", comment: "コメントその２"}]);
server.get("/theme/2", [{ entity_id: "comment-4", comment: "テーマ２のコメント" }, { entity_id: "comment-5", comment: "the  aaaaa"}]);
server.get("/theme/3", [{ entity_id: "comment-9", comment: "テID=3ｄｄｄｄ" }, { entity_id: "comment-8", comment: "33333l"}, { entity_id: "comment-10", comment: "3コメントＺＷ"}]);

const ThemeList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    // APIリクエストを送信する処理
    // fetch('https://bxjn36imz9.execute-api.ap-northeast-1.amazonaws.com/prod/theme/')
    fetch('/theme')
      .then(response => response.json())
      .then(result => {
        dispatch(setThemeList(result));
      })
      .catch(error => {
        console.error('通信に失敗しました。', error);
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
const CommentList = () => {
  const theme_id = useSelector((state) => state.selectedTheme.id);
  const dispatch = useDispatch();

  useEffect(() => {
    if (theme_id == 0) return;
    // ここでAPIリクエストを行い、テーマを取得する等の処理を行う
    // fetch('https://bxjn36imz9.execute-api.ap-northeast-1.amazonaws.com/prod/theme/1')
    fetch('/theme/' + theme_id)
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
    <Box bg="gray">
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
const MainContent = () => {

  return (
    <>
    <Flex
      backgroundColor="white"
      width="200px"
      height="100vh"
      flexDirection="column"
    >
      <CommentList />
    </Flex>
    </>
  );
};

function App({ signOut }) {
  return (
    <>
      <Flex direction="column" height="100vh">
      <Box bg="blue" color="white" p={4}>
        <Flex alignItems="center">
          <Heading size="md">My App</Heading>
          <Spacer />
          <Button onClick={signOut}>Sign Out</Button>
        </Flex>
      </Box>
      <Flex height="calc(100% - 64px)">
        <Box w="240px" bg="gray" p={4}>
          <Heading size="sm">Navigation</Heading>
          <ThemeList />
        </Box>
        <Box flex="1" p={4}>
          <Heading size="lg">Main Content</Heading>
          <MainContent />
        </Box>
        <ThemeComponent />
      </Flex>
    </Flex>
    </>
  );
}

export default withAuthenticator(App);