import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import RouteDetail from './screens/routeDetail';
import AddRoute from './screens/addRoute';
import CheckTicket from './screens/checkTicket';
import CustomerList from './screens/customerList';
import ConfirmTicket from './screens/confirmTicket';
import {useState, useEffect} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import Card from './components/card';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {Icon} from 'react-native-elements';
import axios from 'axios';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function HomeScreen({navigation}) {
  const [dataschedule, setdataschedule] = useState([]);
  const [select_date, set_select_date] = useState(0);
  const date_format = [];
  //set data from api in reviews
  const [reviews, setReviews] = useState([]);

  //auto start set date
  date();

  //call api (send parameter(date_format[index])) and use this away select_date on change
  useEffect(() => {
    getschedule(select_date);
  }, [select_date]);

  //map data on dataschedule change
  useEffect(() => {
    setReviews(dataschedule);
  }, [dataschedule]);

  //set date now in array(3day)
  function date() {
    for (let i = 0; i <= 3; i++) {
      let targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + i);
      let day = targetDate.getDate();
      let month = targetDate.getMonth() + 1;
      let year = targetDate.getFullYear();
      date_format.push(year + '-' + month + '-' + day);
    }
  }

  //api
  async function getschedule(x) {
    await axios
      .get('http://10.0.2.2:3001/seller/getschedule/' + date_format[x])
      .then(res => setdataschedule(res.data));
  }

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => set_select_date(0)}>
            <Text>{date_format[0]}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => set_select_date(1)}>
            <Text>{date_format[1]}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginLeft: 10}}
            onPress={() => set_select_date(2)}>
            <Text>{date_format[2]}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={reviews}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('RouteDetail', {item: {item}})
              }>
              <Card>
                <Text>เวลา : {item.time.substring(0, 5)}</Text>
                <Text>{item.destination}</Text>
                <Text>{item.license}</Text>
              </Card>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
        <TouchableOpacity onPress={() => navigation.navigate('AddRoute')}>
          <View style={styles.btnฺButtom}>
            <Text style={styles.textButtom}>เพิ่มรอบรถ</Text>
          </View>
        </TouchableOpacity>

        <View style={{marginLeft: 1}}></View>

        <TouchableOpacity onPress={() => navigation.navigate('CheckTicket')}>
          <View style={styles.btnฺButtom}>
            <Text style={styles.textButtom}>ตรวจสอบการจอง</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Drawer.Screen name="route" component={route} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

function route({navigation}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'PickVan',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                style={{width: 25, height: 25, marginLeft: 15}}
                source={require('./images/menu.png')}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="RouteDetail"
        component={RouteDetail}
        options={{title: 'รายละเอียดรอบรถ'}}
      />
      <Stack.Screen name="AddRoute" component={AddRoute} />
      <Stack.Screen name="CheckTicket" component={CheckTicket} />
      <Stack.Screen name="CustomerList" component={CustomerList} />
      <Stack.Screen name="ConfirmTicket" component={ConfirmTicket} />
    </Stack.Navigator>
  );
}

export default App;

const styles = StyleSheet.create({
  btnฺButtom: {
    backgroundColor: 'rgba(86, 96, 179, 1)',
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
  icon: {
    paddingLeft: 10,
  },
});
