import logo from "./logo.svg";
import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
  Heading,
  Image,
  View,
  Card,
} from "@aws-amplify/ui-react";
import { Box, Flex, Spacer, Text } from '@chakra-ui/react';

const Sidebar = () => {
  return (
    <Box bg="gray.900" color="white" h="100vh" w="200px" p="4">
      <Text fontSize="lg" fontWeight="bold">Sidebar</Text>
    </Box>
  );
};

const MainContent = () => {
  return (
    <Box >
      <Text fontSize="lg">Main Content</Text>
    </Box>
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
    <Flex>
    <Sidebar />
    <MainContent />
    <Button onClick={signOut}>Sign Out</Button>
    </Flex>
  );
}

export default withAuthenticator(App);