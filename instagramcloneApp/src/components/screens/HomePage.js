import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Icon, Container, Content, Body,Left,Right, Button,Header } from 'native-base';
import CardComponent from './CardComponent';
import { TabNavigator } from 'react-navigation';

class HomePage extends Component {
  static navigationOptions={
    tabBarIcon : <Icon name="home"/>
  }
    
  render() {
    return (
      <Container style={styles.container}>
          <Header style={{backgroundColor:"white", justifyContent:'space-between',flexDirection:'row'}}>
            <Left><Icon name = "camera" style={{paddingLeft:10}}/></Left>
            <Body><Text style={styles.title}>Instagram</Text></Body>
            <Right><Icon name = 'paper-plane' style={{paddingRight:10}}/></Right>
          </Header>
        <Content>
          <CardComponent/>
        </Content>
      </Container>
    );
  }
}
export default HomePage;
const styles = StyleSheet.create({
  container: {
    flex:0,
    backgroundColor: 'white',
  },
  title: {
    color: 'black',
    textAlign: 'center',
    fontSize: 30
  }
});
