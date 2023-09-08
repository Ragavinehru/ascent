import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image, TouchableOpacity,
  Button, FlatList
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
        // Handle any errors that occurred during the fetch
        console.error('Error:', error);
      });
  }
  useEffect(() => {
    AttendanceData();
  }, []);

  const EventItem = ({ event }) => {
    return (
      <View style={STYLES.row}>
        <Text style={STYLES.cell}>{event.type}</Text>
        <Text style={STYLES.cell}>{event.usergi}</Text>
        <Text style={STYLES.cell}>{event.format}</Text>
        <Text style={STYLES.cell}>{event.date}</Text>
      </View>
    );
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
      <Text style={{ marginTop: 10, marginLeft: 19, fontSize: 20, color: 'black' }}>Overall Attendance</Text>
      <Text style={{ marginTop: 10, marginLeft: 19, fontSize: 13, color: 'black' }}>Total Events:  | Online Events:  | Offline Events:  </Text>
      <View>
        <View style={STYLES.row}>
          <Text style={STYLES.attenCell}>Name</Text>
          <Text style={STYLES.attenCell}>Attendance</Text>
          <Text style={STYLES.attenCell}>Offline</Text>
          <Text style={STYLES.attenCell}>Late</Text>
          {/* <Text style={STYLES.headerCell}>Status</Text> */}
        </View>
        <FlatList
          data={attenData.events}
          keyExtractor={(item, index) => index.toString()} // Use index as the key for simplicity (not recommended for production)
          renderItem={({ item }) => <EventItem event={item} />}
        // Render each member using the custom MemberItem component
        />

      </View>
    </SafeAreaView>
  )
};
export default Attendance;