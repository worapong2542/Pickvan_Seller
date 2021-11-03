import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import Card from '../components/card';
import axios from 'axios';

function CustomerList({route, navigation}) {
  const [data, setdata] = useState('');
  const {item} = route.params;
  console.log(item)
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
        <Text style={styles.textTime}>{new_item.time.substring(0, 5)}</Text>
        <View style={{flexDirection: 'row'}}>
            <View style={{ flex: 2}}>
              <Text style={styles.textDefault}>{new_item.destination}</Text>
            </View>
            <View style={{ flex: 1, paddingLeft:80}}>
              <Text style={styles.textDefault}>{new_item.license}</Text>
            </View>
        </View>  
      </Card>

      <Card>
        <Text style={styles.textBold}>walkin </Text>
        <View style={{flexDirection: 'row'}}>
            <View style={{ flex: 2}}>
              <Text style={styles.textDefault}>จำนวน : </Text>
            </View>
            <View style={{ flex: 1, paddingLeft:80}}>
              <Text style={styles.textDefault}>{data.walkin}   คน</Text>
            </View>
        </View>
      </Card>

      <Card>
        <Text style={styles.textBold}>การซื้อผ่าน app</Text>
        <View style={{flexDirection: 'row'}}>
            <View style={{ flex: 2}}>
              <Text style={styles.textDefault}>จำนวน : </Text>
            </View>
            <View style={{ flex: 1, paddingLeft:80}}>
              <Text style={styles.textDefault}>{data.app}   คน</Text>
            </View>
        </View>
        
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
  textTime: {
    color: '#5660B3',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center'
  },
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
