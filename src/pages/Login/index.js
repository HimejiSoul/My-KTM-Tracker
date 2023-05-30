import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import axios from 'axios';

const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async () => {
    try {
      const response = await axios.post('http://192.168.1.12:3000/login', { username, password });

      console.log(response.data.message);
      navigation.navigate('MainApp')
    } catch (error) {

      Alert.alert('Login Failed', 'Invalid username or password');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image style={{ height: 40, resizeMode: 'contain', marginBottom: 30 }}
          source={require('../../assets/img/logo.png')}
        />
        <Image style={{ height: 220, resizeMode: 'contain' }}
          source={require('../../assets/img/flat-illustration.png')}
        />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.h1}>SSO Login</Text>
        <TextInput
          style={styles.input}
          placeholder="SSO Username"
          onChangeText={setUsername}
          value={username}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imgContainer: {
    flex: 2,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',

    img: {
      height: 10,
      resizeMode: 'contain'
    }
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 150,

  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: 'white',
    color: 'black',
  },
  button: {
    marginTop: 30,
    width: '80%',
    height: 40,
    backgroundColor: '#EA5455',
    borderRadius: 20,
    padding: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  h1: {
    width: '80%',
    color: '#372F2F',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  remember: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkBox: {
    width: 24,
    height: 24,
    bottom: 2,
    marginRight: 4,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#EA5455',
  },
  checkboxContainer: {
    flexDirection: 'row',
  }
})