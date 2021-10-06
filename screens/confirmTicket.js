import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Card from '../components/card';
import axios from 'axios';

function ConfirmTicket({route, navigation}) {
  const {item} = route.params;

  async function update_stats_ticket(x){
    const url =  item.item.ticket_id+"/"+x
    if(x==2){
      await axios
      .get('http://10.0.2.2:3001/seller/update/'+url)
      .then(res => alert(res.data));
    }else{
      await axios
      .get('http://10.0.2.2:3001/seller/update/'+url)
      .then(res => alert(res.data));
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ScrollView>
          <View style={{flex: 1, backgroundColor: '#fff'}}>
            <Card>
              <Text>เลขตั๋ว : {item.item.ticket_id}</Text>
              <Text>สายการเดินทาง : {item.item.name}</Text>
              <Text>วันที่ : {item.item.date.substring(0, 10)}</Text>
              <Text>เวลา : {item.item.time.substring(0, 5)}</Text>
              <Text>จำนวน : {item.item.seat_amount} ที่นั่ง</Text>
              <Text>รวมราคา : {item.item.price * item.item.seat_amount} บาท</Text>
            </Card>
          </View>
        </ScrollView>
      </View>

      <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
        <TouchableOpacity onPress={() => update_stats_ticket(2)}>
          <View style={styles.btnฺButtom}>
            <Text style={styles.textButtom}>ยืนยัน</Text>
          </View>
        </TouchableOpacity>

        <View style={{marginLeft: 1}}></View>

        <TouchableOpacity onPress={() =>update_stats_ticket(3)}>
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
    alignSelf: 'center',
  },
  textButtom: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
