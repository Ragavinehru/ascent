import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image, TouchableOpacity,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/color';
import { ScrollView } from 'react-native-gesture-handler';
import STYLES from '../styles';
import { useNavigation } from '@react-navigation/native';


const Attendance = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, height: '100%' }}>
      <View style={STYLES.header}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Image style={STYLES.inputIcon} source={require('../assets/arrow.png')} />

          {/* <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} /> */}
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20, marginTop: 10 }}> Back </Text>
        </TouchableOpacity>
      </View>
      <Text style={{ marginTop: 10, marginLeft: 19, fontSize: 20, color: 'black' }}>Overall Attendance</Text>
      <Text style={{ marginTop: 10, marginLeft: 19, fontSize: 13, color: 'black' }}>Total Events:  | Online Events:  | Offline Events:  </Text>
      <View style={STYLES.table}>
        {/* Row 1 */}
        <View style={STYLES.row}>
          <View style={STYLES.cell}>
            <Text style={{ marginLeft: 20, color: 'blue' }}>Name</Text>
          </View>
          <View style={STYLES.cell}>
            <Text style={{ marginLeft: 10, color: 'blue' }}>Attendance</Text>
          </View>
          <View style={STYLES.cell}>
            <Text style={{ marginLeft: 20, color: 'blue' }}>Offline</Text></View>
          <View style={STYLES.cell}>
            <Text style={{ marginLeft: 20, color: 'blue' }}>Late</Text>
          </View>
        </View>

        {/* Row 2 */}
        <View style={STYLES.row}>
          <View style={STYLES.cell}>

          </View>
          <View style={STYLES.cell}></View>
          <View style={STYLES.cell}></View>
          <View style={STYLES.cell}></View>
        </View>

        {/* Row 3 */}
        <View style={STYLES.row}>
          <View style={STYLES.cell}></View>
          <View style={STYLES.cell}></View>
          <View style={STYLES.cell}></View>
          <View style={STYLES.cell}></View>
        </View>

        {/* Row 4 */}
        <View style={STYLES.row}>
          <View style={STYLES.cell}></View>
          <View style={STYLES.cell}></View>
          <View style={STYLES.cell}></View>
          <View style={STYLES.cell}></View>
        </View>
      </View>

    </SafeAreaView>
  )
};
export default Attendance;