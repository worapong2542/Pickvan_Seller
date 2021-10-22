import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Card from '../components/card';
import axios from 'axios';

function Auto_schedule_detail({route, navigation}) {
  const {item} = route.params;

  function del() {
    Alert.alert('ยืนยันที่จะลบรอบนี้หรือไม่', '', [
      {
        text: 'ยกเลิก',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'ตกลง', onPress: () =>del_api()},
    ]);
  }

  async function del_api(){
    await axios
    .get('http://10.0.2.2:3001/seller/auto_schedule_del/'+item.item.license_plate+"/"+item.item.time.substring(0, 5))
    .then(res => alert(res.data));
    navigation.push('Auto_schedule')
  }

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Card>
        <Text style={styles.textTime}>{item.item.time.substring(0, 5)}</Text>
        <Text style={styles.textDefault}>{item.item.name}</Text>
        <Text style={styles.textDefault}>{item.item.license_plate}</Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.textSeat}>ราคาต่อที่นั่ง : </Text>
          <Text style={styles.textDefault}> {item.item.price}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginLeft: 60}}></View>
          <TouchableOpacity onPress={() => navigation.navigate('Auto_schedule_edit', {item: item.item})}>
            <Text style={styles.txtHead}>แก้ไข</Text>
          </TouchableOpacity>
          <View style={{marginLeft: 130}}></View>
          <TouchableOpacity onPress={() => del()}>
            <Text style={styles.txtHead}>ลบรอบ</Text>
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );
}

export default Auto_schedule_detail;

const styles = StyleSheet.create({
  textTime: {
    color: '#5660B3',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  textDefault: {
    color: '#5660B3',
    fontSize: 16,
    marginBottom: 10,
  },
  textSeat: {
    color: '#5660B3',
    // fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
    marginRight: 170,
  },
  txtHead: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 17,
    color: '#5660B3',
    marginBottom: 10,
    marginTop: 30,
  },
  container: {
    marginTop: 30,
    marginBottom: 30,
    backgroundColor: '#fff',
  },
  btnConfirm: {
    marginTop: -10,
    margin: 20,
    backgroundColor: '#FEB5A6',
    borderRadius: 20,
    height: 40,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  picker: {
    height: 50,
    width: 350,
  },
  baseText: {
    fontWeight: 'bold',
    color: 'rgba(86, 96, 179, 1)',
    fontSize: 18,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 15,
    marginBottom: 15,
  },
});
