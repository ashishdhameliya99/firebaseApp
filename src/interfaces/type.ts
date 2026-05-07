import {
  ImageProps,
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';

export interface Props {
  placeholder: string;
  secureTextEntry?: boolean;
  value: string;
  onChange: (text: string) => void;
  leftIconSource: ImageProps;
  rightIconSource?: ImageProps;
  isPasswordVisible?: boolean;
  contextmenu?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}
export interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  textStyle?: StyleProp<TextStyle>;
}

type ToastType = 'success' | 'error' | 'info';

export interface ToastProps {
  type?: ToastType;
  title: string;
  message?: string;
}

import { GestureResponderEvent, TextInputProps } from 'react-native';

export interface InputBoxProps extends TextInputProps {}

export interface CustomButtonProps {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  color: string;
  disabled?: boolean;
}

export interface ThemeContextType {
  dark: boolean;
  toggleTheme: () => void;
}

export interface HeaderProps {
  text: string;
  backText?: string;
}

export interface AddItemProps {
  show?: true;
  lang?: 'en';
  pickerButtonOnPress?: (item: any) => void;
}
export interface Todo {
  id: string;
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  dob: string;
  favorite: string | boolean;
}

export interface ModalBoxProps {
  item: {};
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

export interface AddItemProps {
  onClose: () => void;
}
export interface TotalButtonProps {
  onPress?: () => void;
  text: string;
}

export interface StyledButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  isSelected?: boolean;
  color?: string;
  theme?: {
    background: string;
    text: string;
    button: string;
  };
}
