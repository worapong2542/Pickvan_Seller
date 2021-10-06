import { Text, View, Button,ScrollView,TouchableOpacity } from 'react-native'
import { FlatList } from 'react-native-gesture-handler';
import Card from '../components/card';
import SelectDropdown from 'react-native-select-dropdown';
import axios from 'axios';
import React, {useState, useRef, useEffect} from 'react';

function CheckTicket({ navigation }) {
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
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
          <FlatList
            data={reviews}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate('ConfirmTicket', { item: { item } })} >
                <Card>
                  <Text>เลขตั๋ว : {item.ticket_id}</Text>
                  <Text>สายการเดินทาง : {item.name}</Text>
                  <Text>วันที่ : {item.date.substring(0, 10)}</Text>
                  <Text>เวลา : {item.time.substring(0, 5)}</Text>
                  <Text>จำนวน : {item.seat_amount} ที่นั่ง</Text>
                  <Text>รวมราคา :  {item.price*item.seat_amount} บาท</Text>
                </Card>
              </TouchableOpacity>
            )}
          />
      </View>
    </View>
  );
}

export default CheckTicket;