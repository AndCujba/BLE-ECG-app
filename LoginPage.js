import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import {StyleSheet,Text,View,TextInput,TouchableOpacity,Image,} from 'react-native';
import { auth } from './firebase';

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation() 
useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged(user => {
    if (user) {
      navigation.replace("Home")
    }
  })
  return unsubscribe
}, [])

    const handleLogIn = () => {
      auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredentials => {
          const user = userCredentials.user;
          console.log('Logged in with:', user.email);
        })
        .catch(error => alert(error.message))
    }
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
    <View style={styles.inputView}>
      <TextInput
        style={styles.inputText}
        placeholder="Email"
        value={email}
        placeholderTextColor="#003f5c"
        onChangeText={text => setEmail(text)}/>
    </View>
    <View style={styles.inputView}>
      <TextInput
        style={styles.inputText}
        secureTextEntry
        placeholder="Password"
        value={password}
        placeholderTextColor="#003f5c"
        onChangeText={text => setPassword(text)}/>
    </View>
    <TouchableOpacity 
      onPress={() => navigation.replace("SignIn")}>
      <Text style={styles.forgotAndSignUpText}>Forgot Password?</Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress = {handleLogIn}
      style={styles.loginBtn}>
      <Text style={styles.loginText}>LOGIN </Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => navigation.navigate('SignIn')}>
      <Text style={styles.haveAccountText}>Don't have an account? <Text style={styles.forgotAndSignUpText}>Sign Up</Text></Text>
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
    inputView:{
    width:"80%",
    backgroundColor:"#ECE8DD",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
    },
    inputText:{
    height:50,
    color:"black"
    },
    haveAccountText:{
    color:"#A2B5BB",
    fontSize:11
    },
    loginBtn:{
    width:"60%",
    backgroundColor:"#F55050",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
    marginBottom:10
    },
    forgotAndSignUpText:{
    color:"#F55050",
    fontSize:11,
    margin:0,
    paddingTop:5,
    }
  });
