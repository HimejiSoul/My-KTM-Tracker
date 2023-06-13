import * as React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Router from './src/router/index';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle='dark-content'
        backgroundColor={'transparent'}
        translucent
      />
      <Router />
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({})
