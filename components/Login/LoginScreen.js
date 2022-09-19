import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, Alert, Image } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { auth } from '../../Firebase/firebase';

import { Button } from 'react-native-paper';


function LoginScreen({ navigation }) {
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")

    const check = (mail, password) => {

        auth.signInWithEmailAndPassword(mail, password)
        auth.onAuthStateChanged(user => {
            if (user) {
                navigation.replace("StackHome")
            }
        })
    }


    return (
        <View style={styles.viewContainer}>
            <View>
                <Image style={styles.img2} source={require('../../img/reackbasket2.png')} />
            </View>
            <View style={styles.view}>
                <Text h1 style={styles.h1}>Login</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setMail(text)}
                    placeholder="Mail"
                    placeholderTextColor='grey'
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setPassword(text)}
                    placeholder="Password"
                    placeholderTextColor='grey'
                    secureTextEntry={true}
                />
                <View style={styles.viewButton}>
                    <Button mode="contained" style={styles.connect} onPress={() => { check(mail, password) }}>Login</Button>
                    <Button mode="contained" style={styles.connect} title="Register" onPress={() => { navigation.navigate("Register") }}>Register</Button>
                </View>
                <StatusBar style="inverted" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 2,
        borderColor: '#3498db',
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
        width: 250,
        height: 40,
        borderRadius: 24,
        textAlign: 'center',
        color: 'white',
    },
    view: {
        borderRadius: 10,
        alignItems: 'center',
        marginTop: '10%',
        marginLeft: 20,
        marginRight: 20,
        padding: 10,
        backgroundColor: '#191919',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,

    },
    viewContainer: {
        flex: 1,
        backgroundColor: '#34495e',
    },
    h1: {
        color: 'white',
        fontWeight: "500",
        fontSize: 30,
        marginBottom: 20,
        marginTop:10
    },
    connect: {
        borderWidth: 2,
        borderColor: '#2ecc71',
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
        width: 150,
        height: 40,
        borderRadius: 24,
        textAlign: 'center',
        backgroundColor: '#191919',
        color: 'white',
    },
    viewButton:{
        marginTop:40,
        marginBottom:20,
        flexDirection:"row"
    },
    img2:{
        width:100,
        height:100,
        resizeMode: 'contain',
        marginTop:"20%",
        marginLeft:"37%",
    }
});

export default LoginScreen
