import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { useGlobalState } from './use_set_state';

// Define API URL
const apiUrl = 'https://stable-dassie-remarkably.ngrok-free.app/fodonn.oo.folder/api/datingapp_apii.php';

// Helper functions for encoding/decoding
export const help = {
  encodeStr: (st: string): string => {
    // Placeholder for actual encoding logic
    return st.split('').reverse().join('');
  },
  decodeStr: (st: string): string => {
    // Placeholder for actual decoding logic
    return st.split('').reverse().join('');
  },
};

// Namer object to store userId
export const namer = {
  userId: 'argsyk6tD',
};

// Log function for debugging
export const log = (s: string, c: string = '#fff'): void => {
  console.log('%c$>>>>>>>>>>>:0:<<', `color: ${c}; font-size: 16px;`);
  console.log(s);
  console.log('%cEND LOG\n', `color: ${c}; font-size: 16px;`);
};

// HTTP request function (GET/POST)
export const _http_request = async (
  reqType: 'GET' | 'POST' = 'GET',
  bodyArray: Record<string, any> = {},
  headerArray: Record<string, string> = { 'Content-Type': 'application/json' },
  displayErr: boolean = false
): Promise<any | null> => {
  log('http', 'yellow');
  try {
    const response = await fetch(apiUrl, {
      method: reqType,
      headers: headerArray,
      ...(reqType === 'POST' && { body: JSON.stringify(bodyArray) }),
    });
    if (displayErr) {
      Toast.show({
        type: 'error',
        text1: 'Login Error',
        text2: await response.text(),
        position: 'bottom',
        visibilityTime: 15000,
      });
      return null;
    }
    if (reqType === 'POST') {
      return await response.json();
    } else {
      return await response.text();
    }
  } catch (error) {
    log('Error: _http_request: ' + error, 'red');
    return null;
  }
};

// Check if the user is logged in and return the userId
export const isLoggedIn_returnUserId = async (): Promise<string | false> => {
  try {
    const userId = await AsyncStorage.getItem(namer.userId);
    return userId || false;
  } catch (error) {
    log('Error checking login status: ' + error, 'red');
    return false;
  }
};

// Handle login
export const _handle_Signin = async (textInput_: { phonenumber: string; password: string }): Promise<void> => {
  const { Loader, CurrentUser } = useGlobalState();
  let err: string | false = false;

  if (textInput_.phonenumber.length <= 5) {
    err = 'Invalid username or password!';
  }

  Loader.Show(true);
  setTimeout(async () => {
    if (!err) {
      const loginRes = await _http_request('POST', {
        cors_token: '111cors_tokencors_tokencors_tokors_token',
        action: 'guest-login',
        user_phone: textInput_.phonenumber,
        user_password: textInput_.password,
      });
      if (loginRes?.code === 200) {
        CurrentUser.SessionId.set(loginRes?.cors_token ?? false);
        let uid = loginRes?.user_id ?? '';
        if (uid !== '') {
          // await AsyncStorage.setItem(namer.userId, uid);
          // get_setuserId_(uid);
        }
      } else {
        err = loginRes?.message ?? loginRes;
      }
    }

    if (err) {
      Toast.show({
        type: 'error',
        text1: 'Login Error',
        text2: err,
        position: 'bottom',
        visibilityTime: 15000,
      });
      Alert.alert('Login Failed', err);
    }
    Loader.Show(false);
  }, 1000);
};

// Handle signup
export const _handle_Signup = async (
  textInput_: { verifypassword: string; password: string; email: string },
  get_setuserId: (uid: string) => void
): Promise<void> => {
  let err: string | false = false;

  if (textInput_.verifypassword !== textInput_.password) {
    err = 'Passwords do not match!';
  } else if (textInput_.password.length <= 5) {
    err = 'Password should be greater than 5 characters!';
  } else if (textInput_.email.length <= 5) {
    err = 'Invalid Email!';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(textInput_.email)) {
    err = 'Invalid Email!!';
  }

  if (!err) {
    const signupRes = await _http_request(
      'POST',
      {
        cors_token: '111cors_tokencors_tokencors_tokors_token',
        action: '2bu4tywnr7',
        fullname: help.encodeStr('frederick owens'),
        email: help.encodeStr(textInput_.email),
        password: help.encodeStr(textInput_.password),
      },
      undefined,
      undefined
    );
    if (signupRes?.code === 200) {
      let uid = signupRes?.user_id ?? '';
      if (uid !== '') {
        await AsyncStorage.setItem(namer.userId, uid);
        get_setuserId(uid);
      }
    } else {
      err = signupRes?.message ?? 'Account not created!';
    }
  }
  if (err) {
    Toast.show({
      type: 'error',
      text1: 'Signup Error',
      text2: err,
      position: 'bottom',
      visibilityTime: 15000,
    });
    Alert.alert('Signup Failed', err);
  }
};

// Handle password recovery
export const _handle_Recover = async (
  textInput_: any
): Promise<void> => {
  let err: string | false = false;

  if (textInput_?.email?.length <= 5) {
    err = 'Invalid Email!';
  }

  if (!err) {
    const loginRes = await _http_request(
      'POST',
      {
        cors_token: '111cors_tokencors_tokencors_tokors_token',
        action: 'recover-p',
        forgot_email: help.encodeStr(textInput_.email),
      },
      undefined,
      undefined
    );
    if (loginRes?.code === 200) {
      Toast.show({
        type: 'success',
        text1: 'Recovery Success',
        text2: 'Your recovery instruction has been sent to your email, if this email exists.',
        position: 'bottom',
        visibilityTime: 15000,
      });
    } else {
      err = loginRes?.message ?? loginRes;
    }
  }

  if (err) {
    Toast.show({
      type: 'error',
      text1: 'Recovery Error',
      text2: err,
      position: 'bottom',
      visibilityTime: 15000,
    });
    Alert.alert('Recovery Error', err);
  }
};

// Handle logout
export const handleLogout = async (_setisLoggedIn_returnUserId: (status: boolean) => void): Promise<void> => {
  try {
    await AsyncStorage.removeItem(namer.userId);
    _setisLoggedIn_returnUserId(false);
  } catch (error) {
    log('Error logging out: ' + error, 'red');
  }
};

// Styles for the components
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingLeft: 7,
    paddingRight: 7,
    paddingTop: 5,
    position: 'relative',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 11,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  pressableButton: {
    borderRadius: 9,
    backgroundColor: '#5ebeec',
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 1,
  },
  pressableButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  peoples_card: {
    marginTop: 10,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 2,
  },
});
