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

let server = createServer();
server.get("/theme", [{ entity_id: "theme-1", title: "モックのタイトルです" }]);
server.get("/theme/1", [{ entity_id: "comment-1", comment: "コメントのモック" }, { entity_id: "comment-2", comment: "コメントその２"}]);
server.get("/theme/2", [{ entity_id: "comment-4", comment: "テーマ２のコメント" }, { entity_id: "comment-5", comment: "the  aaaaa"}]);

const ThemeList = () => {
  // useEffect(() => {
    // APIリクエストを送信する処理
    // fetch('https://bxjn36imz9.execute-api.ap-northeast-1.amazonaws.com/prod/theme/')
  //   fetch('/theme')
  //     .then(response => response.json())
  //     .then(result => {
  //       setthemes(result);
  //     })
  //     .catch(error => {
  //       console.error('通信に失敗しました。', error);
  //       setthemes([]);
  //     });
  // }, []);

  const fetchComment = (entity_id) => {
    // const data = {theme_id: entity_id};
    // dispatch(setData(data));
  }
  return (
    <Box bg="gray">
      <List spacing={1}>
        {/* {themes.map(item => (
          <ListItem key={item.entity_id}>
            <Button onClick={fetchComment(item.entity_id)}>{item.title}</Button>
          </ListItem>
        ))} */}
      </List>
    </Box>
  );
};
const CommentList = () => {
  // useEffect(() => {
    // APIリクエストを送信する処理
    // fetch('https://bxjn36imz9.execute-api.ap-northeast-1.amazonaws.com/prod/theme/1')
  //   fetch('/theme/' + theme_id)
  //     .then(response => response.json())
  //     .then(result => {
  //       setcomments(result);
  //   });
  // }, []);

    // console.log('this is comments : ', comments);
  return (
    <Box bg="gray">
      <List spacing={1}>
        {/* {comments.map(item => (
          <ListItem key={item.entity_id}>
            <Text>{item.comment}</Text>
          </ListItem>
        ))} */}
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
      {/* <Flex direction="column" height="100vh">
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
          <ThemeList/>
        </Box>
        <Box flex="1" p={4}>
          <Heading size="lg">Main Content</Heading>
          <MainContent />
        </Box>
        <ThemeComponent />
      </Flex>
    </Flex> */}
    <ThemeComponent />
    </>
  );
}

export default withAuthenticator(App);