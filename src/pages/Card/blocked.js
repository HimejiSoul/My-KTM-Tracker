import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, StatusBar } from 'react-native';
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore';
import db from '../../../firebase-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';


const Blocked = () => {

  const [lastPlace, setLastPlace] = useState('');
  const [lastTime, setLastTime] = useState('');
  
  useEffect(() => {
    const fetchData = async () => {
      const uid = await AsyncStorage.getItem('uid');
      const q = query(
        collection(db, 'history'),
        where('uid', '==', uid),
        orderBy('time', 'desc')
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          const item = doc.data();
          const formattedData = {
            ...item,
            time: item.time.toDate().toLocaleString(),
          };
          data.push(formattedData);
        });
        if (data.length > 0){
        setLastPlace(data[0].place);
        setLastTime(data[0].time);
        console.log(data[0].time);
        console.log(data[0].place);
        }
      });
    };
    fetchData();
  });  

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
      <ScrollView 
        style={styles.scrollView}
        showsHorizontalScrollIndicator={false}
      >
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
          <Text style={styles.subtitle}>{moment(lastTime, 'M/D/YYYY, h:mm:ss A').format('HH:mm')}</Text>
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