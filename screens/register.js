import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  StatusBar,
  Alert,
  AsyncStorage,
} from "react-native";
import { Link, withRouter } from "react-router-native";
import axios from "axios";

function Register({navigation}){
    const [name, setName] = useState("");
  return (
      <View>
    <Text>aaa</Text>
    <Button
    title="home screen"
    onPress={() => navigation.navigate('HomeScreen')}
  />
  </View>
  );
}


export default Register;
