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

import COLORS from '../consts/color';
import STYLES from '../styles';

import { SliderBox } from 'react-native-image-slider-box';
import webs from '../assets/images/images.jpeg';
import webs1 from '../assets/images/images1.jpg';
import webs2 from '../assets/images/image2.jpg';
import webs3 from '../assets/images/image3.jpg';
import webs4 from '../assets/images/image4.jpg';
import { DrawerActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
// import PopupEvent from "./src/screens/PopupEvent";
import DocumentPicker from 'react-native-document-picker';
import { Platform } from 'react-native';
import { useRoute } from '@react-navigation/native';


const HomeScreen = () => {
    const route = useRoute();
    const userEmail = route.params?.userEmail;
    console.log("homeeeeeeee", userEmail)
    //event images
    const images = [webs, webs2, webs1, webs2, webs3, webs4]
    // history of evnt icons
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const openEventModal = (event) => {
        setSelectedEvent(event);
        setShowModal(true);
    };

    const closeEventModal = () => {
        setSelectedEvent(null);
        setShowModal(false);
    };

    const [userData, setUserData] = useState({});
    const [eventData, setEventData] = useState([]);
    const [commentData, setCommentData] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [selectedAttachment, setSelectedAttachment] = useState(null);

    const pickAttachment = async () => {
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });

            if (Platform.OS === 'android') {

                const realPath = await DocumentPicker.resolvePath({
                    uri: result.uri,
                    fileType: '*/*',
                });
                setSelectedAttachment(realPath);
            } else {
                setSelectedAttachment(result.uri);
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {

            } else {
                throw err;
            }
        }
    };


    const fetchData = async () => {
        try {
            // let api = 'https://walrus-app-v5mk9.ondigitalocean.app/getUserInfo?email=' + global.email;
            // console.log("api", api)
            // Fetch user data
            const userResponse = await fetch('https://walrus-app-v5mk9.ondigitalocean.app/getUserInfo?email=' + global.email, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            const userDataResult = await userResponse.json();
            // console.log("user info", userDataResult);
            setUserData(userDataResult);
            // const groupData = userData.userInfo.groups;
            // console.log("group", groupData);

            if (userDataResult.userInfo) {
                const groupIds = userDataResult.userInfo.groups;
                const eventRequestBody = {
                    groupIds: groupIds
                };
                // Fetch event data
                const eventResponse = await fetch('https://walrus-app-v5mk9.ondigitalocean.app/getEvents', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(eventRequestBody)
                });
                const eventResult = await eventResponse.json();
                console.log("events", eventResult);
                setEventData(eventResult);
                //
                if (eventResult.events) {
                    const allComments = [];

                    for (const event of eventResult.events) {
                        const eventId = event.id;
                        const commentBody = {
                            eventId: eventId
                        };
                        // Fetch comments for each event
                        const commentResponse = await fetch('https://walrus-app-v5mk9.ondigitalocean.app/getComments', {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(commentBody)
                        });
                        const commentResult = await commentResponse.json();

                        console.log("value1234", commentResult);

                        allComments.push(...commentResult.comments);
                        setCommentData(allComments);
                    }
                    // Set all comments in state
                }
                console.log("length 1", eventResult?.events?.length)


            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }

    };

    useEffect(() => {
        fetchData();
    }, []);
    const postComment = async () => {
        if (!commentText) {
            // Handle empty comment text
            return;
        }

        try {
            const formData = new FormData();
            formData.append('eventId', selectedEvent.id);
            formData.append('comment', commentText);

            if (selectedAttachment) {

                formData.append('attachment', {
                    uri: selectedAttachment,
                    name: 'attachment.ext',
                    type: 'application/octet-stream',
                });
            }

            const response = await fetch('https://walrus-app-v5mk9.ondigitalocean.app/postComment', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {

                setCommentText('');
                // Fetch the updated comments for the event if needed
                fetchComments(selectedEvent.id);
            } else {
                // Handle error, e.g., show an error message to the user
                console.error('Failed to post comment. Server returned:', response.status, response.statusText);

            }
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };
    // console.log('commentBody:', commentBody);
    console.log('comment:', commentText);

    const navigation = useNavigation();
    const openDrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    };
    const [showComments, setShowComments] = useState(true);
    // console.log('eventData:::::::::::::::::', eventData)
    // console.log("members", eventData.events[0].members)
    const eventsarray = eventData.events;
    // console.log("commented`````````````````````", commentData)

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <ScrollView>

                <Image style={{ width: 70, height: 17, marginTop: 20, marginLeft: 10 }} source={require('../assets/venzo.png')} />
                {/* <View onPress={() => navigation.navigate('UserScreen')}> */}
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('User')}>

                        <Image style={{ width: 50, marginLeft: 290, marginTop: -20, marginRight: -90, height: 50, }} source={require('../assets/person.png')} />
                    </TouchableOpacity>
                </View>
                <View >
                    <TouchableOpacity onPress={openDrawer}>

                        <Image source={require('../assets/menuicon.png')} style={{ width: 25, height: 25, marginTop: 35, marginLeft: 20 }} />

                    </TouchableOpacity>
                </View>


                <View style={STYLES.searchhome}>
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
                        autoplay={true}
                        autoplayInterval={3000}
                        // circleLoop={true}
                        onCurrentImagePressed={(index) => Alert(index + 1)}
                        firstItem={4}
                        paginationBoxVerticalPadding={20}
                        style={{ width: 360, height: 200, borderRadius: 25, marginLeft: 19, marginTop: 20 }}
                    />
                </View>
                {/* <Text style={{ marginTop: 17, marginLeft: 15, fontSize: 17 }}>History of Events</Text> */}
                <View style={STYLES.card}>
                    <Text style={{ marginTop: 10, marginLeft: 15, fontSize: 17, color: 'black' }}>History of Events</Text>

                    <FlatList
                        data={eventData.events}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                            <View >
                                <TouchableOpacity onPress={() => openEventModal(item)}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, marginTop: 10 }}>
                                        <Image style={{ width: 23, height: 23, marginRight: 10 }} source={require('../assets/video.png')} />
                                        <Text style={{ fontSize: 16, color: 'black' }}>{item.label}</Text>
                                    </View>
                                </TouchableOpacity>


                                <Text style={{ marginLeft: 49, fontSize: 12 }}>{item.date}| {item.startHour}-{item.endHour}</Text>

                                <TouchableOpacity onPress={() => setShowComments(!showComments)}>
                                    <Text style={{ marginLeft: 250, marginTop: -20, fontSize: 12, color: 'blue' }}>{showComments ? 'Hide Comments' : 'View Comments'}</Text>
                                </TouchableOpacity>

                                {showComments && (
                                    <View>
                                        <Text style={{ fontSize: 14, marginTop: 10, marginLeft: 48, color: 'black' }}>Comments</Text>
                                        {commentData.map((comment, index) => (
                                            <View key={comment.id}>
                                                <Text style={{ marginLeft: 58, color: 'black' }}>{comment.name}</Text>
                                                <Text style={{ marginLeft: 68 }}>{comment.comment}</Text>
                                                {comment.attachmentName && (
                                                    <View>
                                                        <Image
                                                            style={{ width: 30, height: 30, marginLeft: 170, marginTop: -30 }} // You can adjust the image dimensions
                                                            source={{ uri: comment.attachmentUrl }}
                                                        />

                                                    </View>
                                                )}
                                            </View>
                                        ))}
                                    </View>
                                )}
                            </View>

                        )}
                        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                    />




                </View>



            </ScrollView >

            <Modal visible={showModal} animationType="slide" >

                {selectedEvent && (
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity onPress={closeEventModal} style={{ marginLeft: 330, marginTop: 10 }}>
                            <Text style={{ color: 'red', marginTop: 10 }}>Close</Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 23, color: 'black', marginTop: 17, marginLeft: 50 }}>{selectedEvent.label}</Text>
                        <Image style={{ width: 23, height: 23, marginLeft: 10, marginTop: -25 }} source={require('../assets/video.png')} />
                        <Text style={{ marginLeft: 12, marginTop: 17 }}>{selectedEvent.type}|{selectedEvent.date}|{selectedEvent.startHour}-{selectedEvent.endHour}</Text>
                        <Text style={{ marginLeft: 12, marginTop: 10 }}>{selectedEvent.format}|{selectedEvent.groupName}</Text>
                        <Text style={{ fontSize: 15, color: 'black', marginLeft: 12, marginTop: 19 }}>Agenda/Description</Text>
                        <Text style={{ marginLeft: 12, marginTop: 10 }}>{selectedEvent.description}</Text>
                        <Text style={{ fontSize: 15, color: 'black', marginLeft: 12, marginTop: 19 }}>Attendees</Text>

                        {/* <Text>{[selectedEvent].length}</Text> */}
                        <FlatList
                            data={[selectedEvent]}
                            renderItem={({ item }) => {
                                let Set1 = [];

                                if (item?.members) {
                                    Set1 = item.members.map((set1, index1) => {
                                        return (
                                            <View >
                                                <Text style={{ fontSize: 15, marginLeft: 26, marginTop: 10 }}>{set1?.name}</Text>
                                            </View>
                                        )
                                    })
                                }

                                let Set2 = [];

                                if (item?.attendance) {
                                    Set2 = item.attendance.map((set1, index1) => {
                                        return (
                                            <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 10 }}>
                                                <Text style={{ color: 'green' }}>{set1.mode || set1.status}</Text>
                                                {/* <Text> | </Text> */}
                                                <Text style={{ color: 'blue' }}>  {set1.punctualityMark}</Text>
                                            </View>
                                        )
                                    })
                                }


                                return (
                                    <View style={{ flexDirection: "row", width: '100%' }}>
                                        <View style={{ width: '50%', }}>
                                            {Set1}
                                        </View>

                                        <View style={{ width: '50%' }}>
                                            {Set2}
                                        </View>
                                    </View>
                                )
                            }
                            }
                        />
                        {/* <FlatList
                data={[...selectedEvent.members, ...selectedEvent.attendance]}
                // keyExtractor={(item) => item.id.toString()}
                // numColumns={1}
                // horizontal={false}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row' }}>

                        <Text style={{ fontSize: 15, marginLeft: 26, marginTop: 10 }}>{item.name}</Text>


                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: 'green' }}>{item.mode} </Text>
                            <Text style={{ color: 'blue' }}>{item.punctualityMark}</Text>
                        </View>

                    </View>

                )}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            /> */}
                        {/* <FlatList
                data={selectedEvent.attendance.map((atten) => atten)}
                // keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', marginLeft: 220 }}>
                        <Text style={{ color: 'green' }}>{item.mode} |</Text><Text style={{ color: 'blue' }} > {item.punctualityMark}</Text>

                    </View>

                )}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
            /> */}



                        <Text style={{ fontSize: 15, color: 'black', marginLeft: 12, marginBottom: 50 }}>Comments</Text>
                        <View style={{ marginTop: 200 }}>
                            <View style={STYLES.cardcomment}>
                                <ScrollView>
                                    {commentData.map((comment, index) => (
                                        <View key={comment.id}>
                                            <Text style={{ marginLeft: 28, color: 'black' }}>{comment.name}</Text>
                                            <Text style={{ marginLeft: 48 }}>{comment.comment}</Text>

                                            {comment.attachmentName && (
                                                <View>
                                                    <Image
                                                        style={{ width: 30, height: 30, marginLeft: 170, marginTop: -30 }} // You can adjust the image dimensions
                                                        source={{ uri: comment.attachmentUrl }}
                                                    />

                                                </View>
                                            )}
                                        </View>
                                    ))}
                                </ScrollView>
                            </View>
                            <TextInput
                                placeholder="Enter your comment"
                                style={STYLES.postinput}
                                value={commentText}
                                onChangeText={(text) => setCommentText(text)} />
                            {/* <TouchableOpacity onPress={pickAttachment}> */}
                            <Image style={{ width: 23, position: 'absolute', height: 27, marginLeft: 320, marginTop: 10 }} source={require('../assets/attachment.png')} />
                            {/* </TouchableOpacity> */}
                            <TouchableOpacity>
                                <Text onPress={postComment} style={{ marginTop: -90, fontSize: 17, color: 'blue', marginLeft: 360 }}>post</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                )}
            </Modal>
        </SafeAreaView >

    )
}

export default HomeScreen;
