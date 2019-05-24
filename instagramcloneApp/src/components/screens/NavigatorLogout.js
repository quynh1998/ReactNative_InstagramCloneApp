import React, { Component } from 'react';
import {View,Text,StyleSheet, Image} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Login from './Login';
import InstaClone from './InstaClone';
import Logout from './Logout';


const NavigationLogout= StackNavigator({
  Logout:{
    screen:Logout
  },
  Login:{
    screen:Login
  },

},{
  headerMode: 'none',
  navigationOptions: {
  headerVisible: false,
}
})

export default NavigationLogout;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    }
  });