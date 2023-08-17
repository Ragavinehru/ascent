import { StyleSheet } from 'react-native';
import COLORS from '../consts/color';
import { Navigation } from 'react-native-navigation';
const STYLES = StyleSheet.create({
    inputContainer: { flexDirection: 'row', marginTop: 20, },
    inputIcon: { marginTop: 15, width: 30, height: 20, position: 'absolute' },
    input: {
        color: COLORS.light,
        paddingLeft: 30,
        borderBottomWidth: 1,
        borderColor: COLORS.primary,
        borderBottomWidth: 0.5,
        flex: 1,
        fontSize: 18,
    },
    btnPrimary: {

        height: 60,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        fontSize: 70,
    },
    search: {
        alignItems: 'center',
        paddingHorizontal: 20,
        borderRadius: 30,
        backgroundColor: COLORS.light,
        marginLeft: 80,
        marginTop: -45,
        width: 300,
        flexDirection: 'row',
    },
    card: {
        height: 200,
        width: 330,
        // marginHorizontal: 10,
        // marginBottom: 20,
        marginLeft: 30,
        marginTop: 20,
        borderRadius: 25,
        elevation: 13,
        backgroundColor: COLORS.white,
    },




})

export default STYLES;