import { StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import { CountryPicker } from 'react-native-country-codes-picker';
import DatePicker from 'react-native-date-picker';

import InputBox from '../../components/InputBox';
import { string } from '../../constants/string';
import { hp, wp } from '../../constants/ResponsiveUI';
import { color } from '../../utils/color';
import { useAppTheme } from '../../hooks/themeContext';
import Header from '../../components/Header';
import Button from '../../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { addDraft, addTodo, updateTodo } from '../../redux/slice/toDoSlice';
import Toast from 'react-native-toast-message';
import { RootState } from '../../utils/reduxUtil';
import {
  ParamListBase,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { AddItemProps, Todo } from '../../interfaces/type';
import { route } from '../../constants/routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ModalBox from '../../components/ModalBox';
import fontFamilies from '../../assets/fonts/font';
import { getUniqueId } from '../../helpers/global';
import auth from '@react-native-firebase/auth';

export default function AddItem({ onClose }: AddItemProps) {
  const { theme } = useAppTheme();
  const routes = useRoute();
  const { data } = (routes.params as { data: Todo }) || {};

  const item = data ? true : false;
  const user = auth().currentUser;
  const [name, setName] = useState(data?.name || '');
  const [email, setEmail] = useState(data?.email || '');
  const [phone, setPhone] = useState(data?.phone || '');
  const [openCountry, setOpenCountry] = useState(false);
  const [countryCode, setCountryCode] = useState(data?.countryCode || '+91');
  const [favorite, setFavorite] = useState<boolean | string>(
    data?.favorite ?? false,
  );
  const [showModal, setShowModal] = useState(false);

  const [dob, setDob] = useState(data?.dob ? new Date(data.dob) : new Date());
  const [openDate, setOpenDate] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const todos = useSelector((state: RootState) => state.user.todos);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString();
  };

  const isAnyFieldFilled = () => {
    return !!(name || email || phone);
  };

  const isAllFieldsFilled = () => {
    return !!(name && email && phone && dob && countryCode);
  };

  const handleCancel = () => {
    setName('');
    setEmail('');
    setPhone('');
    setCountryCode('+91');
    setDob(new Date());
    setFavorite(false);
  };

  const dataValidation = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Email',
        text2: 'Please enter a valid email',
        position: 'top',
      });
      return false;
    }

    if (phone.length !== 10) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Phone',
        text2: 'Phone must be exactly 10 digits',
        position: 'top',
      });
      return false;
    }

    const emailExists = todos.some(u => {
      if (item) {
        return u.email === email && u.id !== data?.id;
      }
      return u.email === email;
    });

    if (emailExists) {
      Toast.show({
        type: 'error',
        text1: 'Duplicate Email',
        text2: 'Email already exists',
        position: 'top',
      });
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    const DATA = {
      id: item ? data.id : getUniqueId(),
      name,
      email,
      phone,
      countryCode,
      dob: dob.toISOString(),
      favorite,
    };
    if (isAllFieldsFilled()) {
      if (!dataValidation()) return;

      if (DATA) {
        const isUnchanged =
          data?.name === DATA?.name &&
          data?.email === DATA?.email &&
          data?.phone === DATA?.phone &&
          data?.dob === DATA?.dob;

        if (isUnchanged) {
          navigation.navigate(route.main);
          handleCancel();
          return;
        }
        if (!item) {
          dispatch(addTodo({ uid: user?.uid || '', todo: DATA }));
          setShowModal(true);
        } else {
          dispatch(updateTodo(DATA));
          setShowModal(true);
        }
      }
    } else if (isAnyFieldFilled()) {
      dispatch(addDraft(DATA));

      Toast.show({
        type: 'info',
        text1: 'Saved as Draft',
        text2: 'Incomplete data saved',
        position: 'top',
      });
      onClose?.();
      navigation.navigate(route.saveDraft);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Empty Form',
        text2: 'Please fill at least one field',
        position: 'top',
      });
      return;
    }

    handleCancel();
  };
  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
        handleCancel();
        navigation.navigate(route.main);
        onClose?.();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showModal, onClose, navigation]);
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.card }]}>
      {item ? (
        <Header text="Update Item" backText="Back" />
      ) : (
        <Header text="Add Item" />
      )}

      <InputBox
        placeholder={string.addItem.name}
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <InputBox
        placeholder={string.addItem.Email}
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />

      <View style={styles.phoneContainer}>
        <View style={styles.codeButton}>
          <Button
            title={countryCode}
            onPress={() => setOpenCountry(true)}
            color={theme.button}
          />
        </View>
        <TextInput
          placeholder="Phone"
          value={phone}
          onChangeText={(text: string) => {
            const cleaned = text.replace(/[^0-9]/g, '');
            setPhone(cleaned);
          }}
          style={styles.phoneInput}
          maxLength={10}
          keyboardType="number-pad"
        />
      </View>

      <InputBox
        placeholder="Select DOB"
        value={formatDate(dob)}
        editable={false}
        style={styles.input}
        onPressIn={() => setOpenDate(true)}
      />

      <View style={styles.favorite}>
        <Text style={[styles.favText, { color: theme.text }]}>Favorite</Text>
        <Switch value={!!favorite} onValueChange={setFavorite} />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title={
            isAllFieldsFilled()
              ? 'Save'
              : isAnyFieldFilled()
              ? 'Save Draft'
              : 'Save'
          }
          onPress={handleSubmit}
          color={theme.button}
          disabled={!isAnyFieldFilled()}
        />

        <Button title="Cancel" onPress={handleCancel} color="gray" />
      </View>

      <CountryPicker
        show={openCountry}
        lang="en"
        pickerButtonOnPress={items => {
          setCountryCode(items.dial_code);
          setOpenCountry(false);
        }}
      />
      <ModalBox
        item={item}
        modalVisible={showModal}
        setModalVisible={setShowModal}
      />
      <DatePicker
        modal
        open={openDate}
        date={dob}
        mode="date"
        onConfirm={date => {
          setDob(date);
          setOpenDate(false);
        }}
        onCancel={() => setOpenDate(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(20),
  },

  input: {
    width: '100%',
    height: hp(50),
    borderWidth: 1,
    borderColor: color.borderColor,
    borderRadius: 8,
    paddingHorizontal: wp(15),
    backgroundColor: color.liteWhite,
    marginBottom: hp(10),
    fontFamily: fontFamilies.poppins.Regular,
  },
  codeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
    height: 50,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: color.borderColor,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: color.liteWhite,
    height: 50,
  },

  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    height: '100%',
  },

  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
    marginTop: 20,
  },

  favorite: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 10,
  },
  favText: {
    fontFamily: fontFamilies.poppins.Regular,
  },
});
