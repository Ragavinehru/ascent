import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  Button,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/color';
import {ScrollView} from 'react-native-gesture-handler';
import STYLES from '../styles';
import { useNavigation } from '@react-navigation/native';


const Attendance =()=>{
  const navigation = useNavigation();
    return(
    <SafeAreaView style={{backgroundColor: COLORS.white}}>
      <View style={STYLES.header}>
        <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} />
        <Text style={{fontSize: 20, fontWeight: 'bold'}}> Back </Text>
      </View>

    </SafeAreaView>
    )
};
export  default Attendance;