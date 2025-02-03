import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

const apiUrl = 'http://192.168.56.1/fodonn.oo.folder/api/api.php';
export const help = {
  encodeStr: (st) => {
//.split('').reverse().join('');
  },
  decodeStr: (st) => {

  },
};

export const namer = {
  userId: 'argsyk6tD',
};

export const log = (s, c = '#fff') => {
  //
  console.log('%c$>>>>>>>>>>>:0:<<', 'color: ' + c + '; font-size: 16px;');
  console.log(s);
  console.log('%cEND LOG\n', 'color: ' + c + '; font-size: 16px;');
}; 


export const _http_request = async (
  reqType = 'GET',
  bodyArray = {},
  headerArray = { 'Content-Type': 'application/json' },
  displayErr = false
) => {
  log('http', 'yellow');
  try {
    const response = await fetch(apiUrl, {
      method: reqType,
      headers: headerArray,
      ...(reqType === 'POST' && { body: JSON.stringify(bodyArray) }),
    });
    if (displayErr) {
      console.log(await response.text());
      return;
    }
    if (reqType === 'POST') {
      return await response.json();
    } else {
      return await response.text();
    }
  } catch (error) {
    log('Error: _http_request: ' + error, 'red');
  }
  return null;
};

// Check login status
export const isLoggedIn_returnUserId = async () => {
  try {
    const userId = await AsyncStorage.getItem(namer.userId);
    return userId || false;
  } catch (error) {
    log('Error checking login status: ' + error, 'red');
    return false;
  }
};

// Handle login
export const _handle_Login = async (textInput_, get_setuserId_) => {
  let err = false;
  if (textInput_?.email?.length <= 5 || textInput_?.password?.length <= 5) {
    err = 'Invalid username or password!';
  }

  if (!err) {
    const loginRes = await _http_request('POST', {
      cors_token: '111cors_tokencors_tokencors_tokors_token',
      action: 'guest-login',
      login_email: help.encodeStr(textInput_.email),
      login_password: help.encodeStr(textInput_.password),
    });
    if (loginRes?.code === 200) {
      let uid = loginRes?.user_id + '' ?? '';
      if (uid !== '') {
        await AsyncStorage.setItem(namer.userId, uid);
        get_setuserId_(uid);
      }
    } else { err = loginRes?.message ?? loginRes; }
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
};

// Handle signup
export const _handle_Signup = async (textInput_, get_setuserId) => {
  let err = false;
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
      let uid = signupRes?.user_id + '' ?? '';
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
// Handle recover
export const _handle_Recover = async (textInput_, get_setuserId_) => {
  let err = false;
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
        text2:
          'Your recovery instruction has been sent to your email, if this email exists.',
        position: 'bottom',
        visibilityTime: 15000,
      });
    } else { err = loginRes?.message ?? loginRes; }
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
export const handleLogout = async (_setisLoggedIn_returnUserId) => {
  try {
    await AsyncStorage.removeItem(namer.userId);
    _setisLoggedIn_returnUserId(false);
  } catch (error) {
    log('Error logging out: ' + error, 'red');
  }
};

// Styles
// Styles
// Styles
// Styles
// Styles
// Styles
// Styles
// Styles
// Styles
// Styles
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
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
});
