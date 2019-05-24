import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import { Avatar } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NotificationPage from './NotificationPage';
import PostPage from './PostPage';
import ProfilePage from './ProfilePage';
import SearchPage from './SearchPage';
import HomePage from './HomePage';
import { TabNavigator } from 'react-navigation'

class MainScreen extends Component {
  
  static navigationOptions = {
    headerLeft:<FontAwesome.Button name={'camera'}  style={{paddingLeft:10}}>
    </FontAwesome.Button>,
    title : <Text style={{paddingHorizontal:"center"}}>Instagram</Text>,
    headerRight : <FontAwesome.Button name="paper-plane" style={{paddingRight:10}}>
    </FontAwesome.Button>
    /*headerLeft:<Icon name = "camera-outline" style={{paddingLeft:10}}/>,
    title : "Instagram",
    headerRight : <Icon name = "send-outline" style={{paddingRight:10}}/>*/
  } 
  
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
    screen: ProfilePage
  }
  },{
    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: "bottom",
    tabBarOptions: {
      activeTintColor: "#000",
      inactiveTintColor: "#d1cece",
      showLabel: false,
      showIcon: true

    }
  }
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  
});
