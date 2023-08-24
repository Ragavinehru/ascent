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
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/color';
import STYLES from '../styles';
import { Navigation } from 'react-native-navigation';

const UserScreen = ({ navigation }) => {

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white }}>
      <View style={STYLES.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}> Back </Text>

      </View>
      <View>
        <Image source={require('../assets/person.png')} style={{ width: 100, height: 100, marginLeft: 140 }} />
      </View>
      <View style={{ marginTop: 70 }}>
        <View style={{ marginLeft: 30 }}>
          <Text onPress={() => navigation.navigate('HomeScreen')} >HOME</Text>
        </View>
        <View style={{ marginLeft: 30, marginTop: 10 }}>
          <Text onPress={() => navigation.navigate('Profile')}>PROFILE</Text>
        </View>
        <View style={{ marginLeft: 30, marginTop: 10 }}>
          <Text>SETTINGS</Text>
        </View>
        <View style={{ marginLeft: 30, marginTop: 10 }}>
          <Text>LOGOUT</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}
export default UserScreen;