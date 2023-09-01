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
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({ navigation }) => {
    const [textValue, setTextvalue] = useState(' Ragavi');
    const [mobile, setMobile] = useState(' 12345678910');
    const [bloodgroup, setBloodgroup] = useState(' B+');
    const [Emergencycon, setemergencycon] = useState(' Nehru');


    //
    const [data, setData] = useState([]);
    const Mydata = async () => {
        const url = 'https://walrus-app-v5mk9.ondigitalocean.app/updateProfile';
        const token = await AsyncStorage.getItem('authToken');
        // console.log("token", url, token, token?.accessToken);

        let result = await fetch(url, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + token
            }
        })

        result = await result.json();
        console.log("results from my car", result)
        setData(result);


    };

    useEffect(() => {
        Mydata();
    }, []);

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
                        // value={textValue}
                        onChangeText={text => setTextvalue(text)}
                        style={STYLES.textinput} />
                    <Text style={STYLES.texttitle}>Mobile *</Text>
                    <TextInput
                        // value={mobile}
                        onChangeText={text => setMobile(text)}
                        style={STYLES.textinput} />
                    <View stye={{ flexDirection: 'row' }}>

                        <Text style={{ marginLeft: 15, marginTop: 7 }}>Blood Group *</Text>
                        <Text style={STYLES.gender}>Sex *</Text>
                        <TextInput
                            // value={bloodgroup}
                            onChangeText={text => setBloodgroup(text)}
                            style={STYLES.smallinput} />


                        <TextInput
                            // value={textValue}
                            onChangeText={text => setTextvalue(text)}
                            style={STYLES.sidebox} />
                    </View>
                    <Text style={STYLES.texttitle}>Date of Birth *</Text>
                    <TextInput
                        // value={textValue}
                        onChangeText={text => setTextvalue(text)}
                        style={STYLES.textinput} />
                    <Text style={STYLES.texttitle}>Emergency Contact:</Text>
                    <TextInput
                        // value={Emergencycon}
                        onChangeText={text => setemergencycon(text)}
                        style={STYLES.textinput} />
                    <Text style={STYLES.texttitle}>Emergency Contact Number:</Text>
                    <TextInput
                        // value={mobile}
                        onChangeText={text => setMobile(text)}
                        style={STYLES.textinput} />
                    <Text style={STYLES.texttitle}>Marital Status</Text>
                    <TextInput
                        // value={textValue}
                        onChangeText={text => setTextvalue(text)}
                        style={STYLES.textinput} />
                    <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 10 }}>Family Info</Text>
                    <Text style={STYLES.texttitle}>Mobile *</Text>
                    <TextInput
                        // value={mobile}
                        onChangeText={text => setMobile(text)}
                        style={STYLES.textinput} />
                    <View stye={{ flexDirection: 'row' }}>

                        <Text style={{ marginLeft: 15, marginTop: 7 }}>Blood Group *</Text>
                        <Text style={STYLES.gender}>Sex *</Text>
                        <TextInput
                            // value={bloodgroup}
                            onChangeText={text => setBloodgroup(text)}
                            style={STYLES.smallinput} />
                        <TextInput
                            // value={textValue}
                            onChangeText={text => setTextvalue(text)}
                            style={STYLES.sidebox} />

                        <Text style={{ fontSize: 15, marginTop: 10, marginLeft: 10 }}>Children Info</Text>
                        <Text style={STYLES.texttitle}>Child 1 Name*</Text>
                        <TextInput
                            // value={mobile}
                            onChangeText={text => setMobile(text)}
                            style={STYLES.textinput} />
                        <View stye={{ flexDirection: 'row' }}>

                            <Text style={{ marginLeft: 15, marginTop: 7 }}>Child 1 Gender *</Text>
                            <Text style={STYLES.gender}>Child 1 DOB*</Text>
                            <TextInput
                                // value={bloodgroup}
                                onChangeText={text => setBloodgroup(text)}
                                style={STYLES.smallinput} />
                            <TextInput
                                // value={textValue}
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
                                // value={bloodgroup}
                                onChangeText={text => setBloodgroup(text)}
                                style={STYLES.smallinput} />

                            {/* <Text style={{ marginLeft: 150, marginTop: 90 }}>Company Description*</Text>
                            <TextInput
                                value={textValue}
                                onChangeText={text => setTextvalue(text)}
                                style={STYLES.description} /> */}

                        </View>
                    </View>
                    <View style={STYLES.space} />
                    <Button title="Update Profile"> </Button>

                </View>
            </ScrollView>
        </SafeAreaView>


    )


}
export default Profile;