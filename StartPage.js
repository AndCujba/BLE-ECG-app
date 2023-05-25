import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
StyleSheet,Text,View,TouchableOpacity,Image} from 'react-native';

export default function StartPage() {
    const navigation = useNavigation()
  return (
  <View style={styles.container}>
    <Image
         source={require('./faviconLogin.png')}
         style={{
          width: '70%',
          height: 140,
          resizeMode: 'contain',
          margin: 0,
        }} />
    
    <TouchableOpacity
      onPress={() => navigation.replace("LogIn")}
      style={styles.Btn}>
      <Text style={styles.loginText} >LOG IN </Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => navigation.replace("SignIn")}
      style={styles.Btn}>
      <Text style={styles.loginText}>SIGN IN </Text>
    </TouchableOpacity>
  </View>
  );
  }

  const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingTop:100,
    },
    title:{
    fontWeight: "bold",
    fontSize:50,
    color:"#E26868",
    marginBottom: 40,
    fontFamily: 'Arial Black',
    },
    Btn:{
    width:"60%",
    backgroundColor:"#F55050",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:5,
    marginBottom:10
    }
  });
