import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
class NotificationPage extends Component {
  static navigationOptions = {
    tabBarIcon : ({tintConlor })=>(
    <FontAwesome.Button name="heart"  style={{color:tintConlor}}>
    </FontAwesome.Button>
    )
  }    
  render() {
    return (
      <View style={styles.container}>
        <Text>NotificationPage</Text>
      </View>
    );
  }
}
export default NotificationPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  
});
