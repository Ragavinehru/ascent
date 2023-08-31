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


const PopupEvent = ({ selectedItem, onClose }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>{selectedItem.label}</Text>
            <Text>{selectedItem.date} | {selectedItem.startHour}-{selectedItem.endHour}</Text>
            {/* Add more details here */}
            <TouchableOpacity onPress={onClose} style={{ marginTop: 20 }}>
                <Text>Close Popup</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PopupEvent;