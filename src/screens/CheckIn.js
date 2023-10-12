import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
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
import axios from 'axios';

const stages = ['Work Highs ', 'Work Lows ', 'Personal Highs ', 'Personal Lows', 'Discoveries&Presentations'];

// const Checkin = ({ navigation }) => {
//     const [currentStage, setCurrentStage] = useState(0);
//     const [showCheckIn, setShowCheckIn] = useState(true);
//     const [showViewResponse, setShowViewResponse] = useState(false);
//     const [responses, setResponses] = useState([]);
//     const [CheckData, setCheckData] = useState([]);
const Checkin = ({ navigation }) => {
    const [currentStage, setCurrentStage] = useState(0);
    const [showCheckIn, setShowCheckIn] = useState(true);
    const [showViewResponse, setShowViewResponse] = useState(false);
    const [responses, setResponses] = useState([]);
    const [CheckData, setCheckData] = useState([]);
    // const [groupedResponses, setGroupedResponses] = useState({});


    const handleCheckInClick = () => {
        setShowCheckIn(true);
        setShowViewResponse(false);
    };

    const handleViewResponseClick = () => {
        setShowCheckIn(false);
        setShowViewResponse(true);
        ViewResponse();
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

    const apiresponse = 'https://walrus-app-v5mk9.ondigitalocean.app/getRowData';

    const ViewResponse = async () => {
        try {
            let ViewData = {
                "months": [
                    7,
                    8,
                    9
                ],
                "year": 2023,
                "email": "vasanth@venzotechnologies.com"
            }

            const response = await axios.post(apiresponse, ViewData, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ViewData),
            });
            console.log("happy", response.data.rowData[0].checkin[0]);
            setCheckData(response);

            if (response.status === 200) {

                // const responseData = response.data.rowData.find(
                //     (item) => item.checkin[0].title === stages[currentStage]
                // );
                // setResponses(responseData.checkin[0].content);

                // console.log('View Response:', response.data.rowData.checkin.content.question);
                console.log('View Response:', response.data.rowData[0].checkin[0].content);

            } else {
                console.error('Failed to view:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error view response:', error);
        }
    };
  
// const Content= CheckData.data.rowData.checkin[0].content;
    // const [CheckData, setCheckData] = useState([]);
    // console.log("hajjjjjj",CheckData.data.rowData[0].checkin[0]);
// const groupedResponses = CheckData.data.rowData[0].checkin[0];
// console.log("hgrtrewwssjj",groupedResponses.content[0]);
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
                    <Text style={{color:'blue',marginLeft:150}}>CheckIN</Text>

                </View>
                
            )}

            {showViewResponse && (
                <View>
                    <View style={STYLES.cardview}>
                        <ScrollView>
                            <Text style={{ color: 'black', marginLeft: 10 }}>Title</Text>
                            {/* {CheckData && CheckData.rowData
                ? CheckData.rowData.map((rowData, index) => (
                    <View key={index}>
                      <Text style={{ color: 'black', marginLeft: 10, marginTop: 10 }}>
                        {rowData.checkin[0].title}
                      </Text>
                      {rowData.checkin[0].content.map((content, i) => (
                        <View key={i}>
                          <Text style={{ color: 'grey', marginTop: 10, width: 150, marginLeft: 17 }}>
                            {content.question}
                          </Text>
                          <Text>{content.response}</Text>
                        </View>
                      ))}
                    </View>
                  ))
                : null} */}
                            {/* <Text style={{ color: 'black', marginLeft: 10, marginTop: 10 }}>Work Highs</Text> */}
                            {/* <ScrollView>
                            {responses.map((response, index) => (

                                <View key={index}>
                                    <Text style={{ color: 'black', marginLeft: 10 }}>
                                        {response.question}
                                    </Text>
                                    <Text style={{ color: 'black', marginLeft: 10, marginTop: 10 }}>
                                        {stages[currentStage]}
                                    </Text>
                                    <Text style={{ color: 'grey', marginTop: 10, width: 150, marginLeft: 17 }}>
                                        {response.response}
                                    </Text>
                                </View>
                            ))}

                        </ScrollView> */}
                           <Text style={{ color: 'black', marginLeft: 10, marginTop: 10 }}>Work Highs</Text>
                            <View >
                                <Text style={{ color: 'grey', marginTop: 10, width: 150, marginLeft: 17 }}>Situation: What are the most important things that happened? *</Text>
                                <Text style={{ marginTop: 20,position:'absolute',marginLeft: 200}}>{CheckData.data.rowData[0].checkin[0].content[0].response}</Text>
                                <Text style={{ color: 'grey', marginTop: 10, width: 150, marginLeft: 17 }}>Impact: What impact did it have on you? *</Text>
                                <Text style={{ marginTop: 80,position:'absolute',marginLeft:200}}>{CheckData.data.rowData[0].checkin[0].content[1].response}</Text>
                                <Text style={{ color: 'grey', marginTop: 10, width: 150, marginLeft: 17 }}>Feelings: Any feelings associated with this (3 feelings)? *</Text>
                                <Text style={{ marginTop: 130,position:'absolute',marginLeft: 200}}>{CheckData.data.rowData[0].checkin[0].content[2].response}</Text>
                            </View>  
                            <Text style={{ color: 'black', marginLeft: 10, marginTop: 10 }}>Work Lows</Text>
                            <View >
                                <Text style={{ color: 'grey', marginTop: 10, width: 150, marginLeft: 17 }}>Situation: What are the most important things that happened? *</Text>
                                {/* <Text style={{ marginTop: 20,position:'absolute',marginLeft: 200}}>{CheckData.data.rowData[0].checkin[1].content[0].response}</Text> */}
                                <Text style={{ color: 'grey', marginTop: 10, width: 150, marginLeft: 17 }}>Impact: What impact did it have on you? *</Text>
                                {/* <Text style={{ marginTop: 20,position:'absolute',marginLeft: 200}}>{CheckData.data.rowData[0].checkin[1].content[1].response}</Text> */}
                                <Text style={{ color: 'grey', marginTop: 10, width: 150, marginLeft: 17 }}>Feelings: Any feelings associated with this (3 feelings)? *</Text>
                                {/* <Text style={{ marginTop: 20,position:'absolute',marginLeft: 200}}>{CheckData.data.rowData[0].checkin[1].content[2].response}</Text> */}
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