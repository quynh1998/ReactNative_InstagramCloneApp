import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Alert,StyleSheet} from 'react-native';
import {firebaseApp} from './FirebaseConfig';
import InstaClone from './InstaClone';
import { NavigationActions } from 'react-navigation'

export default class Logout extends Component {
    logout(){
        firebaseApp.auth().signOut().then(function() {
            Alert.alert(
                'Alert Title',
                'Dang xuat thanh cong : ',
                [
            
                    { text: 'OK', onPress: () => console.log("OK pressed") },
                    
                ],
                { cancelable: false },
            );
        })
        .catch(function (error) {
            Alert.alert(
                'Alert Title',
                'Dang xuat that bai : ',
                [
                    
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
            );
        });
    }
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight style={styles.loginButton} onPress={() => {this.logout()}}>
          <Text style={styles.loginButtonTitle}>Logout</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: { 
      marginTop: 22,
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
  },
  loginButton: {
    width: 300,
    height: 35,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3897f0',
},
loginButtonTitle: {
    fontSize: 18,
    color: 'white',

},
})