/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator, View, Text, Pressable, TextInput,
  Image, TouchableOpacity, ScrollView,
} from 'react-native';
import * as p from '../_m/p';
import { useGlobalState } from '../_m/use_set_state';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/FontAwesome'; // Example using FontAwesome

// Define the types for the text input state
interface TextInputState {
  phonenumber: string;
  password: string;
  verifypassword: string;
}

interface ProfileTextInputState {
  fullname: string;
  email: string;
}

export function LoaderStarts_screen() {
  const { Loader } = useGlobalState();
  if (!Loader.Active) { return null; }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        zIndex: 10,
        elevation: 10,
      }}
    >
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Loading...</Text>
    </View>
  );
}

export function Authentication_Screen() {
  const { CurrentUser, Loader } = useGlobalState();
  
  useEffect(() => {
    CurrentUser.SessionId.set(false);
  }, [CurrentUser]);

  const [textInput, settextInput] = useState<TextInputState>({
    phonenumber: '8506317422',
    password: '',
    verifypassword: '',
  });

  const handleChange_textInput = (field: keyof TextInputState, value: string) => {
    settextInput((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const [pageToShow, setpageToShow] = useState<'loginpage' | 'signuppage' | 'forgotpage'>('loginpage');
  
  const pageToShowFun = (ag: 'loginpage' | 'signuppage' | 'forgotpage') => {
    return pageToShow === ag;
  };

  return (
    <View style={[p.styles.container, { backgroundColor: 'aliceblue' }]}>
      <View style={{ flex: 1 }} />
      <View style={{
        flex: 4,
        backgroundColor: '#fff',
        borderTopEndRadius: 22,
        borderTopStartRadius: 22,
        padding: 12,
      }}>
        {pageToShowFun('loginpage') && (
          <Text style={p.styles.title}>Login</Text>
        )}
        {pageToShowFun('signuppage') && (
          <Text style={p.styles.title}>Create an Account!</Text>
        )}
        {pageToShowFun('forgotpage') && (
          <Text style={p.styles.title}>Forgot Password?</Text>
        )}

        <TextInput
          style={p.styles.input}
          placeholder="Phone Number"
          value={textInput.phonenumber}
          onChangeText={(v) => handleChange_textInput('phonenumber', v)}
        />

        {!pageToShowFun('forgotpage') && (
          <TextInput
            style={p.styles.input}
            placeholder="Password"
            value={textInput.password}
            onChangeText={(v) => handleChange_textInput('password', v)}
            secureTextEntry
          />
        )}

        {pageToShowFun('signuppage') && (
          <>
            <Text style={{ color: '#5ebeec' }}>Verify Password!</Text>
            <TextInput
              style={[p.styles.input, { marginBottom: 7 }]}
              placeholder="Verify Password"
              value={textInput.verifypassword}
              onChangeText={(v) => handleChange_textInput('verifypassword', v)}
              secureTextEntry
            />
          </>
        )}

        {pageToShowFun('loginpage') && (
          <Pressable
            onPress={() => setpageToShow('forgotpage')}
            style={{ marginBottom: 12, marginTop: 1 }}
          >
            <Text style={{ color: '#5ebeec' }}>Forgot?</Text>
          </Pressable>
        )}

        {pageToShowFun('loginpage') && (
          <Pressable
            style={p.styles.pressableButton}
            onPress={async () => {
                await p._handle_Signin(textInput );
            }}
          >
            <Text style={p.styles.pressableButtonText}>SignIn</Text>
          </Pressable>
        )}

        {pageToShowFun('signuppage') && (
          <Pressable
            style={p.styles.pressableButton}
            onPress={() => {
              // p._handle_Signup(textInput, _setisLoggedIn_returnUserId);
            }}
          >
            <Text style={p.styles.pressableButtonText}>Create Account</Text>
          </Pressable>
        )}

        {pageToShowFun('forgotpage') && (
          <Pressable
            style={p.styles.pressableButton}
            onPress={() => {
              p._handle_Recover(textInput).then(() => {
                settextInput({ phonenumber: '', password: '', verifypassword: '' });
              });
            }}
          >
            <Text style={p.styles.pressableButtonText}>Recover Account</Text>
          </Pressable>
        )}

        {pageToShowFun('loginpage') && (
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text>Don't have an account?</Text>
            <Pressable
              onPress={() => setpageToShow('signuppage')}
            >
              <Text style={{ color: '#5ebeec' }}> SignUp</Text>
            </Pressable>
          </View>
        )}

        {pageToShowFun('signuppage') && (
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text>Have an account?</Text>
            <Pressable
              onPress={() => setpageToShow('loginpage')}
            >
              <Text style={{ color: '#5ebeec' }}> Login</Text>
            </Pressable>
          </View>
        )}

        {pageToShowFun('forgotpage') && (
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Text>Remember password?</Text>
            <Pressable
              onPress={() => setpageToShow('loginpage')}
            >
              <Text style={{ color: '#5ebeec' }}> Login</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}

export function Home_Screen({ route, navigation }: { route: any, navigation: any }) {
  const { CurrentUser } = useGlobalState();

  return (
    <ScrollView style={[p.styles.container, {}]}>
      <View>
        <Image source={{ uri: 'https://assets.libsyn.com/secure/show/91622/e27_Ra.jpg' }}
          style={{
            backgroundColor: 'red', height: 440,
            resizeMode: 'contain', borderRadius: 12,
          }} />
        <View style={p.styles.peoples_card}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Alex, 25</Text>
          <Text style={{ fontSize: 14, color: '#ccc' }}>Job</Text>
          <Text>Love traveling, coffee, and adventures!</Text>
        </View>

        <View >
          <TouchableOpacity >
            <Icon name="close" size={40} color="red" />
          </TouchableOpacity>
          <TouchableOpacity >
            <Icon name="heart" size={40} color="green" />
          </TouchableOpacity>
        </View>
      </View>

      <Text>User Id up {CurrentUser.SessionId.get}.js Working on your app!</Text>
      <Pressable style={p.styles.pressableButton} onPress={async () => { }}>
        <Text style={p.styles.pressableButtonText}>Test button</Text>
      </Pressable>

      <Pressable
        style={p.styles.pressableButton}
        onPress={() => navigation.navigate('Profile')}
      >
        <Text style={p.styles.pressableButtonText}>Profile</Text>
      </Pressable>

      <View style={{ backgroundColor: 'red', right: 0, position: 'absolute', bottom: 0 }}>
        <Icon name="home" size={30} color="blue" />
      </View>
    </ScrollView>
  );
}

export function ManageProfile_Screen({ navigation }: { navigation: any }) {
  const { CurrentUser, Loader } = useGlobalState();
  const [ProfileTextInput, setProfileTextInput] = useState<ProfileTextInputState>({
    fullname: '',
    email: '',
  });

  const handleChange_textInput = (field: keyof ProfileTextInputState, value: string) => {
    setProfileTextInput((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  useEffect(() => {
    Loader.Show(true);
    setTimeout(() => {
      (async () => {
        const userProfileRes = await p._http_request('POST', {
          cors_token: '111cors_tokencors_tokencors_tokors_token',
          action: 'nw95yiuw6iu',
          user_id: null // p.help.encodeStr(get_userId),
        });
        if (userProfileRes?.code === 200) {
          setProfileTextInput({
            fullname: userProfileRes?.user_info?.user_fullname ?? '',
            email: userProfileRes?.user_info?.user_email ?? '',
          });
        } else {
          Toast.show({
            type: 'info',
            text1: 'No user',
            text2: userProfileRes?.message ?? 'No User found!',
            position: 'bottom',
            visibilityTime: 15000,
          });
        }
      })();
      Loader.Show(false);
    }, 1000);
  }, [Loader]);

  return (
    <View style={[p.styles.container, { padding: 12 }]}>
      <Text>Fullname</Text>
      <TextInput
        style={p.styles.input}
        placeholder="Full Name"
        value={ProfileTextInput.fullname}
        onChangeText={(v) => handleChange_textInput('fullname', v)}
      />

      <Text>Email</Text>
      <TextInput
        style={p.styles.input}
        placeholder="Email"
        value={ProfileTextInput.email}
        onChangeText={(v) => handleChange_textInput('email', v)}
      />

      <Pressable style={p.styles.pressableButton} onPress={async () => { }}>
        <Text style={p.styles.pressableButtonText}>Update</Text>
      </Pressable>
    </View>
  );
}
