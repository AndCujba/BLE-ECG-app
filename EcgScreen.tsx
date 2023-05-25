import React, {useState, useEffect} from 'react';
import { useNavigation } from '@react-navigation/core';
import {SafeAreaView,StyleSheet,Text,TouchableOpacity,View,} from 'react-native';
import DeviceModal from './DeviceConnectionModal';
import PulseIndicator from './PulseIndicator';
import useBLE from './useBLE';

const EcgScreen = () => {
  const {
    requestPermissions,
    scanForPeripherals,
    allDevices,
    connectToDevice,
    connectedDevice,
    heartRate,
    disconnectFromDevice,
  } = useBLE();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [value, setValue] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      // Generate a random value between 60 and 100
      const newValue = Math.floor(Math.random() * (80 - 60 + 1) + 60);
      
      setValue(newValue);
    }, 3000);

    // Clean up function
    return () => {
      clearInterval(interval);
    };
  }, []);
  const navigation = useNavigation() 

  const scanForDevices = () => {
    requestPermissions(isGranted => {
      if (isGranted) {
        scanForPeripherals();
      }
    });
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const openModal = async () => {
    scanForDevices();
    setIsModalVisible(true);
  };

  return ( 
    <>
    <SafeAreaView style={styles.container}>
      <View style={styles.heartRateTitleWrapper}>
        {connectedDevice ? (
          <>
            <PulseIndicator />
            <Text style={styles.heartRateTitleText}>Your Heart Rate Is:</Text>
            <Text style={styles.heartRateText}>{value} bpm</Text>
          </>
        ) : (
            <>
          <Text style={styles.heartRateTitleText}>
            Please Connect to a Heart Rate Monitor
          </Text>
          <TouchableOpacity 
                style={[ styles.backButton]} 
                onPress={() => navigation.replace("Home")}>
                 <Text>Back</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      <TouchableOpacity
        onPress={connectedDevice ? disconnectFromDevice : openModal}
        style={styles.ctaButton}>
        <Text style={styles.ctaButtonText}>
          {connectedDevice ? 'Disconnect' : 'Connect'}
        </Text>
      </TouchableOpacity>
      <DeviceModal
        closeModal={hideModal}
        visible={isModalVisible}
        connectToPeripheral={connectToDevice}
        devices={allDevices}
      />
    </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  backButton: {
    marginBottom: 0,
    marginLeft: 0,
  },
  heartRateTitleWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartRateTitleText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 20,
    color: 'black',
  },
  heartRateText: {
    fontSize: 25,
    marginTop: 15,
    color: 'black',
  },
  ctaButton: {
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginHorizontal: 20,
    marginBottom: 35,
    borderRadius: 8,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default EcgScreen;
