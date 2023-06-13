import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Active from './active';
import Blocked from './blocked';


const Stack = createNativeStackNavigator();

function Card() {
  const [status, setStatus] = useState('');
  const [initialRouteName, setInitialRouteName] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const status = await AsyncStorage.getItem('status');
        setStatus(status);
        if (status === 'allow') {
          setInitialRouteName('Active');
        } else {
          setInitialRouteName('Blocked');
        }
        setIsLoading(false);
        console.log("statusnya",status)
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchStatus();
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
