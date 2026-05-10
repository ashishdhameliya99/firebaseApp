import React, { useEffect, useState } from 'react';
import { addDraft, addTodo, updateTodo } from '../../redux/slice/toDoSlice';
import { StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { CountryPicker } from 'react-native-country-codes-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useAppTheme } from '../../hooks/themeContext';
import { hp, wp } from '../../constants/ResponsiveUI';
import DatePicker from 'react-native-date-picker';
import { RootState } from '../../utils/reduxUtil';
import InputBox from '../../components/InputBox';
import { string } from '../../constants/string';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Toast from 'react-native-toast-message';
import { color } from '../../utils/color';
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
  const isEdit = !!data;
  const user = auth().currentUser;
  const uid = user?.uid ?? '';
  const dispatch = useDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [name, setName] = useState(data?.name || '');
  const [email, setEmail] = useState(data?.email || '');
  const [phone, setPhone] = useState(data?.phone || '');
  const [countryCode, setCountryCode] = useState(data?.countryCode || '+91');
  const [favorite, setFavorite] = useState<boolean>(data?.favorite ?? false);
  const [dob, setDob] = useState(data?.dob ? new Date(data.dob) : new Date());
  const [openCountry, setOpenCountry] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const todos = useSelector((state: RootState) => {
    const user = state.todo.users.find(item => item.uid === uid);
    console.log('state==', state.todo.users);
    return user?.todos || [];
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString();
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setCountryCode('+91');
    setDob(new Date());
    setFavorite(false);
  };

  const isAnyFieldFilled = () => {
    return !!(name || email || phone);
  };

  const isAllFieldsFilled = () => {
    return !!(name && email && phone && countryCode && dob);
  };

  const validateData = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Email',
        text2: 'Please enter valid email',
        position: 'top',
      });

      return false;
    }

    if (phone.length !== 10) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Phone',
        text2: 'Phone must be 10 digits',
        position: 'top',
      });

      return false;
    }

    const emailExists = todos.some(todo => {
      if (isEdit) {
        return todo.email === email && todo.id !== data?.id;
      }

      return todo.email === email;
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
    const todoData: Todo = {
      id: isEdit ? data.id : getUniqueId(),
      name,
      email,
      phone,
      countryCode,
      dob: dob.toISOString(),
      favorite,
    };

    if (isAllFieldsFilled()) {
      if (!validateData()) return;

      const isUnchanged =
        data?.name === todoData.name &&
        data?.email === todoData.email &&
        data?.phone === todoData.phone &&
        data?.countryCode === todoData.countryCode &&
        data?.dob === todoData.dob &&
        data?.favorite === todoData.favorite;

      if (isEdit && isUnchanged) {
        navigation.navigate(route.home);

        return;
      }

      if (!isEdit) {
        dispatch(
          addTodo({
            uid,
            todo: todoData,
          }),
        );

        Toast.show({
          type: 'success',
          text1: 'Todo Added',
          text2: 'New todo added successfully',
          position: 'top',
        });
      } else {
        dispatch(
          updateTodo({
            uid,
            todo: todoData,
          }),
        );

        Toast.show({
          type: 'success',
          text1: 'Todo Updated',
          text2: 'Todo updated successfully',
          position: 'top',
        });
      }
      setShowModal(true);

      resetForm();
      navigation.navigate(route.home);
    } else if (isAnyFieldFilled()) {
      dispatch(
        addDraft({
          uid,
          todo: todoData,
        }),
      );

      Toast.show({
        type: 'info',
        text1: 'Draft Saved',
        text2: 'Incomplete data saved as draft',
        position: 'top',
      });

      onClose?.();

      navigation.navigate(route.saveDraft);

      resetForm();
    } else {
      Toast.show({
        type: 'error',
        text1: 'Empty Form',
        text2: 'Please fill at least one field',
        position: 'top',
      });
    }
  };

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);

        navigation.navigate(route.home);

        onClose?.();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showModal, navigation, onClose]);

  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: theme.card,
        },
      ]}
    >
      {isEdit ? (
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
          maxLength={10}
          keyboardType="number-pad"
          style={styles.phoneInput}
          onChangeText={(text: string) => {
            const cleaned = text.replace(/[^0-9]/g, '');

            setPhone(cleaned);
          }}
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
        <Text
          style={[
            styles.favText,
            {
              color: theme.text,
            },
          ]}
        >
          Favorite
        </Text>

        <Switch value={favorite} onValueChange={setFavorite} />
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

        <Button title="Cancel" onPress={resetForm} color="gray" />
      </View>

      <CountryPicker
        show={openCountry}
        lang="en"
        pickerButtonOnPress={item => {
          setCountryCode(item.dial_code);

          setOpenCountry(false);
        }}
      />

      <DatePicker
        modal
        mode="date"
        open={openDate}
        date={dob}
        onConfirm={date => {
          setDob(date);

          setOpenDate(false);
        }}
        onCancel={() => setOpenDate(false)}
      />

      <ModalBox
        item={isEdit}
        modalVisible={showModal}
        setModalVisible={setShowModal}
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

  codeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
    height: 50,
  },

  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    height: '100%',
    fontFamily: fontFamilies.poppins.Regular,
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

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 20,
  },
});
