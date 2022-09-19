import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'

import { Firebase, db, auth } from '../../Firebase/firebase'
import Affichagedesproduits from './Affichagedesproduits'
import AffichagePaniervide from './AffichagePaniervide'

import firebase from "firebase";

function AffichagePanier({ user }) {
    const [loading, setLoading] = useState(true)
    const [detail, setDetail] = useState([])


    const mapid = []
    console.log(user.panier)
    if (user.panier.length != 0) {

        useEffect(() => {
            user.panier.map(item =>
                mapid.push(item.id)
            )

            const loadDetail = () => Firebase.products().where("__name__", "in", mapid).onSnapshot(
                (query) => {
                    const list = []
                    query.forEach(doc => {
                        const { productName, price } = doc.data()
                        list.push({
                            id: doc.id,
                            productName,
                            price
                        })
                    })
                    setDetail(list)
                    setLoading(false)
                }
            )

            loadDetail()
        }, [user])


        const renderProduct = () => {
            return detail.map(item =>


                <Affichagedesproduits product={item} user={user} key={item.id} />
                
                
            )
        }
        
        return (
            <View>
                {renderProduct()}
                
            </View>
        )
    }
    else {
        return <AffichagePaniervide />
    }
}


export default AffichagePanier
