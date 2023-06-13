import * as React from 'react';
import { Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PRIMARY50, NEUTRAL30, NEUTRAL95 } from '../styles/color';
import { Login, Card, History, Settings, Splash } from '../pages'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainApp() {
  return (
    <Tab.Navigator initialRouteName='Card'
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconSource;

        if (route.name === 'Card') {
          iconSource = focused
            ? require('../assets/icons/card-active.png')
            : require('../assets/icons/card.png');
        } 
        else if (route.name === 'History') {
          iconSource = focused
          ? require('../assets/icons/history-active.png')
          : require('../assets/icons/history.png');
        }
        else if (route.name === 'Settings') {
          iconSource = focused
          ? require('../assets/icons/settings-active.png')
          : require('../assets/icons/settings.png');
        }

        return (
          <Image
            style={{
              height: '100%',
              resizeMode: 'contain',
              width: '80%',
            }}
            source={iconSource}
          />
        );
      },

      tabBarActiveTintColor: PRIMARY50,
      tabBarInactiveTintColor: NEUTRAL30,
      tabBarStyle:{
        height: '8%',
        paddingTop: 6,
        backgroundColor: NEUTRAL95,
      },
      tabBarLabelStyle:{
        fontSize: 12,
        paddingBottom: 8,
        paddingTop: 0,
        fontFamily: 'PlusJakartaSans-SemiBold',
      },
    })}
    >
      <Tab.Screen name="Card" component={Card} options={{ headerShown: false }}/>
      <Tab.Screen name="History" component={History} options={{ headerShown: false }}/>
      <Tab.Screen name="Settings" component={Settings} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
}

function Router() {
  return (
    <Stack.Navigator initialRouteName='Splash'>
      <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="MainApp" component={MainApp} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default Router;
