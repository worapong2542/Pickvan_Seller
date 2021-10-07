import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  TextField,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectDropdown from 'react-native-select-dropdown';
import styles from '../style/addRouteStyle';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';

function AddRoute({navigation}) {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('');
  const [show, setShow] = useState(false);
  const [textdate, setdate] = useState('Empty');
  const [texttime, settime] = useState('');
  const [hours, sethours] = useState(0);
  const [min, setmin] = useState(0);
  const [selectedValue, setSelectedValue] = useState();
  const [vandata, setvandata] = useState([]);
  const [price, setprice] = useState(0);
  const [route, setroute] = useState([]);
  const [license, setlicense] = useState([]);
  const licenseDropdownRef = useRef();
 

  const hours_time = ['05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21',];
  const minute = ['00', '15', '30', '45'];

  let routs = '';
  let license_plate = '';
  let time_format = '';


  //call func api one time
  useEffect(() => {
    getdata_van();
  }, []);

  //api
  async function getdata_van() {
    await axios
      .get('http://10.0.2.2:3001/seller/vandata')
      .then(res => setvandata(res.data));
  }

  //map data on vandata change
  useEffect(() => {
    setroute(vandata);
  }, [vandata]);

  //set date format and call api
  function addschedule() {
    time_format = hours_time[hours] + ':' + minute[min];
    if (textdate == 'Empty') {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    } else {
      if (price == 0) {
        alert('กรุณากรอกข้อมูลให้ครบถ้วน');
      } else {
        const url =
          time_format + '/' + textdate + '/' + price + '/' + license_plate;
        axios
          .get('http://10.0.2.2:3001/seller/addschedule/' + url)
          .then(res => call_back(res));
      }
    }
  }

  //wait res for check error
  function call_back(res) {
    const res_data = res.data;
    if (res_data == 0) {
      alert('สร้างรอบเรียบร้อยแล้ว');
      navigation.navigate('HomeScreen');
    } else {
      alert('Some thing Worng');
    }
  }

  //set วันที่ 
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();
    setdate(fDate);

    //set เวลา
    let fTime = tempDate.getHours() + ' : ' + tempDate.getMinutes();
    settime(fTime);
  };

  // function showMode เลือกวันที่
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  return (
    <ScrollView style={styles.container}>
    
    {/* drod down เลือกสายรถ */}
      <View style={styles.dropdownsRow}>
        <SelectDropdown
          data={route}
          onSelect={(selectedItem, index) => {
            licenseDropdownRef.current.reset();
            setlicense([]);
            setlicense(selectedItem.license);
            //clear data
          }}
          defaultButtonText={'เลือกสายรถ'}
          buttonTextAfterSelection={(selectedItem, index) => {
            //return data select
            routs =selectedItem.title;
            return selectedItem.title;
          }}
          rowTextForSelection={(item, index) => {
            //show select data
            return item.title;
          }}
          buttonStyle={styles.dropdown1BtnStyle}
          buttonTextStyle={styles.dropdown1BtnTxtStyle}
          renderDropdownIcon={() => {
            return (
              <Image
                style={{width: 15, height: 15}}
                source={require('../images/down-arrow.png')}
              />
            );
          }}
          dropdownIconPosition={'right'}
          rowStyle={styles.dropdown1RowStyle}
          rowTextStyle={styles.dropdown1RowTxtStyle}
        />
      </View>

      {/* drod down เลือกรถ */}
      <View style={styles.dropdownsRow}>
        <SelectDropdown
          ref={licenseDropdownRef}
          data={license}
          onSelect={(selectedItem, index) => {}}
          defaultButtonText={'เลือกรถ'}
          buttonTextAfterSelection={(selectedItem, index) => {
            license_plate = selectedItem.title;
            return selectedItem.title;
          }}
          rowTextForSelection={(item, index) => {
            return item.title;
          }}
          buttonStyle={styles.dropdown2BtnStyle}
          buttonTextStyle={styles.dropdown2BtnTxtStyle}
          renderDropdownIcon={() => {
            return (
              <Image
                style={{width: 15, height: 15}}
                source={require('../images/down-arrow.png')}
              />
            );
          }}
          dropdownIconPosition={'right'}
          dropdownStyle={styles.dropdown2DropdownStyle}
          rowStyle={styles.dropdown2RowStyle}
          rowTextStyle={styles.dropdown2RowTxtStyle}
        />
      </View>

      {/* เลือกวันที่ */}
      <Text style={styles.baseText}>วันที่</Text>
      <View style={styles.box}>
        <Text style={styles.boxInput}>{textdate}</Text>
        <TouchableOpacity onPress={() => showMode('date')}>
          <View style={styles.touch_able}>
            <Text style={styles.txtDefault}>เลือกวันที่</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* เลือกเวลา */}
      <Text style={styles.baseText}>เวลา</Text>
      <View style={{flexDirection: 'row'}}>
        <View style={{marginLeft: 20}}></View>
        <Picker 
          style={styles.timePicker}
          selectedValue={hours}
          onValueChange={(itemValue, itemIndex) => sethours(itemValue)}>
          {hours_time.map((item, index) => {
            return <Picker.Item label={item} value={index} key={index} />;
          })}
        </Picker>

        <Text style={styles.baseText}> : </Text>

        <Picker
          style={styles.timePicker}
          selectedValue={min}
          onValueChange={(itemValue, itemIndex) => setmin(itemValue)}>
          {minute.map((item, index) => {
            return <Picker.Item label={item} value={index} key={index} />;
          })}
        </Picker>
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}

      {/* textInput ราคา */}
      <Text style={styles.baseText}>ราคา</Text>
      <TextInput
        style={styles.textInput}
        keyboardType="numeric"
        placeholder="กรอกราคา"
        maxLength={4}
        onChangeText={setprice}
      />

      {/* ปุ่มยืนยัน */}
      <TouchableOpacity onPress={() => addschedule()}>
        <View style={styles.btnConfirm}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
            ยืนยัน
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default AddRoute;

// gti testttt
