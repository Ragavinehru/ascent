import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image, TouchableOpacity,
  Button, FlatList, length
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/color';
import { ScrollView } from 'react-native-gesture-handler';
import STYLES from '../styles';
// import { useState, useEffect } from 'react';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';




// const AttendanceData = async () => {
//   fetch('https://walrus-app-v5mk9.ondigitalocean.app/getEvents', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       groupIds: ["PjIK87LDBDc5quWz76Ct"],
//     }),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       // setAttenData(data);
//       console.log('Response:', data);

//     })
//     .catch((error) => {
//       // Handle any errors that occurred during the fetch
//       console.error('Error:', error);
//     });
// }
// useEffect(() => {
//   AttendanceData();
// }, []);



const Attendance = () => {
  const navigation = useNavigation();
  const [attenData, setAttenData] = useState([]);
  const AttendanceData = async () => {
    fetch('https://walrus-app-v5mk9.ondigitalocean.app/getEvents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        groupIds: ["PjIK87LDBDc5quWz76Ct"],
      }),
    })
      .then((response) => response.json())
      .then((data) => {

        console.log('Response:', data);
        setAttenData(data);
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error:', error);
      });
  }
  useEffect(() => {
    AttendanceData();
  }, []);

  const EventItem = ({ event }) => {
    return (
      <>
        {event.members.map((member, index) => (
          <View style={STYLES.row} key={index}>
            <Text style={STYLES.cell}>{member.name}</Text>
            <Text style={STYLES.cell}>{calculateMemberAttendance(member.email)}</Text>
            <Text style={STYLES.cell}>{event.format || '---'}</Text>
            <Text style={STYLES.cell}>{event.type}</Text>
          </View>
        ))}
      </>
    );
  };
  const calculateMemberAttendance = (memberId) => {
    if (attenData.events && attenData.events.length > 0) {
      const memberEvents = attenData.events.filter(event => event.user === memberId);
      const totalEvents = memberEvents.length;
      const presentEvents = memberEvents.filter(event => event.type === "present").length;
      return `${presentEvents}/${totalEvents}`;
    }
    return "0/0";
  };


  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, height: '100%' }}>
      <View style={STYLES.header}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Image style={STYLES.inputIcon} source={require('../assets/arrow.png')} />

          {/* <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} /> */}
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20, marginTop: 10 }}> Back </Text>
        </TouchableOpacity>
      </View>
      <Text style={{ marginTop: 10, marginLeft: 19, fontSize: 20, color: 'black' }}>Overall Attendance </Text>

      <Text style={{ marginTop: 10, marginLeft: 19, fontSize: 13, color: 'black' }}>   Total Events: {attenData.events ? attenData.events.length : 0}
        | Online Events: {attenData.events ? attenData.events.filter(event => event.type === "online").length : 0}
        | Offline Events: {attenData.events ? attenData.events.filter(event => event.type === "offline").length : 0}
      </Text>

      <View>
        <View style={STYLES.row}>
          <Text style={STYLES.attenCell}>Name</Text>
          <Text style={STYLES.attenCell}>Attendance</Text>
          <Text style={STYLES.attenCell}>Offline</Text>
          <Text style={STYLES.attenCell}>Event Type</Text>

        </View>
        <FlatList
          data={attenData.events}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <EventItem event={item} />}

        />

      </View>
    </SafeAreaView>
  )
};
export default Attendance;