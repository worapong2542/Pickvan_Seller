import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Card from '../components/card';
import CustomerList from './customerList';
import axios from 'axios';

function RouteDetail({route, navigation}) {
  const [seat, setseat] = useState(1);
  const {item} = route.params;
  const [selectedValue, setSelectedValue] = useState();
  const [datavan_and_route, setdatavan_and_route] = useState([]);
  const [options, setoptions] = useState([]);

  //first req api before loop api start,because loop api start after open this page 10 second
  useEffect(() => {
    getdata_route();
  }, []);

  //loop req api every 10 second
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      getdata_route();
      setSeconds(seconds => seconds + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  //wait api res data and remap data
  useEffect(() => {
    if (datavan_and_route == '') {
    } else {
      setoptions(datavan_and_route.point_down);
    }
  }, [datavan_and_route]);

  //check seat(auto update seat_free)
  useEffect(() => {
    if (seat < 0) {
      alert('กรุณาระบุจำนวนที่นั่ง');
      setseat(1);
    } else if (seat > datavan_and_route.set_free) {
      alert('ที่นั่งถึงจำนวนสูงสุดแล้ว');
      setseat(datavan_and_route.set_free);
    }
  }, [seat]);

  //api
  async function getdata_route() {
    await axios
      .get(
        'http://10.0.2.2:3001/seller/getschedule_select_id/' +
          item.item.id +
          '/' +
          item.item.license,
      )
      .then(res => setdatavan_and_route(res.data));
  }

  //add walk in api 
  async function addwalkin() {
    if (seat == 0) {
      alert('จำนวนที่นั่งเกิดข้อผิดพลาด')
      getdata_route();
    } else {
      await axios
        .get(
          'http://10.0.2.2:3001/seller/walkin_add/' +
            item.item.id +
            '/' +
            options[selectedValue] +
            '/' +
            seat +
            '/' +
            datavan_and_route.vanseat,
        )
        .then(res => alert(res.data));
      setseat(1);
      getdata_route();
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Card>
        <Text style={styles.txtDefault}>
          เวลา : {item.item.time.substring(0, 5)}
        </Text>
        <Text style={styles.txtDefault}>{item.item.destination}</Text>
        <Text style={styles.txtDefault}>{item.item.license}</Text>
      </Card>

      <Card>
        <View>
          <Text style={styles.txtDefault}>
            จำนวนที่นั่งทั้งหมด : {datavan_and_route.vanseat}
          </Text>
          <Text style={styles.txtDefault}>
            จำนวนที่นั่งที่เหลือ :{datavan_and_route.set_free}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('CustomerList', {item: {item}})}>
          <Text style={styles.txtHead}>กดดูรายชื่อผู้โดยสาร</Text>
        </TouchableOpacity>
      </Card>

      <Card>
        <View>
          <Text style={styles.txtHead}>เพิ่มที่นั่ง walk in </Text>
          <View style={{flexDirection: 'row'}}>
            <Text>จำนวนที่นั่ง</Text>
            <TouchableOpacity
              style={{backgroundColor: '#DDDDDD'}}
              onPress={() => setseat(seat + 1)}>
              <Text>++++++</Text>
            </TouchableOpacity>
            <Text>{seat}</Text>
            <TouchableOpacity
              style={{backgroundColor: '#DDDDDD'}}
              onPress={() => setseat(seat - 1)}>
              <Text>--------</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.container}>
          <Picker
            selectedValue={selectedValue}
            style={styles.picker}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }>
            {options.map((item, index) => {
              return <Picker.Item label={item} value={index} key={index} />;
            })}
          </Picker>
        </View>

        <TouchableOpacity onPress={() => addwalkin()}>
          <View style={styles.btnConfirm}>
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
              ยืนยัน
            </Text>
          </View>
        </TouchableOpacity>
      </Card>
    </View>
  );
}

export default RouteDetail;

const styles = StyleSheet.create({
  txtDefault: {
    fontSize: 16,
    marginTop: 10,
  },
  txtHead: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 17,
    marginTop: 30,
    marginBottom: 20,
  },
  container: {
    marginTop: 30,
    marginBottom: 30,
    backgroundColor: '#fff',
  },
  btnConfirm: {
    marginTop: 4,
    margin: 20,
    backgroundColor: 'rgba(86, 96, 179, 1)',
    borderRadius: 20,
    height: 40,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  picker: {
    height: 50,
    width: 370,
  },
});
