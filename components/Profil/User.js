import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { db, auth } from "../../Firebase/firebase"
import { useNavigation } from '@react-navigation/native'
//import firebase from 'firebase'

import { Button } from 'react-native-paper';

export default function User({ user }) {
    const [nom, setTextNom] = useState(user.name)
    const [prenom, setTextPrenom] = useState(user.prenom)
    const [email, setTextMail] = useState(user.email)
    const [password, setTextPassword] = useState("")
    const [ancienPassword, setTextAncienPassword] = useState("")

    const navigation = useNavigation();
    const UserOnline = auth.currentUser


    const update = () => {
        const data = {
            nom: nom,
            prenom: prenom,
            email: email,
            password: password,
            ancienPassword: ancienPassword
        }
        createElement(nom, prenom, email, password, ancienPassword)
        logout()
    }

    const logout = () => {
        auth.signOut()
        auth.onAuthStateChanged(user => {
            if (!user) {
                console.log("deco")
                navigation.replace("LoginPage")
            }
        })
    }


    const createElement = (nom, prenom, email, password, ancienPassword) => {

        if (ancienPassword != "") {
            if (ancienPassword == user.password) {

                UserOnline.updateEmail(email).then(() => {
                    UserOnline.updatePassword(password).then(() => {
                        console.log("update passwd")
                    })



                    db.collection("user").doc(user.id).update({
                        name: nom,
                        prenom: prenom,
                        email: email,
                        password: password
                    })
                        .then(() => {
                            console.log("user mis à jour")
                        })
                })
            } else {
                console.log("mot de passe incorrect")
            }
        } else {

            db.collection("user").doc(user.id).update({
                name: nom,
                prenom: prenom,
                email: email,
            })
                .then(() => {
                    console.log("user upd name, prenom, email")
                })
        }
    }



    return (
        <View style={styles.viewContainer}>
            <View style={styles.view}>
                <TextInput
                    style={styles.input}
                    defaultValue={user.name}
                    onChangeText={(txt) => setTextNom(txt)}
                />
                <TextInput
                    style={styles.input}
                    defaultValue={user.prenom}
                    onChangeText={(txt) => setTextPrenom(txt)}
                />
                <TextInput
                    style={styles.input}
                    defaultValue={user.email}
                    onChangeText={(txt) => setTextMail(txt)}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Taper votre ancien mot de passe"
                    onChangeText={(txt) => setTextAncienPassword(txt)}
                    placeholderTextColor='grey'
                    secureTextEntry={true}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Taper votre nouveau mot de passe"
                    onChangeText={(txt) => setTextPassword(txt)}
                    placeholderTextColor='grey'
                    secureTextEntry={true}
                />
                <View style={styles.viewButton}>
                    <Button mode="contained" style={styles.connect} onPress={() => { update() }} >Update</Button>
                    <Button mode="contained" style={styles.connect2} onPress={() => { logout() }} >LogOut</Button>
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
        marginTop: '2%',
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
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        width: 150,
        height: 40,
        borderRadius: 24,
        textAlign: 'center',
        backgroundColor: '#191919',
        color: 'white',
    },
    connect2: {
        borderWidth: 2,
        borderColor: 'red',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        width: 150,
        height: 40,
        borderRadius: 24,
        textAlign: 'center',
        backgroundColor: '#191919',
    },
    viewButton:{
        marginTop:40,
        marginBottom:20,
        flexDirection:"row"
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
