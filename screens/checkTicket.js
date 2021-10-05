import React, { Component } from 'react'
import { Text, View, Button,ScrollView,TouchableOpacity } from 'react-native'
import { useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import Card from '../components/card';
import SelectDropdown from 'react-native-select-dropdown';
import axios from 'axios';

function CheckTicket({ navigation }) {
  const [reviews, setReviews] = useState([
    { TicketId: 't4652551', buySeat: 1 },
    { TicketId: 't549852', buySeat: 2 },
    { TicketId: 't548743', buySeat: 1 }
  ]);

  // useEffect(() => {
  //   checkticket();
  // }, []);
  // async function checkticket() {
  //   await axios
  //     .get('http://10.0.2.2:3001/seller/checkticket/')
  //     .then(res => setdata(res.data));
  // }

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
          <FlatList
            data={reviews}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate('ConfirmTicket', { item: { item } })} >
                <Card>
                  <Text>เลขตั๋ว : {item.TicketId}</Text>
                  <Text>จำนวน : {item.buySeat} ที่นั่ง</Text>
                </Card>
              </TouchableOpacity>
            )}
          />
      </View>
    </View>
  );
}

export default CheckTicket;