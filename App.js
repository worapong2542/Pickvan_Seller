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
import CardDate from './components/cardDate';
import {DrawerContent} from './screens/DrawerContent';
import Login from './screens/login';
import Register from './screens/register';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function HomeScreen({navigation}) {
  const [dataschedule, setdataschedule] = useState([]);
  const [select_date, set_select_date] = useState(0);
  const date_format = [];
  
  //set data from api in reviews
  const [reviews, setReviews] = useState([]);

  //เข้ามาแล้ว check ว่า login ยัง ถ้ายังให้ login ก่อน
  useEffect(() => {
    checkAsyncStorage();
  }, []);

  async function checkAsyncStorage() {
    // console.log('AsyncFunc');
    try {
      const email = await AsyncStorage.getItem('@datalogin');
      if (email === undefined || email === '' || email === null) {
        navigation.navigate('Login');
      } else {
        
      }
    } catch (err) {}
  }


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
      {/* show 3 days */}
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View style={{flexDirection: 'row', marginRight: 10, marginLeft: 10}}>
          <CardDate>
            <TouchableOpacity
              style={styles.boxDate}
              onPress={() => set_select_date(0)}>
              <Text style={styles.textDate}>{date_format[0]}</Text>
            </TouchableOpacity>
          </CardDate>

          <CardDate>
            <TouchableOpacity
              style={styles.boxDate}
              onPress={() => set_select_date(1)}>
              <Text style={styles.textDate}>{date_format[1]}</Text>
            </TouchableOpacity>
          </CardDate>

          <CardDate>
            <TouchableOpacity
              style={styles.boxDate}
              onPress={() => set_select_date(2)}>
              <Text style={styles.textDate}>{date_format[2]}</Text>
            </TouchableOpacity>
          </CardDate>
        </View>

        <FlatList
          data={reviews}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('RouteDetail', {item: {item}})
              }>
              <Card>
                <Text style={styles.textTime}>{item.time.substring(0, 5)}</Text>
                <Text style={styles.textDefault}>{item.destination}</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.textDefault}>ราคา: </Text>
                  <Text style={styles.textDefault}>{item.price}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.textDefault}>{item.license}</Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('RouteDetail', {item: {item}})
                    }>
                    <View style={styles.btnCheck}>
                      <Text style={styles.textCheck}>ดูรายละเอียด</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </Card>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={{flexDirection: 'row', backgroundColor: 'white'}}>
        <TouchableOpacity onPress={() => navigation.navigate('AddRoute')}>
          <View style={styles.btnButtom}>
            <Text style={styles.textButtom}>เพิ่มรอบรถ</Text>
          </View>
        </TouchableOpacity>

        <View style={{marginLeft: 1}}></View>

        <TouchableOpacity onPress={() => navigation.navigate('CheckTicket')}>
          <View style={styles.btnButtom}>
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
        drawerContent={props => <DrawerContent {...props} />}
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
    <Stack.Navigator  initialRouteName="HomeScreen">

      
      <Stack.Screen name="Login" component={Login} options={{headerShown: false}}></Stack.Screen>

      
      <Stack.Screen name="Register" component={Register}options={{
          title: 'ลงทะเบียน',
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
          },
          headerStyle: {
            backgroundColor: '#B0D8D8',
            height: 80,
          },}} ></Stack.Screen>


      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'รายการเดินรถทั้งหมด',
          headerTitleAlign: 'center',
          headerTintColor: '#5660B3',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
          },
          headerStyle: {
            backgroundColor: '#fff',
            height: 100,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
                style={{width: 35, height: 35, marginLeft: 15, marginRight: 15}}
                source={require('./images/menu.png')}
              />
            </TouchableOpacity>
          ),
        }}
      />
      

      <Stack.Screen
        name="RouteDetail"
        component={RouteDetail}
        options={{
          title: 'รายละเอียดรอบรถ',
          headerTitleAlign: 'center',
          headerTintColor: '#5660B3',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
          },
        }}
      />


      <Stack.Screen
        name="AddRoute"
        component={AddRoute}
        options={{
          title: 'เพิ่มรอบรถ',
          headerTitleAlign: 'center',
          headerTintColor: '#5660B3',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
          },
        }}
      />


      <Stack.Screen
        name="CheckTicket"
        component={CheckTicket}
        options={{
          title: 'ตรวจสอบการจอง',
          headerTitleAlign: 'center',
          headerTintColor: '#5660B3',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
          },
        }}
      />


      <Stack.Screen
        name="CustomerList"
        component={CustomerList}
        options={{
          title: 'รายชื่อผู้โดยสาร',
          headerTitleAlign: 'center',
          headerTintColor: '#5660B3',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
          },
        }}
      />


      <Stack.Screen
        name="ConfirmTicket"
        component={ConfirmTicket}
        options={{
          title: 'ยืนยันการจอง',
          headerTitleAlign: 'center',
          headerTintColor: '#5660B3',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25,
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default App;

const styles = StyleSheet.create({
  textTime: {
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
  btnButtom: {
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
  textDate: {
    color: '#5660B3',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  boxDate: {
    width: 91,
  },
  btnDetail: {
    backgroundColor: '#FEB5A6',
    borderRadius: 20,
    height: 30,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 120,
    marginTop: 5,
  },
  textDetail: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  btnCheck: {
    backgroundColor: '#FEB5A6',
    borderRadius: 20,
    height: 30,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 170,
  },
  textCheck: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
