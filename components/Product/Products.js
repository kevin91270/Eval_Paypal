import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { firebaseHOC } from '../../Firebase'
import { Firebase } from '../../Firebase/firebase';
import Product from './Product'


function Products() {
    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])

    useEffect(() => {
        const loadProducts = () => Firebase.products().onSnapshot(
            (query) => {
                const list = []
                query.forEach(doc => {
                    const { productName, price, image } = doc.data()
                    list.push({
                        id: doc.id,
                        productName,
                        price,
                        image
                    })
                })
                setProducts(list)
                setLoading(false)
            }
        )

        loadProducts()
    }, [])

    const renderProducts = () => {
        return products.map(item =>
            <Product
                product={item}
                key={item.id}
            />
        )
    }

    if (loading) {
        return null
    }

    return (
        <View>
            {renderProducts()}
        </View>
    )
}

export default firebaseHOC(Products)