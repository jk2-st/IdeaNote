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
import { createServer } from "miragejs"

let server = createServer()
server.get("/theme", [{ thme_id: "theme-1", title: "モックのタイトルです" }]);
server.get("/theme/1", [{ entity_id: "comment-1", comment: "コメントのモック" }, { entity_id: "comment-2", comment: "コメントその２"}]);

const ThemeList = () => {
  const [themes, setthemes] = useState([]);

  useEffect(() => {
    // APIリクエストを送信する処理
    // fetch('https://bxjn36imz9.execute-api.ap-northeast-1.amazonaws.com/prod/theme/')
    fetch('/theme')
      .then(response => response.json())
      .then(result => {
        setthemes(result);
      })
      .catch(error => {
        console.error('通信に失敗しました。', error);
        setthemes([]);
      });
  }, []);

    console.log('this is themes : ', themes);
  return (
    <Box bg="gray">
      <List spacing={1}>
        {themes.map(item => (
          <ListItem key={item.entity_id}>
            <Text>{item.title}</Text>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
const CommentList = () => {
  const [comments, setcomments] = useState([]);

  useEffect(() => {
    // APIリクエストを送信する処理
    // fetch('https://bxjn36imz9.execute-api.ap-northeast-1.amazonaws.com/prod/theme/1')
    fetch('/theme/1')
      .then(response => response.json())
      .then(result => {
        setcomments(result);
    });
  }, []);

    console.log('this is comments : ', comments);
  return (
    <Box bg="gray">
      <List spacing={1}>
        {comments.map(item => (
          <ListItem key={item.entity_id}>
            <Text>{item.comment}</Text>
          </ListItem>
        ))}
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
          <ThemeList/>
        </Box>
        <Box flex="1" p={4}>
          <Heading size="lg">Main Content</Heading>
          <MainContent />
        </Box>
      </Flex>
    </Flex>
    </>
  );
}

export default withAuthenticator(App);