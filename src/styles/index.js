import { StyleSheet } from 'react-native';
import COLORS from '../consts/color';
import { Navigation } from 'react-native-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const STYLES = StyleSheet.create({
    inputContainer: { flexDirection: 'row', marginTop: 20, },

    inputIcon: { marginTop: 15, width: 15, height: 15, position: 'absolute' },
    searchimg: {
        width: 45, height: 33,
    },
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
        color: "black",
        backgroundColor: COLORS.light,
        borderRadius: 10,
        marginTop: -40,
        marginRight: -40,
        marginLeft: 220,
        // position: ''
    },
    newgoal: {
        borderWidth: 1,
        padding: 10,
        color: "black",
        backgroundColor: COLORS.light,
        borderRadius: 10,
        marginTop: 10,
        // marginRight: -40,
        marginLeft: 80,
        position: 'absolute'
    },
    new: {
        borderWidth: 1,
        padding: 10,
        color: "black",
        backgroundColor: COLORS.light,
        borderRadius: 10,
        marginTop: 80,
        // marginRight: -40,
        marginLeft: 150,
        position: 'absolute'
    },
    newgroup: {
        borderWidth: 1,
        padding: 10,
        color: "black",
        backgroundColor: COLORS.light,
        borderRadius: 10,
        marginTop: -100,
        marginRight: -40,
        marginLeft: 90,
        position: 'absolute',
        // marginBottom: -100
    },
    text: {
        borderWidth: 1,
        padding: 10,
        color: COLORS.white,
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        marginTop: 30,
        marginLeft: 70,
        position: 'absolute'
    },
    searchhome: {
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
        marginLeft: 27,
        marginTop: 30,
        marginBottom: 20,
        borderRadius: 25,
        elevation: 9,
        backgroundColor: COLORS.white,
    },
    cardupcoming: {
        height: 200,
        width: 360,
        marginLeft: 27,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 25,
        elevation: 9,
        backgroundColor: COLORS.white
    },

    cardevent: {
        height: 140,
        width: 300,
        marginLeft: 10,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 25,
        elevation: 9,
        backgroundColor: COLORS.light,
    },
    cardcheck: {
        height: 530,
        width: 360,
        marginLeft: 17,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 25,
        elevation: 9,
        backgroundColor: COLORS.white,
    },
    cardview: {
        height: 530,
        width: 360,
        marginLeft: 17,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 25,
        elevation: 9,
        backgroundColor: COLORS.white,
    },
    cardgoal: {
        height: 150,
        width: 330,
        marginLeft: 9,
        marginTop: 40,
        marginBottom: 20,
        borderRadius: 25,
        elevation: 9,
        backgroundColor: COLORS.white,
    },
    cardcomment: {

        height: 200,
        width: 350,
        marginLeft: 17,
        marginTop: -290,
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
    texttype: {
        borderWidth: 1,
        borderColor: 'grey',
        // height: '17%',
        width: '79%',
        borderRadius: 6,
        marginLeft: 35,
        // color: '#ffff'
    },
    textcheck: {
        borderWidth: 1,
        borderColor: 'grey',
        // height: '17%',
        width: '88%',
        borderRadius: 6,
        marginLeft: 3,
        // color: '#ffff'
    },
    texttime: {
        borderWidth: 1,
        borderColor: 'grey',
        height: '77%',
        width: '86%',
        alignContent: 'center',
        borderRadius: 6,
        marginLeft: -45,
        marginRight: 66,
        color: 'blue',
    },
    starttime: {
        borderWidth: 1,
        borderColor: 'grey',
        height: '77%',
        width: '78%',
        alignContent: 'center',
        borderRadius: 6,
        marginLeft: -25,
        marginRight: 66,
        color: 'blue',
    },
    searchinput: {
        borderWidth: 1,
        borderColor: 'black',
        // height: '10',
        width: '140%', paddingBottom: 1,
        borderRadius: 6,
        marginLeft: 15
    },
    goalinput: {
        borderWidth: 1,
        borderColor: 'black',
        // height: '10%',
        width: '70%', paddingBottom: 1,
        borderRadius: 6,
        marginLeft: 15
    },
    yesinput: {
        borderWidth: 1,
        borderColor: 'black',
        height: 34,
        width: '50%',
        borderRadius: 6,
        marginLeft: 95,
        marginBottom: 10,

        // position:'absolute'
    },
    containerf: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    // modalContainer: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //   },
    //   closeButton: {
    //     // position: 'absolute',
    //     top: 10,
    //     // right: 10,
    //     color: 'red',
    //     // padding: 10,
    //     borderRadius: 5,
    //   },
    postinput: {
        borderWidth: 1,
        borderColor: 'black',
        // height: '32%',
        width: '70%',
        borderRadius: 6,
        marginLeft: 19,
        marginTop: -70
        // marginBottom: 50
    },
    texttitle: {
        marginLeft: 15,
        marginTop: 10,

    },
    smallinput: {
        borderWidth: 1,
        borderColor: 'black',
        marginTop: '2%',
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
        marginTop: 5,
        backgroundColor: 'white'


    },
    cell: {
        flex: 1,
        textAlign: 'center',

    },
    cellname: {
        fontSize: 12,
        color: 'black',
        textAlign: 'center',
        flex: 1,
    },
    cellstatus: {
        fontSize: 12,
        color: 'green',
        textAlign: 'center',
        flex: 1,


    },
    cellHeader: {
        flex: 1,
        backgroundColor: 'lightgray',
        padding: 8,

    },
    headerCell: {
        flex: 2,
        backgroundColor: '#D3D3D3',
        color: 'black',
        fontWeight: 'bold',
        fontSize: 10,
        padding: 12,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: 'white',
        // height:100,
        // width: 300
    },
    attenCell: {
        flex: 2,
        backgroundColor: COLORS.light,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 10,
        padding: 12,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: 'white',
        // height:100,
        // width: 300
    },
    search: {
        flexDirection: 'row',
        marginTop: 30,
        width: '50%',
        borderWidth: 1,
        height: 42,
        marginLeft: 40, borderRadius: 10,
        backgroundColor: COLORS.light
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    datePicker: {
        width: 200,
        marginBottom: 20,
    },
    selectedDate: {
        fontSize: 16,
    },

})

export default STYLES;