import { StyleSheet, Text, View , Image, ScrollView, KeyboardAvoidingView  , TouchableOpacity, ActivityIndicator} from 'react-native'
import React, { useState } from 'react'
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton"
// import {launchImageLibrary} from 'react-native-image-picker';
import {game , store , db} from '../firebase/firebaseConfig';
import {createUserWithEmailAndPassword} from "@firebase/auth";
// import { storage } from "../firebase/firebaseConfig";
import { getStorage, ref, uploadBytesResumable, getDownloadURL  , uploadBytes} from "firebase/storage";
import { async } from '@firebase/util';
import { firebase } from '@react-native-firebase/auth';
import { Colors } from 'react-native/Libraries/NewAppScreen';
// import storage from "@react-native-firebase/storage";
import { addDoc, collection ,doc, setDoc } from "firebase/firestore"; 


const SignupScreen = ({navigation}) => {

  // const storage = getStorage();

    const [email , setEmail] =  useState("")
    const [password , setPassword] =  useState("")
    const [name , setName] =  useState("")
    const [image , setImage] =  useState(null)
    const [showNext, setshowNext] =  useState(false)
    const [imgupload, setimgupload] =  useState("")
    const [Imageuri, setImageuri] =  useState("")
    const [loading , setLoading] = useState(false)

    if(loading){
      return <ActivityIndicator size="large" color="black"/>
    }

    const userSignup = async () => {
      setLoading(true)
      if (!email || !password || !name){
       alert("Please Fill All Feilds")
       return
      }
      
      try {
     const result =  await  createUserWithEmailAndPassword(game , email,password)
    //  .then(() => {
    //     alert('User account created & signed in!');
        
    //   }).catch(error => {
    //     if (error.code === 'auth/email-already-in-use') {
    //       alert('That email address is already in use!');
    //     }
    
    //     if (error.code === 'auth/invalid-email') {
    //       alert('That email address is invalid!');
    //     }
    
    //     console.error(error);
    //   });

      console.error("result" + result);
        const docRef = await addDoc(collection(db, "users"), {
          name:name,
          email:result.user.email,
          uid:result.user.uid
        });
      setLoading(false)
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }

    }
    // const pickImage =  () =>{
      
    //   launchImageLibrary({quality:0.5},  response =>{
    //     console.log(`response = ` ,  response);
    //     if (response.didCancel) {
    //       console.log("User cancelled image picker")
    //     } else if(response.error) {
    //       console.log('imagepicker eroor ' , response.error)
    //     }else if(response.CustomButton) {
    //       console.log('user taped custombutton  ' , response.CustomButton)
    //     }else {
    //       const source = {uri : 'data:image/jpeg;base64,' + response.base64};
    //       setImageuri(source);
    //       console.log(Imageuri);
    //     }
        

    //   } )}
    //   const metadata = {
    //           contentType: 'image/jpeg',
              
    //         };
    //         let  storageRef = ref(store, `image/`);
    //     const uploadTask = uploadBytesResumable(storageRef, Imageuri ,metadata);
    //     uploadTask.on('state_changed', (snapshot) =>{
    //       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //          console.log('Upload is ' + progress + '% done');
    //          switch (snapshot.state) {
    //                 case 'paused':
    //                   console.log('Upload is paused');
    //                   break;
    //                 case 'running':
    //                   console.log('Upload is running');
    //                   break;
    //               }
    //             }, 
    //             (error) => {
    //               console.log("faild")
    //             }, 
    //             () => {
    //               // Upload completed successfully, now we can get the download URL
    //               getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //                 console.log('File available at', downloadURL);
    //                 setImage(downloadURL)
    //             });
    //           },
    //         (error) => {
    //             alert(error);
    //         },
    //         () => {
    //             getDownloadURL(uploadTask.snapshot.ref)
    //             .then(() => {
    //                 // setDoc(doc(db, 'Store', storeKey, 'coffeeDB', name), {postImage: URL}, {merge: true});
    //                 console.log('url registered')
    //             });
    // }
    //     )
  
      
  return (
    
    <View  style={styles.container}>
      <Text style={styles.text}>Wellcome to ChatMate 5.0</Text>
      <Image style={styles.image} source={require("../assests/logo.gif")}/>
     
      {!showNext &&
        <>
        <CustomInput placeholder="email" value = {email} setValue = {setEmail}/>
        <CustomInput placeholder="password" value = {password} setValue = {setPassword} secureTextEntry={true}/> 
       
        </>
      }
        {showNext?
          <>
      <CustomInput placeholder="name" value = {name} setValue = {setName}/>
      <CustomButton text={"upload profile"} setValue = {setName} />
      <CustomButton text={"Signup"} onPress={()=>userSignup()}/>
         </>
         :
         <>
         <CustomButton text={"Next"} onPress={()=>{setshowNext(true)}}/>
         <TouchableOpacity onPress={()=>navigation.navigate("Login")}><Text>You have an account? Sign in</Text></TouchableOpacity>
          </>
      }
      
      {/* <Text onPress={whenforgotPressed}>forgot Password</Text> */}
      <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' , padding:50 }}>
        
        {/* <CustomButton style={{width: "40%"}} text={"SignInFacebook"} onPress={whenFacebookPressed} bgColor="#E7EAF4" fgColor="#4765A9"/> */}
        
        {/* <CustomButton style={{width: "40%"}} text={"SignInGoogle"} onPress={whenGooglePressed} bgColor="#FAE9EA" fgColor="#DD4D44"/> */}
    
       
      </View>
      
       {/* <Text onPress={onSignUp}>Don't have an account? Create one</Text>  */}
    </View>
    
    
  )
}

export default SignupScreen

const styles = StyleSheet.create({
  text:{
    fontSize:22,
  },
  image:{
    width:250,
    height:250,
    backgroundColor:"white"
  },
  container:{
   alignItems:"center",
   backgroundColor:"#e5e8a2",
    flex : 1,
    padding:10,
   
  }
})