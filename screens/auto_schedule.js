import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Card from '../components/card';
import axios from 'axios';
import React, {useState, useRef, useEffect} from 'react';

function Auto_schedule({navigation}) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    data_auto_schedule();
  }, []);

  async function data_auto_schedule() {
    await axios
      .get('http://10.0.2.2:3001/seller/get_auto_schedule_data')
      .then(res => setReviews(res.data));
  }

  return (
    <View style={{flex: 2, backgroundColor: '#fff'}}>
      <FlatList
        data={reviews}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Auto_schedule_detail', {item: {item}})
            }>
            <Card>
              <Text style={styles.textTime}>{item.time.substring(0, 5)}</Text>
              <Text style={styles.textDefault}>{item.name}</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.textDefault}>ราคา: </Text>
                <Text style={styles.textDefault}>{item.price}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.textDefault}>จำนวนที่นั่ง: </Text>
                <Text style={styles.textDefault}>{item.van_seat}</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.textDefault}>ทะเบียน: </Text>
                <Text style={styles.textDefault}>{item.license_plate}</Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Auto_schedule_detail', {item: {item}})
                  }>
                  <View style={styles.btnCheck}>
                    <Text style={styles.textCheck}>แก้ไข</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </Card>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Auto_schedule_add')}>
        <Text style={styles.textbutton}> สร้างรอบรถ</Text>
      </TouchableOpacity>
    </View>
  );
}

export default Auto_schedule;

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
  btnButtom: {
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
  textDate: {
    color: '#5660B3',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  boxDate: {
    width: 91,
  },
  btnDetail: {
    backgroundColor: '#FEB5A6',
    borderRadius: 20,
    height: 30,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 120,
    marginTop: 5,
  },
  textDetail: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  btnCheck: {
    backgroundColor: '#FEB5A6',
    borderRadius: 20,
    height: 30,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 120,
  },
  textCheck: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  btnCheck2: {
    backgroundColor: '#FEB5A6',
    borderRadius: 20,
    height: 40,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 100,
    marginTop: -0,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#FEB5A6",
    padding: 10
  },
  textbutton: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
