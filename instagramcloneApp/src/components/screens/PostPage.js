import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ActivityIndicator,
    Platform,
    StyleSheet,
    Alert
  } 
from 'react-native';
import {firebaseApp} from './FirebaseConfig.js';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import { Input,Icon } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Setting a timer']);
YellowBox.ignoreWarnings(['source.uri']);
const storage =firebaseApp.storage();
const Blob =RNFetchBlob.polyfill.Blob;
const fs =RNFetchBlob.fs;

window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
};

const uploadImage = (uri,mine = 'application/octet-stream') =>{
    return new Promise((resolve,reject) =>{
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://','') :uri;
        const sessionId = new Date().getTime();
        let uploadBlob =null;
        const imageRef = storage.ref('images').child(`${sessionId}.jpg`);

        fs.readFile(uploadUri,'base64')
        .then((data) =>{
            return Blob.build(data,{type: `${mine}; BASE64`});  
        })
        .then((blob) =>{
            uploadBlob = blob
            return imageRef.put(blob,{contentType: mine})
        })
        .then(() =>{ //download data from firebase down winform
            uploadBlob.close()
            return imageRef.getDownloadURL()
        })
        .then((url) =>{
            resolve(url)
        })
        .catch((error) =>{
            reject(error)
        })
    })
}

class PostPage extends Component{
    static navigationOptions = {
      tabBarIcon :
      <Icon name="ios-add-circle"/>
    }
    constructor(props){
        super(props);
        this.itemRef = firebaseApp.database();
        this.state={
            //avatarSource:null
            content:''
        }
    }
    pickImage(){
        ImagePicker.showImagePicker(options, (response) => {
            
            this.setState({avatarSource:''})

            if (response.didCancel) {
                
            } 
            else if (response.error) {
                
            } 
            else if (response.customButton) {
                
            } 
            else {
                uploadImage(response.uri)
                .then(url =>this.setState({avatarSource: url}))
                .catch(error => console.log(error))
            }
        });
    }
    //get user email
    userInfo(){
      var user = firebaseApp.auth().currentUser;
      var email;
      if (user!=null){
          email = user.email;
          return email;
      }
  }
    //save post in db
    uploadPost(){
      let content = this.state.content;
      let userEmail = this.userInfo();
      let imgURL = this.state.avatarSource;
      let numberLikes = 0;
      let numberComments = 0;
      firebaseApp.database().ref('Posts').push({
          userEmail,
          content,
          imgURL,
          numberComments,
          numberLikes
      }).then((data)=>{
          Alert.alert('Đã đăng');
      }).catch((error)=>{
          console.log('error',error)
      })
    }
    render(){
        return(
            <View style={styles.container}>
              <View style={{flexDirection:'column'}}>
                <Image source={{uri:this.state.avatarSource}} style={{height:150,width:120}} />
                <TouchableOpacity onPress={() =>{this.pickImage()}}>   
                    <Text style ={{color:"green",fontSize:30}}>
                        Choose Image
                    </Text>
                </TouchableOpacity>
              </View>
              <View style={{flexDirection:'row'}}>
                <Input
                  placeholder="Write your post"
                  onChangeText={(content)=>this.setState({content})}
                  value={this.state.content}>
                </Input>
                <TouchableOpacity style={{paddingLeft:10}} onPress={() =>{this.uploadPost()}}>
                  <Icon name = 'send' style={{paddingRight:10,color:'green'}}/>
                </TouchableOpacity>
              </View>
            </View>
        );
    }
}
export default PostPage;
const styles = StyleSheet.create({
  container: {
      flex:1,
    backgroundColor: '#F5FCFF',
  },
  
});
