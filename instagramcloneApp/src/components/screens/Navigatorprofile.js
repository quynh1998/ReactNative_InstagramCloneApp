import React, { Component } from 'react';
import {View,Text,StyleSheet, Image} from 'react-native';
import {StackNavigator} from 'react-navigation';
import ProfilePage from './ProfilePage';
import EditProfilePage from './EditProfilePage';
import Change_password from './Change_password';
import NavigatorLogout from './NavigatorLogout';
import Logout from './Logout'

const Navigationprofile= StackNavigator({
    ProfilePage:{
        screen:ProfilePage
    },
    EditProfilePage:{
        screen:EditProfilePage
    },
    Change_password:{
        screen:Change_password,
    },
    NavigatorLogout:{
        screen:NavigatorLogout
    },
    //Logout:{
        //screen:Logout
    //}
})

export default Navigationprofile;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    }
  });