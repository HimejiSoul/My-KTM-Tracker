import * as React from 'react';
import { Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Ionicons } from '@expo/vector-icons';
import { Login, Card, History, Settings, Splash } from '../pages'
import { BottomNavigation } from '../components'
// import { IconCard, IconCardActive, IconHistory, IconHistoryActive, IconSettings, IconSettingsActive } from '../assets/index'

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainApp() {
  return (
    <Tab.Navigator
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
            style={{ width: 50, height: 25 }}
            source={iconSource}
          />
        );
      },
      tabBarStyle: { height: 55, paddingTop: 5,backgroundColor:'#f7efef', display: "flex" },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      tabBarLabelStyle: {
        marginBottom: 2,
        margin: 1,
        padding: 1
      },
    })}
      // tabBarOptions={{
      //   activeTintColor: 'tomato',
      //   inactiveTintColor: 'gray',
      //   labelStyle: {
      //     marginBottom: 2, // adjust the margin bottom
      //     padding: 2, // adjust the padding
      //   }
      // }}
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
