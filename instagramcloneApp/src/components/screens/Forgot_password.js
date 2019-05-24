import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {firebaseApp} from './FirebaseConfig'

export default class Forgotpassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
        }

    }
    supmit(){
        firebaseApp.auth().sendPasswordResetEmail(this.state.email)
        .then(function(user){
            alert("Please check your email");
        }).catch(function(error){
            alert(error);
        })
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

                        <FontAwesome name="lock" size={100} style={styles.icon} ></FontAwesome>
                        <Text style={styles.titles3}>Trouble Logging In?</Text>
                        <Text style={styles.titles3}>Enter your username or email and we'll send you a link to get back into your account.</Text>
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

                        <TouchableOpacity style={styles.loginButton} onPress={()=>{this.supmit()}}>
                            <Text style={styles.loginButtonTitle}>Sent Login Link </Text>
                        </TouchableOpacity>

                        <Divider style={styles.divider}></Divider>

                        <FontAwesome.Button name="facebook" backgroundColor='#3897f0' style={styles.facebookButton}>
                            <Text style={styles.loginButtonTitle}>Login with Facebook</Text>
                        </FontAwesome.Button>

                    </View>
                    <TouchableOpacity style={styles.down}onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={styles.titles3}>Back to Login</Text>
                    </TouchableOpacity>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    between: {

        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    down: {

        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    icon: {
        marginTop: 10,
    },
    titles: {
        color: 'black',
        textAlign: 'center',
        width: 400,
        fontSize: 30,
    },
    textinputContainer: {
        paddingHorizontal: 10,
        borderRadius: 6,
        marginBottom: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginTop: 20,
    },
    textInput: {
        width: 280,
        height: 45,
    },
    loginButton: {
        width: 300,
        height: 40,
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
        height: 40,
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
        height: 40,
        width: 298,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titles2: {
        color: 'black',
        textAlign: 'center',
        width: 300,
        fontSize: 15,
        marginTop: 20,
        textAlign: 'right'
    },
    titles3: {
        color: 'black',
        textAlign: 'center',
        width: 300,
        fontSize: 15,
        marginTop: 20,
    },
    textforgot: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});