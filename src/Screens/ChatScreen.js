 import { StyleSheet, Text, View ,TouchableOpacity, AsyncStorage } from 'react-native'
import React, { useState, useEffect } from 'react'
import {signOut} from "firebase/auth";
import {game ,db} from '../firebase/firebaseConfig';
import { GiftedChat } from 'react-native-gifted-chat';
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



    // const q = query(collection(db, "chatroom" , docid , "messages"), orderBy("createdAt","desc"));
    
    //         onSnapshot(q, (querySnapshot) => {
    
    //   const a = querySnapshot.docChanges().map(docSnap => {
    //   const  data =  docSnap.doc.data()
       
    //     return {
    //        ...docSnap.doc.data(),
    //        createdAt:docSnap.doc.data().createdAt.toDate()
    //    }
      
    //   });
    //   console.log(a)
    //   setMessages(a)    
    // });
            
    
  
          
        

    
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
        // createdAt: new Date()
    }
   setMessages(previousMessages => GiftedChat.append(previousMessages,mymsg))

    const docid = uid > user.uid ? user.uid+ "-" + uid : uid+"-" +user.uid
    //    addDoc(collection(db, "chatroom" ), {
    //   mymsg
    // });
    // setDoc(doc(db, docid), mymsg);
    // addDoc(collection(db, "cities"), mymsg);

    // Add a new document with a generated id
 const direction = collection(db, "chatroom",docid,"messages");

// // // later...
//   setDoc(direction, {...mymsg});

  // setDoc(doc(collection(db, "chatroom",docid,"messages")), {...mymsg})
    addDoc(collection(db, "chatroom",docid,"messages"), {...mymsg });
  


  


     
  }
  return (
    <View style={{flex:1}}>
    <GiftedChat
                messages={messages}
                onSend={text => onSend(text)}
                user={{
                    _id: user.uid,
                }}
               
                      
                    
                  
    />
      </View>
    
  
  )
}

export default ChatScreen

const styles = StyleSheet.create({})