import React, { useState, useEffect } from 'react';
import {
    View, Text, TouchableOpacity, TouchableHighlight, Image,
    Alert, TextInput, ScrollView
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import axios from 'axios';
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
    const [events, setEvents] = useState([]); // Initialize events as an empty array
    // const [isNewEventModalVisible, setIsNewEventModalVisible] = useState(false);

    const [selectedEvents, setSelectedEvents] = useState([]);


    const typeoption = [
        { label: 'Option 1', value: 'Option 1' },
        { label: 'Option 2', value: 'Option 2' },
    ];

    const apiUrl = 'https://walrus-app-v5mk9.ondigitalocean.app/createEvent';
    const apiDel = 'https://walrus-app-v5mk9.ondigitalocean.app/deleteEvent';

    const toggleModal = (date) => {
        // Get the current date without the time component
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);

        // Convert the selectedDate string to a Date object
        const selectedEventDate = new Date(date);

        // Check if the selected date is in the past
        if (selectedEventDate < currentDate) {
            // Display an error message to the user
            // Alert.alert(
            //     'Hello',
            //     'You cannot create events for past dates. Please select a future date.',
            //     [{ text: 'OK' }],
            //     { cancelable: false }
            // );
        } else {
            setSelectedDate(date);
            setModalVisible(!isModalVisible);
        }
    };



    // const toggleNewEventModal = () => {
    //     setIsNewEventModalVisible(!isNewEventModalVisible);
    // };

    // const handleDateSelect = (day) => {
    //     toggleModal(day.dateString);
    // };


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
                    "createdBy": global.email,
                    "user": global.email,
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
                console.log('Event created:', response.data);
                setModalVisible(false);

                setEventTitle('');
                setType('');
                setFormat('');
                setStartTime('');
                setEndTime('');
                setLocation('');
                setDescription('');
                setAttachement('');



                formatEventsForCalendar(events);

            } else {
                console.error('Failed to create event:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    const deleteEvent = async (selectedEvent) => {
        try {
            const selectedEventDate = new Date(selectedEvent.date);
            const currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);
            if (selectedEventDate >= currentDate) {
                let DelData = {
                    "event": {
                        "id": selectedEvent.id,
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

                const response = await axios.post(apiDel, DelData, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(DelData),
                });

                if (response.status === 200) {
                    console.log('Event Deleted:', response.data);
                    // setEvents(events.filter(event => event.id !== selectedEvent.id));
                    setEventTitle('');
                    setType('');
                    setFormat('');
                    setStartTime('');
                    setEndTime('');
                    setLocation('');
                    setDescription('');
                    setAttachement('');

                    setSelectedEvents(selectedEvents.filter(event => event.id !== selectedEvent.id));
                    setEvents(events.filter(event => event.id !== selectedEvent.id));

                }
            } else {
                console.error('Failed to delete event:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error Delete event:', error);
        }
    };

    const fetchEvents = async () => {
        try {
            const groupId = {
                "groupIds": ["PjIK87LDBDc5quWz76Ct", "bX2rIpcfpnPUaRIMQT3M", "NJY0z2LNktMwv89ETkt4", "RHmBJgPACFHAxAvvpv95", "6YXXJZQcMuL42IjRsHSL"]
            };

            const url = 'https://walrus-app-v5mk9.ondigitalocean.app/getEvents';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(groupId),
            });

            if (response.status === 200) {
                const result = await response.json();
                setEvents(result.events);
                console.log("pal", result); // Update the state with the fetched events
            } else {
                console.error('Failed to fetch events:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    useEffect(() => {
        fetchEvents();
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
            const formattedTime = selectedTime.toLocaleTimeString();
            setStartTime(formattedTime);
            hideStartTimePicker();
        } else {
            hideStartTimePicker();
        }
    };

    const handleEndTimeChange = (event, selectedTime) => {
        if (selectedTime !== undefined) {
            const formattedTime = selectedTime.toLocaleTimeString();
            setEndTime(formattedTime);
            hideEndTimePicker();
        } else {
            hideEndTimePicker();
        }
    };
    const handleDateSelect = (day) => {
        const eventsForSelectedDate = events.filter((event) => event.date === day.dateString);
        setSelectedEvents(eventsForSelectedDate);
        toggleModal(day.dateString);
    };



    const formatEventsForCalendar = (events) => {
        const formattedEvents = {};

        events.forEach((event) => {
            const eventDate = event.date;
            formattedEvents[eventDate] = {
                selected: true,

                selectedColor: 'violet',
            };
        });

        return formattedEvents;
    };

    const formattedEventsData = formatEventsForCalendar(events);
    const isEventInFuture = (event) => {
        const eventDate = new Date(event.date);
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0);
        return eventDate >= currentDate;
    };

    return (
        <ScrollView>
            <View style={STYLES.header}>
                <TouchableOpacity onPress={navigation.goBack}>
                    <Image style={STYLES.inputIcon} source={require('../assets/arrow.png')} />
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20, marginTop: 10 }}> Back </Text>
                </TouchableOpacity>
            </View>
            {/* <View style={STYLES.btnSecondary}>
                <TouchableHighlight onPress={toggleModal}>
                    <Text style={STYLES.text}>+ New Event</Text>
                </TouchableHighlight>

            </View> */}
            <View style={{ marginTop: 40 }}>
                <Text style={{ marginLeft: 15, fontSize: 24, fontWeight: 'bold', color: 'black' }}>
                    Hi,Welcome Back
                </Text>

            </View>
            <Calendar
                onDayPress={handleDateSelect}
                // markedDates={{
                //     [selectedDate]: { selected: true, marked: true },
                // }}
                markedDates={formattedEventsData}
                style={{ marginTop: 20, height: 400 }}
            />
            <ScrollView>
                {selectedEvents.length > 0 && (
                    <View>
                        <Text style={{ color: 'black', fontSize: 16, marginLeft: 10, marginTop: 12 }}>Selected Event Details:</Text>
                        {selectedEvents.map((event) => (
                            <View key={event.id} style={STYLES.cardevent}>
                                {isEventInFuture(event) && (
                                    <TouchableOpacity onPress={() => deleteEvent(event)}>
                                        <Image style={{ width: 22, height: 22, marginTop: 10, marginLeft: 250 }} source={require('../assets/del.png')} />
                                    </TouchableOpacity>
                                )}
                                <Text style={{ color: 'black', marginLeft: 17, marginTop: 7 }}>Title: <Text style={{ color: 'grey', marginLeft: 20 }}>{event.label}</Text></Text>
                                <Text style={{ color: 'black', marginLeft: 17, marginTop: 5 }}>Date:<Text style={{ color: 'grey', marginLeft: 15 }}>{event.date}</Text></Text>
                                <Text style={{ color: 'black', marginLeft: 17, marginTop: 5 }}>Mode:<Text style={{ color: 'grey', marginLeft: 15 }}>{event.format}</Text></Text>
                                <Text style={{ color: 'black', marginLeft: 17, marginTop: 5 }}>Type:<Text style={{ color: 'grey', marginLeft: 15 }}>{event.type}</Text></Text>
                            </View>
                        ))}
                    </View>
                )}

            </ScrollView>

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
                        <View style={{ flexDirection: 'row', marginLeft: 100 }}>
                            <TouchableOpacity onPress={createEvent} style={{ color: 'blue', marginTop: 11, borderRadius: 5, marginRight: 10 }}>
                                <Text style={{ color: 'blue', fontSize: 17, textAlign: 'center' }}>Create Event</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => toggleModal()} style={{ color: 'red', padding: 10, borderRadius: 5, marginTop: 1 }}>

                                <Text style={{ color: 'red', fontSize: 17, textAlign: 'center' }}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </Modal>
        </ScrollView>
    );
};

export default Calendarr;
