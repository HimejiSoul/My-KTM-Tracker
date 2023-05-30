import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';

const Blocked = ({ navigation }) => {

  const [lastPlace, setLastPlace] = useState('');
  const [lastTaping, setLastTaping] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.1.12:3000/history');
        const { place, time } = response.data[0];
        setLastPlace(place);
        setLastTaping(time);
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };
  
    // Fetch data initially
    fetchData();
  
    // Set interval to fetch data every 5 seconds
    const interval = setInterval(fetchData, 5000);
  
    // Clean up the interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  const alert = () =>
    Alert.alert('Kartu telah terblokir', 'Kartu KTM Anda telah terblokir. Untuk mengaktifkannya kembali hubungi administrator.', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'close',
      },
    ]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.h1}>Your RFID Card</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.cardImgContainer}>
          <Image style={styles.cardImg}
            source={require('../../assets/img/ktm-disable.png')}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionLeft}>
            <Text style={styles.title}>Status</Text>
          </View>
          <View style={styles.subtitleBlock}>
            <Text style={styles.subtitleBlock}>Blocked</Text>
          </View>
        </View>
        <View style={styles.divider}></View>

        <View style={styles.section}>
          <View style={styles.sectionLeft}>
            <Text style={styles.title}>Last Place</Text>
          </View>
          <View style={styles.sectionRight}>
            <Text style={styles.subtitle}>{lastPlace}</Text>
          </View>
        </View>
        <View style={styles.divider}></View>

        <View style={styles.section}>
          <View style={styles.sectionLeft}>
            <Text style={styles.title}>Last Taping</Text>
          </View>
          <View style={styles.sectionRight}>
            <Text style={styles.subtitle}>{lastTaping.slice(11, 16)}</Text>
          </View>
        </View>
        <View style={styles.divider}></View>
        <View style={styles.section}>
          <View style={styles.sectionLeft}>
            <Text style={styles.title}>Lost your card?</Text>
          </View>
          <View style={styles.sectionRight}>
            <TouchableOpacity style={styles.button} onPress={alert}>
              <Image
                style={styles.icon}
                source={require('../../assets/icons/Info.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.divider}></View>

      </ScrollView>
    </View>
  );
}

export default Blocked;

const styles = StyleSheet.create({
  //c
  cardImg: {
    alignSelf: 'center',
    height: 265,
    width: 348,
    resizeMode: 'contain',
  },
  cardImgContainer: {
    justifyContent: 'center',
    paddingVertical: 64,
    // backgroundColor: 'grey',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    // paddingTop: StatusBar.currentHeight,
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
    fontWeight: '500',
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
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },

  //l

  //p

  //s
  section: {
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: -1,
    // backgroundColor: 'red',
    paddingTop: 10,
    flexDirection: 'row',

  },
  sectionLeft: {

  },
  sectionRight: {

  },
  subtitle: {
    color: '#7D7676',
    fontSize: 14,
  },
  subtitleBlock: {
    fontSize: 16,
    fontWeight: '500',
    color: '#A82A40',
  },

  //t
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
});