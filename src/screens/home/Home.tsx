import React, { useState } from 'react';
import { Text, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { ParamListBase } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from './homeStyle';
import { errorToast, successToast } from '../../components/Toast';

const Home = () => {
  const user = auth().currentUser;
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'OK',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              await auth().signOut();
              successToast('success', 'User success logout');
              navigation.goBack();
            } catch {
              errorToast('error', 'user not logout');
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
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome {user?.email}</Text>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 20 }} />
      ) : (
        <TouchableOpacity onPress={handleLogout} style={styles.loginButton}>
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default Home;
