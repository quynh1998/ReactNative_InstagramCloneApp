import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Alert
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Input,Icon, CardItem, Left, Thumbnail,Body, Container,Button,Card } from 'native-base';
class CardComponent extends Component {
    constructor(){
        super();
        this.state={
            liked:false,
            likeNumber : 0,
        }
    } 
    likeToggled(){
        this.setState({
            liked:!this.state.liked
        })
    }
    render() {
    const heartIconColor=(this.state.liked) ? "red" : null;
    let Likednumber = (this.state.liked) ? (this.setState.numberLiked = this.state.likeNumber + 1) : (this.state.likeNumber);
    const imageList = {
        "1" : require("./me.jpg"),
        "2" : require("../pictures/dog.jpg"),
        "3" : require("../pictures/coder.jpg")
    }
    return (
    <View style={styles.container}>
       <Card>
    
           <CardItem>
               <Left>
                   <Thumbnail source={require ("./me.jpg")}/>
                   <Body>
                       <Text style={{ fontWeight: 'bold'}}>Vorum</Text>
                       <Text note>Jan 15,2018</Text>
                   </Body>
               </Left>
           </CardItem>

           <CardItem cardBody>
                <Image source={imageList[this.props.imageSource]} style={{height:200,width:null,flex:1}}/>
           </CardItem>

           <CardItem style={{height:45}}>
               <Left>
                   <Button transparent onPress={() =>{
                    this.likeToggled()}}>
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
                <Text>{Likednumber} likes this</Text>
           </CardItem>
           
           <CardItem>
                <Thumbnail source = {require('../pictures/dog.jpg')} small></Thumbnail>
                <Text>
                    <Text style={{color:'black', fontWeight: 'bold'}}>{this.props.userComment}: </Text>
                    {this.props.comment}
                </Text>
           </CardItem>

            <CardItem>
                <Thumbnail source={require('../pictures/dog.jpg')} small></Thumbnail>
                <Input placeholder='Write your comment'/>
            </CardItem>
       
       </Card>
    </View>
    );
  }
}
export default CardComponent;
const styles = StyleSheet.create({
  container: {
      flex:1,
    backgroundColor: '#F5FCFF',
  },
  
});
