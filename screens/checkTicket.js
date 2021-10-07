import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Card from '../components/card';
import SelectDropdown from 'react-native-select-dropdown';
import axios from 'axios';
import React, {useState, useRef, useEffect} from 'react';
import {Button} from 'react-native-elements/dist/buttons/Button';

function CheckTicket({navigation}) {
  const [data, setdata] = useState([]);

  useEffect(() => {
    checkticket();
  }, []);
  //loop req api every 5 second
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      checkticket();
      setSeconds(seconds => seconds + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  async function checkticket() {
    await axios
      .get('http://10.0.2.2:3001/seller/checkticket/')
      .then(res => setdata(res.data));
  }

  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    setReviews(data);
  }, [data]);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <FlatList
          data={reviews}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ConfirmTicket', {item: {item}})
              }>
              <Card >
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.textBold}>เลขตั๋ว  :  {item.ticket_id}</Text>
                <Text style={styles.textDefault}>จำนวน : {item.seat_amount} ที่นั่ง</Text>
              </View>

              <View style={{flexDirection: 'row'}}>
                <Text style={styles.textDefault}>{item.name}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('ConfirmTicket', {item: {item}})}>
                  <View style={styles.btnButtom}>
                    <Text style={styles.textButtom}>ตรวจสอบ</Text>
                  </View>
                </TouchableOpacity>
                </View>

              </Card>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

export default CheckTicket;

const styles = StyleSheet.create({
  textBold: {
    color: '#5660B3',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    marginRight:150
  },
  textDefault: {
    color: '#5660B3',
    marginTop: 10,
    fontSize: 16,
    marginBottom: 10,
  },
 
  btnButtom: {
    backgroundColor: '#FEB5A6',
    borderRadius: 20,
    height: 30,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:120,  
    marginTop:5
  },
  textButtom: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  
});
// test git

