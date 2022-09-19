import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native';

import  {Firebase, auth} from '../../Firebase/firebase'
import InfoProduct from './InfoProduct.js';

function InfoProductScreen({route}) {
    
    const [loading, setLoading] = useState(true)
    const [detail, setDetail] = useState([])


    useEffect(() => {
        const loadDetail = () =>  Firebase.products().where("__name__", "==", route.params).onSnapshot(
            (query) => {
                const list = []
                query.forEach(doc => {
                    const { productName, description, price, image } = doc.data()
                    list.push({
                        id: doc.id,
                        price,
                        description,
                        productName,
                        image
                    })
                })
                setDetail(list)
                setLoading(false)
            }
        )

        loadDetail()
    }, [])
    const renderDetail = () => {
        return detail.map(item =>
            <InfoProduct data={item} key={item.id} />
        )
    }

    if (loading) {
        return null
    }

    return (
        
        <View style={styles.container}>
            <Text style={styles.txt}>Information sur le produit</Text>
            {renderDetail()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#34495e',
    },
    txt:{
        textAlign:'center',
        marginTop:52,
        fontSize:18,
        color:'white',
        fontWeight: "500",
    }
});

export default InfoProductScreen
