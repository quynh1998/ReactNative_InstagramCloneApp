import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard,Alert,AsyncStorage } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {firebaseApp} from '../screens/FirebaseConfig.js'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',

        }

    }
    Dangnhap(){
        firebaseApp.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                let user=this.state.email;
                AsyncStorage.setItem('user',user);
                Alert.alert(
                    'Alert Title',
                    'Dang nhap thanh cong : ' + this.state.email,
                    [
                        
                        { text: 'OK', onPress: () => this.props.navigation.navigate('MainScreen') },
                    ],
                    { cancelable: false },
                );
                this.setState({
                    email: '',
                    password: '',
                })
            })
            .catch(function (error) {
                Alert.alert(
                    'Alert Title',
                    'Dang nhap that bai : ',
                    [
                    
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false },
                );
            });
    }
    render() {
        const Divider = (props) => {
            return <View {...props}>
                <View style={styles.line}></View>
                <Text style={styles.textOr}>OR</Text>
                <View style={styles.line}></View>

            </View>
        }
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                
                <View style={styles.container}>
                    <View style={styles.up}>
                        <Text style={styles.titles}>Instagram</Text>
                    </View>
                    <View style={styles.between}>
                        <View style={styles.textinputContainer}>
                            <TextInput style={styles.textInput}
                                textContentType='emailAddress'
                                keyboardType='email-address'
                                placeholder="Enter your email"
                                onChangeText={(email)=>this.setState({email})}
                                    value={this.state.email}>
                            </TextInput>
                        </View>
                        <View style={styles.textinputContainer}>
                            <TextInput style={styles.textInput}
                                placeholder="Enter your password"
                                secureTextEntry={true}
                                onChangeText={(password)=>this.setState({password})}
                                    value={this.state.password}>
                            </TextInput>
                        </View>

                        <TouchableOpacity style={styles.loginButton}onPress={()=>{this.Dangnhap()}}>
                            <Text style={styles.loginButtonTitle}>LOGIN</Text>
                        </TouchableOpacity>
                        <Divider style={styles.divider}></Divider>
                        <FontAwesome.Button name="facebook" backgroundColor='#3897f0' style={styles.facebookButton}>
                            <Text style={styles.loginButtonTitle}>Login with Facebook</Text>
                        </FontAwesome.Button>
                        <TouchableOpacity style={styles.textforgot}
                        onPress={() => this.props.navigation.navigate('Forgot_password')}>
                            <Text style={styles.titles2}>Forgot password?</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.down}>
                        <Text style={styles.titles3}>Don't have an account?</Text>
                        <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Register')}>
                        <Text style={styles.titles3}>Sign up</Text></TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        width: 100 + "%",
        height: 100 + "%",
        justifyContent: "center",
        alignItems: "stretch",
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',

    },
    up: {
        
        flexDirection: 'column',
    },
    between: {
     
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    down:{
        
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    titles: {
        color: 'black',
        textAlign: 'center',
        width: 400,
        fontSize: 30,
        marginBottom:30
    },
    textinputContainer: {
        paddingHorizontal: 10,
        borderRadius: 6,
        marginBottom: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
    },
    textInput: {
        width: 280,
        height: 35,
    },
    loginButton: {
        width: 300,
        height: 35,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3897f0',
    },
    loginButtonTitle: {
        fontSize: 18,
        color: 'white',

    },
    facebookButton: {
        width: 300,
        height: 35,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    line: {
        height: 1,
        flex: 2,
        backgroundColor: 'black',
    },
    textOr: {
        flex: 1,
        textAlign: 'center',
    },
    divider: {
        flexDirection: 'row',
        height: 30,
        width: 298,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titles2: {
        color: 'black',
        textAlign: 'center',
        width: 300,
        fontSize: 15,
        marginTop:10,
        textAlign:'right'
    },
    titles3: {
        color: 'black',
        textAlign: 'center',
        width: 300,
        fontSize: 15,
        marginTop:10,
        
    },
    textforgot:{
        marginTop:10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});