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
    btnSecondary: {


    },
    search: {
        alignItems: 'center',
        paddingHorizontal: 20,
        borderRadius: 30,
        backgroundColor: COLORS.light,
        marginLeft: 80,
        marginTop: -38,
        width: 300,
        flexDirection: 'row',
    },
    card: {
        height: 180,
        width: 330,
        marginLeft: 30,
        marginTop: 20,
        borderRadius: 25,
        elevation: 13,
        backgroundColor: COLORS.white,
    },
    header: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,


    },
    textinput: {
        borderWidth: 1,
        borderColor: 'black',
        height: '50',
        width: '80%',
        borderRadius: 6,
        marginLeft: 15
    },
    texttitle: {
        marginLeft: 15,
        marginTop: 10,

    },
    smallinput: {
        borderWidth: 1,
        borderColor: 'black',
        // marginTop: '1%',
        marginLeft: '4%',
        width: '37%',
        borderRadius: 6,
    },
    sidebox: {
        borderWidth: 1,
        borderColor: 'black',
        marginTop: '-13%',
        marginLeft: '47%',
        width: '37%',
        borderRadius: 6,
    },
    gender: {
        marginLeft: '47%',
        marginTop: '-5%'
    },
    description: {
        borderWidth: 1,
        borderColor: 'black',
        marginTop: '-20%',
        marginLeft: '50%',
        // marginBottom: '20',
        width: '30%',
        borderRadius: 6,
    },
    container: {
        // flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        width: '100%',
        height: '100%',
        marginTop: '100'


    },



})

export default STYLES;