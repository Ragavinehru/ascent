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

import COLORS from '../consts/color';
import STYLES from '../styles';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Navigation } from 'react-native-navigation';
import axios from 'axios';




const Checkin = ({ navigation }) => {
    const [currentStage, setCurrentStage] = useState(0);
    const [showCheckIn, setShowCheckIn] = useState(false);
    // const [showCheckIn, setShowCheckIn] = useState(true);
    const [showViewResponse, setShowViewResponse] = useState(false);
    const [responses, setResponses] = useState([]);
    const [CheckData, setCheckData] = useState([]);
    const [workhigh, setworkhigh] = useState('');
    const [workhig,setworkhig]=useState('');
    const [workhi,setworkhi]=useState('');
    const [worklow, setworklow] = useState('');
    const [worklo,setworklo]=useState('');
    const [workl,setworkl]=useState('');
    const [personal, setpersonal] = useState('');
    const [persona, setpersona] = useState('');
    const [person, setperson] = useState('');
    const [personlows, setpersonlows] = useState('');
    const [personlow, setpersonlow] = useState('');
    const [personlo, setpersonlo] = useState('');
    const [discovery, setdiscovery] = useState('');
    const [discover, setdiscover] = useState('');



    

    const handleCheckInClick = () => {
        setShowCheckIn(true);
        setShowViewResponse(false);
    };

    const handleViewResponseClick = () => {
        setShowCheckIn(false);
        setShowViewResponse(true);
        ViewResponse();
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
                "email": global.email,
            }

            const response = await axios.post(apiresponse, ViewData, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(ViewData),
            });
            // console.log("happy", response.data.rowData[0].checkin[0]);
            setCheckData(response.data);

            if (response.status === 200) {

                // const responseData = response.data.rowData.find(
                //     (item) => item.checkin[0].title === stages[currentStage]
                // );
                // setResponses(responseData.checkin[0].content);
       console.log("apparesponse",CheckData.rowData[0].checkin[0].content[0].response);

                // console.log('View Response:', response.data.rowData.checkin.content.question);

                // console.log('View Response:', response.data.rowData[0].checkin[0].content);

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

    const apicheckin = 'https://walrus-app-v5mk9.ondigitalocean.app/checkin';


    const checkin = async () => {
        try {
            const checkinData = {
                "checkin": [
                    {
                      "title": "Work - Highs",
                      "content": [
                        {
                          "question": "Situation: What are the most important things that happened?",
                          "response": workhigh
                        },
                        {
                          "question": "Impact: What impact did it have on you?",
                          "response": workhig
                        },
                        {
                          "question": "Feelings: Any feelings associated with this (3 feelings)?",
                          "response": workhi
                        }
                      ]
                    },
                    {
                      "title": "Work - Lows",
                      "content": [
                        {
                          "question": "Situation: What are the most important things that happened?",
                          "response": worklow
                        },
                        {
                          "question": "Impact: What impact did it have on you?",
                          "response": worklo
                        },
                        {
                          "question": "Feelings: Any feelings associated with this (3 feelings)?",
                          "response": workl
                        }
                      ]
                    },
                    {
                      "title": "Personal - Highs",
                      "content": [
                        {
                          "question": "Situation: What are the most important things that happened?",
                          "response": personal
                        },
                        {
                          "question": "Impact: What impact did it have on you?",
                          "response": persona
                        },
                        {
                          "question": "Feelings: Any feelings associated with this (3 feelings)?",
                          "response":person
                        }
                      ]
                    },
                    {
                      "title": "Personal - Lows",
                      "content": [
                        {
                          "question": "Situation: What are the most important things that happened?",
                          "response": personlows
                        },
                        {
                          "question": "Impact: What impact did it have on you?",
                          "response":personlow
                        },
                        {
                          "question": "Feelings: Any feelings associated with this (3 feelings)?",
                          "response": personlo
                        }
                      ]
                    },
                    {
                      "title": "Discoveries & Presentations",
                      "content": [
                        {
                          "question": "Any interesting article, book, new technology or something interesting the group might benefit from?",
                          "response": discovery
                        },
                        {
                          "question": "Select one topic that you would like to present to the group and would like their input on",
                          "response": discover
                        }
                      ]
                    }
                  ],
                  "email": global.gmail,
                  "month": 9,
                  "year": 2023
                }

            console.log("appa",checkinData);
            const response = await axios.post(apicheckin, checkinData, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(checkinData),
            });

            if (response.status === 200) {
                console.log('checkin created:', response.data);
                
                 setworkhigh('');setworkhig('');setworkhi('');
                 setworklow('');setworklo('');setworkl('');
                 setpersonal(''); setpersona(''); setperson('');
                 setpersonlows('');setpersonlow('');setpersonlo('');
                 setdiscovery('');setdiscover('');


            } else {
                console.error('Failed to create check:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error creating checkin:', error);
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
            {/* {showCheckIn && (

                <View style={STYLES.cardcheck}>
                    <Text style={{ color: 'black', fontSize: 22 }}>{stages[currentStage]}</Text>
                    {currentStage === 4 ? ( // Check if it's the "Discoveries" stage
                        questions.discoveries.map((question, index) => (
                            <View key={index}>
                                <Text style={{ color: 'grey', marginTop: 30 }}>{question}</Text>
                                <TextInput style={STYLES.textcheck} />
                            </View>
                        ))
                    ) : (
                        questions.common.map((question, index) => (
                            <View key={index}>
                                <Text style={{ color: 'grey', marginTop: 30 }}>{question}</Text>
                                <TextInput style={STYLES.textcheck} />
                            </View>
                        ))
                    )}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        {currentStage > 0 && (
                            <TouchableOpacity onPress={handleBackClick}>
                                <Text>Back</Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity onPress={handleNextClick}>
                            <Text>{currentStage === 4 ? 'Check-In' : 'Next'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            )} */}
            {/* try new  */}
            
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
                        {/* {stages.map((stage, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => setCurrentStage(index)}
                            >
                                <Text style={{ color: currentStage === index ? 'blue' : 'black', marginLeft: 10 }}>
                                    {stage}
                                </Text>
                            </TouchableOpacity>
                        ))} */}
                    </View>

                    <ScrollView style={STYLES.cardcheck}>
             {/* <ScrollView> */}
                        <View>
                            <Text style={{ color: 'black', fontSize: 22 }}>Work Highs</Text>
                            <Text style={{ color: 'grey', marginTop: 30 }}>Situation: What are the most important things that happened? *</Text>
                            <TextInput style={STYLES.textcheck} 
                            onChangeText={(text) => setworkhigh(text)}
                            value={workhigh} />

                            <Text style={{ color: 'grey' }}>Impact: What impact did it have on you? *</Text>
                            <TextInput style={STYLES.textcheck} 
                             onChangeText={(text) => setworkhig(text)}
                            value={workhig} />
                            
                            <Text style={{ color: 'grey' }}>Feelings: Any feelings associated with this (3 feelings)? *</Text>
                            <TextInput style={STYLES.textcheck}
                             onChangeText={(text) => setworkhi(text)}
                             value={workhi} />
                            
                        </View>
                        <View>
                            <Text style={{ color: 'black', fontSize: 22 }}>Work Lows</Text>
                            <Text style={{ color: 'grey', marginTop: 30 }}>Situation: What are the most important things that happened? *</Text>
                            <TextInput style={STYLES.textcheck}
                             onChangeText={(text) => setworklow(text)}
                             value={worklow} />
                            <Text style={{ color: 'grey' }}>Impact: What impact did it have on you? *</Text>
                            <TextInput style={STYLES.textcheck} 
                             onChangeText={(text) => setworklo(text)}
                            value={worklo} />
                            <Text style={{ color: 'grey' }}>Feelings: Any feelings associated with this (3 feelings)? *</Text>
                            <TextInput style={STYLES.textcheck} 
                             onChangeText={(text) => setworkl(text)}
                            value={workl} />
                        </View>
                        <View>
                            <Text style={{ color: 'black', fontSize: 22 }}>Personal Highs</Text>
                            <Text style={{ color: 'grey', marginTop: 30 }}>Situation: What are the most important things that happened? *</Text>
                            <TextInput style={STYLES.textcheck}  
                            onChangeText={(text) => setpersonal(text)}
                            value={personal} />

                            <Text style={{ color: 'grey' }}>Impact: What impact did it have on you? *</Text>
                           
                            <TextInput style={STYLES.textcheck} 
                             onChangeText={(text) => setpersona(text)}
                            value={persona} />

                            <Text style={{ color: 'grey' }}>Feelings: Any feelings associated with this (3 feelings)? *</Text>
                           
                            <TextInput style={STYLES.textcheck} 
                             onChangeText={(text) => setperson(text)}
                            value={person} />

                        </View>
                        <View>
                            <Text style={{ color: 'black', fontSize: 22 }}>Personal Lows</Text>
                            <Text style={{ color: 'grey', marginTop: 30 }}>Situation: What are the most important things that happened? *</Text>
                            
                            <TextInput style={STYLES.textcheck}  
                            onChangeText={(text) => setpersonlows(text)}
                            value={personlows} />

                            <Text style={{ color: 'grey' }}>Impact: What impact did it have on you? *</Text>
                            <TextInput style={STYLES.textcheck}  
                            onChangeText={(text) => setpersonlow(text)}
                            value={personlow} />

                            <Text style={{ color: 'grey' }}>Feelings: Any feelings associated with this (3 feelings)? *</Text>
                            <TextInput style={STYLES.textcheck} 
                            onChangeText={(text) => setpersonlo(text)}
                            value={personlo} />

                        </View>
                       
                        <View>
                            <Text style={{ color: 'black', fontSize: 22 }}>Discoveries&Presentations</Text>
                            {/* <TextInput style={STYLES.textcheck} /> */}
                            <Text style={{ color: 'grey' }}> 'Any interesting article, book, new technology or something interesting the group might benefit from?*'</Text>
                            <TextInput style={STYLES.textcheck} 
                            onChangeText={(text) => setdiscovery(text)}
                            value={discovery} />

                            <Text style={{ color: 'grey' }}>Select one topic that you would like to present to the group and would like their input on? *</Text>
                            <TextInput style={STYLES.textcheck} 
                            onChangeText={(text) => setdiscover(text)}
                            value={discover} />

                        </View>
                        <TouchableOpacity>
                    <Text style={{ color: 'blue', marginLeft: 160,marginTop:15 }} onPress={checkin}>CheckIN</Text> 
                    </TouchableOpacity>
                    </ScrollView>
       {/* </ScrollView> */}
                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TouchableOpacity onPress={handleBackClick}>
                            <Text>Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleNextClick}>
                            <Text>Next</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={{ color: 'blue', marginLeft: 170 }}>CheckIN</Text> */}

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
                                <Text style={{ marginTop: 20, position: 'absolute', marginLeft: 200 }}>{CheckData.rowData[0].checkin[0].content[0].response}</Text>
                                <Text style={{ color: 'grey', marginTop: 10, width: 150, marginLeft: 17 }}>Impact: What impact did it have on you? *</Text>
                                <Text style={{ marginTop: 80, position: 'absolute', marginLeft: 200 }}>{CheckData.rowData[0].checkin[0].content[1].response}</Text>
                                <Text style={{ color: 'grey', marginTop: 10, width: 150, marginLeft: 17 }}>Feelings: Any feelings associated with this (3 feelings)? *</Text>
                                <Text style={{ marginTop: 130, position: 'absolute', marginLeft: 200 }}>{CheckData.rowData[0].checkin[0].content[2].response}</Text>
                            </View>
                               
                            <Text style={{ color: 'black', marginLeft: 10, marginTop: 10 }}>Work Lows</Text>
                            <View >
                                <Text style={{ color: 'grey', marginTop: 10, width: 150, marginLeft: 17 }}>Situation: What are the most important things that happened? *</Text>
                                <Text style={{ marginTop: 20,position:'absolute',marginLeft: 200}}>{CheckData.rowData[0].checkin[1].content[0].response}</Text>
                                <Text style={{ color: 'grey', marginTop: 10, width: 150, marginLeft: 17 }}>Impact: What impact did it have on you? *</Text>
                                <Text style={{ marginTop: 20,position:'absolute',marginLeft: 200}}>{CheckData.rowData[0].checkin[1].content[1].response}</Text>
                                <Text style={{ color: 'grey', marginTop: 10, width: 150, marginLeft: 17 }}>Feelings: Any feelings associated with this (3 feelings)? *</Text>
                                <Text style={{ marginTop: 20,position:'absolute',marginLeft: 200}}>{CheckData.rowData[0].checkin[1].content[2].response}</Text>
                            </View>
                            <Text style={{ color: 'black', marginLeft: 10, marginTop: 10 }}>Personal Highs</Text>
                            <View >
                                <Text style={{ color: 'grey', marginTop: 10, width: 150, marginLeft: 17 }}>Situation: What are the most important things that happened? *</Text>
                                <Text style={{ marginTop: 20,position:'absolute',marginLeft: 200}}>{CheckData.rowData[0].checkin[2].content[0].response}</Text>
                                <Text style={{ color: 'grey', marginTop: 10, width: 150, marginLeft: 17 }}>Impact: What impact did it have on you? *</Text>
                                <Text style={{ marginTop: 20,position:'absolute',marginLeft: 200}}>{CheckData.rowData[0].checkin[2].content[1].response}</Text>
                                <Text style={{ color: 'grey', marginTop: 10, width: 150, marginLeft: 17 }}>Feelings: Any feelings associated with this (3 feelings)? *</Text>
                                <Text style={{ marginTop: 20,position:'absolute',marginLeft: 200}}>{CheckData.rowData[0].checkin[2].content[2].response}</Text>
                            </View>
                            <Text style={{ color: 'black', marginLeft: 10, marginTop: 10 }}>Personal Lows</Text>
                            <View >
                                <Text style={{ color: 'grey', marginTop: 10, width: 150, marginLeft: 17 }}>Situation: What are the most important things that happened? *</Text>
                                <Text style={{ marginTop: 20,position:'absolute',marginLeft: 200}}>{CheckData.rowData[0].checkin[3].content[0].response}</Text>
                                <Text style={{ color: 'grey', marginTop: 10, width: 150, marginLeft: 17 }}>Impact: What impact did it have on you? *</Text>
                                <Text style={{ marginTop: 20,position:'absolute',marginLeft: 200}}>{CheckData.rowData[0].checkin[3].content[1].response}</Text>
                                <Text style={{ color: 'grey', marginTop: 10, width: 150, marginLeft: 17 }}>Feelings: Any feelings associated with this (3 feelings)? *</Text>
                                <Text style={{ marginTop: 20,position:'absolute',marginLeft: 200}}>{CheckData.rowData[0].checkin[3].content[2].response}</Text>
                            </View>
                            <Text style={{ color: 'black', marginLeft: 10, marginTop: 10 }}>Discoveries & Presentations</Text>
                            <View >
                                <Text style={{ color: 'grey', marginTop: 10, width: 150, marginLeft: 17 }}> Any interesting article, book, new technology or something interesting the group might benefit from?*</Text>
                                <Text style={{ marginTop: 20,position:'absolute',marginLeft: 200}}>{CheckData.rowData[0].checkin[4].content[0].response}</Text>
                                <Text style={{ color: 'grey', marginTop: 10, width: 150, marginLeft: 17 }}>Select one topic that you would like to present to the group and would like their input on? *</Text>
                                <Text style={{ marginTop: 20,position:'absolute',marginLeft: 200}}>{CheckData.rowData[0].checkin[4].content[1].response}</Text>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            )}
        </View>
    );
};

export default Checkin; 