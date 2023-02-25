import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";
import React, { useState, useEffect } from 'react';
import { Box, Flex, List, ListItem, Text } from '@chakra-ui/react';

const Sidebar = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // APIリクエストを送信する処理
    fetch('https://bxjn36imz9.execute-api.ap-northeast-1.amazonaws.com/prod/theme/1')
      .then(response => response.json())
      .then(result => {
        console.log('data is : ' , result);
        setData(result);
    });
  }, []);

    console.log('this is data : ', data);
  return (
    <Box bg="gray.100" w={200} p={4}>
      <List spacing={3}>
        {data.map(item => (
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
      backgroundColor="gray.100"
      width="200px"
      height="100vh"
      flexDirection="column"
    >
      <Text fontSize="lg" fontWeight="bold">コメント１</Text>
      <Text fontSize="lg" fontWeight="bold">コメント２</Text>
      <Text fontSize="lg" fontWeight="bold">なにも思いつかない</Text>
    </Flex>
    </>
  );
};

function App({ signOut }) {
  return (
    // <View className="App">
    //   <Card>
    //     <Image src={logo} className="App-logo" alt="logo" />
    //     <Heading level={1}>We now have Auth!</Heading>
    //   </Card>
    //   <Button onClick={signOut}>Sign Out</Button>
    // </View>
    <>
      <Button onClick={signOut}>Sign Out</Button>
      <Flex>
      <Sidebar />
      <MainContent />
      </Flex>
    </>
  );
}

export default withAuthenticator(App);