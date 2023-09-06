import { StyleSheet } from 'react-native';
import COLORS from '../consts/color';
import { Navigation } from 'react-native-navigation';
const STYLES = StyleSheet.create({
    inputContainer: { flexDirection: 'row', marginTop: 20, },
    inputIcon: { marginTop: 15, width: 15, height: 15, position: 'absolute' },
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
        // justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 34,
        fontSize: 70,

    },
    btnSecondary: {

        alignItems: 'center',


    },

    newuser: {
        borderWidth: 1,
        padding: 10,
        color: COLORS.white,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        marginTop: 20,
        marginRight: 100,
        marginLeft: 230,
    },
    text: {
        borderWidth: 1,
        padding: 10,
        color: COLORS.white,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        marginTop: 20,
        marginRight: 220,
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
        height: 200,
        width: 360,
        marginLeft: 17,
        marginTop: 20,
        borderRadius: 25,
        elevation: 13,
        backgroundColor: COLORS.white,
    },
    cardcomment: {

        height: 170,
        width: 350,
        marginLeft: 17,
        marginTop: -230,
        borderRadius: 25,
        elevation: 13,
        position: 'absolute',
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
    postinput: {
        borderWidth: 1,
        borderColor: 'black',
        height: '50',
        width: '76%',
        borderRadius: 6,
        marginLeft: 15,
        marginBottom: 50
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
    descriptioninput: {
        borderWidth: 1,
        borderColor: 'black',
        width: '37%',
        marginLeft: '45%',
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
        marginTop: '-34%',
        marginLeft: '50%',
        // marginBottom: '20',
        width: '30%',
        borderRadius: 6,
    },
    container: {

        width: '100%',
        height: '100%',
        marginTop: 50

    },
    space: {
        width: 70,
        height: 50
    },
    table: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        width: '90%',
        marginLeft: 20,
        marginTop: 5


    },
    cell: {
        flex: 1,
        textAlign: 'center',

    },
    cellHeader: {
        flex: 1,
        backgroundColor: 'lightgray',
        padding: 8,
    },


})

export default STYLES;