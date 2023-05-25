import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from './firebase';


export default function HomePage() {
    const [isConnected, setIsConnected] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
  
    const [isConnectionVisible, setIsConnectionVisible] = useState(false);
    

    const toggleConnectionModal = () => {
      setIsConnectionVisible((prevVisible) => !prevVisible);
    };

    const navigation = useNavigation()

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace("Start")
            })
            .catch(error => alert(error.message))
    }

    return (
      <View style={styles.container}>
       <TouchableOpacity
              style={[ styles.logoutButton]} 
              onPress={handleSignOut}
            >
              <Text style={styles.logoutButtonText}>Log Out</Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
  <View style={{flex: 1, height: 1, backgroundColor: '#007AFF'}} />
  <View>
    {/* <Text style={{width: 50, textAlign: 'center'}}>Hello</Text> */}
    <Text style={styles.title}>Scan ECG</Text>
  </View>
  <View style={{flex: 1, height: 1, backgroundColor: '#007AFF'}} />
</View>
          
        
        <View style={styles.instructionsContainer}>
            <Text style={styles.instructions}>
                Please place the sensors on your chest as shown to begin monitoring your ECG.</Text>
            <Image source={require('./ssensors.png')} style={styles.sensorImage} />
            <Text style={styles.instructions}>
                Connect to BLE device by turning on Bluetooth and pressing the Connect Button. Once the connection is ready, press on Start Button that will redirectionate you to Recording Page.</Text>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.connectButton, isConnected && styles.disabledButton]}
            onPress={() => navigation.replace("ECG")}
            disabled={isConnected}
          >
            <Text style={styles.buttonText}>{isConnected ? 'Connected' : 'Connect to BLE'}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.recordButton, !isConnected || isRecording && styles.disabledButton]}
            // onPress={() => navigation.replace("ECG")}
            // disabled={!isConnected || isRecording}
          >
            <Text style={styles.buttonText}>Scan</Text>
          </TouchableOpacity>
          </View>
          
      
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: '#fff',
      paddingTop: 15,
    },

    header: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    logoutButton: {
      backgroundColor: 'gray',
      padding: 0,
      width:40,
      height:40,
      borderRadius:50,
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 300,
      marginBottom: -15,
    },
    logoutButtonText: {
      fontSize: 14,
      color: '#fff',

    },
    instructionsContainer: {
        flex: 1,
        alignItems: 'center',
        marginVertical: 20,
        marginRight: 20,
        marginTop: 10,
        alignItems: 'center',
    },
    instructions: {
        textAlign: 'center',
        color: '#a6a6a6',
        paddingHorizontal: 20,
        fontSize: 16,
        lineHeight: 24,
    },
    sensorImage: {
        width: 120,
        height: 120,
        marginTop: 20,
        marginBottom: 30,
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      marginTop: 0,
      color: '#007AFF',
      textAlign: 'center',
      width: 140,
    },
    buttonsContainer: {
      flexDirection: 'row',
        bottom: 80,
    },
    button: {
      padding: 16,
      borderRadius: 8,
      marginHorizontal: 8,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#007AFF',
    },
    connectButton: {
      backgroundColor: '#007AFF',
    },
    recordButton: {
      backgroundColor: '#8BC34A',
    },
    disabledButton: {
      opacity: 0.5,
    },
    buttonText: {
      fontSize: 16,
      color: '#fff',
      fontWeight: 'bold',
    },
  });
 

