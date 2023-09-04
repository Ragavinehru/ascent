import React from 'react';
import { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    Image,
    Button,
    ToastAndroid, Alert,KeyboardAvoidingView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import COLORS from '../consts/color';
import STYLES from '../styles';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Navigation } from 'react-native-navigation';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { FIREBASE_AUTH } from '../firebase/firebaseConfig';
import { ActivityIndicator } from 'react-native-paper';
import {signInWithEmailAndPassword} from 'firebase/auth';




// import auth from '@react-native-firebase/auth';
//firebase auth

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
     const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async ()=>{
        setLoading(true);
        try{
            const response = await signInWithEmailAndPassword(auth,email,password);
            console.log('succes',response);
            
        }catch(error){
            console.log(error);
            Alert('reg failed'+error.message);
        }finally{
            setLoading(false);
        }
        navigation.navigate('HomeScreen');
        }
    ////start 12 minutes
        // const signUp = async ()=>{
        //     setLoading(true);
        //     try{
        //         const response = await auth.createUserWithEmailAndPassword(auth,email,password);
        //         console.log(response);
        //         Alert('chck ur emails')
        //     }catch(error){
        //         console.log(error);
        //         Alert('signup failed'+error.message);  
        //     }finally{
        //         setLoading(false);
        //     }
        //     }
        

    // const handleSubmit = () => {
    //   setIsSubmitting(true);
  
    //   // Firebase login
    //   auth()
    //     .signInWithEmailAndPassword(email, password)
    //     .then((userCredential) => {
    //       setIsSubmitting(false);
    //       // You can access the signed-in user with userCredential.user
    //       // Example: const user = userCredential.user;
    //       // Perform actions after successful login here
    //     })
    //     .catch((error) => {
    //       setIsSubmitting(false);
    //       Alert.alert("Error", error.message);
    //     });
  
    //   setEmail("");
    //   setPassword("");
    // };
    // const handleLogin = () => {
    //     firebase.auth().signInWithEmailAndPassword(email, password)
    //       .then(() => {
    //         // User logged in successfully
    //         console.log('User logged in successfully');
    //         // You can navigate to another screen or perform other actions here

    //       })
    //       .catch(error => {
    //         console.error('Login failed:', error.message);
    //       });
    //   };
    
    return (

        <SafeAreaView
            style={{ paddingHorizontal: 20, flex: 1, backgroundColor: COLORS.white }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flexDirection: 'row', marginTop: 40 }}>

                    <Image style={{ width: 65, height: 16 }} source={require('../assets/venzo.png')} />

                </View>
                <View style={{ marginTop: 70 }}>
                    <Text style={{ fontSize: 27, fontWeight: 'bold', color: COLORS.dark }}>
                        Welcome,
                    </Text>
                    <Text style={{ fontSize: 19, fontWeight: 'bold', color: COLORS.light }}>
                        Sign in to continue
                    </Text>
                </View>
                <View style={{ marginTop: 20 }}>
                <KeyboardAvoidingView behaviour='padding'>
                    <View style={STYLES.inputContainer}>
                        
                    <Image  style={STYLES.inputIcon} source={require('../assets/email.png')} />
                        {/* <Icon name="home" size={30} color="black" /> */}
                        <TextInput
                            value={email}
                            onChangeText={(text) => setEmail(text)}
                            placeholder="Email"
                            style={STYLES.input}
                        />
                    </View>
                    <View style={STYLES.inputContainer}>
                        {/* <Icon
                            name="lock"
                            color={COLORS.light}
                            size={20}
                            style={STYLES.inputIcon}
                        /> */}
                         <Image  style={STYLES.inputIcon} source={require('../assets/lock.png')} />
                        <TextInput
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                            placeholder="Password"
                            style={STYLES.input}
                            secureTextEntry
                        />
                    </View>
                    <View  style={STYLES.btnPrimary}>

                        { loading ? (<ActivityIndicator size="large" color='#0000ff'/>
                          ):(
                        <>


                            <Button title="SignIn" onPress={()=>signIn()} >
                                {/* // onPress={() => navigation.navigate('HomeScreen')} */}
                                
                                {/* // onPress={handleLogin} */}
                                
                                {/* // disabled={isSubmitting}
                                // onPress={handleSubmit}> */}

                            </Button>
                            {/* <Button title="SignUp"  onPress={()=>signUp()}/> */}
                            </>
                      )}
                     
                    </View>
                </KeyboardAvoidingView>
                </View>
                <View>
                    <Image style={{ width: 340, height: 340 }} source={require('../assets/login.png')}
                    />
                </View>


            </ScrollView>
        </SafeAreaView>
    )

}
export default Login;



























  // import 'react-native-gesture-handler';
// import React from 'react';
// import {
//     SafeAreaView,
//     View,
//     Text,
//     TextInput,
//     Image,
//     Button,
//     ToastAndroid,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import COLORS from '../consts/color';
// // import STYLES from '../styles';
// import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
// // import { Navigation } from 'react-native-navigation';



// const Login = () => {
//     return (
//         <SafeAreaView
//             style={{ paddingHorizontal: 20, flex: 1, backgroundColor: COLORS.white }}>
//             <ScrollView showsVerticalScrollIndicator={false}>
//                 <View style={{ flexDirection: 'row', marginTop: 40 }}>
//                     <Text style={{ fontWeight: 'bold', fontSize: 22, color: COLORS.dark }}>
//                         CARS
//                     </Text>
//                     <Text
//                         style={{ fontWeight: 'bold', fontSize: 22, color: COLORS.primary }}>
//                         24
//                     </Text>
//                 </View>
//                 <View style={{ marginTop: 70 }}>
//                     <Text style={{ fontSize: 27, fontWeight: 'bold', color: COLORS.dark }}>
//                         Welcome Back,
//                     </Text>
//                     <Text style={{ fontSize: 19, fontWeight: 'bold', color: COLORS.light }}>
//                         Sign in to continue
//                     </Text>
//                 </View>
//                 <View style={{ marginTop: 20 }}>
//                     <View style={STYLES.inputContainer}>
//                         <Icon
//                             name="mail-outline"
//                             color={COLORS.light}
//                             size={20}
//                             style={STYLES.inputIcon}
//                         />
//                         <TextInput
//                             value={email}
//                             onChangeText={text => setEmail(text)}
//                             placeholder="Email"
//                             style={STYLES.input}
//                         />
//                     </View>
//                     <View style={STYLES.inputContainer}>
//                         <Icon
//                             name="lock-outline"
//                             color={COLORS.light}
//                             size={20}
//                             style={STYLES.inputIcon}
//                         />
//                         <TextInput
//                             value={password}
//                             onChangeText={text => setPassword(text)}
//                             placeholder="Password"
//                             style={STYLES.input}
//                             secureTextEntry
//                         />
//                     </View>
//                     <View style={STYLES.btnPrimary}>

//                         <TouchableOpacity>

//                             <Button title="SignIn">
//                                 {' '}
//                             </Button>
//                         </TouchableOpacity>
//                     </View>
//                     <View
//                         style={{
//                             marginVertical: 20,
//                             flexDirection: 'row',
//                             justifyContent: 'center',
//                             alignItems: 'center',
//                         }}>
//                         <View style={STYLES.line}></View>
//                         <Text style={{ marginHorizontal: 5, fontWeight: 'bold' }}>OR</Text>
//                         <View style={STYLES.line}></View>
//                     </View>
//                     {/* <View
//                         style={{
//                             flexDirection: 'row',
//                             justifyContent: 'space-between',
//                         }}>
//                         <View style={STYLES.btnSecondary}>
//                             <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
//                                 Sign in with
//                             </Text>
//                             <Image
//                                 style={STYLES.btnImage}
//                                 source={require('../../assets/facebook.png')}
//                             />
//                         </View>
//                         <View style={{ width: 10 }}></View>
//                         <View style={STYLES.btnSecondary}>
//                             <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
//                                 Sign in with
//                             </Text>
//                             <Image
//                                 style={STYLES.btnImage}
//                                 source={require('../../assets/google.png')}
//                             />
//                         </View>
//                     </View> */}
//                 </View>

//                 <View
//                     style={{
//                         flexDirection: 'row',
//                         alignItems: 'flex-end',
//                         justifyContent: 'center',
//                         marginTop: 40,
//                         marginBottom: 20,
//                     }}>
//                     <Text style={{ color: COLORS.light, fontWeight: 'bold', fontSize: 17 }}>
//                         Don`t have an account ?
//                     </Text>
//                     <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
//                         <Text
//                             style={{ color: COLORS.pink, fontWeight: 'bold', fontSize: 17 }}>
//                             Sign up
//                         </Text>
//                     </TouchableOpacity>
//                 </View>
//             </ScrollView>
//         </SafeAreaView>
//     );
// };

// export default Login;