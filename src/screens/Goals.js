import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    Image,
    Button,Modal,
    ToastAndroid, TouchableHighlight,FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
// import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../consts/color';
import STYLES from '../styles';
import { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Navigation } from 'react-native-navigation';
import { SelectList } from 'react-native-dropdown-select-list'
import { MultipleSelectList } from 'react-native-dropdown-select-list'


const Goals = ({ navigation }) => {


    const [newgoal, setGoal] = useState(false);
    const [data, setData] = useState([]);
    const [showComments, setShowComments] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selected, setSelected] = useState("");

    const year = [
      {key:'1', value:'2023'},
      {key:'2', value:'2024'},
      {key:'3', value:'2025'},
      {key:'4', value:'2026'},
      {key:'5', value:'2027'},
      {key:'6', value:'2028'},
      {key:'7', value:'2029'},
  ]
  const period= [
    {key:'1', value:'Jan-Mar'},
    {key:'2', value:'Apr-Jun'},
    {key:'3', value:'Jul-Sep'},
    {key:'4', value:'Oct-Dec'},
    {key:'5', value:'Jan-Jun'},
    {key:'6', value:'July-Dec'},
    {key:'7', value:'Jan-Dec'},
]
const goals = [
  {key:'1', value:'Open'},
  {key:'2', value:'Complete and closed'},
  {key:'3', value:'Not Completed and closed'},
  {key:'3', value:'Not Completed and continue to next period'},
]

    const openEventModal = (event) => {
      setData(event);
      setShowModal(true);
  };

  const closeEventModal = () => {
    setData(null);
      setShowModal(false);
  };

    const getGoalData = async () => {
        const url = 'https://walrus-app-v5mk9.ondigitalocean.app/getAllGoals';
      
        const requestBody = {
          email: global.email,
        };
      
        try {
          const result = await fetch(url, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
          });
      
          if (result.ok) {
            const data = await result.json();
            console.log("Result updated", data);
            setData(data);
          } else {
            // Handle HTTP error here
            console.error('HTTP Error:', result.status);
          }
        } catch (error) {
          // Handle other errors here
          console.error('Error:', error);
        }
      };
      
      useEffect(() => {
        getGoalData();
      }, []);
      
    return (
        <SafeAreaView
            style={{ paddingHorizontal: 20, flex: 1, backgroundColor: COLORS.white }}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <TouchableOpacity onPress={navigation.goBack}>
                    <Image style={STYLES.inputIcon} source={require('../assets/arrow.png')} />

                    {/* <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} /> */}
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20, marginTop: 10 }}> Back </Text>
                </TouchableOpacity>
                <View style={STYLES.btnSecondary}>
                <TouchableHighlight style={{}} onPress={() => { setGoal(true); }}>
                    <Text style={STYLES.newgoal}>
                        + New Goal
                    </Text>
                </TouchableHighlight>
            </View>
                <View style={{ marginTop: 70 }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', color: COLORS.dark }}>
                        Goals{data.id}
                    </Text>

                </View>
                <MultipleSelectList 
        setSelected={(val) => setSelected(val)} 
        data={goals} 
        save="value"
        onSelect={() => alert(selected)} 
        label="Categories"
    />
               
         
            <FlatList
                data={data.goals}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={STYLES.cardgoal}>
                  <ScrollView>
                    <Text style={{fontSize:16,color:'blue',marginTop:10,marginLeft:7}}> {item.description} | {item.period}</Text>
                  

                                
                    <Text style={{fontSize:14,color:'black',marginLeft:10}}>Purpose</Text>
                    <Text  style={{marginLeft:210,marginTop:10,position:'absolute',fontSize:11,color:'blue'}}>Update Progress</Text>
                    <TouchableHighlight onPress={() => openEventModal(item)}>
                    <Image style={{ width: 15, height: 15,position:'absolute',color:'blue',marginLeft:300 ,marginTop:-40}} source={require('../assets/pencil.png')} />
                   </TouchableHighlight>
                    <Text  style={{marginLeft:260,marginTop:50,position:'absolute',fontSize:15,color:'black'}}> {item.currentGoalStatus}</Text>
                   
                    <TouchableOpacity onPress={() => setShowComments(!showComments)}>
                                    <Text style={{ marginLeft:120, fontSize: 12, color: 'blue' }}>{showComments ? 'Show Less' : 'Show More'}</Text>
                     </TouchableOpacity>
                    <Text  style={{marginLeft:10,marginTop:-10}}>{item.purpose}</Text>
                   
                   
               {showComments && (
                   <View>
                    <Text style={{fontSize:14,color:'black',marginLeft:10,marginBottom:10}}>Goal Smartness</Text>
                    <Text  style={{marginLeft:10}}>Specific: {item.specific}</Text>
                    <Text  style={{marginLeft:10}}>Measurable: {item.measurable}</Text>
                    <Text  style={{marginLeft:10}}>Achievable: {item.achieavable}</Text>
                    <Text  style={{marginLeft:10}}>Realistic: {item.realistic}</Text>
                    <Text  style={{marginLeft:10}}>Timely: {item.timely}</Text>
                    <Text style={{fontSize:14,color:'black',marginLeft:10}}>Activities/Tasks to be performed for the goal</Text>
                    <Text  style={{marginLeft:10}}>{item.activities}</Text>
                    <Text style={{fontSize:14,color:'black',marginLeft:10}}>Efforts planned for the execution of the goal</Text>
                    <Text  style={{marginLeft:10}}> {item.efforts}</Text>

                    </View>
                     )}
                     
                   </ScrollView>
                   
                    </View>
                     )}
                />
                   <Modal visible={showModal} animationType="slide" >
                    <View>
                    <View style={STYLES.header}>
                    <TouchableOpacity onPress={navigation.goBack}>
                      <Image style={STYLES.inputIcon} source={require('../assets/arrow.png')} />
                      <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20, marginTop: 10 }}>Edit Goal </Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={{fontSize:14,color:'black',marginLeft:10,marginBottom:10}}>Goal Execution Period</Text>
                 <Text>Year</Text>
                  <SelectList 
                    setSelected={(val) => setSelected(val)} 
                    data={year} 
                    save="value"                                     
                />
                  <Text>Period</Text>
                  <SelectList 
                    setSelected={(val) => setSelected(val)} 
                    data={period} 
                    save="value"                
                />
                    <Text style={{fontSize:14,color:'black',marginLeft:10}}>Goal Description</Text>
                      <TextInput style={STYLES.goalinput} placeholder='Description'></TextInput>
                      <Text style={{fontSize:14,color:'black',marginLeft:10}}>Purpose of Goal</Text>  
                      <TextInput style={STYLES.goalinput} placeholder='Purpose'></TextInput>
                     
                     
                      <Text style={{fontSize:14,color:'black',marginLeft:10}}>Activities/Tasks to be performed for goal</Text>  
                      <TextInput style={STYLES.goalinput} ></TextInput>
                      <Text style={{fontSize:14,color:'black',marginLeft:10}}>Efforts planned for the execution of the goal</Text>  
                      <TextInput style={STYLES.goalinput} ></TextInput>

                    {/* <Button>Update Goal</Button> */}
                    
                    </View>
                   </Modal>



            </ScrollView>
        </SafeAreaView>
    )

}
export default Goals;