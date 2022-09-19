import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';

import DetailScreen from './components/Detail/DetailScreen';
import LoginScreen from './components/Login/LoginScreen';
import RegisterScreen from './components/Login/RegisterScreen';
import ProfilScreen from './components/Profil/ProfilScreen';
import PanierScreen from './components/Panier/PanierScreen';
import InfoProductScreen from './components/InfoProduct/InfoProductScreen.js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Icon } from 'react-native-elements'


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const StackHome = () => {
  return (

    <Tab.Navigator >
      <Tab.Screen name="Produits" component={DetailScreen}
        options={{
          headerStyle: {
            backgroundColor: '#34495e'
          },
          headerTintColor: 'white',
          headerShadowVisible: false,
          tabBarIcon: () => (<Icon name="shopping-basket" />)
        }}
      />
      <Tab.Screen name="Panier" component={PanierScreen} options={{ 
        tabBarIcon: () => (<Icon name="add-shopping-cart" />), 
          headerStyle: {
            backgroundColor: '#34495e'
          },
          headerTintColor: 'white',
          headerShadowVisible: false
        }} />
      <Tab.Screen
        name="Profil"
        component={ProfilScreen}
        options={{
          tabBarIcon: () => (<Icon name="account-box" />), 
          headerStyle: {
            backgroundColor: '#34495e'
          },
          headerTintColor: 'white',
          headerShadowVisible: false
        }}
      />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LoginPage" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerStyle: {
              backgroundColor: '#34495e'
            },
            headerTintColor: 'white',
            headerShadowVisible: false
          }}
        />
        <Stack.Screen
          name="Information sur le produit"
          component={InfoProductScreen}
          options={{
            headerStyle: {
              backgroundColor: '#34495e'
            },
            headerShown: false,
            headerShadowVisible: false
          }}
        />
        <Stack.Screen name="StackHome" component={StackHome} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
