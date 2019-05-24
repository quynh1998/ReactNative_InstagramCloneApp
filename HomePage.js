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
class HomePage extends Component {
  static navigationOptions = {
    tabBarIcon : ({tintConlor })=>(
    <FontAwesome.Button name="home"  style={{color:tintConlor}}>
    </FontAwesome.Button>
    )
  }  
  render() {
    return (
      <View style={styles.container}>
        <Text>HomePage</Text>
        <Avatar
          small
          rounded
          source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
        />
      </View>
    );
  }
}
export default HomePage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  
});
