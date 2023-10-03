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
import { Checkbox } from "react-native-paper";
import { useNavigation } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list'
import { MultipleSelectList } from 'react-native-dropdown-select-list'
import { CheckBox } from 'react-native-elements';


const Goals = () => {

  const navigation = useNavigation();
    const [newgoal, setGoal] = useState(false);
    const [update, setUpdate] = useState(false);
    const [data, setData] = useState([]);
    const [showComments, setShowComments] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selected, setSelected] = useState("");
    const [selectedGoalStatuses, setSelectedGoalStatuses] = useState(["Open"]); // Set an initial value with the desired default status
    const [specific, setSpecific] = useState([false, false]);
    const [measurable, setMeasurable] = useState([false, false]);
    const [achievable, setAchievable] = useState([false, false]);
    const [realistic, setRealistic] = useState([false, false]);
    const [timely, setTimely] = useState([false, false]);
    const [checked, setChecked] = React.useState(false);

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
  {key:'3', value:'Not Complete and closed'},
  {key:'3', value:'Not Complete and continue to next period'},
]
const [isChecked1, setIsChecked1] = useState(false);
const [isChecked2, setIsChecked2] = useState(false);

const toggleCheckBox1 = () => {
  setIsChecked1(!isChecked1);
};

const toggleCheckBox2 = () => {
  setIsChecked2(!isChecked2);
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
                <TouchableHighlight onPress={() => setGoal(true)}>
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
                 setSelected={(val) => setSelectedGoalStatuses(val)}
                 data={goals}
                 save="value"
                 label="Goal Status"
              />
               
         
            <FlatList
              data={data.goals?.filter((goal) => selectedGoalStatuses.includes(goal.currentGoalStatus))}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={STYLES.cardgoal}>
                  <ScrollView>
                    <Text style={{fontSize:16,color:'blue',marginTop:10,marginLeft:7}}> {item.description} | {item.period}</Text>
                  

                                
                    <Text style={{fontSize:14,color:'black',marginLeft:10}}>Purpose</Text>
                    <Text  style={{marginLeft:210,marginTop:10,position:'absolute',fontSize:11,color:'blue'}}>Update Progress</Text>
                    <TouchableHighlight onPress={() => setUpdate(true)}>
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
                   <Modal visible={newgoal} animationType="slide" >
                  
                    <View>
                   
                      <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20, marginTop: 10,color:"black" }}>New Goal </Text>
                    
                    <View style={{flexDirection:'row',justifyContent:'center'}}>
                      <TouchableOpacity >
                        <Text onPress={() => setGoal(false)} style={{ color: 'red' ,marginLeft:139}}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity >
                        <Text  style={{ color: 'blue',marginLeft:19 }}>Create Goal</Text>
                      </TouchableOpacity>
                    </View>
                  <Text style={{fontSize:14,color:'black',marginLeft:10,marginTop:15}}>Goal Execution Period</Text>
                
                 <View style={{ width: '70%',marginLeft:15 }}>
                 <Text>Year</Text>
                  <SelectList
                    setSelected={(val) => setSelected(val)} 
                    data={year} 
                    save="value"
                  />
                </View>

                <View style={{ width: '70%',marginLeft:15 }}>
                  <Text>Period</Text>
                  <SelectList 
                    setSelected={(val) => setSelected(val)} 
                    data={period} 
                    save="value"                
                /></View>
                    <Text style={{fontSize:14,color:'black',marginLeft:10}}>Goal Description</Text>
                      <TextInput style={STYLES.goalinput} placeholder='Description'></TextInput>
                      <Text style={{fontSize:14,color:'black',marginLeft:10}}>Purpose of Goal</Text>  
                      <TextInput style={STYLES.goalinput} placeholder='Purpose'></TextInput>
                     {/*  */}
                     <Text style={{color:'black',fontSize:14}}>Goal Smartness (yes/no)</Text>
                     <Text>Specific:</Text>
                     <View style={STYLES.containerf}>
                      <View style={STYLES.checkboxContainer}>
                        <CheckBox
                          title="yes"
                          checked={isChecked1}
                          onPress={toggleCheckBox1}
                        />
                      </View>
                      <View style={STYLES.checkboxContainer}>
                        <CheckBox
                          title="No"
                          checked={isChecked2}
                          onPress={toggleCheckBox2}
                        />
                      </View>
                    </View>
                    <Text style={{marginTop:15,marginLeft:15,color:'black'}}>Measurable:</Text>
                    <TextInput style={STYLES.yesinput} ></TextInput>
                    <Text  style={{marginLeft:15,color:'black'}}>Timing:</Text>
                    <TextInput style={STYLES.yesinput} ></TextInput>
                    <Text style={{marginLeft:15,color:'black'}}>Achievable:</Text>
                    <TextInput style={STYLES.yesinput} ></TextInput>
                    <Text style={{marginLeft:15,color:'black'}}>Realistic:</Text>
                    <TextInput style={STYLES.yesinput} ></TextInput>

                      <Text style={{fontSize:14,color:'black',marginLeft:10}}>Activities/Tasks to be performed for goal</Text>  
                      <TextInput style={STYLES.goalinput} ></TextInput>
                      <Text style={{fontSize:14,color:'black',marginLeft:10}}>Efforts planned for the execution of the goal</Text>  
                      <TextInput style={STYLES.goalinput} ></TextInput>

                    
                    {/* <Button>Update Goal</Button> */}
                    
                    </View>
                    
                   </Modal>
                   {/* update */}
                 
                   <Modal visible={update} animationType="slide" >
                
                  <View>
                 
                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20, marginTop: 10,color:"black" }}>Update Goal </Text>
                  
                  <View style={{flexDirection:'row',justifyContent:'center'}}>
                    <TouchableOpacity >
                      <Text onPress={() => setUpdate(false)} style={{ color: 'red' ,marginLeft:139}}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity >
                      <Text  style={{ color: 'blue',marginLeft:19 }}>Update Goal</Text>
                    </TouchableOpacity>
                  </View>
                <Text style={{fontSize:14,color:'black',marginLeft:10,marginTop:15}}>Goal Execution Period</Text>
              
               <View style={{ width: '70%',marginLeft:15 }}>
               <Text>Year</Text>
                <SelectList
                  setSelected={(val) => setSelected(val)} 
                  data={year} 
                  save="value"
                />
              </View>

              <View style={{ width: '70%',marginLeft:15 }}>
                <Text>Period</Text>
                <SelectList 
                  setSelected={(val) => setSelected(val)} 
                  data={period} 
                  save="value"                
              />
         
              </View>
                  <Text style={{fontSize:14,color:'black',marginLeft:10}}>Goal Description</Text>
                    <TextInput style={STYLES.goalinput} placeholder='Description'></TextInput>
                    <Text style={{fontSize:14,color:'black',marginLeft:10}}>Purpose of Goal</Text>  
                    <TextInput style={STYLES.goalinput} placeholder='Purpose'></TextInput>
                   {/*  */}
                   <Text style={{color:'black',fontSize:14}}>Goal Smartness (yes/no)</Text>
                   <Text>Specific:</Text>
                   <View style={STYLES.containerf}>
                    <View style={STYLES.checkboxContainer}>
                      <CheckBox
                        title="yes"
                        checked={isChecked1}
                        onPress={toggleCheckBox1}
                      />
                    </View>
                    <View style={STYLES.checkboxContainer}>
                      <CheckBox
                        title="No"
                        checked={isChecked2}
                        onPress={toggleCheckBox2}
                      />
                    </View>
                  </View>
                  <Text style={{marginTop:15,marginLeft:15,color:'black'}}>Measurable:</Text>
                  <TextInput style={STYLES.yesinput} ></TextInput>
                  <Text  style={{marginLeft:15,color:'black'}}>Timing:</Text>
                  <TextInput style={STYLES.yesinput} ></TextInput>
                  <Text style={{marginLeft:15,color:'black'}}>Achievable:</Text>
                  <TextInput style={STYLES.yesinput} ></TextInput>
                  <Text style={{marginLeft:15,color:'black'}}>Realistic:</Text>
                  <TextInput style={STYLES.yesinput} ></TextInput>

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