import React, { useState,useEffect } from 'react';
import { 
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  View,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PRIMARY50, NEUTRAL20, NEUTRAL50 } from '../../styles/color';
import { collection, getDocs } from 'firebase/firestore';
import db from '../../../firebase-config';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const printAsyncStorageContents = async () => {
      try {
        const name = await AsyncStorage.getItem('nama');
        const nim = await AsyncStorage.getItem('nim');
        const jurusan = await AsyncStorage.getItem('jurusan');
        const status = await AsyncStorage.getItem('status');
        const uid = await AsyncStorage.getItem('uid');
        const token = await AsyncStorage.getItem('token');

        console.log('Name:', name);
        console.log('NIM:', nim);
        console.log('Jurusan:', jurusan);
        console.log('status:', status);
        console.log('uid:', uid);
        console.log('token:', token);
      } catch (error) {
        console.log('Error retrieving data from AsyncStorage:', error);
      }
    };
    
    printAsyncStorageContents();
  }, []);
  
  const handleLogin = async () => {
    
    const printAsyncStorageContents = async () => {
      try {
        const name = await AsyncStorage.getItem('nama');
        const nim = await AsyncStorage.getItem('nim');
        const jurusan = await AsyncStorage.getItem('jurusan');
        const status = await AsyncStorage.getItem('status');
        const uid = await AsyncStorage.getItem('uid');
        const token = await AsyncStorage.getItem('token');
        
        console.log('Name:', name);
        console.log('NIM:', nim);
        console.log('Jurusan:', jurusan);
        console.log('status:', status);
        console.log('uid:', uid);
        console.log('token:', token);
      } catch (error) {
        console.log('Error retrieving data from AsyncStorage:', error);
      }
    };

    try {
      const querySnapshot = await getDocs(collection(db, 'users'));
      let isLoggedIn = false; // Flag to track login status
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        //sebelumnya dicek semua dulu semua doc nya
        // Check if the username and password match
        if (data.username === username && data.password === password) {
          AsyncStorage.setItem('nama', data.nama);
          AsyncStorage.setItem('nim', data.nim);
          AsyncStorage.setItem('jurusan', data.jurusan);
          AsyncStorage.setItem('status', data.status);
          AsyncStorage.setItem('uid', data.uid);
          AsyncStorage.setItem('token', 'boleh masuk');
          navigation.navigate('MainApp');
          isLoggedIn = true; // Set the flag to true
          printAsyncStorageContents();
          console.log('Login successful');
          return; // Exit the loop
        }
      });
  
      // Check if the login condition was not fulfilled
      if (!isLoggedIn) {
        console.log('Invalid username or password');
        Alert.alert('Login Failed', 'Invalid username or password');
      }
    } catch (error) {
      console.log('Error fetching users', error);
      Alert.alert('Login Failed', 'Failed to fetch user data');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'android' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={-120}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.containerImg} >
            <Image style={{width: '40%', height: '20%', resizeMode: 'contain', marginBottom: 30, marginTop: 30,}}
              source={require('../../assets/img/logo.png')}
            />
            <Image style={{width: '80%', height: '65%',  resizeMode: 'contain', backgroundColor: 'white',}}
              source={require('../../assets/img/flat-illustration.png')}
            />
          </View>

          <View style={styles.containerContent}>
            <Text style={styles.h1}>SSO Login</Text>
            <TextInput
              style={styles.input}
              placeholder="SSO Username"
              placeholderTextColor="#B1A9A9" 
              onChangeText={setUsername}
              value={username}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#B1A9A9" 
              onChangeText={setPassword}
              value={password}
              secureTextEntry={true}
            />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

export default Login;

const styles = StyleSheet.create({
  // b
  button: {
    marginTop: 30,
    width: '80%',
    backgroundColor: PRIMARY50,
    borderRadius: 50,
    paddingVertical: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  
  // c
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerContent: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor:'yellow',
  },
  containerImg: {
    flex: 1.3,
    paddingTop: StatusBar.currentHeight,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'blue',
  },
  
  //h
  h1: {
    width: '80%',
    fontSize: 22,
    marginBottom: 12,
    fontFamily: "PlusJakartaSans-Bold",
    color: NEUTRAL20,
  },
  
  // i
  inner: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: 'white',
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: NEUTRAL50,
    marginBottom: 10,
    borderRadius: 8,
    fontFamily: 'PlusJakartaSans-Regular',
  },
})