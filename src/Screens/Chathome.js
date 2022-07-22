import { AsyncStorage, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useState , useEffect } from 'react'
import {game , db} from '../firebase/firebaseConfig';
import {signOut} from "@firebase/auth";

import CustomButton from "./CustomButton"
import { collection, getDocs , doc ,query, DocumentSnapshot ,where } from "firebase/firestore"; 




const Chathome = ({user,navigation}) => {
  const  [users , setUsers] = useState(null) 

  console.log(user)
  const getUser = async ()=>{
  //   const querySnapshot = await getDocs(collection(db, "users"));
  //  const alldata=  querySnapshot.forEach((doc) => {
  //     console.log(`${doc.id} => ${doc.data()}`);
    
  //   });
  const q = query(collection(db, "users"),where("uid", "!=", user.uid));

  const querySnapshot = await getDocs(q);
       const a =   querySnapshot.docs.map(docSnap=>docSnap.data())
      //  console.log(a)
       setUsers(a)
    
  }
  useEffect(() => {
    
   
   getUser() 
   }, [])

  const RenderCard = ({item})=>{
    return(
      <TouchableOpacity onPress={()=>{navigation.navigate('Chat',{name:item.name,uid:item.uid})}}>
  
    <View style={styles.rendercard}>
        <Text style={styles.text}>{item.name}</Text>
        
        <Text style={styles.text}>{item.email}</Text>
      </View> 
      </TouchableOpacity>
    )
  }
  
    
  

      const userSignout = () =>{
        signOut(game).then(() => {
          // Sign-out successful.
        }).catch((error) => {
          // An error happened.
        });
      }
      
    
    


 
  return (
    <View style={styles.container}>
      <FlatList
      data={users}
      renderItem={({item})=>{return <RenderCard item={item}/> }}
      keyExtractor={(item)=>item.uid}
      />
     
      <CustomButton text={"Log out"} onPress={()=> userSignout()} />
    </View>
  )
}

export default Chathome

const styles = StyleSheet.create({
  container:{
    flex :1,
    backgroundColor:"#e5e8a2",
    padding:5,
  },
  text:{
    fontSize:18,
    marginLeft:15
  },
  rendercard:{
    backgroundColor:"#c4a53e",
    borderBottomWidth:2,
    borderBottomColor:"grey",
    margin:3,
    padding:4,
    justifyContent:"space-between"
  }

})