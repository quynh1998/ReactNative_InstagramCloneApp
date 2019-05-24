import React, { Component } from 'react';
import {View,Text,StyleSheet, Image} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Login from './Login';
import MainScreen from './MainScreen';
import Register from './Register';
import Forgot_password from './Forgot_password';

const DemoNavigation= StackNavigator({
    Login:{
        screen:Login
    },
    Register:{
        screen:Register
    },
    Forgot_password:{
        screen:Forgot_password
    },
    MainScreen:{
        screen:MainScreen
    },
    
},{
    headerMode: 'none',
    navigationOptions: {
    headerVisible: false,
  }
})

export default DemoNavigation;
/*export default class InstaClone extends Component{
    renderScene(route,navigator){
        return <route.component navigator={navigator}/>
           /* switch(route.name){
            case 'login': return(
                <Login 
                goRegister={()=>{navigator.push({name:'register'})}}
                />
            )
            case 'register':return(
                <Register 
                goLogin={()=>navigator.push({name:'login'})}
                />
            )
        }
    }
    render(){
        return(
            <Navigator
                initialRoute={{name:Login}}
                renderSence={this.renderSence}>
            </Navigator>
        );
        
    }

}*/
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    }
  });