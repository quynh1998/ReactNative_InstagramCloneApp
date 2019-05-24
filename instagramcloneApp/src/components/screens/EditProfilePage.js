import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ListView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Input,Icon, CardItem, Left,Right, Thumbnail,Body, Container,Button,Card } from 'native-base';
import {firebaseApp} from './FirebaseConfig';

export default class EditProfile extends Component {  
  static navigationOptions = {
    tabBarIcon :
    <Icon name="create"/>
  }  

    constructor(props){
            super(props)
            this.state ={
                newusesName: "",
                newuserEmail: "",
                newphoneNumber:"",
                dataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2})
            }
            this.itemRef = firebaseApp.database();
    }

    userInfo(){
        var user = firebaseApp.auth().currentUser;
        var email;
        if (user!=null){
            email = user.email;
            return email;
        }
    }

    /*displayUserid(){
        var ref = firebaseApp.database().ref("Users");
        var query = ref.orderByChild('userEmail').equalTo(this.userInfo());
        var id="";
        query.on("child_added", function(snapshot) {
            // User found
            if (snapshot.val()) {
                //Alert.alert(snapshot.key) //hiện ra father
                var userId =snapshot.key;
                id +=userId;
                //return userId;
            }
        });  
        Alert.alert(id);
        //return id;
    }*/

    displayUserid(){
        var ref = firebaseApp.database().ref("Users");
        var query = ref.orderByChild('userEmail').equalTo(this.userInfo());
        query.on("child_added", function(snapshot) {
            // User found
            if (snapshot.val()) {
                var userId =snapshot.key;
                Alert.alert(userId);
                //return userId;
            }
        });  
        //Alert.alert(id);
        //return id;
    }
    displayUserdata(itemRef){
        var items = [];
        this.itemRef.ref('Users').child('-LetPPEF24HICQmjxQ74').on('value',(dataSnapshot)=>{
            items.push({
                userEmail:dataSnapshot.val().userEmail,
                userName : dataSnapshot.val().userName,
                phoneNumber:dataSnapshot.val().phoneNumber,
                _key: dataSnapshot.key
            });
            //đưa mảng vào datasource để hiển thị ra listview
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items)
            });
        });
    }

    onChangeData =() =>{
        var user =firebaseApp.auth().currentUser;
        if(user != null){
            user.updateEmail(this.state.newuserEmail)
            .then(() =>{
                    Alert.alert("Email was changed");
            })
            .catch((error) =>{
                console.log(error.message); 
            })

            
            this.itemRef.ref('Users').child('-LetPPEF24HICQmjxQ74').update({
                userEmail:this.state.newuserEmail,
                userName:this.state.newuserName,
                phoneNumber:this.state.newphoneNumber,
            });
            this.displayUserdata(this.itemRef);
        

        }
    }

  render() {
    let userEmail = (this.userInfo());
    return (
      <View style={styles.container}>
      
            <View style={styles.view1}>
                <View style={styles.view1_1}>
                    <TouchableOpacity onPress={()=>this.displayUserid()}>
                        <Icon name='close-circle' style={{color:'red'}}/>
                    </TouchableOpacity>
                    <Text style={{marginLeft:7,fontSize:20}}>Chỉnh sửa trang cá nhân</Text>
                </View>
                <TouchableOpacity onPress={this.onChangeData}>
                    <Icon name='checkmark-circle' style={{color:'green'}}/>
                </TouchableOpacity>
            </View>

            <View style={styles.view2}>
                <Image 
                    style={styles.userpic}
                    source={{uri:'https://static.giantbomb.com/uploads/scale_small/13/135472/1891759-002ivysaur.png'}}
                
                />
                <View>
                    <Text style={{fontWeight:"bold", fontSize:20}}>Đổi ảnh đại diện</Text>
                </View>
            </View>
            
            
            <ListView
                dataSource = {this.state.dataSource}
                renderRow = {(rowData)=>
                <View style={styles.view3}>
                    <View style={styles.input}>
                        <Text>Tên: </Text>
                        <Input style={styles.textInput}
                            onChangeText={(newuserName)=>this.setState({newuserName})}
                            value={rowData.userName}>
                        </Input>
                    </View>

                    <View style={styles.input}>
                        <Text>Email: </Text>
                        <Input style={styles.textInput}
                            textContentType='emailAddress'
                            keyboardType='email-address'
                            onChangeText={(newuserEmail)=>this.setState({newuserEmail})}
                            value={rowData.userEmail}>
                        </Input>
                    </View>

                    <View style={styles.input}>
                        <Text>Số điện thoại: </Text>
                        <Input style={styles.textInput}
                            onChangeText={(newphoneNumber)=>this.setState({newphoneNumber})}
                            value={rowData.phoneNumber}>
                        </Input>
                    </View>

                </View>
            }
            />
            <View style={styles.view4}>
            <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Change_password')}
            >
                <Text>
                    Đổi mật khẩu
                </Text>
            </TouchableOpacity>
                
            </View>

        </View>
    );
  }
    componentDidMount(){
        this.displayUserdata(this.itemRef);
    }
}
//export default EditProfile;
const styles = StyleSheet.create({
  container: {
    width: 100 + "%",
    height: 100 + "%",
    justifyContent: "center",
    alignItems: "stretch",
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    marginTop: 10,
    
},

view1:{
    flex:1,
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:10
},

view1_1:{
    alignContent:'center',
    flexDirection:'row'
},

/*button1:{
    justifyContent:'center',
    alignItems:'center',
    color:'white',
    backgroundColor:'rgb(249, 16, 3)',
    marginLeft:5
},

button2:{
    justifyContent:'center',
    alignItems:'center',
    color:'white',
    backgroundColor: 'rgb(104, 199, 117)'
},*/

view2:{
    flex:3,
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center'
},

userpic:{
    width:70,
    height:70,
    borderRadius:35,
    borderWidth:1  
},

view3:{
    flex:4,
    flexDirection:'column',
    alignItems:'flex-start',
    paddingLeft: 20
},

input:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'    
},

view4:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-end'
},
loginButtonTitle: {
    fontSize: 18,
    color: 'white',

},
icons: {
    //width: 300,
    //height: 45,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
},
  
});
