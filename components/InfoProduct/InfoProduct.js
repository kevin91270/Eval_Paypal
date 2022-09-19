import React from 'react'
import { StyleSheet, View, Text, } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native'
import { Card as NewCard} from 'react-native-elements';
import { Card, Button } from 'react-native-paper';

export default function Infoproduct({ data }) {
    const navigation = useNavigation();

    return (
        <View>
            <View>
            <Card style={styles.card}>
                <Card.Title
                    title={data.productName}
                    titleStyle={{ color: 'white' }}
                />
                <NewCard.Image style={styles.img} source={{ uri: data.image }} />
                <Text style={styles.price}>{data.price} $</Text>
                <Text style={styles.description}>{data.description} </Text>
                <Card.Actions>
                    <Button color='#3498db' onPress={() => { navigation.replace("StackHome") }}>
                        Revenir aux produits
                    </Button>
                </Card.Actions>
            </Card>
            </View>
            <StatusBar style="inverted" />
            
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        marginTop:25,
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
        color:'#2ecc71',
        marginTop:20
    },
    description:{
        color:'white',
        marginLeft:15,
        marginRight:15,
        marginTop:30
    },
    img:{
        resizeMode: 'contain'
    },

});