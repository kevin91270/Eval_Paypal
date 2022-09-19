import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native';

import  { Firebase, auth } from '../../Firebase/firebase'
import AffichagePanier from './AffichagePanier';


function PanierScreen() {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState([])

    const UserOnline = auth.currentUser.email
    
    useEffect(() => {
        const loadUser = () =>  Firebase.user().where("email", "==", UserOnline).onSnapshot(
            (query) => {
                const list = []
                query.forEach(doc => {
                    const { panier } = doc.data()
                    list.push({
                        id: doc.id,
                        panier
                    })
                })
                setUser(list)
                setLoading(false)
            }
        )

        loadUser()
    }, [])
    

    const renderAffichagePanier = () => {
        return user.map(item =>
            <AffichagePanier user={item} key={item.id} />
            
        )
    }

    if (loading) {
        return null
    }

    return (
    
        <View style={styles.container}>
            {renderAffichagePanier()}
        </View>
   
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#34495e',
    },
});

export default PanierScreen
