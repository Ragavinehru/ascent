// import React from 'react';
// import { useState } from 'react';
// import {
//     SafeAreaView,
//     View,
//     Text,
//     TextInput,
//     Image,
//     Button,
//     ToastAndroid, Alert,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// // import Icon from 'react-native-vector-icons/FontAwesome';
// import COLORS from '../consts/color';
// import STYLES from '../styles';
// import { ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';
// import { Navigation } from 'react-native-navigation';
// import { Calendar } from 'react-native-calendars';


// const Calendarr = ({ navigation }) => {

//     const [selectedDate, setSelectedDate] = useState(null);

//     const handleDateSelect = (date) => {
//         setSelectedDate(date);
//     };

//     return (
//         <SafeAreaView
//             style={{ paddingHorizontal: 20, flex: 1, backgroundColor: COLORS.white }}>

//             <ScrollView showsVerticalScrollIndicator={true}>

//                 <TouchableOpacity onPress={navigation.goBack}>
//                     <Image style={STYLES.inputIcon} source={require('../assets/arrow.png')} />

//                     {/* <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} /> */}
//                     <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20, marginTop: 10 }}> Back </Text>
//                 </TouchableOpacity>

//                 <View style={STYLES.header}>
//                     <View>
//                         <TouchableOpacity onPress={() => navigation.navigate('User')}>

//                             <Image style={{ width: 50, marginLeft: 260, marginTop: 30, marginRight: 40, height: 50, }} source={require('../assets/person.png')} />
//                         </TouchableOpacity>
//                     </View>

//                 </View>




//                 <View style={{ marginTop: -65 }}>
//                     <Text style={{ fontSize: 19, marginLeft: 17, marginBottom: 10, fontWeight: 'bold', color: COLORS.dark }}>
//                         Hi,Welcome Back
//                     </Text>

//                 </View>
//                 <View style={STYLES.btnSecondary}>
//                     <TouchableHighlight onPress={() => navigation.navigate('NewEvent')}>
//                         <Text style={STYLES.text}>
//                             + New Event
//                         </Text>
//                     </TouchableHighlight>
//                 </View>
//                 <View style={STYLES.container}>
//                     <Calendar
//                         onDayPress={(day) => handleDateSelect(day.dateString)}
//                         markedDates={{
//                             [selectedDate]: { selected: true, selectedColor: 'blue' },
//                         }}
//                     />
//                 </View>


//             </ScrollView>
//         </SafeAreaView>
//     )

// }
// export default Calendarr;
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';
import DateTimePickerModal from 'react-native-modal-datetime-picker'; // Import the date and time picker
import axios from 'axios';
import { useEffect } from 'react';
import STYLES from '../styles';
import DateTimePicker from '@react-native-community/datetimepicker';


const Calendarr = ({ navigation }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [eventTitle, setEventTitle] = useState('');
    const [type, setType] = useState('');
    const [format, setFormat] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [attachement, setAttachement] = useState('');
    const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
    const [isEndTimePickerVisible, setEndTimePickerVisible] = useState(false);
    const [event, setEvent] = useState('');
    const typeoption = [
        { label: 'Option 1', value: 'Option 1' },
        { label: 'Option 2', value: 'Option 2' },
        // Add more options as needed
    ];

    const apiUrl = 'https://walrus-app-v5mk9.ondigitalocean.app/createEvent';

    const toggleModal = (date) => {
        setSelectedDate(date);
        setModalVisible(!isModalVisible);
    };

    const handleDateSelect = (day) => {
        toggleModal(day.dateString);
    };

    const createEvent = async () => {
        try {
            let GoalData = {
                "event": {
                    "label": eventTitle,
                    "group": "PjIK87LDBDc5quWz76Ct",
                    "description": description,
                    "type": type,
                    "format": format,
                    "formatInfo": "",
                    "color": "#039be5",
                    "date": selectedDate,
                    "startHour": "Invalid Date",
                    "endHour": "Invalid Date",
                    "createdBy": "vasanth@venzotechnologies.com",
                    "user": "vasanth@venzotechnologies.com",
                    "createdAt": "2023-10-03",
                    "attachmentName": null,
                    "attachmentUrl": null
                }
            }
            const response = await axios.post(apiUrl, GoalData, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(GoalData),


            });

            if (response.status === 200) {
                // const resData = await response.json();
                // console.log("responseeee", resData)
                console.log('Event created:', response.data);
                toggleModal(null); // Close the modal
            } else {
                console.error('Failed to  returned:', response.status, response.statusText);
            }
        } catch (error) {
            // Handle any API request errors here
            console.error('Error creating event:', error);
        }
    };
    const events = async () => {
        try {
            const groupId = ["PjIK87LDBDc5quWz76Ct", "bX2rIpcfpnPUaRIMQT3M", "NJY0z2LNktMwv89ETkt4", "RHmBJgPACFHAxAvvpv95", "6YXXJZQcMuL42IjRsHSL"]
            const url = 'https://walrus-app-v5mk9.ondigitalocean.app/getEvents';
            // const body = groupId
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: groupId
            });
            const result = await response.json();
            console.log("events updated:", result);
            // console.log("Role updated:", newRole);

            setEvent(result);
            // Set the updated members array in your local state

        } catch (error) {
            console.error('Error updating role:', error);
            // Handle errors here.
        }
    }; useEffect(() => {
        events();
    }, []);


    // Functions to show/hide time pickers
    const showStartTimePicker = () => {
        setStartTimePickerVisible(true);
    };

    const hideStartTimePicker = () => {
        setStartTimePickerVisible(false);
    };

    const showEndTimePicker = () => {
        setEndTimePickerVisible(true);
    };

    const hideEndTimePicker = () => {
        setEndTimePickerVisible(false);
    };

    const handleStartTimeChange = (event, selectedTime) => {
        if (selectedTime !== undefined) {
            // Format the selected time as needed
            const formattedTime = selectedTime.toLocaleTimeString(); // Use toLocaleTimeString to format as HH:mm

            // Update the state with the selected start time and hide the picker
            setStartTime(formattedTime);
            hideStartTimePicker();
        } else {
            hideStartTimePicker();
        }
    };

    const handleEndTimeChange = (event, selectedTime) => {
        if (selectedTime !== undefined) {
            // Format the selected time as needed
            const formattedTime = selectedTime.toLocaleTimeString(); // Use toLocaleTimeString to format as HH:mm

            // Update the state with the selected end time and hide the picker
            setEndTime(formattedTime);
            hideEndTimePicker();
        } else {
            hideEndTimePicker();
        }
    };

    return (
        <ScrollView>
            <View style={STYLES.header}>
                <TouchableOpacity onPress={navigation.goBack}>
                    <Image style={STYLES.inputIcon} source={require('../assets/arrow.png')} />
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20, marginTop: 10 }}> Back </Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 40 }}>
                <Text style={{ marginLeft: 15, fontSize: 24, fontWeight: 'bold', color: 'black' }}>
                    Hi,Welcome Back
                </Text>

            </View>
            <Calendar
                onDayPress={handleDateSelect}
                markedDates={{
                    [selectedDate]: { selected: true, marked: true },
                }}
                style={{ marginTop: 20, height: 400 }}
            />

            <Modal isVisible={isModalVisible} style={{ backgroundColor: 'white', borderRadius: 29 }}>
                <ScrollView>
                    <View>
                        <Text style={{ fontSize: 19, color: 'black', marginLeft: 99 }}>Create new event</Text>
                        <Text style={{ color: 'grey', marginLeft: 75 }}>Plan your day. Plan your success.</Text>
                        <Text style={{ marginTop: 20 }}>Event name*</Text>
                        <TextInput
                            value={eventTitle}
                            onChangeText={(text) => setEventTitle(text)}
                            style={STYLES.texttype}
                        />
                        <Text>Select Type:</Text>
                        <TextInput
                            style={STYLES.texttype}
                            placeholder="Select Type"
                            value={type}
                            onChangeText={(text) => setType(text)}
                            items={typeoption}
                        />
                        <Text>Select Format:</Text>
                        <TextInput
                            style={STYLES.texttype}
                            placeholder="Select Format"
                            value={format}
                            onChangeText={(text) => setFormat(text)}
                        />
                        <Text>Date:</Text>
                        <TextInput
                            style={STYLES.texttype}
                            value={selectedDate}
                            onChangeText={(text) => setSelectedDate(text)}
                        />
                        <Text>Time:</Text>

                        <View style={{ flexDirection: 'row', marginLeft: 33, height: 55 }}>
                            <TouchableOpacity onPress={showStartTimePicker}>
                                <Text style={STYLES.texttime} >Start Time: {startTime}</Text>
                            </TouchableOpacity>
                            {isStartTimePickerVisible && (
                                <DateTimePicker
                                    value={new Date()} // You can set an initial time value if needed
                                    mode="time"
                                    is24Hour={true}
                                    display="default"
                                    onChange={handleStartTimeChange}

                                />
                            )}

                            {/* <TextInput
                            style={STYLES.texttype}
                            placeholder="End Time"
                            value={endTime}
                            onChangeText={(text) => setEndTime(text)}
                        /> */}

                            {/* End Time Picker */}
                            {/* End Time Picker */}
                            <TouchableOpacity onPress={showEndTimePicker}>
                                <Text style={STYLES.texttime} >End Time: {endTime}</Text>
                            </TouchableOpacity>
                            {isEndTimePickerVisible && (
                                <DateTimePicker
                                    value={new Date()}
                                    mode="time"
                                    is24Hour={true}
                                    display="default"
                                    onChange={handleEndTimeChange}
                                />
                            )}
                        </View>
                        <Text>Location/Meeting Link:</Text>
                        <TextInput
                            style={STYLES.texttype}
                            value={location}
                            onChangeText={(text) => setLocation(text)}
                        />
                        <Text>Description/Agenda:</Text>
                        <TextInput
                            style={STYLES.texttype}
                            value={description}
                            onChangeText={(text) => setDescription(text)}
                        />
                        <Text>Attachment:</Text>
                        <TextInput
                            style={STYLES.texttype}
                            value={attachement}
                            onChangeText={(text) => setAttachement(text)}
                        />
                        <TouchableOpacity onPress={createEvent} style={{ color: 'blue', marginTop: 11, borderRadius: 5 }}>
                            <Text style={{ color: 'blue', fontSize: 22, textAlign: 'center' }}>Create Event</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => toggleModal(null)} style={{ color: 'red', padding: 10, borderRadius: 5, marginTop: 1 }}>
                            <Text style={{ color: 'red', fontSize: 22, textAlign: 'center' }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Modal>
        </ScrollView>
    );
};

export default Calendarr;
