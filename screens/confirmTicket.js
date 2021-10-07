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

  async function update_stats_ticket(x) {
    const url = item.item.ticket_id + '/' + x;
    if (x == 2) {
      await axios
        .get('http://10.0.2.2:3001/seller/update/' + url)
        .then(res => alert(res.data));
    } else {
      await axios
        .get('http://10.0.2.2:3001/seller/update/' + url)
        .then(res => alert(res.data));
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ScrollView>
          <View style={{flex: 1, backgroundColor: '#fff'}}>
            <Card>
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.textBold}>เลขตั๋ว  :  {item.item.ticket_id}</Text>
                <Text style={styles.textDefault}>จำนวน : x {item.item.seat_amount}</Text>              
              </View>
              </Card>
              
              <Card>
              <Text style={styles.textBold}>{item.item.name}</Text>   
              <View style={{flexDirection: 'row'}}>
              <Text style={styles.textTimeDate}>เวลา : </Text>
              <Text style={styles.textDefault}>{item.item.time.substring(0, 5)}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
              <Text style={styles.textTimeDate}>วันที่ : </Text>
              <Text style={styles.textDefault}>{item.item.date.substring(0, 10)}</Text>
              </View>
              </Card>

              <Card>
              <View style={{flexDirection: 'row'}}>
              <Text style={styles.textPrice}> รวมการสั่งซื้อ :   </Text>
              <Text style={styles.textPrice}> {item.item.price * item.item.seat_amount}  บาท  </Text>
              </View>
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

        <TouchableOpacity onPress={() => update_stats_ticket(3)}>
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
  textBold: {
    color: '#5660B3',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 150,
  },
  textDefault: {
    color: '#5660B3',
    marginTop: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  textTimeDate:{
    color: '#5660B3',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 190,
  },
  textPrice:{
    color: '#5660B3',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 110,
  },
  btnฺButtom: {
    backgroundColor: '#FEB5A6',
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
