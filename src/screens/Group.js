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
  const [loading, setLoading] = useState(true);
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
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const navigateToClearGroup = () => {
    navigation.navigate('cleargroup', { groupdata });
  };
  // const memberCount = groupdata.groupInfo.members.length;
  // console.log("test", memberCount)



  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <View style={STYLES.header}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Image style={STYLES.inputIcon} source={require('../assets/arrow.png')} />
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20, marginTop: 10 }}> Back </Text>
        </TouchableOpacity>
      </View>
      {/* groups */}
      <View>
        <Text style={{ marginTop: 10, marginLeft: 19, fontSize: 20, color: 'black' }}>Your Groups</Text>
        <Image style={{ width: 45, height: 45, marginTop: 30, marginBottom: 10, marginLeft: 30 }} source={require('../assets/group.png')} />
        <TouchableOpacity onPress={navigateToClearGroup}>
          <Text style={{ marginTop: -60, marginLeft: 89, fontSize: 17, color: 'blue' }} >  {groupdata.groupInfo ? groupdata.groupInfo.name : ''}</Text>
        </TouchableOpacity>
        <Text style={{ marginTop: -35, marginLeft: 94, fontSize: 15, }}> {groupdata.groupInfo ? `Owner: ${groupdata.groupInfo.owner.name}` : ''}
        </Text>

      </View>

    </SafeAreaView>
  )
};
export default Group;