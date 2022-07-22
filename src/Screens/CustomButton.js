import { StyleSheet, Text, View ,Pressable } from 'react-native'
import React from 'react'

const CustomButton = ({onPress , text , type , bgColor , fgColor}) => {
  return (
    <Pressable onPress={onPress} 
    style={[styles.container  , styles[`container_${type}`],
    bgColor ? {backgroundColor: bgColor} : {}    
    ]}>
      <Text style={[styles.text, fgColor ? {color : fgColor }:{} ]}>{text}</Text>
    </Pressable>
  )
}

export default CustomButton

const styles = StyleSheet.create({
    container:{
        backgroundColor :"#c4a53e",
        width:"100%",
        padding:15,
        marginVertical:5,
        alignItems : "center",
        borderRadius: 5,
},
container_PRIMARY:{backgroundColor :"#c4a53e"},
container_TERTIARY:{backgroundColor :"white",
color:"black"},
    text:{
        fontWeight:"bold",
        color:"white"
    }
})