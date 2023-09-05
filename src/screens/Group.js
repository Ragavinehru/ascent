import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image, TouchableOpacity,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/color';
import { ScrollView } from 'react-native-gesture-handler';
import STYLES from '../styles';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';


const Group = () => {
  const navigation = useNavigation();
  const [groupdata, setGroupData] = useState({});
  const fetchUserData = async () => {
    try {
      const url = 'https://walrus-app-v5mk9.ondigitalocean.app/getGroupInfo?groupId=PjIK87LDBDc5quWz76Ct';
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      console.log(" Groupinfo", result);
      setGroupData(result);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);




  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white }}>
      <View style={STYLES.header}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Image style={STYLES.inputIcon} source={require('../assets/arrow.png')} />


          <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20, marginTop: 10 }}> Back </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={{ marginTop: 10, marginLeft: 19, fontSize: 20, color: 'black' }}>Your Groups</Text>
        <Image style={{ width: 35, height: 35, marginTop: 30, marginBottom: 10, marginLeft: 30 }} source={require('../assets/group.png')} />
        <Text style={{ marginTop: 10, marginLeft: 19, fontSize: 20, color: 'black' }}>{groupdata.name}</Text>
      </View>

    </SafeAreaView>
  )
};
export default Group;