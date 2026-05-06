import React, { useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from './homeStyle';

const Home = () => {
  const user = auth().currentUser;
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            setLoading(true);
            try {
              await auth().signOut();

              Toast.show({
                type: 'success',
                text1: 'Logged Out',
              });

              //   navigation.dispatch(
              //     CommonActions.reset({
              //       index: 0,
              //       routes: [{ name: 'Login' }],
              //     }),
              //   );
              navigation.goBack();
            } catch {
              Toast.show({
                type: 'error',
                text1: 'Logout Failed',
              });
            } finally {
              setLoading(false);
            }
          },
        },
      ],
      { cancelable: true },
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Welcome</Text>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user?.email}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>User ID</Text>
          <Text style={styles.value}>{user?.uid}</Text>
        </View>

        {loading ? (
          <ActivityIndicator style={{ marginTop: 20 }} />
        ) : (
          //   <SwipeButton title="Swipe to Logout" onSwipe={handleLogout} />
          <TouchableOpacity onPress={handleLogout} style={styles.loginButton}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Home;
