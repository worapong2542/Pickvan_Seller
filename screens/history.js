import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Card from '../components/card';
import axios from 'axios';
import React, {useState, useEffect} from 'react';

function History({navigation}) {
  const [data, setdata] = useState([]);
  const [text_search, settext_search] = useState('');

  useEffect(() => {
    ticket();
  }, []);

  //loop req api every 5 second
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      ticket();
      setSeconds(seconds => seconds + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  async function ticket() {
    await axios
      .get('http://10.0.2.2:3001/seller/history_ticket')
      .then(res => setdata(res.data));
  }

  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    setReviews(data);
  }, [data]);

  function search() {
    let item;
    for (i in data) {
      if (data[i].ticket_id == text_search) {
        item = data[i];
        break;
      }
    }
    if (item) {
      navigation.navigate('History_ticket', {item: {item}});
    } else {
      alert('ไม่พบข้อมูลตั๋ว');
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.baseText}>ค้นหาตั๋ว: </Text>
        <TextInput
          style={styles.textInput}
          placeholder="กรอก ID ของตั๋ว"
          maxLength={10}
          onChangeText={settext_search}
        />
        <TouchableOpacity onPress={() => search()}>
          <View style={styles.btnsearch}>
            <Text style={styles.textButtom}>ค้นหา</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <FlatList
          data={reviews}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('History_ticket', {item: {item}})
              }>
              <Card>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.textBold}>
                    เลขตั๋ว : {item.ticket_id}
                  </Text>
                  <Text style={styles.textDefault}>
                    จำนวน : {item.seat_amount} ที่นั่ง
                  </Text>
                </View>

                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.textDefault}>{item.name}</Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('History_ticket', {item: {item}})
                    }>
                    <View style={styles.btnButtom}>
                      <Text style={styles.textButtom}>ดูรายละเอียด</Text>
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

export default History;

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

  btnButtom: {
    backgroundColor: '#FEB5A6',
    borderRadius: 20,
    height: 30,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 120,
    marginTop: 5,
  },
  textButtom: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  baseText: {
    fontWeight: 'bold',
    color: '#5660B3',
    fontSize: 18,
    marginLeft: 20,
    marginTop: 15,
    marginBottom: 15,
  },
  textInput: {
    height: 50,
    marginLeft: 10,
    backgroundColor: '#E8F3F3',
    borderRadius: 4,
    width: 200,
  },
  btnsearch: {
    backgroundColor: '#FEB5A6',
    borderRadius: 20,
    height: 30,
    width: '110%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 10,
  },
});
