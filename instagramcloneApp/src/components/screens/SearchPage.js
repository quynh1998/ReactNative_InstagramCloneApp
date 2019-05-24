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
import {Icon,Container,Header,Item,Input,Button} from 'native-base';
import { TabNavigator } from 'react-navigation';

class SearchPage extends Component { 
  static navigationOptions = {
    tabBarIcon :
      <Icon name="search"/>
  }
  render() {
    return (
      <Container style={styles.container}>
        <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
      </Container>
    );
  }
}
export default SearchPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  
});
