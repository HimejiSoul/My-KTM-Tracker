import React, { useState } from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View, StatusBar, Image, TouchableOpacity} from 'react-native';

const Card = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.h1}>Your RFID Card</Text>
        <Image style={styles.icon}
          source={require('../../assets/img/history-enable.png')}
        />
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.cardImgContainer}>
          <Image style={styles.cardImg}
            source={require('../../assets/img/ktm-active.png')}
          />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionLeft}>
            <Text style={styles.title}>Status</Text>
          </View>
          <View style={styles.sectionRight}>
            <Text style={styles.subtitleActive}>Active</Text>
          </View>
        </View>
        <View style={styles.divider}></View>

        <View style={styles.section}>
          <View style={styles.sectionLeft}>
            <Text style={styles.title}>Last Place</Text>
          </View>
          <View style={styles.sectionRight}>
            <Text style={styles.subtitle}>Gedung TULT</Text>
          </View>
        </View>
        <View style={styles.divider}></View>

        <View style={styles.section}>
          <View style={styles.sectionLeft}>
            <Text style={styles.title}>Last Taping</Text>
          </View>
          <View style={styles.sectionRight}>
            <Text style={styles.subtitle}>19:30</Text>
          </View>
        </View>
        <View style={styles.divider}></View>

        <View style={styles.section}>
          <View style={styles.sectionLeft}>
            <Text style={styles.title}>Lost your card?</Text>
          </View>
          <View style={styles.sectionRight}>
            <TouchableOpacity style={styles.button} onPress={() =>
              navigation.navigate('Splash')
              }>
              <Text style={styles.subtitleBlock}>Block it now</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.divider}></View>

      </ScrollView>
    </SafeAreaView>
  );
}

export default Card;

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
    // paddingTop: 20,
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
    textAlign: 'center',
  },
  header: {
    // backgroundColor: 'grey',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 2,
    paddingTop: 15,
    paddingBottom: 15,
  },

  //i
  icon: {
    height: 32,
    width: 32,
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
  subtitleActive: {
    fontSize: 16,
    fontWeight: '500',
    color: '#277237',
  },
  subtitleBlock: {
    fontSize: 16,
    fontWeight: '500',
    color: '#EA5455',
  },

  //t
  title: {
    fontSize: 16,
    fontWeight: '500',
    color:'black'
  },
});
