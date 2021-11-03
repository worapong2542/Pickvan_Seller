import React from 'react';
import {useState, useEffect} from 'react';
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import Card from '../components/card';
import axios from 'axios';
import {launchImageLibrary} from 'react-native-image-picker';
import ImgToBase64 from 'react-native-image-base64';
import base64 from 'react-native-base64';

function ConfirmTicket({route, navigation}) {
  const {item} = route.params;
  const [renImg, setrenImg] = useState();
  const [showImg, setshowImg] = useState('');

  async function update_stats_ticket(state) {
    await axios
      .get('http://10.0.2.2:3001/seller/update/' + item.item.ticket_id + '/' + state)
      .then(res => alert(res.data));
    navigation.push('CheckTicket');
  }

  function alert_check(text, state) {
    Alert.alert(
      'ยืนยันรายการ',
      'ท่านต้องการที่จะ ' + text + ' การจองของตั๋วใบนี้',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => update_stats_ticket(state)},
      ],
    );
  }

  useEffect(() => {
    fun_showImg();
  }, []);

  async function fun_showImg() {
    await axios
      .get('http://10.0.2.2:3001/seller/get_img/' + item.item.ticket_id)
      .then(res => setshowImg(res.data));
  }

  useEffect(() => {
    let textImg = 'data:image/png;base64,' + showImg;
    setrenImg(textImg);
  }, [showImg]);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <ScrollView>
          <View style={{flex: 1, backgroundColor: '#fff'}}>
            <Card>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.textBold}>
                  เลขตั๋ว : {item.item.ticket_id}
                </Text>
                <Text style={styles.textDefault}>
                  จำนวน : x {item.item.seat_amount}
                </Text>
              </View>
            </Card>

            <Card>
              <Text style={styles.textBold}>{item.item.name}</Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.textTimeDate}>เวลา : </Text>
                <Text style={styles.textDefault}>
                  {item.item.time.substring(0, 5)}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.textTimeDate}>วันที่ : </Text>
                <Text style={styles.textDefault}>
                  {item.item.date.substring(0, 10)}
                </Text>
              </View>
            </Card>

            <Card>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.textPrice}> รวมการสั่งซื้อ : </Text>
                <Text style={styles.textPrice}>
                  {' '}
                  {item.item.price * item.item.seat_amount} บาท{' '}
                </Text>
              </View>
            </Card>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{marginLeft: 55}}></View>
            <Image
              source={{uri: renImg}}
              style={{width: 300, height: 300, resizeMode: 'contain'}}
            />
          </View>
        </ScrollView>
      </View>

      <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
        <TouchableOpacity onPress={() => alert_check('ยืนยัน', 2)}>
          <View style={styles.btnฺButtom}>
            <Text style={styles.textButtom}>ยืนยัน</Text>
          </View>
        </TouchableOpacity>

        <View style={{marginLeft: 1}}></View>

        <TouchableOpacity onPress={() => alert_check('ยกเลิก', 3)}>
          <View style={styles.btnฺButtom}>
            <Text style={styles.textButtom}>ยกเลิก</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ConfirmTicket;

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
  textTimeDate: {
    color: '#5660B3',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 190,
  },
  textPrice: {
    color: '#5660B3',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 110,
  },
  btnฺButtom: {
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
});
