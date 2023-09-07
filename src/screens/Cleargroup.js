import {
    SafeAreaView,
    StyleSheet,
    View, TextInput,
    Text,
    Image, TouchableOpacity, TouchableHighlight,
    Button, FlatList, Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/color';
// import { ScrollView } from 'react-native-gesture-handler';
import STYLES from '../styles';
import { useState, useEffect, useRef } from 'react';
// import { useNavigation } from '@react-navigation/native';


const ClearGroup = ({ navigation, route }) => {
    // const navigation = useNavigation();
    const groupdata = route.params.groupdata;
    const membersData = groupdata.groupInfo.members;
    const [show, setState] = useState(false);
    const [dots, setDots] = useState(false);
    const [search, SetSearch] = useState('');
    // const [olddata, setoldData] = useState([]);
    const searchRef = useRef();
    const [selectedMember, setSelectedMember] = useState(null);
    console.log("members log", membersData);
    // setoldData(groupdata);
    // const onSearch = text => {
    //     if (text == '') {
    //         setData(olddata);
    //     }
    //     else {
    //         let tempList = data.filter(item => {
    //             return item.carname.toLowerCase().indexOf(text.toLowerCase()) > -1;
    //         });
    //         setData(tempList);
    //     }
    // };

    const MemberItem = ({ member }) => (

        <View style={STYLES.row}>

            <Text style={STYLES.cellname} onPress={() => {
                setSelectedMember(member);
                setState(true);
            }}>{member.name}</Text>

            <Text style={STYLES.cell}>{member.company}</Text>
            <Text style={STYLES.cell}>{member.role}</Text>
            <Text style={STYLES.cell}>{member.email}</Text>
            <Text style={STYLES.cellstatus}>{member.status}</Text>
            <TouchableOpacity onPress={() => { setDots(true); }}>
                <Image style={{ marginRight: -17, width: 20, height: 20 }} source={require('../assets/threedots.png')} />
            </TouchableOpacity>
        </View>
    );
    //   const HeaderCells = () => (

    //   );
    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
            <View style={STYLES.header}>
                <TouchableOpacity onPress={navigation.goBack}>
                    <Image style={STYLES.inputIcon} source={require('../assets/arrow.png')} />
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20, marginTop: 10 }}> Back </Text>
                </TouchableOpacity>
            </View>

            <Text style={{ marginTop: 20, marginLeft: 10, fontSize: 27, color: 'black' }}> {groupdata.groupInfo ? groupdata.groupInfo.name : ''}</Text>
            <View style={STYLES.search}>
                <Icon name="search" size={28} />
                <TextInput
                    style={{ flex: 1, fontSize: 18, color: 'white' }}
                    value={search}
                    ref={searchRef}
                    onChangeText={txt => {
                        // onSearch(txt);
                        SetSearch(txt);

                    }}
                    placeholder="Search"
                />
                {/* {search == '' ? null : (
                    <TouchableOpacity
                        onPress={() => {
                            searchRef.current.clear();
                            // onSearch('');
                            SetSearch('');
                        }}
                    >
                        <Icon
                            name="close"
                        />
                    </TouchableOpacity>
                )} */}

            </View>

            <View style={STYLES.btnSecondary}>
                <TouchableHighlight style={{}} onPress={() => navigation.navigate('NewEvent')}>
                    <Text style={STYLES.newuser}>
                        + New User
                    </Text>
                </TouchableHighlight>
            </View>
            <View style={STYLES.row}>
                <Text style={STYLES.headerCell}>Name</Text>
                <Text style={STYLES.headerCell}>Company</Text>
                <Text style={STYLES.headerCell}>Role</Text>
                <Text style={STYLES.headerCell}>Email</Text>
                <Text style={STYLES.headerCell}>Status</Text>
            </View>
            <FlatList
                data={membersData}
                keyExtractor={(item, index) => index.toString()} // Use index as the key for simplicity (not recommended for production)
                renderItem={({ item }) => <MemberItem member={item} />}
            // Render each member using the custom MemberItem component
            />
            <View>
                <Text style={{ color: 'black', fontSize: 17, marginLeft: 20, marginBottom: 50 }}>Invited Members:   {groupdata.groupInfo ? groupdata.groupInfo.invitedMembers : ''}</Text>
            </View>
            <Modal visible={show} transparent={true} animationType="slide" onRequestClose={() => setState(false)}>


                <View style={{
                    flex: 1, justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{ backgroundColor: '#fff5ee', borderRadius: 30, margin: 90, padding: 40 }}>
                        {/* <Text >{membersData.name}uuuuu</Text> */}
                        {/* <Image
              source={{ uri: selectedMember?.profileImage }} // Replace with the member's profile image URL
              style={STYLES.profileImage}
            /> */}
                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 14 }}>{selectedMember?.name}|{selectedMember?.company}</Text>

                        <Text> Mobile: {selectedMember?.mobileno}</Text>
                        <Text style={{ width: 290 }}> Email:  {selectedMember?.email}</Text>
                        <Text> MaritalStatus: {selectedMember?.maritalStatus}</Text>
                        <Text> Bloodgroup: {selectedMember?.bloodgroup}</Text>
                        <Text> Birthday: {selectedMember?.dob}</Text>
                        <TouchableOpacity style={{ marginTop: 20 }}>
                            <Button title="close" color="red" onPress={() => setState(false)} ></Button>
                        </TouchableOpacity>
                    </View>
                </View>

            </Modal>
            <Modal visible={dots} transparent={true} animationType="slide" onRequestClose={() => setDots(false)}>
                <View style={{ backgroundColor: '#fff5ee', borderRadius: 30, margin: 20, padding: 30, position: 'absolute', top: 230, left: 170, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Image style={{ width: 15, height: 15, marginTop: 20, marginLeft: -130 }} source={require('../assets/pencil.png')} />
                    <Text style={{ marginTop: -17 }}>  Make Facilitator</Text>
                    <Image style={{ width: 15, height: 15, marginLeft: -130, marginTop: 10 }} source={require('../assets/pencil.png')} />
                    <Text style={{ marginTop: -17 }}> Make Member</Text>
                    <Image style={{ width: 15, height: 15, marginLeft: -130, marginTop: 10, }} source={require('../assets/pencil.png')} />
                    <Text style={{ marginTop: -17, marginLeft: 10 }}>   Make CoFacilitator</Text>
                    <Image style={{ width: 15, height: 15, marginLeft: -130, marginTop: 10, }} source={require('../assets/delete.png')} />
                    <Text style={{ marginTop: -17, marginLeft: -55 }}>Delete</Text>
                    <TouchableOpacity onPress={() => setDots(false)} style={{ marginTop: 10 }}>
                        <Text style={{ color: 'red', marginTop: 10 }}>Close</Text>
                    </TouchableOpacity>

                </View>
            </Modal>
        </SafeAreaView>
    )
};
export default ClearGroup;