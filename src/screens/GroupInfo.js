import {
    SafeAreaView,
    StyleSheet,
    View, TextInput,
    Text,
    Image, TouchableOpacity, TouchableHighlight,
    Button, FlatList, Modal
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import COLORS from '../consts/color';
import STYLES from '../styles';
import { useState, useEffect, useRef } from 'react';



const GroupInfo = ({ navigation, route }) => {
    // const navigation = useNavigation();

    const [groupInfo, setGroupInfo] = useState([]);
    const [role, setRole] = useState([]);

    const groupId = route.params.groupId;
    console.log("groups hangd data", groupId);
    // const membersData = groupdata.groups.members;
    // console.log("{}{}{}{}{}", membersData);
    const fetchGroupData = async () => {

        try {
            const url = `https://walrus-app-v5mk9.ondigitalocean.app/getGroupInfo?groupId=${groupId}`;
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

            });
            const result = await response.json();
            console.log(" Groupinfo______", result);
            setGroupInfo(result.groupInfo);


        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    useEffect(() => {
        fetchGroupData();
    }, []);

    const updateRole = async (newRole, email, groupId) => {
        try {
            const url = `https://walrus-app-v5mk9.ondigitalocean.app/updateRole`;
            const body = JSON.stringify({ role: newRole, email, groupId });
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: body
            });
            const result = await response.json();
            console.log("Role updated:", result);
            console.log("Role updated:", newRole);


            const updatedMembers = groupInfo.members.map((member) => {
                if (member.email === email) {

                    return { ...member, role: newRole };
                }
                return member;
            });


            setGroupInfo({ ...groupInfo, members: updatedMembers });
            console.log("kkkkkkkk", updatedMembers);

            setDots(false);
        } catch (error) {
            console.error('Error updating role:', error);

        }
    };

    console.log("message", groupInfo);
    const [show, setShow] = useState(false);
    const [dots, setDots] = useState(false);
    const [newuser, setUser] = useState(false);
    const [search, SetSearch] = useState('');
    const [filteredMembers, setFilteredMembers] = useState(groupInfo);

    // const [olddata, setoldData] = useState([]);
    const searchRef = useRef();
    const [selectedMember, setSelectedMember] = useState([]);
    // console.log("members log", membersData);
    // search filter
    const filterMembers = (query) => {
        const filtered = groupInfo.members.filter((member) =>
            member.name.toLowerCase().includes(query.toLowerCase()) ||
            member.company.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredMembers(filtered);
    };


    const MemberItem = ({ member }) => (

        <View style={STYLES.row}>

            <Text style={STYLES.cellname} onPress={() => {
                setSelectedMember(member);
                setShow(true);
                // setState(true);
            }}>{member.name}</Text>

            <Text style={STYLES.cell}>{member.company}</Text>
            <Text style={STYLES.cell}>{member.role}</Text>
            <Text style={STYLES.cell}>{member.email}</Text>
            <Text style={STYLES.cellstatus}>{member.status}</Text>
            <TouchableOpacity onPress={() => setDots(true)}>
                <Image style={{ marginRight: -17, width: 20, height: 20 }} source={require('../assets/threedots.png')} />
            </TouchableOpacity>

        </View>
    );
    //   const HeaderCells = () => (

    //   );
    // console.log("memberssssss", groupInfo.groupInfo)
    return (
        <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
            <View style={STYLES.header}>
                <TouchableOpacity onPress={navigation.goBack}>
                    <Image style={STYLES.inputIcon} source={require('../assets/arrow.png')} />
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20, marginTop: 10 }}> Back </Text>
                </TouchableOpacity>
            </View>

            {/* <Text style={{ marginTop: 20, marginLeft: 10, fontSize: 27, color: 'black' }}> {groupdata.groups.name}</Text> */}
            <View style={STYLES.search}>
                {/* <Icon name="search" size={28} /> */}
                <Image style={STYLES.searchimg} source={require('../assets/search.png')} />
                <TextInput
                    style={{ flex: 1, fontSize: 18, color: 'white' }}
                    value={search}
                    ref={searchRef}
                    onChangeText={txt => {
                        SetSearch(txt);
                        filterMembers(txt);

                    }}
                    placeholder="Search"
                />

            </View>

            <View style={STYLES.btnSecondary}>
                <TouchableHighlight style={{}} onPress={() => { setUser(true); }}>
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
                data={filteredMembers.length > 0 ? filteredMembers : groupInfo.members}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <MemberItem member={item} />}

            />
            <View>
                <Text style={{ color: 'blue', fontSize: 17, marginLeft: 10, marginTop: -50, position: 'absolute' }}>  Invited Members:
                </Text>
                <Text style={{ color: 'black', fontSize: 15, marginLeft: 20, marginTop: -30 }}>{groupInfo.invitedMembers}</Text>
            </View>
            <Modal visible={show} transparent={true} animationType="slide" onRequestClose={() => setState(false)}>


                <View style={{
                    flex: 1, justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <View style={{ backgroundColor: '#fff5ee', borderRadius: 30, margin: 90, padding: 40 }}>

                        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 14 }}>{selectedMember?.name}|{selectedMember?.company}</Text>

                        <Text> Mobile: {selectedMember?.mobileno}</Text>
                        <Text style={{ width: 290 }}> Email:  {selectedMember?.email}</Text>
                        <Text> MaritalStatus: {selectedMember?.maritalStatus}</Text>
                        <Text> Bloodgroup: {selectedMember?.bloodgroup}</Text>
                        <Text> Birthday: {selectedMember?.dob}</Text>
                        <TouchableOpacity style={{ marginTop: 20 }}>
                            <Button title="close" color="red" onPress={() => setShow(false)} ></Button>
                        </TouchableOpacity>

                    </View>
                </View>

            </Modal>
            <Modal visible={dots} transparent={true} animationType="slide">
                <View style={{ backgroundColor: '#fff5ee', borderRadius: 30, margin: 20, padding: 30, position: 'absolute', top: 230, left: 170, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Image style={{ width: 15, height: 15, marginTop: 20, marginLeft: -130 }} source={require('../assets/pencil.png')} />
                    <TouchableOpacity>
                        <Text style={{ marginTop: -17 }} onPress={() => updateRole('Facilitator', selectedMember.email, groupId)}>  Make Facilitator</Text>
                    </TouchableOpacity>
                    <Image style={{ width: 15, height: 15, marginLeft: -130, marginTop: 10 }} source={require('../assets/pencil.png')} />
                    <TouchableOpacity>
                        <Text style={{ marginTop: -17 }} onPress={() => updateRole('Member', selectedMember.email, groupId)}> Make Member</Text>
                    </TouchableOpacity>
                    <Image style={{ width: 15, height: 15, marginLeft: -130, marginTop: 10, }} source={require('../assets/pencil.png')} />
                    <TouchableOpacity>
                        <Text style={{ marginTop: -17, marginLeft: 10 }} onPress={() => updateRole('CoFacilitator', selectedMember.email, groupId)}>   Make CoFacilitator</Text>
                    </TouchableOpacity>
                    <Image style={{ width: 15, height: 15, marginLeft: -130, marginTop: 10, }} source={require('../assets/delete.png')} />
                    <Text style={{ marginTop: -17, marginLeft: -55 }}>Delete</Text>
                    <TouchableOpacity onPress={() => setDots(false)} style={{ marginTop: 10 }}>
                        <Text style={{ color: 'red', marginTop: 10 }}>Close</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            {/* <Modal visible={dots} transparent={true} animationType="slide">

                <View style={{ backgroundColor: '#fff5ee', borderRadius: 30, margin: 20, padding: 30, position: 'absolute', top: 230, left: 170, justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Text>Select Role:</Text>
                    <TouchableOpacity onPress={() => updateRole('Facilitator', selectedMember.email, groupId)}>
                        <Text>Facilitator</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => updateRole('Member', selectedMember.email, groupId)}>
                        <Text>Member</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => updateRole('Member', selectedMember.email, groupId)}>
                        <Text>CoFacilitator</Text>
                    </TouchableOpacity>
                    {/* Add other role options as needed */}
            {/* <TouchableOpacity onPress={() => setDots(false)} style={{ marginTop: 10 }}>
                        <Text style={{ color: 'red', marginTop: 10 }}>Close</Text>
                    </TouchableOpacity>

                </View>
            </Modal> */}


            <Modal visible={newuser} transparent={true} animationType="slide" onRequestClose={() => setUser(false)}>
                <View style={{
                    justifyContent: 'center', marginTop: 80, alignItems: 'center', backgroundColor: '#fff5ee', borderRadius: 30, margin: 120, padding: 40
                }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 12 }}>Add Users to Groups</Text>
                    <TextInput style={STYLES.searchinput} placeholder='Search Users'></TextInput>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => setUser(false)} style={{ marginTop: 10 }}>
                            <Text style={{ color: 'red', marginTop: 10 }}>Cancel</Text>
                        </TouchableOpacity>
                        <Text style={{ fontWeight: 'bold', fontSize: 13, color: 'blue', marginTop: 20, marginLeft: 10 }}>Add user</Text>
                    </View>

                </View>

            </Modal>
        </SafeAreaView >
    )
};
export default GroupInfo;