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
  AsyncStorage,
  ListView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Input,Icon, CardItem, Left,Right, Thumbnail,Body, Container,Button,Card } from 'native-base';
import {firebaseApp} from './FirebaseConfig';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Setting a timer']);
class CardComponent extends Component {
    constructor(props){
        super(props);
        this.itemRef = firebaseApp.database();
        this.state={
            liked:false,
            likeNumber : 0,
            comment : '',
            dataSourcePost: new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2}),
            dataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2})
        }
    } 
    likeToggled(){
        this.setState({
            liked:!this.state.liked
        })

    }

    //get email of user
    userInfo(){
        var user = firebaseApp.auth().currentUser;
        var email;
        if (user!=null){
            email = user.email;
            return email;
        }
    }
    
    //display all posts in database
    displayPost(){
        //1 mảng lưu comment từ db
        var posts = [];
        this.itemRef.ref('Posts').on('child_added',(dataSnapshot)=>{
            posts.push({
                content:dataSnapshot.val().content,
                userEmail:dataSnapshot.val().userEmail,
                imgURL:dataSnapshot.val().imgURL,
                numberLikes:dataSnapshot.val().numberLikes,
                numberComments:dataSnapshot.val().numberComments,
                _key: dataSnapshot.key
            });
            //đưa mảng vào datasource để hiển thị ra listview
            this.setState({
                dataSourcePost: this.state.dataSource.cloneWithRows(posts)
            });
        });
    }

    //display comment 
    displayComment(itemRef){
        //1 mảng lưu comment từ db
        var items = [];
        this.itemRef.ref('Comments').on('child_added',(dataSnapshot)=>{
            items.push({
                comment:dataSnapshot.val().comment,
                userEmail:dataSnapshot.val().userEmail,
                avatar : dataSnapshot.val().avatar,
                _key: dataSnapshot.key
            });
            //đưa mảng vào datasource để hiển thị ra listview
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items)
            });
        });
        this.itemRef.ref('Comments').on('child_removed',(dataSnapshot)=>{
            items = items.filter((x)=>x._key !== dataSnapshot.key);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items)
            })
        });
    }
    //post comment and save in database
    postComment(rowPost){
        let comment = this.state.comment;
        let userEmail = this.userInfo();
        let avatar  = 'https://img.icons8.com/color/1600/circled-user-male-skin-type-1-2.png';
        let postId = rowPost._key;
        firebaseApp.database().ref('Comments').push({
            postId,
            avatar,
            userEmail,
            comment
            
        }).then((data)=>{
                console.log('data',data)
        }).catch((error)=>{
                console.log('error',error)
        })
    }
    

    //delete comment in db
    deleteComment(rowData){
        //this.itemRef.ref('Comments').child(rowData._key).remove();
        //this.displayComment;
        Alert.alert(
            'thông báo',
            'Xóa bình luận? : ',
            [
                {
                    text: 'OK',
                    onPress:()=>{
                        this.itemRef.ref('Comments').child(rowData._key).remove();
                        this.displayComment;
                    }
                },
                { 
                    text: 'cancel', 
                    onPress: () =>console.log('Cancel Pressed')
                },
            ],
            { cancelable: false },
        );
    }
    render() { 
    const heartIconColor=(this.state.liked) ? "red" : null;
    let userEmail = (this.userInfo());
    let Likednumber = (this.state.liked) ? (this.setState.numberLiked = this.state.likeNumber + 1) : (this.state.likeNumber);
    const imageList = {
        "1" : require("../pictures/coder.png"),
        "2" : require("../pictures/coder.png"),
        "3" : require("../pictures/coder.png")
    }
    return (
    <View style={styles.container}>
        <ListView dataSource = {this.state.dataSourcePost}
                renderRow = {(rowPost)=>
        <Card>
            <CardItem>
                <Left>
                    <Thumbnail source={require ("../pictures/coder.png")}/>
                    <Body>
                        <Text style={{ fontWeight: 'bold'}}>{rowPost.userEmail}</Text>
                        <Text note>Jan 15,2018</Text>
                    </Body>
                </Left>
            </CardItem>

            <CardItem cardBody>
                    <Image source={{uri:rowPost.imgURL}} style={{height:200,width:null,flex:1}}/>
            </CardItem>

            <CardItem style={{height:45}}>
                <Left>
                    <Button transparent onPress={() =>{this.likeToggled()}}>
                        <Icon name='heart' style={{color:heartIconColor}}/>
                    </Button>
                    <Button transparent>
                        <Icon name='chatbubbles' style={{color:'black'}}/>
                    </Button>
                    <Button transparent>
                        <Icon name='paper-plane' style={{color:'black'}}/>
                    </Button>
                </Left>
            </CardItem>

            <CardItem style={{height:20}}>
                    <Text>{rowPost.numberLikes} likes this</Text>
            </CardItem>
            
            <CardItem>
                    <ListView
                        dataSource = {this.state.dataSource}
                        renderRow = {(rowData)=>
                            <View>
                                <View style={{flexDirection: 'row'}}>
                                    <Thumbnail source={{uri: rowData.avatar}} small></Thumbnail>
                                    <Text style={{color:'black', fontWeight: 'bold'}}>{rowData.userEmail}:</Text>
                                    <Text>{rowData.comment}</Text>
                                    <TouchableOpacity onPress={()=>this.deleteComment(rowData)}><Text style={{color:'red'}}>Xóa</Text></TouchableOpacity>
                                </View>
                            </View>
                        }
                    />
            </CardItem>

                <CardItem>
                    <Thumbnail source={require('../pictures/coder.png')} small></Thumbnail>
                    <Text style={{color:'black', fontWeight: 'bold'}}>{userEmail}</Text>
                    <Input
                        placeholder="Write your comment"
                        onChangeText={(comment)=>this.setState({comment})}
                        value={this.state.comment}>
                    </Input>
                    <TouchableOpacity style={{paddingLeft:10}} onPress={()=>this.postComment(rowPost)}>
                    <Icon name = 'send' style={{paddingRight:10}}/>
                    </TouchableOpacity>
                </CardItem>
        
        </Card>
        }
        />
    </View>
    );
  }
  componentDidMount(){
    this.displayComment(this.itemRef);
    this.displayPost();
}
}
export default CardComponent;
const styles = StyleSheet.create({
  container: {
      flex:1,
    backgroundColor: '#F5FCFF',
  },
  
});
