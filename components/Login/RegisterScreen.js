import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from '../../Firebase/firebase'

import { Button } from 'react-native-paper';

function RegisterScreen({ navigation }) {
    const [nom, setTextNom] = useState("")
    const [prenom, setTextPrenom] = useState("")
    const [email, setTextMail] = useState("")
    const [password, setTextPassword] = useState("")


    const SignUP = () => {
        const data = {
            nom: nom,
            prenom: prenom,
            email: email,
            password: password
        }

        auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                createElement(nom, prenom, email, password)
            })

        navigation.replace("LoginPage")
    }

    const createElement = (nom, prenom, email, password) => {
        db.collection("user").add({
            name: nom,
            prenom: prenom,
            email: email.toLowerCase(),
            password: password,
            panier: []
        })
            .then(() => {
                console.log("user create")
            })
    }

    return (
        <View style={styles.viewContainer}>
            <View style={styles.view}>


                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setTextNom(text)}
                    placeholder="Nom"
                    placeholderTextColor='grey'
                />

                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setTextPrenom(text)}
                    placeholder="Prenom"
                    placeholderTextColor='grey'
                />

                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setTextMail(text)}
                    placeholder="Mail"
                    placeholderTextColor='grey'
                />

                <TextInput
                    style={styles.input}
                    onChangeText={(text) => setTextPassword(text)}
                    placeholder="Password"
                    placeholderTextColor='grey'
                    secureTextEntry={true}
                />
                <Button mode="contained" style={styles.connect} onPress={SignUP}>Register</Button>
                <StatusBar style="inverted" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 2,
        borderColor: '#3498db',
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        width: 250,
        height: 50,
        borderRadius: 24,
        textAlign: 'center',
        color: 'white',
    },
    view: {
        borderRadius: 10,
        alignItems: 'center',
        marginTop: '13%',
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
        marginBottom: 20
    },
    connect: {
        borderWidth: 2,
        borderColor: '#2ecc71',
        marginTop: 50,
        marginLeft: 10,
        marginRight: 10,
        width: 150,
        height: 40,
        borderRadius: 24,
        textAlign: 'center',
        backgroundColor: '#191919',
        color: 'white',
    },
    viewButton: {
        marginTop: 40,
        marginBottom: 20,
        flexDirection: "row"
    },
    img: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        marginTop: "50%",
        marginLeft: "40%",
    },
    img2: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        marginTop: "20%",
        marginLeft: "37%",
    }
});


export default RegisterScreen
