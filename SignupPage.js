import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/core';
import {StyleSheet,Text,View,TextInput,TouchableOpacity,Image,} from 'react-native';
import { auth } from './firebase'; 

const SignupPage =  () => {
    const [name, setName] = useState('')
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

    const handleSignUp = () => {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
          const user = userCredentials.user;
          console.log('Registered with:', user.email);
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
        placeholder="Your Name"
        placeholderTextColor="#003f5c"
        onChangeText={text => setName(text)}/>
    </View>
    <View style={styles.inputView}>
      <TextInput
        style={styles.inputText}
        placeholder="Email"
        placeholderTextColor="#003f5c"
        onChangeText={text => setEmail(text)}/>
    </View>
    <View style={styles.inputView}>
      <TextInput
        style={styles.inputText}
        secureTextEntry
        placeholder="Password"
        placeholderTextColor="#003f5c"
        onChangeText={text => setPassword(text)}/>
    </View>
    <TouchableOpacity
      onPress = {handleSignUp}
      style={styles.signupBtn}>
      <Text style={styles.signText}>SIGN UP </Text>
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => navigation.replace("LogIn")}>
      <Text style={styles.haveAccountText}>Have an account? <Text style={styles.loginText}>Log In</Text></Text>
    </TouchableOpacity>
  </View>
  );
  }

  const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingTop:50,
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
    signupBtn:{
    width:"60%",
    backgroundColor:"#F55050",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:20,
    marginBottom:10
    },
    loginText:{
    color:"#F55050",
    fontSize:11,
    margin:0,
    }
  });



export default SignupPage;