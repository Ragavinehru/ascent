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

                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('User')}>

                        <Image style={{ width: 50, marginLeft: 280, marginTop: 30, marginRight: 40, height: 50, }} source={require('../assets/person.png')} />
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 70 }}>
                    <Text style={{ fontSize: 27, fontWeight: 'bold', color: COLORS.dark }}>
                        Hi,Welcome Back
                    </Text>

                </View>
            </ScrollView>
        </SafeAreaView>
    )

}
export default Calendar;