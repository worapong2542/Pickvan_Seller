import React, { Component } from 'react'
import { Text, View, Button, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import Card from '../components/card';

function ConfirmTicket({ route, navigation }) {
  const { item } = route.params
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ScrollView>
          <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Card>
              <Text>เลขตั๋ว : {item.item.TicketId}</Text>
              <Text>จำนวน : {item.item.buySeat} ที่นั่ง</Text>
            </Card>
          </View>
        </ScrollView>
      </View>

      <View style={{ flexDirection: "row", backgroundColor: 'white' }} >
        <TouchableOpacity onPress={() => navigation.navigate('AddRoute')}>
          <View style={styles.btnฺButtom}>
            <Text style={styles.textButtom}>ยืนยัน</Text>
          </View>
        </TouchableOpacity>

        <View style={{ marginLeft: 1 }}></View>

        <TouchableOpacity onPress={() => navigation.navigate('CheckTicket')}>
          <View style={styles.btnฺButtom}>
            <Text style={styles.textButtom}>ยกเลิก</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ConfirmTicket;

const styles = StyleSheet.create({
  btnฺButtom: {
    backgroundColor: 'rgba(86, 96, 179, 1)',
    height: 40,
    width: 205,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  textButtom: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  }
})