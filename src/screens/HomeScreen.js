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
    const email = global.email;
    const name = global.name;

    console.log("name", name);
    const userEmail = route.params?.userEmail;

    const images = [webs, webs2, webs1, webs2, webs3, webs4]
    const [selectedEventId, setSelectedEventId] = useState(null);

    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const openEventModal = (event, comments) => {
        fetchData(event.id);
        setSelectedEvent(event);
        setEventComments(comments);
        setSelectedEventId(event.id);

        setShowModal(true);
    };

    const closeEventModal = () => {
        setSelectedEvent(null);

        setShowModal(false);
    };

    const [userData, setUserData] = useState({});
    // const [urishow, setUri] = useState('');
    const [eventData, setEventData] = useState([]);
    const [commentData, setCommentData] = useState([]);
    const [commentText, setCommentText] = useState({
        text: '',
        imageUri: null,
    });
    const [selectedAttachment, setSelectedAttachment] = useState(null);
    const [showComments, setShowComments] = useState(true);
    const [eventComments, setEventComments] = useState({});


    const pickAttachment = async () => {
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });
            console.log('result : ' + JSON.stringify(result));
            console.log("result doc:" + result[0].uri);
            if (!result) {
                console.error("DocumentPicker result is undefined.");
                return;
            }

            const uri = result[0].uri;
            const attachmentName = result[0].name;
            // setUri(uri);
            console.log("URI: ", uri);
            console.log("attachment name", attachmentName);

            // Set the selected attachment's URI in the commentText state
            setCommentText((prevCommentText) => ({
                ...prevCommentText,
                imageUri: uri,
            }));
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // Handle cancelation
                console.error("Error picking cancel:", err);
            }
            else {
                console.error("Error picking attachment:", err);
                throw err;
            }
        }
    };

    const postComment = async () => {
        console.log("post:", commentText);
        if (!commentText.text) {
            console.log("post if:", commentText);
            return;
        }
        console.log("post ifelse:", commentText);
        try {

            console.log("post try:", commentText);

            const currentTime = new Date().toISOString();
            let postData = {
                "eventId": selectedEvent.id,
                "comment": {
                    "comment": commentText.text,
                    "time": currentTime,
                    "email": email,
                    "name": name,
                    "attachmentName": "attachmentName",
                    "attachmentUrl": commentText.imageUri
                }
            }
            // console.log("+++++++=", formDataJSON);
            const response = await fetch('https://walrus-app-v5mk9.ondigitalocean.app/postComments', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                // body: JSON.stringify(formData),
                // body: data
                // body: formDataJSON,
                body: JSON.stringify(postData),

            });
            // console.log("post huhuhutry:", formData);
            if (response.ok) {
                const responseData = await response.json();
                console.log("responseeee", responseData)
                setCommentText({ text: '', imageUri: null });
                fetchComments(selectedEvent.id);
            } else {
                console.error('Failed to post comment. Server returned:', response.status, response.statusText);
            }

        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };


    const fetchData = async (eventId) => {
        try {

            const userResponse = await fetch('https://walrus-app-v5mk9.ondigitalocean.app/getUserInfo?email=' + global.email, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            const userDataResult = await userResponse.json();

            setUserData(userDataResult);
            const name = userDataResult.userInfo.name;
            global.name = name;
            // const groupData = userData.userInfo.groups;
            // console.log("group", groupData);

            if (userDataResult.userInfo) {
                const groupIds = userDataResult.userInfo.groups;
                const eventRequestBody = {
                    groupIds: groupIds
                };
                // Fetch event data
                console.log("ggggggggggg", groupIds);
                const eventResponse = await fetch('https://walrus-app-v5mk9.ondigitalocean.app/getEvents', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(eventRequestBody)
                });
                const eventResult = await eventResponse.json();
                console.log("events", eventResult);
                setEventData(eventResult);


                if (eventResult.events) {
                    const allComments = [];


                    for (const event of eventResult.events) {
                        const eventId = event.id;
                        console.log("Event ID:", eventId);

                        // // Fetch comments for the current event
                        // const commentRequestBody = {
                        //     eventId: eventId
                        // };
                        const commentRequestBody = {
                            eventId: eventId
                        };
                        const commentResponse = await fetch('https://walrus-app-v5mk9.ondigitalocean.app/getComments', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(commentRequestBody)
                        });
                        const commentResult = await commentResponse.json();
                        // console.log("Comments for Event ID:", eventId, commentResult);
                        // allComments.push(commentResult);
                        // console.log("++++++++", allComments);

                        // setCommentData(allComments);
                        setEventComments((prevComments) => ({
                            ...prevComments,
                            [eventId]: commentResult.comments,
                        }));
                    }
                    // console.log("length 1", eventResult?.events?.length);
                }
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);



    // console.log('comment:', commentText);

    const navigation = useNavigation();


    const openDrawer = () => {
        navigation.dispatch(DrawerActions.openDrawer());
    };



    const eventsarray = eventData.events;


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
                                <TouchableOpacity onPress={() => openEventModal(item, eventComments[item.id])}>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, marginTop: 10 }}>
                                        <Image style={{ width: 23, height: 23, marginRight: 10 }} source={require('../assets/video.png')} />
                                        <Text style={{ fontSize: 16, color: 'black' }}>{item.label}</Text>
                                    </View>
                                </TouchableOpacity>


                                <Text style={{ marginLeft: 49, fontSize: 12 }}>{item.date}| {item.startHour}-{item.endHour}</Text>

                                <TouchableOpacity onPress={() => setSelectedEventId(selectedEventId === item.id ? null : item.id)}>
                                    <Text style={{ marginLeft: 250, marginTop: -20, fontSize: 12, color: 'blue' }}>{selectedEventId === item.id ? 'Hide Comments' : 'View Comments'}</Text>
                                </TouchableOpacity>

                                {selectedEventId === item.id && (
                                    <View>
                                        <Text style={{ fontSize: 14, marginTop: 10, marginLeft: 48, color: 'black' }}>Comments</Text>
                                        {/* {commentData.map((comment, index) => ( */}
                                        {eventComments[item.id]?.map((comment, index) => (
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
                        <Text style={{ fontSize: 15, color: 'black', marginLeft: 12, marginBottom: 180 }}>Comments</Text>
                        <View style={{ marginTop: 200 }}>
                            <View style={STYLES.cardcomment}>
                                <ScrollView>
                                    {selectedEvent && eventComments[selectedEvent.id] ? (

                                        eventComments[selectedEvent.id].map((comment, index) => (
                                            <View key={comment.id}>
                                                <Text style={{ marginLeft: 28, color: 'black' }}>{comment.name}</Text>
                                                <Text style={{ marginLeft: 48 }}>{comment.comment}</Text>
                                                {comment.attachmentName && (
                                                    <View>
                                                        <Image
                                                            style={{ width: 34, height: 30, marginLeft: 170, marginTop: -30 }}
                                                            source={{ uri: comment.attachmentUrl }}
                                                        />
                                                    </View>
                                                )}
                                            </View>
                                        ))
                                    ) : (
                                        <Text>No comments available.</Text>
                                    )}
                                </ScrollView>
                            </View>
                            {/* {urishow !== '' && (
                                <Image
                                    style={{ width: 100, height: 100, marginTop: 10 }}
                                    source={{ uri: urishow }}
                                />
                            )} */}
                            <TouchableOpacity>
                                <Text onPress={postComment} style={{ fontSize: 17, color: 'blue', marginLeft: 330, marginBottom: 35 }}>Post</Text>
                            </TouchableOpacity>
                            <View>
                                {/* <TouchableOpacity> */}

                                {/* </TouchableOpacity> */}
                                <TextInput
                                    placeholder="Enter your comment"
                                    style={STYLES.postinput}
                                    value={commentText.text}
                                    onChangeText={(text) => setCommentText({ ...commentData, text })} />

                                <TouchableOpacity onPress={pickAttachment}>
                                    <Image style={{ width: 23, height: 27, marginLeft: 300, marginTop: -40 }} source={require('../assets/attachment.png')} />
                                </TouchableOpacity>

                            </View>

                            {/* {/* <View >
                                <TextInput
                                    placeholder="Enter your comment"
                                    style={STYLES.postinput}
                                    value={commentText}
                                    onChangeText={(text) => setCommentText(text)} /> */}
                            {/* <TouchableOpacity onPress={pickAttachment}> */}
                            {/* <Image style={{ width: 23, height: 27, marginLeft: 20, marginTop: -50 }} source={require('../assets/attachment.png')} />
                                {/* </TouchableOpacity> */}
                            {/* <TouchableOpacity>
                                    <Text onPress={postComment} style={{ marginTop: -20, fontSize: 17, color: 'blue', marginLeft: 370 }}>post</Text>
                                </TouchableOpacity>
                            </View> */}
                        </View>

                    </View>
                )}
            </Modal>
        </SafeAreaView >

    )
}

export default HomeScreen;
