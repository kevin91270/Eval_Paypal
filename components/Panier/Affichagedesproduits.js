import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Firebase, db, auth } from '../../Firebase/firebase'
import firebase from "firebase";

import { Card, Button } from 'react-native-paper';


function Affichagedesproduits({ product, user, navigation }) {
    // if(user.panier != "")
    const i = (element) => element.id == product.id;
    const index = user.panier.findIndex(i);
    const number = user.panier[index].quantity
    const price = user.panier[index].price
    const multi = (price * number)
    const result = (result + multi)
    console.log(user.panier)
    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);

    // creates a paypal order
    const createOrder = (data, actions) => {
        return actions.order
            .create({
                purchase_units: [
                    {
                        description: "test",
                        amount: {
                            currency_code: "USD",
                            value: number * product.price,
                        },
                    },
                ],
                // not needed if a shipping address is actually needed
                application_context: {
                    shipping_preference: "NO_SHIPPING",
                },
            })
            .then((orderID) => {
                setOrderID(orderID);
                return orderID;
            });
    };

    // check Approval
    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            const { payer } = details;
            setSuccess(true);
            deleteproduct();
            navigation.replace("StackHome")
        });
    };
    const deleteproduct = () => {
        if (user.panier.length == 0) {
            navigation.replace("StackHome")
        }
        db.collection("user").doc(user.id).update({ panier: firebase.firestore.FieldValue.arrayRemove(user.panier[index]) })
    }

    return (
        <View>
            <Card style={styles.card}>
                <Card.Title
                    titleStyle={{ color: 'white' }}
                    title={product.productName}
                />
                <Text style={styles.price}>{product.price} $</Text>
                <Text style={styles.number}>Exemplaire : {number}</Text>
                <Text style={styles.priceTotal}>Total : {number * product.price} $</Text>
                <View style={styles.viewButton}>
                    <Button mode="contained" style={styles.connect} onPress={() => deleteproduct()} >Supprimer</Button>
                </View>

            </Card>
            <PayPalScriptProvider options={{ "client-id": "AemahhNYtPhINanXnBvwJOLrMjKeEIAa6NUeiUFFGDZIHni75tPf-EPQ6sBLK5h7_2kpagqtwVjWlXP5" }}>
                <PayPalButtons style={{ layout: "horizontal" }} createOrder={createOrder}
                    onApprove={onApprove} />
            </PayPalScriptProvider>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        marginTop: 10,
        marginBottom: 15,
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: '#191919',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,

        elevation: 13,
    },
    price: {
        textAlign: 'right',
        marginRight: 20,
        fontSize: 15,
        color: 'white'
    },
    priceTotal: {
        textAlign: 'right',
        marginRight: 20,
        fontSize: 20,
        color: '#2ecc71'
    },
    number: {
        textAlign: 'right',
        marginRight: 20,
        fontSize: 15,
        color: 'white'
    },
    img: {
        resizeMode: 'contain'
    },
    connect: {
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
        color: 'red'
    },
    viewButton: {
        alignItems: 'center',
        marginBottom: 10,
    }
});

export default Affichagedesproduits
