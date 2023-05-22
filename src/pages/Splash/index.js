import React, { useEffect } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';

function Splash({ navigation }) {

  useEffect(() => {
      setTimeout(() => {
        navigation.replace('Login');
      }, 3000)
  }, [navigation])

  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require('../../assets/img/logo.png')}
      />
    </View>
  );
}

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tinyLogo: {
    height: 64,
    resizeMode: 'contain'
  },
})
