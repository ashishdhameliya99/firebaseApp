import React, { useEffect, useState } from 'react';
import { addDraft, addTodo, updateTodo } from '../../redux/slice/toDoSlice';
import { Switch, Text, TextInput, View } from 'react-native';
import { CountryPicker } from 'react-native-country-codes-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { useAppTheme } from '../../hooks/themeContext';
import DatePicker from 'react-native-date-picker';
import { RootState } from '../../utils/reduxUtil';
import InputBox from '../../components/InputBox';
import { string } from '../../constants/string';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Toast from 'react-native-toast-message';
import {
  ParamListBase,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { AddItemProps, Todo } from '../../interfaces/type';
import { route } from '../../constants/routes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ModalBox from '../../components/ModalBox';
import { getUniqueId } from '../../helpers/global';
import auth from '@react-native-firebase/auth';
import { errorToast, successToast } from '../../components/Toast';
import { styles } from './AddItemStyle';

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
      errorToast('Invalid Email', 'Please enter valid email');
      return false;
    }

    if (phone.length !== 10) {
      errorToast('Invalid Phone', 'Phone must be 10 digit');
      return false;
    }

    const emailExists = todos.some(todo => {
      if (isEdit) {
        return todo.email === email && todo.id !== data?.id;
      }

      return todo.email === email;
    });

    if (emailExists) {
      errorToast('Duplicate email', 'Email already exist');
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
        successToast('success', 'New todo added successfully');
      } else {
        dispatch(
          updateTodo({
            uid,
            todo: todoData,
          }),
        );
        successToast('success', 'Todo updated successfully');
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
      errorToast('Empty form', 'Please fill at least one field');
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
