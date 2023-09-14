import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image, TouchableOpacity,
  Button, TouchableHighlight, Modal, TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/color';
import { ScrollView } from 'react-native-gesture-handler';
import STYLES from '../styles';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';



const Group = () => {
  // const route = useRoute();
  // const groupData = route.params?.groupData || [];
  // console.log("id id id 7777", groupData);

  const navigation = useNavigation();
  const [groupdata, setGroupData] = useState({});
  const [newgroup, setgroup] = useState(false);
  const [loading, setLoading] = useState(true);
  const fetchUserData = async () => {
    try {
      const userResponse = await fetch('https://walrus-app-v5mk9.ondigitalocean.app/getUserInfo?email=' + global.email, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const userDataResult = await userResponse.json();
      // console.log("userdata result++++++++++++++++++", userDataResult);
      const groupIds = userDataResult.userInfo.groups;
      console.log("groups", groupIds);

      const url = 'https://walrus-app-v5mk9.ondigitalocean.app/getGroups';
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(groupIds)
      });
      const result = await response.json();
      console.log(" Groupinfo______", result);
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
        <View style={STYLES.btnSecondary}>
          <TouchableHighlight style={{}} onPress={() => { setgroup(true); }}>
            <Text style={STYLES.newgroup}>
              + New Group
            </Text>
          </TouchableHighlight>
        </View>
        <TouchableOpacity onPress={navigateToClearGroup}>
          <Text style={{ marginTop: -60, marginLeft: 89, fontSize: 17, color: 'blue' }} >  {groupdata.groupInfo ? groupdata.groupInfo.name : ''}</Text>
        </TouchableOpacity>
        <Text style={{ marginTop: -35, marginLeft: 94, fontSize: 15, }}> {groupdata.groupInfo ? `Owner: ${groupdata.groupInfo.owner.name}` : ''}
        </Text>
        {/* <Text>members</Text> */}

      </View>
      <Modal visible={newgroup} transparent={true} animationType="slide" onRequestClose={() => setgroup(false)}  >
        <View style={{
          justifyContent: 'center', marginTop: 80,
          alignItems: 'center',
          backgroundColor: '#fff5ee',
          borderRadius: 30,
          // margin: 120,
          marginLeft: 70,
          padding: 80, width: '70%'
        }}>
          <Text style={{ fontWeight: 'bold', fontSize: 22, width: 200 }}>Create new Group</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 15, width: 260, marginBottom: 30 }}>Be more Organized.Be more Focused.</Text>

          <TextInput style={STYLES.searchinput} placeholder='Group Name *'></TextInput>
          <View style={STYLES.space}></View>
          <TextInput style={STYLES.searchinput} placeholder='Description*'></TextInput>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => setgroup(false)} style={{ marginTop: 10 }}>
              <Text style={{ color: 'red', marginTop: 10 }}>Cancel</Text>
            </TouchableOpacity>
            <Text style={{ fontWeight: 'bold', fontSize: 13, color: 'blue', marginTop: 20, marginLeft: 10 }}>Create Group</Text>
          </View>

        </View>

      </Modal>
    </SafeAreaView>
  )
};
export default Group;