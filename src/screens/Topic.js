import React from 'react';
import { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    Image,
    Button,
    ToastAndroid, Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../consts/color';
import STYLES from '../styles';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Navigation } from 'react-native-navigation';


const Calendar = ({ navigation }) => {
    return (
        <SafeAreaView
            style={{ paddingHorizontal: 20, flex: 1, backgroundColor: COLORS.white }}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={STYLES.header}>
                <TouchableOpacity onPress={navigation.goBack}>
                    <Image style={STYLES.inputIcon} source={require('../assets/arrow.png')} />
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20, marginTop: 10 }}> Back </Text>
                </TouchableOpacity>
            </View>
               
                <View style={{ marginTop: 70 }}>
                    <Text style={{ fontSize: 27, fontWeight: 'bold', color: COLORS.dark }}>
                        Topic For Discussions
                    </Text>
<Text style={{marginTop:20}}>All  | Planned  | Completed  | No ActionTaken</Text>
                </View>
                <Text style={STYLES.new}>Add Topic For Discussion</Text>
           <View style={STYLES.cardcheck}></View>
            </ScrollView>
        </SafeAreaView>
    )

}
export default Calendar;