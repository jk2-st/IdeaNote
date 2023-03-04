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
import { ThemeList } from './components/ThemeList';
import { CommentList } from './components/CommentList';

let server = createServer();
server.get("/theme", [{ entity_id: "theme-1", title: "モックのタイトルです" },{ entity_id: "theme-2", title: "タイトル悩むね" }, { entity_id: "theme-3", title: "3番目だぜ" }]);
server.get("/theme/1", [{ entity_id: "comment-1", comment: "コメントのモック" }, { entity_id: "comment-2", comment: "コメントその２"}]);
server.get("/theme/2", [{ entity_id: "comment-4", comment: "テーマ２のコメント" }, { entity_id: "comment-5", comment: "the  aaaaa"}]);
server.get("/theme/3", [{ entity_id: "comment-9", comment: "テID=3ｄｄｄｄ" }, { entity_id: "comment-8", comment: "33333l"}, { entity_id: "comment-10", comment: "3コメントＺＷ"}]);

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
          <CommentList />
        </Box>
        <ThemeComponent />
      </Flex>
    </Flex>
    </>
  );
}

export default withAuthenticator(App);