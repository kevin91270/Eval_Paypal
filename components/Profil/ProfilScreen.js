import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Firebase, auth, db } from '../../Firebase/firebase';

import User from './User'


function ProfilScreen() {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState([])

    const authEmail = auth.currentUser.email

    useEffect(() => {
        const loadUser = () => Firebase.user().where("email", "==", authEmail).onSnapshot(
            (query) => {
                const list = []
                query.forEach(doc => {
                    const { email, name, prenom, password } = doc.data()
                    list.push({
                        id: doc.id,
                        email,
                        name,
                        prenom,
                        password
                    })
                })
                setUser(list)
                setLoading(false)
            }
        )

        loadUser()
    }, [])

    const renderUser = () => {
        return user.map(item =>
            <User 
                user={item}
                key={item.id}
            />
        )
    }

    if (loading) {
        return null
    }

    return (
        <View style={styles.container}>
            {renderUser()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#34495e',
    },
});

export default ProfilScreen;
