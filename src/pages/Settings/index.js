import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Settings = ({ navigation }) => {

  const [nama, setNama] = useState('');
  const [nim, setNim] = useState('');
  const [jurusan, setJurusan] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const namaValue = await AsyncStorage.getItem('nama');
        const nimValue = await AsyncStorage.getItem('nim');
        const jurusanValue = await AsyncStorage.getItem('jurusan');
  
        if (namaValue && nimValue && jurusanValue) {
          setNama(namaValue);
          setNim(nimValue);
          setJurusan(jurusanValue);
        } else {
          console.log('No such data in AsyncStorage!');
        }
      } catch (error) {
        console.log('Error retrieving data from AsyncStorage:', error);
      }
    };
    fetchData();
  });

    const handleLogout = async () => {
      try {
        await AsyncStorage.clear();
        // Navigate to the Login screen or any other screen after clearing AsyncStorage
        navigation.navigate('Login');
      } catch (error) {
        console.log('Error clearing AsyncStorage:', error);
      }
    };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.h1}>Settings</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.h2}>Account</Text>
        </View>
        <View style={styles.section}>
          <View>
            <Text style={styles.title}>{nama}</Text>
            <View  style={styles.otherSection}>
              <Text style={styles.subtitle}>{jurusan}  |  </Text>
              <Text style={styles.subtitle}>{nim}</Text>
            </View>
          </View>
        </View>
        <View style={styles.divider}></View>

        <View style={styles.section}>
          <Text style={styles.h2}>About</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Help</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Follow us on Instagram</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Legal & Privacy</Text>
        </View>
        <View style={styles.divider}></View>

        <View style={styles.section}>
          <Text style={styles.h2}>Version</Text>
        </View>
        <View style={styles.section}>
          <View>
            <Text style={styles.title}>My KTM Tracker 1.0.0.0</Text>
            <Text style={styles.subtitle}>Thank you for downloading. Enjoy!</Text>
          </View>
        </View>
        <View style={styles.divider}></View>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
      <Text style={styles.logout}>Log Out</Text>
    </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Settings;

const styles = StyleSheet.create({
  //c
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: StatusBar.currentHeight,
  },

  //d
  divider: {
    marginVertical: 20,
    height: 1,
    backgroundColor: '#CDC5C5',
  },

  //h
  h1: {
    color: '#372F2F',
    fontSize: 22,
    fontFamily: 'PlusJakartaSans-SemiBold'
  },
  h2: {
    color: '#645D5D',
    fontSize: 20,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  header: {
    // backgroundColor: 'grey',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingBottom: 15,
  },

  //i
  icon: {
    height: 20,
    width: 20,
  },

  //l
  logout: {
    alignSelf: 'center',
    fontSize: 16,
    color: '#EA5455',
    fontFamily: 'PlusJakartaSans-Bold',
  },

  //o
  otherSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  //p
  profilePicture: {
    height: 32,
    width: 32,
  },

  //s
  section: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -1,
    paddingTop: 20,
    flexDirection: 'row',

  },
  subtitle: {
    color: '#7D7676',
    fontSize: 14,
  },

  //t
  title: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
});
