import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard,Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { firebaseApp } from '../screens/FirebaseConfig.js'

export default class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newPassword: '',
            currentPassword: '',
        };
    }
    
    onChangePassword =() =>{
        var user =firebaseApp.auth().currentUser;
        if(user != null){
              user.updatePassword(this.state.newPassword)
              .then(() =>{
                      Alert.alert("Password was changed");
              })
              .catch((error) =>{
                  console.log(error.message); 
              })
        }
    }

    render() {
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={styles.up}>
                        <Text style={styles.titles}>Instagram</Text>
                    </View>
                    <View style={styles.between}>
                        <View style={styles.textinputContainer}>
                            <TextInput style={styles.textInput}
                                placeholder="Current Password"
                                secureTextEntry={true}
                                value={this.state.currentPassword}
                                onChangeText={(currentPassword) => this.setState({ currentPassword })}
                            >
                            </TextInput>
                        </View>
                        <View style={styles.textinputContainer}>
                            <TextInput style={styles.textInput}
                                placeholder="New Password"
                                secureTextEntry={true}
                                value={this.state.newPassword}
                                onChangeText={(newPassword) => this.setState({ newPassword })}
                            >
                            </TextInput>
                        </View>

                        <TouchableOpacity style={styles.loginButton} onPress={this.onChangePassword}>
                            <Text style={styles.loginButtonTitle}>Change password</Text>
                        </TouchableOpacity>

                        <View style={styles.textforgot}>
                            <Text style={styles.titles2}>Forgot password?</Text>
                        </View>

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
        flex: 3,
        flexDirection: 'column',
    },
    between: {
        flex: 7,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
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