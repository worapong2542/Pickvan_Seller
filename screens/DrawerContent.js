import React from "react";
import { View, Text, StyleSheet} from 'react-native';
import {
    Drawer,
} from 'react-native-paper'
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

export function DrawerContent(props) {
    return(
        <View style = {{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style = {styles.drawerContent}>
                    <View style = {styles.userInfoSection}>
                        <Text style={styles.txtUserName}> UserName</Text>                        
                    </View>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style = {styles.bottomDrawerSection}>
                <DrawerItem
                    label = "Sign Out"
                    onPress={() => {}}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent:{
        flex:1
    },
    title:{
        fontSize:16,
        margin:3,
        fontWeight:'bold',
    },
    userInfoSection:{
        paddingLeft:20,
        paddingTop:20,
    },
    txtUserName:{
        fontWeight:'bold',
        fontSize:18
    },
    bottomDrawerSection:{
        marginBottom:15,
        borderColor:'#f4f4f4',
        borderTopWidth:1
    },
})
