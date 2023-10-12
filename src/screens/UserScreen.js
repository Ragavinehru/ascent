import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Card,
  FlatList,
  Modal,
  Button,
} from 'react-native';
import {
  ScrollView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import { useState } from 'react';
import COLORS from '../consts/color';
import STYLES from '../styles';
import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

const UserScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleLogout = () => {

    setUsername('');
    setPassword('');

    navigation.navigate('Login');
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <View style={STYLES.header}>
        {/* <Icon name="home" size={20} color="black" style={{ marginRight: 5 }} onPress={navigation.goBack} /> */}
        <View >
          <TouchableOpacity onPress={navigation.goBack}>
            <Image style={STYLES.inputIcon} source={require('../assets/arrow.png')} />
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10, marginLeft: 17 }}> Back </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Image source={require('../assets/person.png')} style={{ width: 100, height: 100, marginLeft: 140 }} />
      </View>
      <View style={{ marginTop: 70 }}>
        <View style={{ marginLeft: 30 }}>
          <Text onPress={() => navigation.navigate('HomeScreen')}>HOME</Text>
        </View>
        <View style={{ marginLeft: 30, marginTop: 10 }}>
          <Text onPress={() => navigation.navigate('Profile')}>PROFILE</Text>
        </View>
        <View style={{ marginLeft: 30, marginTop: 10 }}>
          <Text>SETTINGS</Text>
        </View>
        <View style={{ marginLeft: 30, marginTop: 10 }}>
          <Text style={{ color: 'red' }} onPress={handleLogout}>LOGOUT</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}
export default UserScreen;