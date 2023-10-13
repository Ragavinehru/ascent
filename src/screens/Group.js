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
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import STYLES from '../styles';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';


const Group = () => {
  // const route = useRoute();
  // const groupData = route.params?.groupData || [];
  // console.log("id id id 7777", groupData);

  const navigation = useNavigation();
  const [groupdata, setGroupData] = useState({});
  const [newgroup, setgroup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [name, setname] = useState('');
  const [description, setdescription] = useState('');


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
        body: JSON.stringify({ groupIds })
      });
      const result = await response.json();
      console.log(" result groups", result);
      setGroupData(result);
      console.log("name:", groupdata);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  const navigateToClearGroup = (groupId) => {
    navigation.navigate('groupinfo', { groupId });
  };
  // const memberCount = groupdata.groupInfo.members.length;
  // console.log("test", memberCount)
  const apigroup = 'https://walrus-app-v5mk9.ondigitalocean.app/createGroup';

  const createGroup = async () => {
    try {
      let GroupData = {
        "group": {
          "name": name,
          "description": description,
          "status": "active",
          "owner": {
            "name": global.name,
            "email": global.email,
          },
          "members": [
            {
              "email": global.email,
              "role": "facilitator",
              "status": "active"
            }
          ],
          "createdon": "2023-10-13"
        }
      }

      const response = await axios.post(apigroup, GroupData, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(GroupData),
      });

      if (response.status === 200) {
        console.log('Group created:', response.data);






      } else {
        console.error('Failed to create group:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error group create:', error);
    }
  };



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

        <View style={STYLES.btnSecondary}>
          <TouchableHighlight style={{}} onPress={() => { setgroup(true); }}>
            <Text style={STYLES.newgroup}>
              + New Group
            </Text>
          </TouchableHighlight>
        </View>
        <View>
          {/* <Text style={{ marginTop: 10, marginLeft: 19, fontSize: 20, color: 'black' }}>Your Groups</Text> */}
          {/* ... */}
          <FlatList
            data={groupdata.groups}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View>
                <Image style={{ width: 39, height: 39, marginTop: 30, marginBottom: 10, marginLeft: 30 }} source={require('../assets/group.png')} />
                <TouchableOpacity onPress={() => navigateToClearGroup(item.id)}>
                  <Text style={{ marginTop: -50, marginLeft: 89, fontSize: 17, color: 'blue' }} >{item.name}</Text>
                </TouchableOpacity>
                <Text style={{ marginTop: -30, marginLeft: 92, fontSize: 15, }}>{item.createdon}</Text>


                {/* <Text style={{ marginTop: 10, marginLeft: 94, fontSize: 15, }}> Owner: {item.owner[0]}</Text> */}
              </View>
            )}
          />
        </View>
      </View>
      <Modal visible={newgroup} transparent={true} animationType="slide" onRequestClose={() => setgroup(false)}  >
        <View style={{
          justifyContent: 'center', marginTop: 80,
          alignItems: 'center',
          backgroundColor: '#fff5ee',
          borderRadius: 30,
          marginLeft: 70,
          padding: 80, width: '70%'
        }}>
          <Text style={{ fontWeight: 'bold', fontSize: 22, width: 200 }}>Create new Group</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 15, width: 260, marginBottom: 30 }}>Be more Organized.Be more Focused.</Text>

          <TextInput style={STYLES.searchinput}
            value={name}
            onChangeText={(text) => setname(text)}
            placeholder='Group Name *'></TextInput>

          <View style={STYLES.space}></View>

          <TextInput style={STYLES.searchinput}
            value={description}
            onChangeText={(text) => setdescription(text)}
            placeholder='Description*'></TextInput>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => setgroup(false)} style={{ marginTop: 10 }}>
              <Text style={{ color: 'red', marginTop: 10 }}>Cancel</Text>
            </TouchableOpacity>
            <Text onPress={createGroup} style={{ fontWeight: 'bold', fontSize: 13, color: 'blue', marginTop: 20, marginLeft: 10 }}>Create Group</Text>
          </View>

        </View>

      </Modal>
    </SafeAreaView>
  )
};
export default Group;