import { StyleSheet, Text, View } from 'react-native'
import React, { useState , useEffect } from 'react'
import LoginScreen from "../Screens/LoginScreen";
import SignupScreen from "../Screens/SignupScreen";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  Chathome  from "../Screens/Chathome";
import {onAuthStateChanged  } from "@firebase/auth";
import {game} from '../firebase/firebaseConfig';
import Icon from "react-native-vector-icons/MaterialIcons";
import ChatScreen from '../Screens/ChatScreen';
const Navigation = () => {
  
  const [user , setUser] = useState("")

  useEffect(() => {
    const unregister = onAuthStateChanged(game , userExist=>{
      if(userExist) setUser(userExist)
      else setUser("")
    })
  
    return () => {
      unregister()
    }
  }, [])
  

  const Stack = createNativeStackNavigator();
  return (
   
    <NavigationContainer>
      <Stack.Navigator 
       screenOptions={{
        headerTintColor:"#c4a53e"
       }}
      >
        {user? 
        <>
       <Stack.Screen name="Chathome" options={{
          title: 'ChatMate',
          headerStyle: {
            backgroundColor: '#e5e8a2',
            
          },
          headerRight:()=><Icon
          name="person"
          size={34}
          style={{marginRight:10}}
          />
           }} >
          {props => <Chathome {...props} user={user} />}
         </Stack.Screen>

         <Stack.Screen name="Chat"  options={ ({ route }) => ({ title: route.params.name , headerStyle:{backgroundColor:"#e5e8a2"} })} >

          {props => <ChatScreen {...props} user={user}/>}
         </Stack.Screen>
         </> 
        :
        <>
        <Stack.Screen name="Login" component={LoginScreen} options={{
          title: 'Login',
          headerStyle: {
            backgroundColor: '#e5e8a2',
            
          } ,}}></Stack.Screen>
        <Stack.Screen name="Signup" component={SignupScreen} options={{
          title: 'Sign Up  ',
          headerStyle: {
            backgroundColor: '#e5e8a2',
            
          } ,}}></Stack.Screen>
        </>
        }
        
        
      </Stack.Navigator>
    </NavigationContainer>
    
  )
}

export default Navigation

const styles = StyleSheet.create({})