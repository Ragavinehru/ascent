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
import { useState, useEffect } from 'react';
import { Navigation } from 'react-native-navigation';
import DatePicker from 'react-native-datepicker';
import { SelectList } from 'react-native-dropdown-select-list'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';


const NewEvent = ({ navigation }) => {

    const type = [
        { key: '1', value: 'Regular Meeting' },
        { key: '2', value: 'Conference' },
        { key: '3', value: 'Guest Presentation' },
    ]

    const format = [
        { key: '1', value: 'Online' },
        { key: '2', value: 'Offline' },
    ]
    // const MyDatePicker = () => {
    //     const [selectedDate, setSelectedDate] = useState('');

    //     const handleDateChange = (date) => {
    //         setSelectedDate(date);
    //     };
    const pickAttachment = async () => {
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            console.log("result", result);
            console.log("Result URI:", result[0].uri);


            if (!result) {
                console.error("DocumentPicker result is undefined.");
                return;
            }

            if (Platform.OS === 'android') {
                if (result[0].uri) {
                    console.log("Android URI:", result[0].uri);
                    const realPath = await DocumentPicker.resolvePath({
                        uri: result.uri,
                        fileType: '*/*',
                    });

                    console.log("Resolved Real Path:", realPath);

                    if (realPath) {
                        setSelectedAttachment(realPath);
                        console.log("attach", realPath);
                    } else {
                        console.error("Real path is undefined.");
                    }
                } else {

                    console.error("Result URI is undefined.");
                }
            } else {
                if (result.uri) {
                    setSelectedAttachment(result[0].uri);
                    console.log("attach", result.uri);
                } else {
                    console.error("Result URI is undefined.");
                }
            }

        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // Handle cancelation
            } else {
                console.error("Error picking attachment:", err);
                throw err;
            }
        }
    };
    return (
        <SafeAreaView
            style={{ paddingHorizontal: 40, flex: 1, backgroundColor: COLORS.white }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={STYLES.header}>
                    <TouchableOpacity onPress={navigation.goBack}>
                        <Image style={STYLES.inputIcon} source={require('../assets/arrow.png')} />
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20, marginTop: 10 }}> Back </Text>
                    </TouchableOpacity>
                </View>

                <Text style={{ fontSize: 22, fontWeight: 'bold', color: COLORS.dark }}>
                    Create a Event
                </Text>
                <View>
                    <Text style={{ marginTop: 20 }}>Event name*</Text>
                    <TextInput style={STYLES.texttype} />
                    <Text>Select Type</Text>
                    <SelectList
                        setSelected={(val) => setSelected(val)}
                        data={type}
                        save="value"
                    />
                    <Text>Select Format</Text>

                    <SelectList
                        setSelected={(val) => setSelected(val)}
                        data={format}
                        save="value"
                    />
                    <Text style={{ marginTop: 20 }}>Location/Meeting Link</Text>
                    <TextInput style={STYLES.texttype} />
                    {/* 
                        <Text style={STYLES.label}>Select a Date:</Text>
                        <DatePicker
                            style={STYLES.datePicker}
                            date={selectedDate}
                            mode="date"
                            placeholder="Select date"
                            format="YYYY-MM-DD"
                            minDate="2020-01-01"
                            maxDate="2025-12-31"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            onDateChange={handleDateChange}
                        />
                        <Text style={STYLES.selectedDate}>Selected Date: {selectedDate}</Text> */}
                    <Text style={{ marginTop: 20 }}>Agenda/Description</Text>
                    <TextInput style={STYLES.texttype} />
                    <Text style={{ marginTop: 20 }}>Attachment</Text>
                    <TextInput style={STYLES.texttype} />
                    <TouchableOpacity onPress={pickAttachment}>
                        <Image style={{ width: 23, height: 27, marginLeft: 290, marginTop: -90 }} source={require('../assets/attachment.png')} />
                    </TouchableOpacity>



                </View>
            </ScrollView>
        </SafeAreaView>
    )


};

export default NewEvent;