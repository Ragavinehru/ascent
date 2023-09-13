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
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import DatePicker from 'react-native-datepicker';
import { Picker } from '@react-native-picker/picker';

const Profile = ({ navigation }) => {
    const [textValue, setTextvalue] = useState('');
    const [mobile, setMobile] = useState('');
    const [bloodgroup, setBloodgroup] = useState('');
    const [sex, setSex] = useState('');
    const [Emergencycon, setemergencycon] = useState('');
    const [number, setemergencynum] = useState('');
    const [child, setChild] = useState('');
    const [spouse, setSpouse] = useState('');
    const [wedding, setWedd] = useState('');
    const [marital, setMarital] = useState('');
    const [childrenData, setChildrenData] = useState([]);

    // // const [selectedDate, setSelectedDate] = useState(new Date());
    // const [company, setcompany] = useState('');

    const [dob, setDob] = useState();
    // const []

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedValue, setSelectedValue] = useState('');
    const showDatepicker = () => {
        setShowDatePicker(true);
    };

    const onDateChange = (event, selectedDate) => {
        setShowDatePicker(false);

        if (selectedDate) {
            setSelectedDate(selectedDate);
        }
    };
    //
    const [data, setData] = useState([]);
    const [postdata, setPosTData] = useState([]);
    const Mydata = async () => {
        const url = 'https://walrus-app-v5mk9.ondigitalocean.app/getUserInfo?email=' + global.email;
        // const token = await AsyncStorage.getItem('authToken');
        // console.log("token", url, token, token?.accessToken);

        let result = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',

            }
        })

        result = await result.json();
        console.log("profileeeeeee", result);
        setData(result);
        const userInfo = data.userInfo;
        setTextvalue(userInfo.name);
        setMobile(userInfo.mobileno);
        setBloodgroup(userInfo.bloodgroup);
        setDob(userInfo.dob);
        setemergencycon(userInfo.emergencycontact.name);
        setemergencynum(userInfo.emergencycontact.mobileno);
        setSpouse(userInfo.spouse);
        setChild(userInfo.children.name);
        setWedd(userInfo.weddingann);
        setMarital(userInfo.maritalStatus);
        setChildrenData(userInfo.children);
        // setSex(userInfo.sex);



    };
    // console.log("data postedddd", data.userInfo.name)
    // console.log("name", data.userInfo.name)
    useEffect(() => {
        // if (data.userInfo) {
        //     setTextvalue(data.userInfo.name);
        //     setMobile(data.userInfo.mobileno);
        //     setBloodgroup(data.userInfo.bloodgroup);
        // setemergencycon(data.userInfo.emergencycontact.name);
        // setemergencynum(data.userInfo.emergencycontact.mobileno);
        // setSelectedDate(new Date(data.userInfo.dob));
        // setMarital(data.userInfo.marital);
        // setSpouse(data.userInfo.spouse);
        // setcompany(data.userInfo);
        // setDob(data.userInfo.dob);
        // setemergencycon(data.userInfo.Emergencycon.name);
        // }

        Mydata();
    }, []);
    // const fetchpostdata = async () => {
    //     const url = 'https://walrus-app-v5mk9.ondigitalocean.app/updateProfile';

    //     const updatedProfileData = {
    //         name: textValue,
    //         mobile: mobile,
    //         bloodgroup: bloodgroup,

    //     };

    //     try {
    //         let result = await fetch(url, {
    //             method: 'POST',
    //             headers: {
    //                 Accept: 'application/json',
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(updatedProfileData),
    //         });

    //         result = await result.json();
    //         console.log('Profile Updated', result);

    //     } catch (error) {
    //         console.error('Error updating profile', error);
    //         // Handle errors
    //     }
    // };




    return (

        <SafeAreaView style={{ backgroundColor: COLORS.white }}>
            <ScrollView>
                <View style={STYLES.header}>
                    <TouchableOpacity onPress={navigation.goBack}>
                        <Image style={STYLES.inputIcon} source={require('../assets/arrow.png')} />

                        {/* <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} /> */}
                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20, marginTop: 10 }}> Back </Text>
                    </TouchableOpacity>

                </View>
                <View>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', marginLeft: 10 }}>Update profile</Text>

                    <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 10 }}>Personal Info</Text>
                    <Text style={STYLES.texttitle}>Name *</Text>
                    <TextInput
                        value={textValue}
                        onChangeText={text => setTextvalue(text)}
                        style={STYLES.textinput} />

                    <Text style={STYLES.texttitle}>Mobile *</Text>
                    <TextInput
                        value={mobile}
                        onChangeText={text => setMobile(text)}
                        style={STYLES.textinput} />
                    <View stye={{ flexDirection: 'row' }}>

                        <Text style={{ marginLeft: 15, marginTop: 7 }}>Blood Group *</Text>
                        <Text style={STYLES.gender}>Sex *</Text>
                        <TextInput
                            value={bloodgroup}
                            onChangeText={text => setBloodgroup(text)}
                            style={STYLES.smallinput} />


                        <TextInput
                            value={sex}
                            onChangeText={text => setTextvalue(text)}
                            style={STYLES.sidebox} />
                    </View>
                    <Text style={STYLES.texttitle}>Date of Birth *</Text>
                    <TouchableOpacity onPress={showDatepicker}>
                        <Text style={{ borderWidth: 1, width: 345, height: 54, borderRadius: 6, padding: 10, marginLeft: 15 }}>
                            {selectedDate.toDateString()}
                        </Text>
                    </TouchableOpacity>

                    {showDatePicker && (
                        <DateTimePicker
                            value={selectedDate}
                            mode="date"
                            display="calendar"
                            onChange={onDateChange}
                        />
                    )}
                    <Text style={STYLES.texttitle}>Emergency Contact:</Text>
                    <TextInput
                        value={Emergencycon}
                        onChangeText={text => setemergencycon(text)}
                        style={STYLES.textinput} />
                    <Text style={STYLES.texttitle}>Emergency Contact Number:</Text>
                    <TextInput
                        value={number}
                        onChangeText={text => setemergencynum(text)}
                        style={STYLES.textinput} />
                    {/* <Picker
                        selectedValue={selectedValue}
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    >
                        <Picker.Item label="Option 1" value="Option 1" />
                        <Picker.Item label="Option 2" value="Option 2" />

                      
                    </Picker> */}
                    <Text style={STYLES.texttitle}>Marital Status</Text>
                    <TextInput
                        value={marital}
                        // value={selectedValue}
                        onChangeText={text => setMarital(text)}
                        style={STYLES.textinput} />
                    <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 10 }}>Family Info</Text>
                    <Text style={STYLES.texttitle}>Spouse Name</Text>
                    <TextInput
                        value={spouse.name}
                        onChangeText={text => setSpouse(text)}
                        style={STYLES.textinput} />
                    <View stye={{ flexDirection: 'row' }}>

                        <Text style={{ marginLeft: 15, marginTop: 7 }}>Spouse DOB</Text>
                        <Text style={STYLES.gender}>Wedding Anniversary</Text>
                        <TextInput
                            value={spouse.dob}
                            onChangeText={text => setSpouse(text)}
                            style={STYLES.smallinput} />
                        <TextInput
                            value={wedding}
                            onChangeText={text => setTextvalue(text)}
                            style={STYLES.sidebox} />

                        <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 10 }}>Children Info</Text>

                        <Text style={STYLES.texttitle}>Child 1 Name*</Text>
                        <TextInput
                            // value={child}
                            onChangeText={text => setMobile(text)}
                            style={STYLES.textinput} />
                        <View stye={{ flexDirection: 'row' }}>

                            <Text style={{ marginLeft: 15, marginTop: 11 }}>Child 1 Gender *</Text>
                            <Text style={STYLES.gender}>Child 1 DOB*</Text>
                            <TextInput
                                // value={bloodgroup}
                                onChangeText={text => setBloodgroup(text)}
                                style={STYLES.smallinput} />
                            <TextInput
                                value={textValue}
                                onChangeText={text => setTextvalue(text)}
                                style={STYLES.sidebox} />
                        </View>
                        <Text style={STYLES.texttitle}>Child 2 Name*</Text>
                        <TextInput
                            // value={mobile}
                            onChangeText={text => setMobile(text)}
                            style={STYLES.textinput} />
                        <View stye={{ flexDirection: 'row' }}>

                            <Text style={{ marginLeft: 15, marginTop: 7 }}>Child 2 Gender *</Text>
                            <Text style={STYLES.gender}>Child 2 DOB*</Text>
                            <TextInput
                                // value={bloodgroup}
                                onChangeText={text => setBloodgroup(text)}
                                style={STYLES.smallinput} />
                            <TextInput
                                // value={textValue}
                                onChangeText={text => setTextvalue(text)}
                                style={STYLES.sidebox} />
                        </View>
                        <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 10 }}>Personal Info</Text>
                        <Text style={STYLES.texttitle}>Company Name*</Text>
                        <TextInput
                            // value={mobile}
                            onChangeText={text => setMobile(text)}
                            style={STYLES.textinput} />
                        <View stye={{ flexDirection: 'row' }}>

                            <Text style={{ marginLeft: 15, marginTop: 7 }}>Company Website*</Text>

                            <TextInput
                                // value={company.website}
                                onChangeText={text => setcompany(text)}
                                style={STYLES.smallinput} />

                            <Text style={{ marginLeft: 200, marginTop: -72 }}>Company Description*</Text>
                            <TextInput
                                // value={textValue}
                                onChangeText={text => setTextvalue(text)}
                                style={STYLES.descriptioninput}
                            />

                        </View>
                    </View>
                    {/* <View>
                        <TouchableOpacity onPress={showDatepicker}>
                            <Text style={{ borderWidth: 1, width: 80, padding: 10 }}>
                                {selectedDate.toDateString()}
                            </Text>
                        </TouchableOpacity>

                        {showDatePicker && (
                            <DateTimePicker
                                value={selectedDate}
                                mode="date"
                                display="calendar"
                                onChange={onDateChange}
                            />
                        )}
                    </View> */}

                    <View style={STYLES.space} />
                    <Button title="Update Profile"  > </Button>

                </View>
            </ScrollView>
        </SafeAreaView>


    )


}
export default Profile;