import React, { useState } from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithCredential,
  signOut,
} from 'firebase/auth';
import InputField from '../../components/InputText';
import { icon } from '../../assets/icons/icon';
import { styles } from './registerStyle';
import { auth } from '../../utils/firebaseConfig';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  AppleAuthProvider,
  GoogleAuthProvider,
} from '@react-native-firebase/auth';
import appleAuth from '@invertase/react-native-apple-authentication';
import { errorToast, successToast } from '../../components/Toast';

const Register = ({ setTab }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [RePassword, setRePassword] = useState('');
  const [Loading, setLoading] = useState(false);

  // const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleSignup = async () => {
    if (!email || !password || !RePassword) {
      errorToast('Invalid', 'please fill all field');
      return;
    }

    if (password !== RePassword) {
      errorToast('error', 'password do not match');
      return;
    }

    setLoading(true);

    try {
      const data = await createUserWithEmailAndPassword(auth, email, password);
      const user = data.user;
      console.log('Registered user:', user);

      await signOut(auth);

      successToast('Success', 'Account create success');
      setTab('login');
    } catch {
      errorToast('error', 'signup failed');
    } finally {
      setLoading(false);
    }
  };

  GoogleSignin.configure({
    webClientId:
      '1021574425223-j7e9arqqmu85utu85q5cb44279gso0p5.apps.googleusercontent.com',
  });

  async function onGooglePress() {
    let googleData = await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });
    console.log('===========', googleData);
    const signInResult = await GoogleSignin.signIn();
    console.log('++++++++++++++', signInResult);
    let idToken = signInResult.data?.idToken;
    console.log('idToken', idToken);
    if (!idToken) {
      throw new Error('No ID token found');
    }

    const googleCredential = GoogleAuthProvider.credential(
      signInResult.data?.idToken,
    );

    return signInWithCredential(getAuth(), googleCredential);
  }

  async function onAppleButtonPress() {
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });

    if (!appleAuthRequestResponse.identityToken) {
      throw new Error('Apple Sign-In failed - no identify token returned');
    }

    const { identityToken, nonce } = appleAuthRequestResponse;
    const appleCredential = AppleAuthProvider.credential(identityToken, nonce);

    return signInWithCredential(getAuth(), appleCredential);
  }
  return (
    <KeyboardAvoidingView
      style={styles.loginContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView style={styles.container}>
        <Text style={styles.label}>Email</Text>
        <InputField
          placeholder="Enter your email"
          value={email}
          onChange={setEmail}
          leftIconSource={icon.email}
          contextmenu={true}
        />

        <Text style={styles.label}>Password</Text>
        <InputField
          placeholder="Enter your password"
          secureTextEntry
          value={password}
          onChange={setPassword}
          leftIconSource={icon.lock}
          contextmenu={true}
        />

        <Text style={styles.label}>Re Password</Text>
        <InputField
          placeholder="Confirm your password"
          secureTextEntry
          value={RePassword}
          onChange={setRePassword}
          leftIconSource={icon.lock}
          contextmenu={true}
        />

        {Loading ? (
          <ActivityIndicator size="large" color="#ccc" />
        ) : (
          <TouchableOpacity onPress={handleSignup} style={styles.loginButton}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        )}

        <View style={styles.dividerRow}>
          <View style={styles.line} />
          <Text style={styles.or}>Or continue with</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialBtn} onPress={onGooglePress}>
            <Image source={icon.google} style={styles.icon} />
            <Text>Google</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.socialBtn}
            onPress={onAppleButtonPress}
          >
            <Image source={icon.apple} style={styles.icon} />
            <Text>Apple</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;
