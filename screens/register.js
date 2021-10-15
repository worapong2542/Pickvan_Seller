import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground
} from 'react-native';
import {Link, withRouter} from 'react-router-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Register({navigation}) {
  const [userName, setuserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setconfirm_password] = useState('');
  const [phoneNum, setphoneNum] = useState('');
  const [result, setResult] = useState();

  function checkRegister() {
    if (
      userName == '' ||
      email == '' ||
      password == '' ||
      confirm_password == '' ||
      phoneNum == ''
    ) {
      alert('กรุณากรอกข้อมูลให้ครบ');
    } else {
      if (password == confirm_password) {
        register_sentApi();
      } else {
        alert('รหัสไม่ตรงกัน');
      }
    }
  }

  //ส่งข้อมูลไป
  async function register_sentApi() {
    await axios
      .post('http://10.0.2.2:3001/user/regist_customer', {
        userName: userName, //key : value
        email: email,
        password: password,
        phoneNum: phoneNum,
      })
      .then(res => setResult(res.data));
    console.log(result);
    if (result.status == 0) {
      alert('อีเมล์นี้ถูกใช้งานแล้ว');
    } else {
      await AsyncStorage.setItem('@datalogin', email); //เก็บเช้า local storage
      await AsyncStorage.setItem('@dataloginId', result.id.toString());
      navigation.navigate('HomeScreen');
    }
  }

  return (
    <ImageBackground
    source={require('../images/registBg.png')}
    style={{width: '100%', height: '100%'}}>

    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.TextInput}
          placeholder="ชื่อผู้ใช้"
          placeholderTextColor="#8C8C8C"
          onChangeText={userName_input => setuserName(userName_input)}
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.TextInput}
          placeholder="อีเมลล์"
          placeholderTextColor="#8C8C8C"
          secureTextEntry={true}
          onChangeText={email_input => setEmail(email_input)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.TextInput}
          placeholder="รหัสผ่าน"
          placeholderTextColor="#8C8C8C"
          secureTextEntry={true}
          onChangeText={password_input => setPassword(password_input)}
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.TextInput}
          placeholder="ยืนยันรหัสผ่าน"
          placeholderTextColor="#8C8C8C"
          secureTextEntry={true}
          onChangeText={confirm_password_input =>
            setconfirm_password(confirm_password_input)
          }
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.TextInput}
          placeholder="เบอร์โทรศัพท์"
          placeholderTextColor="#8C8C8C"
          secureTextEntry={true}
          onChangeText={phoneNum_input => setphoneNum(phoneNum_input)}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => checkRegister()} style={styles.button}>
          <Text style={styles.buttonText}> ลงทะเบียน </Text>
        </TouchableOpacity>
      </View>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop:35
  },
  inputContainer: {
    backgroundColor: 'white',
    width: '85%',
    height: 60,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 13,
    borderRadius:30
  },
  TextInput: {},

  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#FEB5A6',
    width: '100%',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '800',
    fontSize: 18,
  },
});

export default Register;
