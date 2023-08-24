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
import { useState } from 'react';
import { Navigation } from 'react-native-navigation';
import DatePicker from 'react-native-datepicker';

const Profile = ({ navigation }) => {
    const [textValue, setTextvalue] = useState('Ragavi');
    const [mobile, setMobile] = useState('12345678910');
    const [bloodgroup, setBloodgroup] = useState('B+');
    const [Emergencycon, setemergencycon] = useState('Nehru');
    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white }}>
            <View style={STYLES.header}>
                <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}> Back </Text>

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
                        value={textValue}
                        onChangeText={text => setTextvalue(text)}
                        style={STYLES.sidebox} />
                </View>
                <Text style={STYLES.texttitle}>Date of Birth *</Text>
                <TextInput
                    value={textValue}
                    onChangeText={text => setTextvalue(text)}
                    style={STYLES.textinput} />
                <Text style={STYLES.texttitle}>Emergency Contact:</Text>
                <TextInput
                    value={Emergencycon}
                    onChangeText={text => setemergencycon(text)}
                    style={STYLES.textinput} />
                <Text style={STYLES.texttitle}>Emergency Contact Number:</Text>
                <TextInput
                    value={mobile}
                    onChangeText={text => setMobile(text)}
                    style={STYLES.textinput} />
                <Text style={STYLES.texttitle}>Marital Status</Text>
                <TextInput
                    value={textValue}
                    onChangeText={text => setTextvalue(text)}
                    style={STYLES.textinput} />

            </View>
        </SafeAreaView >


    )


}
export default Profile;