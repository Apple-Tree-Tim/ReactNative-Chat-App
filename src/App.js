import { StyleSheet, Text, View, StatusBar, SafeAreaView} from 'react-native'
import React from 'react'
import SignupScreen from "./Screens/SignupScreen";
import LoginScreen from "./Screens/LoginScreen";
import Navigation from "../src/Navigation/Navigation";
import Chathome from "../src/Screens/Chathome";
import ChatScreen from "../src/Screens/ChatScreen";
const App = () => {
  return (
    <>
    <StatusBar backgroundColor="#c4a53e" barStyle="light-content" />
    <View style={styles.container}>
   <Navigation/>  
    {/* <ChatScreen/> */}
    </View>
    </>
     
  )
}

export default App

const styles = StyleSheet.create({
  container:{
    flex :1,
    backgroundColor:"#e5e8a2",
    
  }
})
