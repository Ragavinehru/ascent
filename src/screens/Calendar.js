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

                <TouchableOpacity onPress={navigation.goBack}>
                    <Image style={STYLES.inputIcon} source={require('../assets/arrow.png')} />

                    {/* <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} /> */}
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20, marginTop: 10 }}> Back </Text>
                </TouchableOpacity>

                <View style={STYLES.header}>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('User')}>

                            <Image style={{ width: 50, marginLeft: 260, marginTop: 30, marginRight: 40, height: 50, }} source={require('../assets/person.png')} />
                        </TouchableOpacity>
                    </View>

                </View>




                <View style={{ marginTop: -65 }}>
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