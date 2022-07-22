import { StyleSheet, Text, View , Image, ScrollView, Touchable, TouchableOpacity ,ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton"
import {signInWithEmailAndPassword} from "@firebase/auth";
import  Chathome  from "./Chathome";
import {game} from '../firebase/firebaseConfig';

const LoginScreen = ({navigation}) => {
    const [email , setEmail] =  useState("")
    const [password , setPassword] =  useState("")
    const [issignInuser , setsignInuser] = useState(false)
    const [loading , setLoading] = useState(false)

    if(loading){
      return <ActivityIndicator size="large" color="black"/>
    }
    const signInuser  = async () =>{
      setLoading(true)

      try{
      await  signInWithEmailAndPassword(game , email,password)
      setLoading(false)
      setsignInuser(true)
      
    }
    
      catch(err){
        
          alert('That email or password invaild!');
        
      
    }
   
  }
  
  return (
    
    <View style={styles.container}  >
      {/* <Text style={styles.text}>Wellcome to ChatMate 5.0</Text>
      <Image style={styles.image} source={require("../assests/logo.gif")}/>
      <CustomInput placeholder="email" value = {email} setValue = {setEmail}/>
      <CustomInput placeholder="password" value = {password} setValue = {setPassword} secureTextEntry={true}/> */}
      {/* {
        issignInuser ?
        alert("Please Create Your Account")
        :
        
        <Chathome/>

        
      } */}
       {!issignInuser &&
        <>
        <Text style={styles.text}>Wellcome to ChatMate 5.0</Text>
      <Image style={styles.image} source={require("../assests/logo.gif")}/>
      <CustomInput placeholder="email" value = {email} setValue = {setEmail}/>
      <CustomInput placeholder="password" value = {password} setValue = {setPassword} secureTextEntry={true}/>
       
        </>
      }
        {issignInuser?
          <>
      
         </>
         :
         <CustomButton text={"Login In"} onPress={()=> signInuser()} />
          
      }
      
      <TouchableOpacity onPress={()=>navigation.navigate("Signup")}><Text>Don't have an account? Create one</Text></TouchableOpacity> 
    </View>
  
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  text:{
    fontSize:22,
  },
  image:{
    width:250,
    height:250,
    
  },
  container:{
   alignItems:"center",
   flex :1,
    backgroundColor:"#e5e8a2",
    padding:10,
    
   
    
   
  }
})