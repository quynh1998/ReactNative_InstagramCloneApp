import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import NotificationPage from './NotificationPage';
import PostPage from './PostPage';
import ProfilePage from './ProfilePage';
import SearchPage from './SearchPage';
import HomePage from './HomePage';
import {Icon} from 'native-base';
import { TabNavigator } from 'react-navigation';
import { YellowBox } from 'react-native';
import Navigatorprofile from './Navigatorprofile'

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
class MainScreen extends Component {
  render() {
    return (
      <AppTabNavigation/>
    );
  }
}

export default MainScreen;

const AppTabNavigation =  TabNavigator({
  Home: {
    screen: HomePage
  },
  Search: {
    screen: SearchPage
  },
  Post: {
    screen: PostPage
  },
  Heart: {
    screen: NotificationPage
  },
  Profile: {
    screen: Navigatorprofile
  }
  },{
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: "bottom",
    header: null,
    headerMode: 'none',
    navigationOptions: {
      header:{
        visible: false
      }
    },
    tabBarOptions: {
      activeTintColor: "#000",
      inactiveTintColor: "#d1cece",
      showLabel: false,
      showIcon: true,
      style:{
          backgroundColor:"white"
        }
      }
    }
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  
});
