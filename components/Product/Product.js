import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Card, Button } from 'react-native-paper';
import { Card as NewCard} from 'react-native-elements';

import { Firebase, db, auth } from '../../Firebase/firebase'
import firebase from "firebase";



export default function Product({ product }) {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState([])
    const navigation = useNavigation();

    useEffect(() => {

        const loadUser = () => Firebase.user().where("email", "==", auth.currentUser.email).onSnapshot(
            (query) => {
                const list = []
                query.forEach(doc => {
                    const { panier } = doc.data()
                    list.push({
                        id: doc.id,
                        panier,
                    })
                })
                setUser(list)
                console.log("list",list)
                setLoading(false)
            }
        )

        loadUser()
            console.log(user[0])
    }, [])

    let documentId = ""
    user.map(item =>
        documentId = item.id
    )

    const itemInbasket = () => {
        if (user[0].panier[0] != undefined) {
            //console.log(user[0].panier.find(element => element.id == prod.id))
            return user[0].panier.find(element => element.id == product.id)
        }
        else {
            return undefined
        }
    }

    const addToBasket = (id) => {
        console.log("user",user[0])
        if (itemInbasket() != undefined) {

            const i = (element) => element.id == id;
            const index = user[0].panier.findIndex(i);
            const number = user[0].panier[index].quantity
            const newBasket = {
                id: id,
                quantity: number + 1
            }
            user[0].panier[index] = newBasket;
            db.collection("user").doc(documentId).update({ panier: user[0].panier })

        }
        else {
            const newBasket = {
                id: id,
                quantity: 1
            }
            
            db.collection("user").doc(documentId).update({ panier: firebase.firestore.FieldValue.arrayUnion(newBasket) })
            //navigation.replace("StackHome")
            //navigation.navigate("Panier")
            
        }
    }

    return (
        <View>
            <Card style={styles.card}>
                <Card.Title 
                    title={product.productName} 
                    titleStyle={{color:'white'}}
                />
                <NewCard.Image style={styles.img} source={{ uri: product.image }} />
                <Text  style={styles.price}>{product.price} $</Text>
                <Card.Actions>
                    <Button color='#3498db' onPress={() => { navigation.replace("Information sur le produit", product.id) }}>
                        Detail    
                    </Button>
                    <Button color='#3498db' onPress={() => addToBasket(product.id)}>
                        Ajouter au panier
                    </Button>
                </Card.Actions>
            </Card>
        </View>
    )
}
const styles = StyleSheet.create({
    card:{
        marginTop:10,
        marginBottom:15,
        marginLeft:30,
        marginRight:30,
        backgroundColor:'#191919',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,

        elevation: 13,
    },
    price:{
        textAlign:'right',
        marginRight:20,
        fontSize:20,
        color:'#2ecc71'
    },
    img:{
        resizeMode: 'contain'
    },
});