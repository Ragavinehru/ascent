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
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/color';
import STYLES from '../styles';
import { Navigation } from 'react-native-navigation';
import { SliderBox } from 'react-native-image-slider-box';
import webs from '../assets/images/images.jpeg';
import webs1 from '../assets/images/images1.jpg';


const HomeScreen = ({ navigation }) => {
    const images = [webs, webs1]
    // require('./assets/images/images.jpeg'),
    // require('./assets/images/images1.jpg'),
    // require('./assets/images/images.jpeg'),

    // <Image source={require('./my-icon.png')} />

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>

            <Image style={{ width: 70, height: 17, marginTop: 20, marginLeft: 10 }} source={require('../assets/venzo.png')} />
            <View>
                <TouchableOpacity>
                    <Image source={require('../assets/menuicon.png')} style={{ width: 40, height: 40, marginTop: 60, marginLeft: 20 }} />
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
                <Icon name="search" size={28} />
                <TextInput
                    style={{ flex: 1, fontSize: 18 }} placeholder="Search" />
            </View>
            <View style={{ flexDirection: 'row', height: 70, backgroundColor: COLORS.light, borderRadius: 20, marginTop: 20 }}>
                <View>
                    <TouchableOpacity>
                        <Image style={{ width: 60, height: 60, marginTop: 10, marginLeft: 20, marginBottom: 20 }} source={require('../assets/event.png')} />

                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity >
                        <Image style={{ width: 60, height: 60, marginTop: 10, marginLeft: 80 }} source={require('../assets/attendance.png')} />

                    </TouchableOpacity>
                </View>
                <View  >
                    <TouchableOpacity>
                        <Image style={{ width: 60, height: 50, marginTop: 10, marginBottom: 10, marginLeft: 90 }} source={require('../assets/group.png')} />

                    </TouchableOpacity>
                </View>
            </View>
            <View>
                <Text style={{ marginTop: 17, marginLeft: 15, }}>Upcoming Events</Text>
                <SliderBox images={images} dotColor="red" inactiveDotColor="white" dotstyle={{ height: 20, width: 20, borderRadius: 50 }}
                    imageLoadingColor="black" />
            </View>




        </SafeAreaView >

    )
}
export default HomeScreen;
