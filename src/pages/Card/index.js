import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Active from './active';
import Blocked from './blocked';
import axios from 'axios';

const Stack = createNativeStackNavigator();

function Card() {
  const [status, setStatus] = useState('');
  const [initialRouteName, setInitialRouteName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('http://192.168.1.12:3000/sessions')
      .then(response => {
        const { status } = response.data[0];
        setStatus(status);
        if (status === 'allow') {
          setInitialRouteName('Active');
        } else {
          setInitialRouteName('Blocked');
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen name="Active" component={Active} options={{ headerShown: false }} />
      <Stack.Screen name="Blocked" component={Blocked} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default Card;
