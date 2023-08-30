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
} from 'react-native';
import { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../consts/color';
import STYLES from '../styles';
import { Navigation } from 'react-native-navigation';
import { SliderBox } from 'react-native-image-slider-box';
import webs from '../assets/images/images.jpeg';
import webs1 from '../assets/images/images1.jpg';
import webs2 from '../assets/images/image2.jpg';
import webs3 from '../assets/images/image3.jpg';
import webs4 from '../assets/images/image4.jpg';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {
    const images = [webs, webs2, webs1, webs2, webs3, webs4]
    const [data, setData] = useState([]);
    const Mydata = async () => {
        const url = 'https://walrus-app-v5mk9.ondigitalocean.app/getUserInfo?email=vasanthravisankar91@gmail.com';
        let result = await fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        })
        result = await result.json();

        console.log("events", result)
        const groupsArray = result.userInfo.groups;
        console.log('Groups Array:', groupsArray);
        setData(result);
    };

    useEffect(() => {
        Mydata();
    }, []);
    // console.log('data Array:', data);
    // const groupIds = data.userInfo.groups;
    //  const [data, setData] = useState([]);
    // const MyEvent = async () => {
    //     // const [data, setData] = useState([]);
    //     const requestBody = {
    //         groupIds: ['PjIK87LDBDc5quWz76Ct']
    //     };
    //     const url = 'https://walrus-app-v5mk9.ondigitalocean.app/getEvents';
    //     let result = await fetch(url, {
    //         method: 'POST',
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'multipart/form-data'
    //         },
    //         body: JSON.stringify(requestBody)
    //     })
    //     result = await result.json();
    //     console.log("events", result)
    //     // const groupsArray = result.userInfo.groups;
    //     // console.log('Groups Array:', groupsArray);
    //     // setData(result);
    // };

    // useEffect(() => {
    //     MyEvent();
    // }, []);



    const navigation = useNavigation();
    const openDrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    };
    const [showComments, setShowComments] = useState(true);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <ScrollView>

                <Image style={{ width: 70, height: 17, marginTop: 20, marginLeft: 10 }} source={require('../assets/venzo.png')} />
                {/* <View onPress={() => navigation.navigate('UserScreen')}> */}
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('User')}>

                        <Image style={{ width: 50, marginLeft: 300, marginBottom: 2, marginRight: 20, height: 50, }} source={require('../assets/person.png')} />
                    </TouchableOpacity>
                </View>
                <View >
                    <TouchableOpacity onPress={openDrawer}>

                        <Image source={require('../assets/menuicon.png')} style={{ width: 25, height: 25, marginTop: 35, marginLeft: 20 }} />
                        {/* <Icon
                            name="md-menu"
                            size={30}
                            style={{ marginTop: 45 }} /> */}
                        {/* onPress={() => setState(true)} /> */}
                    </TouchableOpacity>
                </View>
                {/* <View>
                <TouchableOpacity>
                    {/* <Icon
                        name="person-outline"
                        color={COLORS.primary}
                        size={50}
                        style={{ marginLeft: 50 }}
                    // onPress={() => navigation.navigate('UserScreen')}
                    /> */}
                {/* <Image source={require('../assets/person.png')} style={{ width: 30, height: 35, marginLeft: 260, marginTop: -10, }} />
                </TouchableOpacity>
            </View> */}

                <View style={STYLES.search}>
                    {/* <Icon name="search" size={28} /> */}
                    <TextInput
                        style={{ flex: 1, fontSize: 18 }} placeholder="Search" />
                </View>
                <View style={{ flexDirection: 'row', height: 70, backgroundColor: COLORS.light, borderRadius: 0, marginTop: 30 }}>
                    <View>
                        <TouchableOpacity>


                            <Image style={{ width: 35, height: 35, marginTop: 10, marginLeft: 45, marginBottom: 20 }} source={require('../assets/event.png')} />
                            <Text style={{ marginLeft: 43, marginTop: -20 }}>Events</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('Atten')}>
                            <Image style={{ width: 35, height: 35, marginTop: 10, marginLeft: 110 }} source={require('../assets/calendar.png')} />
                            <Text style={{ marginLeft: 89, marginTop: -3 }}>Attendance</Text>
                        </TouchableOpacity>
                    </View>
                    <View  >
                        <TouchableOpacity onPress={() => navigation.navigate('Group')}>
                            <Image style={{ width: 35, height: 35, marginTop: 10, marginBottom: 10, marginLeft: 90 }} source={require('../assets/group.png')} />
                            <Text style={{ marginLeft: 89, marginTop: -13 }}>Group</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View>
                    <Text style={{ marginTop: 17, marginLeft: 28, fontSize: 17, color: 'black' }}>Upcoming Events</Text>
                    <SliderBox
                        images={images}
                        dotColor="red"
                        inactiveDotColor="white"
                        dotstyle={{ height: 20, width: 20, borderRadius: 50 }}
                        imageLoadingColor="black"
                        // autoplay={true}
                        // autoplayInterval={1000}
                        // circleLoop={true}
                        // onCurrentImagePressed={(index) => Alert(index + 1)}
                        firstItem={4}
                        paginationBoxVerticalPadding={20}
                        style={{ width: 360, height: 200, borderRadius: 25, marginLeft: 17, marginTop: 20 }}
                    />
                </View>
                {/* <Text style={{ marginTop: 17, marginLeft: 15, fontSize: 17 }}>History of Events</Text> */}
                <View style={STYLES.card}>
                    <Text style={{ marginTop: 17, marginLeft: 15, fontSize: 17, color: 'black' }}>History of Events</Text>
                    <ScrollView style={{ textalign: 'center', marginTop: 10, marginLeft: 10 }}>
                        <View>

                            <Image style={{ width: 23, height: 23, marginTop: 10 }} source={require('../assets/video.png')} />
                            <Text style={{ marginTop: -24, marginLeft: 32, fontSize: 16, color: 'black' }}>Update email of Events</Text>

                            <Text style={{ marginLeft: 32, fontSize: 12 }}>09 jul 2023| 12:00 PM-01:00 PM</Text>
                            {/* <Text style={{ marginLeft: 250, marginTop: -20, fontSize: 12, color: 'blue' }}>View Comments</Text> */}
                            <TouchableOpacity onPress={() => setShowComments(!showComments)}>
                                <Text style={{ marginLeft: 250, marginTop: -20, fontSize: 12, color: 'blue' }}>{showComments ? 'Hide Comments' : 'View Comments'}</Text>
                            </TouchableOpacity>

                            {/* Comments */}
                            {showComments && (
                                <ScrollView>
                                    <Text style={{ fontSize: 14, marginTop: 10, marginLeft: 28, color: 'black' }}>Comments</Text>
                                    <View>
                                        <Text style={{ marginLeft: 34 }}>Ragavi</Text>
                                    </View>

                                    {/* More comments */}
                                </ScrollView>
                            )}

                        </View>
                        <View>

                            <Image style={{ width: 23, height: 23, marginTop: 10 }} source={require('../assets/videoeve1.png')} />
                            <Text style={{ marginTop: -24, marginLeft: 32, fontSize: 16, color: 'black' }}>Demo call</Text>
                            <Text style={{ marginLeft: 32, fontSize: 12 }}>09 jul 2023| 12:00 PM-01:00 PM</Text>
                            <Text style={{ marginLeft: 250, marginTop: -20, fontSize: 12, color: 'blue' }}>View Comments</Text>
                        </View>
                        <View>

                            <Image style={{ width: 23, height: 23, marginTop: 10 }} source={require('../assets/videoeve.png')} />
                            <Text style={{ marginTop: -24, marginLeft: 32, fontSize: 16, color: 'black' }}>Test event</Text>
                            <Text style={{ marginLeft: 32, fontSize: 12 }}>09 jul 2023| 12:00 PM-01:00 PM</Text>
                            <Text style={{ marginLeft: 250, marginTop: -20, fontSize: 12, color: 'blue' }}>View Comments</Text>
                        </View>


                    </ScrollView>
                </View>



            </ScrollView>
        </SafeAreaView >

    )
}

export default HomeScreen;
