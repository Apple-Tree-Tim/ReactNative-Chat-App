 import { StyleSheet, Text, View ,TouchableOpacity, AsyncStorage ,Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import {signOut} from "firebase/auth";
import {game ,db} from '../firebase/firebaseConfig';
import { GiftedChat  , Bubble , InputToolbar , Send} from 'react-native-gifted-chat';
import { addDoc, collection ,doc, setDoc , updateDoc , serverTimestamp , getDocs,query, orderBy , onSnapshot } from "firebase/firestore"; 
import { async } from '@firebase/util';

const ChatScreen = ({user,route}) => {
  const [messages, setMessages] = useState([]);
  const {uid} = route.params;

  const chatdata = async () =>{
    const docid = uid > user.uid ? user.uid+ "-" + uid : uid+"-" +user.uid
    const q = query(collection(db, "chatroom" , docid , "messages"), orderBy("createdAt","desc"));

    const querySnapshot = await getDocs(q);
         const a =   querySnapshot.docs.map(docSnap=>{
          const data = docSnap.data()
          return {
            ...docSnap.data(),
            createdAt:docSnap.data().createdAt.toDate()
          }
         })
         console.log(a)
         setMessages(a)
  }

  useEffect(() => {
    // chatdata()
    
    const docid = uid > user.uid ? user.uid+ "-" + uid : uid+"-" +user.uid


    const q = query(collection(db, "chatroom" , docid , "messages"), orderBy("createdAt","desc"));
          onSnapshot(q, (snapshot) => {

            let data =[]

            snapshot.docs.forEach((docSnap)=>{
              data.push({...docSnap.data() ,createdAt:new Date() })
            })
          
          

      setMessages(data);
    });
  }, [])

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'Native',
  //         avatar: 'https://placeimg.com/140/140/any',
  //       },
  //     },
  //   ])
  // }, [])

  const onSend =(messageArray) => {
    const msg = messageArray[0]
    const mymsg = {
        ...msg,
        sentBy:user.uid,
        sentTo:uid, 
        
    }
   setMessages(previousMessages => GiftedChat.append(previousMessages,mymsg))

    const docid = uid > user.uid ? user.uid+ "-" + uid : uid+"-" +user.uid
   

    // Add a new document with a generated id  
    addDoc(collection(db, "chatroom",docid,"messages"), {...mymsg });
  }


  return (
    <View style={{flex:1, backgroundColor:"white"}}>
    <GiftedChat
                messages={messages}
                onSend={text => onSend(text)}
                user={{
                    _id: user.uid,
                }}
                renderBubble = {(props) => {
                  return (
                   
                    <Bubble
                      {...props}
                      wrapperStyle={{
                       
                        right: {
                          backgroundColor: "#c4a53e",
                          marginRight:10
                        },
                        left: {
                          backgroundColor: "#e5e8a2",
                          marginRight:30,
                          marginLeft:-32
                          
                          
                        }
                        
                      }}
                    />
                    
                  )}}
                  renderInputToolbar ={(props) =>{
                    // Here you will return your custom InputToolbar.js file you copied before and include with your stylings, edits.
                    return <InputToolbar {...props} containerStyle={{borderWidth: 2, borderColor : "#c4a53e" , borderRadius:20,  marginBottom:1}} />
                    
               }}
               renderSend = {(props) => {
                return (
                  <Send
                      {...props}
                      containerStyle={{
                        // height: 50,
                        // width: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                  >
                      <View style={{marginRight: 10, marginBottom: 0}}>
                          <Image style={{height:40, width: 40 , backgroundColor:"white"}} source={require('../assests/send1.jpg')} resizeMode={'center'}/>
                      </View>
                  </Send>
              );
                       
                
              
            }}
               
                      
                    
                  
    />
      </View>
    
  
  )
}

export default ChatScreen

const styles = StyleSheet.create({})


///chatroom/0ao82pm3QYhonPouanv67c5Qdri2-4eBTN50viidLn3UuEW5guKNFSSo1