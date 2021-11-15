import React from 'react';
import {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import Card from '../components/card';
import axios from 'axios';


function History_ticket({route, navigation}) {
  const {item} = route.params;
  const [renImg, setrenImg] = useState();
  const [showImg, setshowImg] = useState('');
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

  function check_status(status_id) {
    if (status_id == 0) {
      return 'กำลังรอการจ่ายเงิน';
    } else if (status_id == 1) {
      return 'กำลังตรวจสอบ';
    } else if (status_id == 2) {
      return 'ตั๋วถูกยืนยันแล้ว';
    } else {
      return 'ตั๋วถูกยกเลิก';
    }
  }

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
                  {item.item.date.substring(0, 8)}
                  {parseInt(item.item.date.substring(8, 10)) + 1}
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
            <Card>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.textPhone}> ชื่อลูกค้า : </Text>
                <Text style={{marginRight: 35}}></Text>
                <Text style={styles.textPhone}>
                  {item.item.customer_userName}
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.textPhone}> เบอร์ติดต่อลูกค้า : </Text>
                <Text style={{marginLeft: -19}}></Text>
                <Text style={styles.textPhone}>
                  {item.item.customer_phone_num}
                </Text>
              </View>
            </Card>
            <Card>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.textPhone}> สถานะของตั๋ว : </Text>
                <Text style={styles.textPhone}>
                  {check_status(item.item.status_id)}
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
    </View>
  );
}

export default History_ticket;

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
  textPhone: {
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
