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


const Group = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white }}>
      <View style={STYLES.header}>
        <TouchableOpacity onPress={navigation.goBack}>
          <Image style={STYLES.inputIcon} source={require('../assets/arrow.png')} />


          <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 20, marginTop: 10 }}> Back </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text style={{ marginTop: 10, marginLeft: 19, fontSize: 20, color: 'black' }}>Your Groups</Text>
        <Image style={{ width: 35, height: 35, marginTop: 30, marginBottom: 10, marginLeft: 30 }} source={require('../assets/group.png')} />

      </View>

    </SafeAreaView>
  )
};
export default Group;