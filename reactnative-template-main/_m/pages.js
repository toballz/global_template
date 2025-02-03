/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  Pressable,
  TextInput,
} from 'react-native';
import * as p from '../_m/p';
import { useGlobalState } from '../_m/use_set_state';
import Toast from 'react-native-toast-message';

/*
  loaderStarts_screen ()

*/
export function LoaderStarts_screen() {
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
        zIndex:10,
        elevation:10,
      }}
    >
      <ActivityIndicator size="large" color="#0000ff" />
      <Text>Loading...</Text>
    </View>
  );
}

/*
  Authentication_Screen  ()

*/
export function Authentication_Screen() {
  const { _setisLoggedIn_returnUserId, _setisLoading } = useGlobalState();

  useEffect(() => {
    _setisLoggedIn_returnUserId(false);
  });
  const [textInput, settextInput] = useState({
    email: '',
    password: '',
    verifypassword: '',
  });
  const handleChange_textInput = (field, value) => {
    settextInput((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  //1:FORGOT 2:SIGNUP
  const [pageToShow, setpageToShow] = useState('loginpage');
  const pageToShowFun = (ag) => {
    return pageToShow && pageToShow === ag;
  };

  return (
    <View
      style={[
        p.styles.container,
        {
          backgroundColor: 'aliceblue',
        },
      ]}
    >
      <View style={{ flex: 1 }} />
      <View
        style={{
          flex: 4,
          backgroundColor: '#fff',
          borderTopEndRadius: 22,
          borderTopStartRadius: 22,
          padding: 12,
        }}
      >
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
          style={[p.styles.input]}
          placeholder="Email"
          value={textInput.email}
          onChangeText={(v) => handleChange_textInput('email', v)}
        />

        {!pageToShowFun('forgotpage') && (
          <TextInput
            style={[p.styles.input]}
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
            onPress={() => {
              setpageToShow('forgotpage');
            }}
            style={{ marginBottom: 12, marginTop: 1 }}
          >
            <Text style={{ color: '#5ebeec' }}>Forgot?</Text>
          </Pressable>
        )}

        {/**/}
        {/**/}
        {pageToShowFun('loginpage') && (
          <Pressable
            style={p.styles.pressableButton}
            onPress={() => {
              _setisLoading(true);
              setTimeout(function () {
                p._handle_Login(textInput, _setisLoggedIn_returnUserId);
                _setisLoading(false);
              }, 1000);
            }}
          >
            <Text style={p.styles.pressableButtonText}>Login</Text>
          </Pressable>
        )}
        {pageToShowFun('signuppage') && (
          <Pressable
            style={p.styles.pressableButton}
            onPress={() => {
              p._handle_Signup(textInput, _setisLoggedIn_returnUserId);
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
                settextInput((prevState) => {
                  const updatedState = {};
                  Object.keys(prevState).forEach((key) => {
                    updatedState[key] = ''; // Set each field to an empty string
                  });
                  return updatedState;
                });
              });
            }}
          >
            <Text style={p.styles.pressableButtonText}>Recover Account</Text>
          </Pressable>
        )}
        {/**/}
        {/**/}
        {pageToShowFun('loginpage') && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text>Don't have an account?</Text>
            <Pressable
              onPress={() => {
                setpageToShow('signuppage');
              }}
            >
              <Text style={{ color: '#5ebeec' }}> SignUp</Text>
            </Pressable>
          </View>
        )}
        {pageToShowFun('signuppage') && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text>Have an account?</Text>
            <Pressable
              onPress={() => {
                setpageToShow('loginpage');
              }}
            >
              <Text style={{ color: '#5ebeec' }}> Login</Text>
            </Pressable>
          </View>
        )}
        {pageToShowFun('forgotpage') && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text>Remember password?</Text>
            <Pressable
              onPress={() => {
                setpageToShow('loginpage');
              }}
            >
              <Text style={{ color: '#5ebeec' }}> Login</Text>
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}

/*
  Home_Screen ()

*/
export function Home_Screen({ route, navigation }) {
  //const   {get_setuserId}  = route.params;
  const {
    _isLoggedIn_returnUserId,
    _setisLoggedIn_returnUserId,
  } = useGlobalState();
  const get_setuserId = _isLoggedIn_returnUserId;

  return (
    <View style={[p.styles.container]}>
      <Text>User Id up {get_setuserId}.js Working on your app!</Text>
      <Pressable style={p.styles.pressableButton} onPress={async () => {}}>
        <Text style={p.styles.pressableButtonText}>Test button</Text>
      </Pressable>

      <Pressable
        style={p.styles.pressableButton}
        onPress={() => {
          p.handleLogout(_setisLoggedIn_returnUserId);
        }}
      >
        <Text style={p.styles.pressableButtonText}>Logout</Text>
      </Pressable>
      <Pressable
        style={p.styles.pressableButton}
        onPress={() => {
          navigation.navigate('Profile'); // Pass parameters here
        }}
      >
        <Text style={p.styles.pressableButtonText}>Profile</Text>
      </Pressable>
    </View>
  );
}

/*
  ManageProfile_Screen ()

*/
export function ManageProfile_Screen({ navigation }) {
  const { _isLoggedIn_returnUserId, _setisLoading } = useGlobalState();
  const get_userId = _isLoggedIn_returnUserId;
  const [ProfileTextInput, setProfileTextInput] = useState({
    fullname: '',
    email: '',
  });
  const handleChange_textInput = (field, value) => {
    setProfileTextInput((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  useEffect(() => {
    _setisLoading(true);
    setTimeout(function () {
      (async function () {
        const userProfileRes = await p._http_request('POST', {
          cors_token: '111cors_tokencors_tokencors_tokors_token',
          action: 'nw95yiuw6iu',
          user_id: p.help.encodeStr(get_userId),
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
      _setisLoading(false);
    }, 1000);
  }, [_setisLoading, get_userId]);

  return (
    <>
      <View style={[p.styles.container, { padding: 12 }]}>
        <Text>Fullname</Text>
        <TextInput
          style={[p.styles.input]}
          placeholder="Full Name"
          value={ProfileTextInput.fullname}
          onChangeText={(v) => {
            handleChange_textInput('fullname', v);
          }}
        />

        <Text>Email</Text>
        <TextInput
          style={[p.styles.input]}
          placeholder="Email"
          value={ProfileTextInput.email}
          onChangeText={(v) => {
            handleChange_textInput('email', v);
          }}
        />

        <Pressable style={p.styles.pressableButton} onPress={async () => {}}>
          <Text style={p.styles.pressableButtonText}>Update</Text>
        </Pressable>
      </View>
    </>
  );
}
