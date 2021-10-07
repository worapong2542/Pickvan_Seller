import React from "react";
import { StyleSheet, View } from "react-native";

export default function CardDate(props){
    return(
        <View style={styles.card}>
            <View style={styles.cardContent}>
                { props.children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        borderRadius: 6,
        backgroundColor:'#E8F3F3',
        marginHorizontal:4,
        marginVertical:6,
        
    },
    cardContent:{
        marginHorizontal:18,
        marginVertical:10,
    }
})