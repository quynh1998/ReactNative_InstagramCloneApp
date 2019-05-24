import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Icon} from 'native-base';
import ImagePicker from 'react-native-image-picker';

const options = {
  title: 'Select Avatar',
  customButtons: [{ name: 'thuvien', title: 'Choose Photo from your Library' }],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class PostPage extends Component {  
  static navigationOptions = {
    tabBarIcon :
    <Icon name="ios-add-circle"/>
  }  
  constructor(props){
    super(props);
    this.state ={
      avatarSource:null
    }

  }
  
  uploadImg(){
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
    
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
    
        this.setState({
          avatarSource: source,
        });
      }
    });
  }
  render() {
    return (
      <View style={styles.container}>
      <TouchableOpacity onPress={()=>this.uploadImg()}>
        <Text>Choose Image</Text>
      </TouchableOpacity>
      <Image source={this.state.avatarSource} style={{height:200,width:200}} />
      </View>
    );
  }
}
export default PostPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
