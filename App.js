/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import InstaClone from './src/InstaClone'
import MainScreen from './src/components/screens/MainScreen'
import { StackNavigator } from 'react-navigation'

export default class App extends Component {
  render() {
    return (
        <AppStackNavigator />
    );
  }
}
const AppStackNavigator = StackNavigator({ 

  Main: {
    screen: MainScreen
  }

})
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  
});
