import React from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Image } from 'react-native'

function AffichagePaniervide() {
    return (
        <View>
            <View>
                <Image style={styles.img} source={require('../../img/cart.png')} />
                <Text style={styles.panierVide}>Ton panier est vide !</Text>
            </View>
            <StatusBar style="auto" />
        </View>
    )
}
const styles = StyleSheet.create({
    img:{
        resizeMode: 'contain',
        width:400,
        height:400,
        marginBottom:-50,
        alignItems:"center"
    },
    panierVide:{
        color:'white',
        textAlign:'center',
        fontSize:20
    }
  });

export default AffichagePaniervide
