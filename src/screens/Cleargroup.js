import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Image, TouchableOpacity, TouchableHighlight,
    Button, FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/color';
import { ScrollView } from 'react-native-gesture-handler';
import STYLES from '../styles';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';


const ClearGroup = ({ navigation, route }) => {
    // const navigation = useNavigation();
    const groupdata = route.params.groupdata;
    const membersData = groupdata.groupInfo.members;
    console.log("members log", membersData);

    const MemberItem = ({ member }) => (

        < View style={STYLES.row} >
            {/* <View style={STYLES.column}>
                <Text style={STYLES.headerText}>Name</Text>
                <Text style={STYLES.cell}>{member.name}</Text>
            </View> */}
            {/* <View style={STYLES.cellHeader}>
                <Text style={STYLES.headerText}>Email</Text>
            </View> */}
            {/* <Text>hi</Text> */}
            <Text style={STYLES.cell}>{member.name}</Text>
            <Text style={STYLES.cell}>{member.company}</Text>
            <Text style={STYLES.cell}>{member.role}</Text>
            <Text style={STYLES.cell}>{member.email}</Text>
            <Text style={STYLES.cell}>{member.status}</Text>
        </View >
    );

    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
            <View style={STYLES.header}>
                <TouchableOpacity onPress={navigation.goBack}>
                    <Image style={STYLES.inputIcon} source={require('../assets/arrow.png')} />
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20, marginTop: 10 }}> Back </Text>
                </TouchableOpacity>
            </View>

            <Text style={{ marginTop: 20, marginLeft: 10, fontSize: 27, color: 'black' }}> {groupdata.groupInfo ? groupdata.groupInfo.name : ''}</Text>
            <View style={STYLES.btnSecondary}>
                <TouchableHighlight style={{}} onPress={() => navigation.navigate('NewEvent')}>
                    <Text style={STYLES.newuser}>
                        + New User
                    </Text>
                </TouchableHighlight>
            </View>
            <FlatList
                data={membersData}
                keyExtractor={(item, index) => index.toString()} // Use index as the key for simplicity (not recommended for production)
                renderItem={({ item }) => <MemberItem member={item} />} // Render each member using the custom MemberItem component
            />
        </SafeAreaView>
    )
};
export default ClearGroup;