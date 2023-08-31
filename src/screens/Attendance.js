import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,TouchableOpacity,
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
      <TouchableOpacity onPress={navigation.goBack}>
        <Image  style={STYLES.inputIcon} source={require('../assets/arrow.png')} />
     
        {/* <Icon name="arrow-back-ios" size={28} onPress={navigation.goBack} /> */}
        <Text style={{fontSize: 20, fontWeight: 'bold',marginLeft:20,marginTop:10}}> Back </Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
    )
};
export  default Attendance;