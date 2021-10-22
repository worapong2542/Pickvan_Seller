import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  TextField,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectDropdown from 'react-native-select-dropdown';
import styles from '../style/addRouteStyle';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';

function Auto_schedule_edit({route, navigation}) {
  const {item} = route.params;
  const [hours, sethours] = useState(0);
  const [min, setmin] = useState(0);
  const [price, setprice] = useState('');
  const hours_time = [
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
  ];
  const minute = ['00', '15', '30', '45'];

  function confirm() {
    if (price == '') {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    } else {
      Alert.alert('ยืนยันการแก้ไข', 'รถทะเบียน: '+item.license_plate+' '+item.name+'        เวลา '+hours_time[hours]+':'+minute[min]+' ราคา: '+price +' บาท', [
        {
          text: 'ยกเลิก',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'ตกลง', onPress: () => update()},
      ]);
    }
  }

  async function update(){
    await axios
    .get('http://10.0.2.2:3001/seller/auto_schedule_update/'+item.license_plate+"/"+hours_time[hours]+':'+minute[min]+"/"+price)
    .then(res => alert(res.data));
    navigation.push('Auto_schedule')
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.baseText}>ทะเบียน: {item.license_plate}</Text>
      <Text style={styles.baseText}>{item.name}</Text>
      <Text style={styles.baseText}>เวลา</Text>
      <View style={{flexDirection: 'row'}}>
        <View style={{marginLeft: 20}}></View>
        <Picker
          style={styles.timePicker}
          selectedValue={hours}
          onValueChange={(itemValue, itemIndex) => sethours(itemValue)}>
          {hours_time.map((item, index) => {
            return <Picker.Item label={item} value={index} key={index} />;
          })}
        </Picker>

        <Text style={styles.baseText}> : </Text>

        <Picker
          style={styles.timePicker}
          selectedValue={min}
          onValueChange={(itemValue, itemIndex) => setmin(itemValue)}>
          {minute.map((item, index) => {
            return <Picker.Item label={item} value={index} key={index} />;
          })}
        </Picker>
      </View>

      <Text style={styles.baseText}>ราคา</Text>
      <TextInput
        style={styles.textInput}
        keyboardType="numeric"
        placeholder="กรอกราคา"
        maxLength={4}
        onChangeText={setprice}
      />

      <TouchableOpacity onPress={() => confirm()}>
        <View style={styles.btnConfirm}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
            ยืนยัน
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default Auto_schedule_edit;
