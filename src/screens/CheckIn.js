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

const stages = ['Work Highs ', 'Work Lows ', 'Personal Highs ', 'Personal Lows', 'Discoveries&Presentations'];

const Checkin = ({ navigation }) => {
    const [currentStage, setCurrentStage] = useState(0);
    const [showCheckIn, setShowCheckIn] = useState(true);
    const [showViewResponse, setShowViewResponse] = useState(false);

    const handleCheckInClick = () => {
        setShowCheckIn(true);
        setShowViewResponse(false);
    };

    const handleViewResponseClick = () => {
        setShowCheckIn(false);
        setShowViewResponse(true);
    };

    const handleNextClick = () => {
        if (currentStage < stages.length - 1) {
            setCurrentStage(currentStage + 1);
        }
    };

    const handleBackClick = () => {
        if (currentStage > 0) {
            setCurrentStage(currentStage - 1);
        }
    };

    return (
        <View style={{ paddingHorizontal: 20, flex: 1, backgroundColor: 'white' }}>
            <View style={STYLES.header}>
                <TouchableOpacity onPress={navigation.goBack}>
                    <Image style={STYLES.inputIcon} source={require('../assets/arrow.png')} />
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20, marginTop: 10 }}> Back </Text>
                </TouchableOpacity>
            </View>

            <View style={{ marginTop: 30 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: COLORS.dark }}>
                    CheckIn
                </Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <TouchableOpacity onPress={handleCheckInClick}>
                    <Text style={{ color: showCheckIn ? 'blue' : 'black' }}>CheckIn</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleViewResponseClick}>
                    <Text style={{ color: showViewResponse ? 'blue' : 'black', marginLeft: 10 }}>
                        View Response
                    </Text>
                </TouchableOpacity>
            </View>

            {showCheckIn && (
                <View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: 20,
                        width: 126,
                        marginLeft: -20,
                        // marginTop: 5,
                        backgroundColor: 'white'
                    }}>
                        {stages.map((stage, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setCurrentStage(index)}
                            >
                                <Text style={{ color: currentStage === index ? 'blue' : 'black', marginLeft: 10 }}>
                                    {stage}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View style={STYLES.cardcheck}>

                        <View>
                            <Text style={{ color: 'black', fontSize: 22 }}>{stages[currentStage]}</Text>
                            <Text style={{ color: 'grey', marginTop: 30 }}>Situation: What are the most important things that happened? *</Text>
                            <TextInput style={STYLES.texttype} />
                            <Text style={{ color: 'grey' }}>Impact: What impact did it have on you? *</Text>
                            <TextInput style={STYLES.texttype} />
                            <Text style={{ color: 'grey' }}>Feelings: Any feelings associated with this (3 feelings)? *</Text>
                            <TextInput style={STYLES.texttype} />
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={handleBackClick}>
                            <Text>Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleNextClick}>
                            <Text>Next</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            )}

            {showViewResponse && (
                <View>
                    <View style={STYLES.cardcheck}>
                        <ScrollView>
                            <Text style={{ color: 'black', marginLeft: 10 }}>Title</Text>
                            <Text style={{ color: 'black', marginLeft: 10, marginTop: 10 }}>Work Highs</Text>
                            <View >
                                <Text style={{ color: 'grey', marginTop: 10, width: 150, marginLeft: 17 }}>Situation: What are the most important things that happened? *</Text>
                                <Text style={{ color: 'grey', marginTop: 10, width: 150, marginLeft: 17 }}>Impact: What impact did it have on you? *</Text>
                                <Text style={{ color: 'grey', marginTop: 10, width: 150, marginLeft: 17 }}>Feelings: Any feelings associated with this (3 feelings)? *</Text>
                            </View>
                            <Text style={{ color: 'black', marginLeft: 10, marginTop: 10 }}>Work Lows</Text>
                            <View >
                                <Text style={{ color: 'grey', marginTop: 10, width: 150, marginLeft: 17 }}>Situation: What are the most important things that happened? *</Text>
                                <Text style={{ color: 'grey', marginTop: 10, width: 150, marginLeft: 17 }}>Impact: What impact did it have on you? *</Text>
                                <Text style={{ color: 'grey', marginTop: 10, width: 150, marginLeft: 17 }}>Feelings: Any feelings associated with this (3 feelings)? *</Text>
                            </View>
                            <Text style={{ color: 'black', marginLeft: 10, marginTop: 10 }}>Personal Highs</Text>
                            <View >
                                <Text style={{ color: 'grey', marginTop: 10, width: 150, marginLeft: 17 }}>Situation: What are the most important things that happened? *</Text>
                                <Text style={{ color: 'grey', marginTop: 10, width: 150, marginLeft: 17 }}>Impact: What impact did it have on you? *</Text>
                                <Text style={{ color: 'grey', marginTop: 10, width: 150, marginLeft: 17 }}>Feelings: Any feelings associated with this (3 feelings)? *</Text>
                            </View>
                            <Text style={{ color: 'black', marginLeft: 10, marginTop: 10 }}>Personal Lows</Text>
                            <View >
                                <Text style={{ color: 'grey', marginTop: 10, width: 150, marginLeft: 17 }}>Situation: What are the most important things that happened? *</Text>
                                <Text style={{ color: 'grey', marginTop: 10, width: 150, marginLeft: 17 }}>Impact: What impact did it have on you? *</Text>
                                <Text style={{ color: 'grey', marginTop: 10, width: 150, marginLeft: 17 }}>Feelings: Any feelings associated with this (3 feelings)? *</Text>
                            </View>
                            <Text style={{ color: 'black', marginLeft: 10, marginTop: 10 }}>Discoveries & Presentations</Text>
                            <View >
                                <Text style={{ color: 'grey', marginTop: 10, width: 150, marginLeft: 17 }}>Situation: What are the most important things that happened? *</Text>
                                <Text style={{ color: 'grey', marginTop: 10, width: 150, marginLeft: 17 }}>Impact: What impact did it have on you? *</Text>
                                <Text style={{ color: 'grey', marginTop: 10, width: 150, marginLeft: 17 }}>Feelings: Any feelings associated with this (3 feelings)? *</Text>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            )}
        </View>
    );
};

export default Checkin;