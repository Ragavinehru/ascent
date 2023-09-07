import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Image, TouchableOpacity, TouchableHighlight,
    Button, FlatList,Modal
} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/color';
// import { ScrollView } from 'react-native-gesture-handler';
import STYLES from '../styles';
import { useState, useEffect } from 'react';
// import { useNavigation } from '@react-navigation/native';


const ClearGroup = ({ navigation, route }) => {
    // const navigation = useNavigation();
    const groupdata = route.params.groupdata;
    const membersData = groupdata.groupInfo.members;
    const [show, setState] = useState(false);
    const [selectedMember, setSelectedMember] = useState(null);
    console.log("members log", membersData);

    const MemberItem = ({ member }) => (
       
        <View style={STYLES.row}>
      
          <Text style={STYLES.cellname}   onPress={() => {
          setSelectedMember(member);
          setState(true); 
        }}>{member.name}</Text>
          
          <Text style={STYLES.cell}>{member.company}</Text>
          <Text style={STYLES.cell}>{member.role}</Text>
          <Text style={STYLES.cell}>{member.email}</Text>
          <Text style={STYLES.cellstatus}>{member.status}</Text>
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
             <Modal visible={show} transparent={true} animationType="slide"  onRequestClose={() => setState(false)}>
            
           
             <View style={{ flex: 1 }}>
                  <View style={{ backgroundColor: '#C0C0C0', borderRadius: 30, margin: 50, padding: 40 }}>
                {/* <Text >{membersData.name}uuuuu</Text> */}
                {/* <Image
              source={{ uri: selectedMember?.profileImage }} // Replace with the member's profile image URL
              style={STYLES.profileImage}
            /> */}
                <Text style={{color:'black',fontWeight:'bold',fontSize:14}}>{selectedMember?.name}|{selectedMember?.company}</Text>
            
            <Text>Mobile: {selectedMember?.mobileno}</Text>
            <Text style={{width:290}}>Email:  {selectedMember?.email}</Text>
            <Text>MaritalStatus: {selectedMember?.maritalStatus}</Text>
            <Text>Bloodgroup: {selectedMember?.bloodgroup}</Text>
            <Text>Birthday: {selectedMember?.dob}</Text>
                <Button  title="close" color="red" onPress={() => setState(false)}></Button>
                </View>
            </View>
          
           </Modal>
            
        </SafeAreaView>
    )
};
export default ClearGroup;