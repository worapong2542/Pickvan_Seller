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
        <Text style={styles.textBold}>{new_item.time.substring(0, 5)}</Text>
        <Text style={styles.textDefault}>{new_item.destination}</Text>
        <Text style={styles.textDefault}>{new_item.license}</Text>
      </Card>

      <Card>
        <Text style={styles.textBold}>walkin </Text>
        <Text style={styles.textDefault}>
          {' '}
          จำนวน : <Text style={styles.textBold}>{data.walkin}</Text> คน
        </Text>
      </Card>

      <Card>
        <Text style={styles.textBold}>การซื้อผ่าน app</Text>
        <Text style={styles.textDefault}>
          จำนวน : <Text style={styles.textBold}>{data.app}</Text> คน
        </Text>
        
        <Text style={styles.textDefault}>
          เลขตั๋ว :   
          <Text style={styles.textBold}>
            {data.ticket_id}
          </Text>
        </Text>
      </Card>
    </View>
  );
}

export default CustomerList;
const styles = StyleSheet.create({
  textBold: {
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
});
