import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { Text, View, StyleSheet, Button, ScrollView } from 'react-native'
import { auth } from '../../Firebase/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Firebase, { FirebaseProvider } from '../../Firebase'

import Products from '../Product/Products';


function DetailScreen({ navigation }) {

    return (
        <ScrollView  style={styles.viewContainer}>
            <View>
                <FirebaseProvider value={Firebase}>
                    <Products />
                </FirebaseProvider>
            </View>
            
            <StatusBar style="inverted" />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewContainer: {
        
        backgroundColor: '#34495e',
    },
});

export default DetailScreen
