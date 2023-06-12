import React, { useEffect, useState } from 'react';
import { SectionList, StyleSheet, Text, View, StatusBar } from 'react-native';
import moment from 'moment';
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore';
import db from '../../../firebase-config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const History = () => {

  const [fetchedData, setFetchedData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const uid = await AsyncStorage.getItem('uid'); // Assuming you have stored the uid in AsyncStorage
      const q = query(collection(db, 'history'),
      where('uid',"==", uid),
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
        console.log(data);
        setFetchedData(data);
      });
      return unsubscribe;
    };
    const unsubscribe = fetchData();
    return () => unsubscribe();
  }, []);
  

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const dataBySection = {};

  fetchedData.forEach((item) => {
    const itemDate = moment(item.time, 'M/D/YYYY, h:mm:ss A').toDate();
    let sectionTitle;

    if (itemDate.toDateString() === today.toDateString()) {
      sectionTitle = 'Today';
    } else if (itemDate.toDateString() === yesterday.toDateString()) {
      sectionTitle = 'Yesterday';
    } else {
      sectionTitle = itemDate.toLocaleDateString();
    }

    if (!dataBySection[sectionTitle]) {
      dataBySection[sectionTitle] = [];
    }

    dataBySection[sectionTitle].push(item);
  });

  const sections = Object.keys(dataBySection).map((key) => ({
    title: key,
    data: dataBySection[key],
  }));


    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.h1}>History</Text>
        </View>
        <SectionList
          sections={sections}
          keyExtractor={(item, index) => index.toString()}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.section}>
              <Text style={styles.h2}>{title}</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item.place}</Text>
              <Text style={styles.subtitle}>{item.time.slice(10)}</Text>
            </View>
          )}
        />
      </View>
    );
  }

export default History;

const styles = StyleSheet.create({
  //c
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: StatusBar.currentHeight,
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
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },

  //s
  section: {
    borderTopColor: '#CDC5C5', // Color of the border
    borderTopStyle: 'solid',
    borderTopWidth: 1, // Width of the border
    marginTop: -2,
    paddingTop: 20,
  },
  subtitle: {
    color: '#7D7676',
    fontSize: 14,
  },

  //t
  title: {
    fontSize: 16,
    fontWeight: '500',
    paddingLeft: 8,
    color: 'black'
  }
});
