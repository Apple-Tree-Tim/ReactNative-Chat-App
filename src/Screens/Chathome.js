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
    let mounted = true;
   
   getUser() 
  return ()=> {mounted = false}
   }, [])

  const RenderCard = ({item})=>{
    return(
      <TouchableOpacity  onPress={()=>{navigation.navigate('Chat',{name:item.name,uid:item.uid})}}>
  
    <View style={styles.rendercard}>
      <View style={styles.chatBox}>
        <Text style={styles.text1}>{item.name}</Text>
        
        <Text style={styles.text2}>{item.email}</Text>
        </View>
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
    backgroundColor:"white",
    padding:8,
    
    
  },
  chatBox : {
    flexDirection:"row" ,
   justifyContent:"space-between",
   height:60,


  },
  text1:{
    fontSize:18,
    marginLeft:15,
    flexDirection:"row",
    backgroundColor:"gray",
    borderRadius:30,
    justifyContent:"center",
    textAlign:"center",
    height:60,
    width:60,
    margin: "auto",
    padding: 17,
    fontSize: 16,
    color:"white",
    
  },
  text2:{
    fontSize:18,
    marginLeft:15,
    fontSize:15
    
    
  },
  rendercard:{
    backgroundColor:"white",
    borderBottomWidth:2,
    borderBottomColor:"grey",
    margin:3,
    marginTop:8,
    padding:4,
    justifyContent:"space-between",
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,
  }

})