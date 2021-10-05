import React from "react";
import { View, Text, StyleSheet } from 'react-native'

const Header = (props) => {
    return (
        <View style={{
            height: 100,
            padding: 35,
            backgroundColor: 'rgba(137, 152, 219, 1)'
        }}>
            <Text style={{
                color: '#fff',
                fontSize: 24,
                textAlign: 'center',
                fontWeight: 'bold',
                fontFamily: "Roboto-Medium"
            }}>{props.title}</Text>
        </View>
    )
}

export default Header;