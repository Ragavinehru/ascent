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
import { ScrollView, TouchableOpacity, TouchableHighlight } from 'react-native-gesture-handler';
import { Navigation } from 'react-native-navigation';
import { Calendar } from 'react-native-calendars';


const Calendarr = ({ navigation }) => {

    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    return (
        <SafeAreaView
            style={{ paddingHorizontal: 20, flex: 1, backgroundColor: COLORS.white }}>

            <ScrollView showsVerticalScrollIndicator={true}>
                <View style={STYLES.header}>
                    <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}> Back </Text>

                </View>


                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('User')}>

                        <Image style={{ width: 50, marginLeft: 280, marginBottom: 34, marginRight: 40, height: 50, }} source={require('../assets/person.png')} />
                    </TouchableOpacity>
                </View>


                <View style={{ marginTop: 70 }}>
                    <Text style={{ fontSize: 19, marginLeft: 17, marginBottom: 10, fontWeight: 'bold', color: COLORS.dark }}>
                        Hi,Welcome Back
                    </Text>

                </View>
                <View style={STYLES.btnSecondary}>
                    <TouchableHighlight onPress={() => navigation.navigate('NewEvent')}>
                        <Text style={STYLES.text}>
                            + New Event
                        </Text>
                    </TouchableHighlight>
                </View>
                <View style={STYLES.container}>
                    <Calendar
                        onDayPress={(day) => handleDateSelect(day.dateString)}
                        markedDates={{
                            [selectedDate]: { selected: true, selectedColor: 'blue' },
                        }}
                    />
                </View>


            </ScrollView>
        </SafeAreaView>
    )

}
export default Calendarr;