import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Image,
  Button, Modal,
  ToastAndroid, TouchableHighlight, FlatList
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
import axios from 'axios';

const Goals = () => {

  const navigation = useNavigation();
  const [newgoal, setGoal] = useState(false);
  const [update, setUpdate] = useState(false);
  const [data, setData] = useState([]);
  const [showComments, setShowComments] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState("");
  const [selectedGoalStatuses, setSelectedGoalStatuses] = useState(["Open"]); // Set an initial value with the desired default status
  const [specificValue, setSpecificValue] = useState('');
  const [measurableValue, setMeasurableValue] = useState('');
  const [achievableValue, setAchievableValue] = useState('');
  const [realisticValue, setRealisticValue] = useState('');
  const [timingValue, setTimingValue] = useState('');
  const [checked, setChecked] = React.useState(false);
  const [goalDescription, setGoalDescription] = useState('');
  const [goalPurpose, setGoalPurpose] = useState('');
  const [activitiesValue, setActivitiesValue] = useState('');
  const [effortsValue, setEffortsValue] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('');
  //update
  const [upspecificValue, setupSpecificValue] = useState('');
  const [upmeasurableValue, setupMeasurableValue] = useState('');
  const [upachievableValue, setupAchievableValue] = useState('');
  const [uprealisticValue, setupRealisticValue] = useState('');
  const [uptimingValue, setupTimingValue] = useState('');
  const [upgoalDescription, setupGoalDescription] = useState('');
  const [upgoalPurpose, setupGoalPurpose] = useState('');
  const [upactivitiesValue, setupActivitiesValue] = useState('');
  const [upeffortsValue, setupEffortsValue] = useState('');
  const [upselectedYear, setupSelectedYear] = useState('');
  const [upselectedPeriod, setupSelectedPeriod] = useState('');
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState(null);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [selectedGoals, setSelectedGoals] = useState([]);


  // ... other state variables for updating goals
  const openUpdateModal = (goalId) => {
    const goal = data.goals.find((goal) => goal.id === goalId);
    if (goal) {
      setSelectedGoalId(goalId);
      setSelectedGoal(goal);
      setupSpecificValue(goal.specific);
      setupMeasurableValue(goal.measurable);
      setupAchievableValue(goal.achievable);
      setupRealisticValue(goal.realistic);
      setupTimingValue(goal.timely);
      setupGoalDescription(goal.description);
      setupGoalPurpose(goal.purpose);
      setupActivitiesValue(goal.activities);
      setupEffortsValue(goal.efforts);
      setupSelectedYear(goal.year);
      setupSelectedPeriod(goal.period);
      setUpdateModalVisible(true);
    }
  };


  const year = [
    { key: '1', value: '2023' },
    { key: '2', value: '2024' },
    { key: '3', value: '2025' },
    { key: '4', value: '2026' },
    { key: '5', value: '2027' },
    { key: '6', value: '2028' },
    { key: '7', value: '2029' },
  ]
  const period = [
    { key: '1', value: 'Jan-Mar' },
    { key: '2', value: 'Apr-Jun' },
    { key: '3', value: 'Jul-Sep' },
    { key: '4', value: 'Oct-Dec' },
    { key: '5', value: 'Jan-Jun' },
    { key: '6', value: 'July-Dec' },
    { key: '7', value: 'Jan-Dec' },
  ]
  const goals = [
    { key: '1', value: 'Open' },
    { key: '2', value: 'Complete and closed' },
    { key: '3', value: 'Not Complete and closed' },
    { key: '3', value: 'Not Complete and continue to next period' },
  ]

  const apigoal = 'https://walrus-app-v5mk9.ondigitalocean.app/createGoal';
  const apiupdate = 'https://walrus-app-v5mk9.ondigitalocean.app/updateGoal';

  const createGoal = async () => {
    try {
      let Goal = {
        "goal": {

          "achievable": achievableValue,
          "activities": activitiesValue,
          "createdBy": global.email,
          "currentGoalStatus": "Complete and closed",
          "description": goalDescription,
          "efforts": effortsValue,
          "measurable": measurableValue,
          "purpose": goalPurpose,
          "realistic": realisticValue,
          "specific": specificValue,
          "timely": timingValue,
          "year": selectedYear,
          "period": selectedPeriod,
        }
      }

      const response = await axios.post(apigoal, Goal, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(Goal),
      });
      console.log("goal,", Goal);
      if (response.status === 200) {
        console.log('Goal created:', response.data);
        setGoal(false);
      } else {
        console.error('Failed to create goal:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error creating goal:', error);
    }
  };

  const updateGoal = async (selectedId, currentGoalStatus) => {
    if (!selectedGoalId) {
      return;
    }
    try {
      const updatedGoal = {
        id: selectedGoal.id,
        specific: upspecificValue,
        measurable: upmeasurableValue,
        achievable: upachievableValue,
        realistic: uprealisticValue,
        timely: uptimingValue,
        description: upgoalDescription,
        purpose: upgoalPurpose,
        activities: upactivitiesValue,
        efforts: upeffortsValue,
        year: upselectedYear,
        period: upselectedPeriod,
        createdBy: global.email,
        currentGoalStatus: selectedGoal.currentGoalStatus,
      };

      console.log("check", selectedGoal.id,
        upspecificValue, upmeasurableValue,
        upachievableValue, uprealisticValue,
        uptimingValue, upgoalDescription,
        upgoalPurpose, upactivitiesValue,
        upeffortsValue, upselectedYear,
        upselectedPeriod, selectedGoal.currentGoalStatus
      );


      const response = await axios.post(apiupdate, updatedGoal, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedGoal),
      });
      console.log("goal,", updatedGoal);
      if (response.status === 200) {
        // Update the local data with the updated goal
        const updatedData = data.goals.map((goal) =>
          goal.id === selectedGoalId ? updatedGoal : goal
        );
        console.log('update created:', response.data);
        setData({ ...data, goals: updatedData });

        // Close the update modal
        setUpdateModalVisible(false);
      } else {
        console.error('Failed to update goal:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error updating goal:', error);
    }
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

  const toggleSelectedGoal = (goalId) => {
    setSelectedGoals((prevSelectedGoals) => {
      if (prevSelectedGoals.includes(goalId)) {
        return prevSelectedGoals.filter((id) => id !== goalId);
      } else {
        return [...prevSelectedGoals, goalId];
      }
    });
  };

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
                <Text style={{ fontSize: 16, color: 'blue', marginTop: 10, marginLeft: 7 }}> {item.description} | {item.period}</Text>
                <Text style={{ fontSize: 14, color: 'black', marginLeft: 10 }}>Purpose</Text>
                <Text style={{ marginLeft: 210, marginTop: 10, position: 'absolute', fontSize: 11, color: 'blue' }}>Update Progress</Text>
                <TouchableHighlight onPress={() => openUpdateModal(item.id)}>
                  <Image style={{ width: 15, height: 15, position: 'absolute', color: 'blue', marginLeft: 300, marginTop: -40 }} source={require('../assets/pencil.png')} />
                </TouchableHighlight>

                <Text style={{ marginLeft: 220, marginTop: 40, justifyContent: 'flex-start', position: 'absolute', fontSize: 14, width: -250, color: 'black' }}> {item.currentGoalStatus}</Text>

                {/* <TouchableOpacity onPress={() => setShowComments(!showComments)}>
                  <Text style={{ marginLeft: 120, fontSize: 12, color: 'blue' }}>{showComments ? 'Show Less' : 'Show More'}</Text>
                </TouchableOpacity> */}
                <TouchableOpacity onPress={() => toggleSelectedGoal(item.id)}>
                  <Text style={{ marginLeft: 120, fontSize: 12, color: 'blue' }}>
                    {selectedGoals.includes(item.id) ? 'Show Less' : 'Show More'}
                  </Text>
                </TouchableOpacity>

                <Text style={{ marginLeft: 10, marginTop: -10 }}>{item.purpose}</Text>


                {selectedGoals.includes(item.id) && (
                  <View>
                    <Text style={{ fontSize: 14, color: 'black', marginLeft: 10, marginBottom: 10 }}>Goal Smartness</Text>
                    <Text style={{ marginLeft: 10 }}>Specific: {item.specific}</Text>
                    <Text style={{ marginLeft: 10 }}>Measurable: {item.measurable}</Text>
                    <Text style={{ marginLeft: 10 }}>Achievable: {item.achieavable}</Text>
                    <Text style={{ marginLeft: 10 }}>Realistic: {item.realistic}</Text>
                    <Text style={{ marginLeft: 10 }}>Timely: {item.timely}</Text>
                    <Text style={{ fontSize: 14, color: 'black', marginLeft: 10 }}>Activities/Tasks to be performed for the goal</Text>
                    <Text style={{ marginLeft: 10 }}>{item.activities}</Text>
                    <Text style={{ fontSize: 14, color: 'black', marginLeft: 10 }}>Efforts planned for the execution of the goal</Text>
                    <Text style={{ marginLeft: 10 }}> {item.efforts}</Text>

                  </View>
                )}

              </ScrollView>

            </View>
          )}
        />
        <Modal visible={newgoal} animationType="slide" style={{ borderRadius: 22 }}>

          <View style={{ flex: 1 }}>

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20, marginTop: 10, color: "black" }}>New Goal </Text>

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <TouchableOpacity >
                <Text onPress={() => setGoal(false)} style={{ color: 'red', marginLeft: 139 }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity >
                <Text style={{ color: 'blue', marginLeft: 19 }} onPress={createGoal}>Create Goal</Text>
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 14, color: 'black', marginLeft: 10, marginTop: 15 }}>Goal Execution Period</Text>

              <View style={{ width: '70%', marginLeft: 15 }}>
                <Text>Year</Text>
                <SelectList
                  setSelected={(val) => setSelectedYear(val)} // Update selectedYear
                  data={year}
                  save="value"
                />
              </View>

              <View style={{ width: '70%', marginLeft: 15 }}>
                <Text>Period</Text>
                <SelectList
                  setSelected={(val) => setSelectedPeriod(val)} // Update selectedPeriod
                  data={period}
                  save="value"
                /></View>

              <Text style={{ fontSize: 14, color: 'black', marginLeft: 10 }}>Goal Description</Text>
              <TextInput
                style={STYLES.goalinput}
                placeholder='Description'
                value={goalDescription}
                onChangeText={(text) => setGoalDescription(text)}
              />
              <Text style={{ fontSize: 14, color: 'black', marginLeft: 10 }}>Purpose of Goal</Text>
              <TextInput
                style={STYLES.goalinput}
                placeholder='Purpose'
                value={goalPurpose}
                onChangeText={(text) => setGoalPurpose(text)}
              />
              {/*  */}
              <Text style={{ color: 'black', fontSize: 14 }}>Goal Smartness (yes/no)</Text>
              <Text style={{ marginBottom: -20, marginTop: 15, marginRight: 230, color: 'black', }}>Specific:</Text>

              <TextInput style={STYLES.yesinput}
                value={specificValue}
                onChangeText={(text) => setSpecificValue(text)} ></TextInput>

              <Text style={{ marginTop: 15, marginBottom: -20, marginRight: 230, marginLeft: 15, color: 'black' }}>Measurable:</Text>
              <TextInput style={STYLES.yesinput}
                value={measurableValue}
                onChangeText={(text) => setMeasurableValue(text)}></TextInput>

              <Text style={{ marginLeft: 15, marginBottom: -20, marginRight: 250, color: 'black' }}>Timing:</Text>
              <TextInput style={STYLES.yesinput}
                value={timingValue}
                onChangeText={(text) => setTimingValue(text)} ></TextInput>

              <Text style={{ marginLeft: 15, marginTop: 19, marginBottom: -20, marginRight: 230, color: 'black' }}>Achievable:</Text>
              <TextInput style={STYLES.yesinput} value={achievableValue}
                onChangeText={(text) => setAchievableValue(text)}></TextInput>

              <Text style={{ marginLeft: 15, marginBottom: -20, marginRight: 230, color: 'black' }}>Realistic:</Text>
              <TextInput style={STYLES.yesinput} value={realisticValue}
                onChangeText={(text) => setRealisticValue(text)}></TextInput>

              <Text style={{ fontSize: 14, color: 'black', marginLeft: 10 }}>Activities/Tasks to be performed for goal</Text>
              <TextInput style={STYLES.goalinput} value={activitiesValue}
                onChangeText={(text) => setActivitiesValue(text)}></TextInput>
              <Text style={{ fontSize: 14, color: 'black', marginLeft: 10 }}>Efforts planned for the execution of the goal</Text>
              <TextInput style={STYLES.goalinput} value={effortsValue}
                onChangeText={(text) => setEffortsValue(text)}></TextInput>

            </View>

          </View>

        </Modal>
        {/* update */}

        <Modal visible={updateModalVisible} animationType="slide" >



          <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20, marginTop: 10, color: "black" }}>Update Goal </Text>

          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <TouchableOpacity >
              <Text onPress={() => setUpdateModalVisible(false)} style={{ color: 'red', marginLeft: 139 }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableHighlight onPress={updateGoal}>
              <Text style={{ color: 'blue', marginLeft: 19 }}>Update Goal</Text>
            </TouchableHighlight>
          </View>
          <View style={{ alignItems: 'center' }}>


            <Text style={{ fontSize: 14, color: 'black', marginLeft: 10, marginTop: 15 }}>Goal Execution Period</Text>

            <View style={{ width: '70%', marginLeft: 15 }}>
              <Text>Year</Text>
              <SelectList
                setSelected={(val) => setupSelectedYear(val)} // Update selectedYear
                data={year}
                save="value"
              />
            </View>

            <View style={{ width: '70%', marginLeft: 15 }}>
              <Text>Period</Text>
              <SelectList
                setSelected={(val) => setupSelectedPeriod(val)} // Update selectedPeriod
                data={period}
                save="value"
              /></View>
            <Text style={{ fontSize: 14, marginTop: 15, color: 'black', marginLeft: 10 }}>Goal Description</Text>
            <TextInput
              style={STYLES.goalinput}
              placeholder='Description'
              value={upgoalDescription}
              onChangeText={(text) => setupGoalDescription(text)}
            />
            <Text style={{ fontSize: 14, marginTop: 15, color: 'black', marginLeft: 10 }}>Purpose of Goal</Text>
            <TextInput
              style={STYLES.goalinput}
              placeholder='Purpose'
              value={upgoalPurpose}
              onChangeText={(text) => setupGoalPurpose(text)}
            />
            {/*  */}
            <Text style={{ color: 'black', marginTop: 15, fontSize: 14 }}>Goal Smartness (yes/no)</Text>
            <Text style={{ marginBottom: -20, marginTop: 15, marginRight: 230, color: 'black', }}>Specific:</Text>

            <TextInput style={STYLES.yesinput}
              value={upspecificValue}
              onChangeText={(text) => setupSpecificValue(text)} ></TextInput>

            <Text style={{ marginTop: 15, marginBottom: -20, marginRight: 230, marginLeft: 15, color: 'black' }}>Measurable:</Text>
            <TextInput style={STYLES.yesinput}
              value={upmeasurableValue}
              onChangeText={(text) => setupMeasurableValue(text)}></TextInput>

            <Text style={{ marginLeft: 15, marginBottom: -20, marginRight: 250, color: 'black' }}>Timing:</Text>
            <TextInput style={STYLES.yesinput}
              value={uptimingValue}
              onChangeText={(text) => setupTimingValue(text)} ></TextInput>

            <Text style={{ marginLeft: 15, marginTop: 19, marginBottom: -20, marginRight: 230, color: 'black' }}>Achievable:</Text>
            <TextInput style={STYLES.yesinput} value={upachievableValue}
              onChangeText={(text) => setupAchievableValue(text)}></TextInput>

            <Text style={{ marginLeft: 15, marginBottom: -20, marginRight: 230, color: 'black' }}>Realistic:</Text>
            <TextInput style={STYLES.yesinput} value={uprealisticValue}
              onChangeText={(text) => setupRealisticValue(text)}></TextInput>

            <Text style={{ fontSize: 14, color: 'black', marginLeft: 10 }}>Activities/Tasks to be performed for goal</Text>
            <TextInput style={STYLES.goalinput} value={upactivitiesValue}
              onChangeText={(text) => setupActivitiesValue(text)}></TextInput>
            <Text style={{ fontSize: 14, color: 'black', marginLeft: 10 }}>Efforts planned for the execution of the goal</Text>
            <TextInput style={STYLES.goalinput} value={upeffortsValue}
              onChangeText={(text) => setupEffortsValue(text)}></TextInput>
          </View>

          {/* <Button>Update Goal</Button> */}

        </Modal>





      </ScrollView>
    </SafeAreaView>
  )

}
export default Goals;