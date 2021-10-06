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
import axios from 'axios';


function CustomerList({route, navigation}) {
  const [data, setdata] = useState('');
  const {item} = route.params;
  const new_item = item.item.item;
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    ticketdata();
  }, []);
  async function ticketdata() {
    await axios
      .get('http://10.0.2.2:3001/seller/ticketdata/' + new_item.id)
      .then(res => setdata(res.data));
  }
  
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Card>
        <Text>เวลา : {new_item.time.substring(0, 5)}</Text>
        <Text>{new_item.destination}</Text>
        <Text>{new_item.license}</Text>
      </Card>

      <Card>
        <Text>walkin </Text>
        <Text>
          จำนวน :{' '}
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>{data.walkin}</Text>{' '}
          คน
        </Text>
      </Card>

      <Card>
        <Text>การซื้อผ่าน app</Text>
        <Text>
          จำนวน :{' '}
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>{data.app}</Text> คน
        </Text>
        <Text>
          เลขตั๋ว :{' '}
          <Text style={{fontSize: 16, fontWeight: 'bold'}}>
            {data.ticket_id}
          </Text>{' '}
        </Text>
      </Card>
    </View>
  );
}

export default CustomerList;
