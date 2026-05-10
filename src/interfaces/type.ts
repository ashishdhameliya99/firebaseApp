import {
  GestureResponderEvent,
  ImageProps,
  StyleProp,
  TextInputProps,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';

// =========================
// INPUT PROPS
// =========================

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

// =========================
// INPUT BOX
// =========================

export interface InputBoxProps extends TextInputProps {}

// =========================
// BUTTON
// =========================

export interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  textStyle?: StyleProp<TextStyle>;
  color?: string;
  disabled?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

// =========================
// TOAST
// =========================

type ToastType = 'success' | 'error' | 'info';

export interface ToastProps {
  type?: ToastType;
  title: string;
  message?: string;
}

// =========================
// THEME
// =========================

export interface ThemeContextType {
  dark: boolean;
  toggleTheme: () => void;
}

// =========================
// HEADER
// =========================

export interface HeaderProps {
  text: string;
  backText?: string;
}

// =========================
// ADD ITEM
// =========================

export interface AddItemProps {
  onClose?: () => void;
}

// =========================
// TODO
// =========================

export interface Todo {
  id: string;
  name: string;
  email: string;
  phone: string;
  countryCode: string;
  dob: string;
  favorite: boolean;
}

// =========================
// USER TODO DATA
// =========================

export interface UserTodoData {
  uid: string;
  todos: Todo[];
  saveDraft: Todo[];
}

// =========================
// MODAL
// =========================

export interface ModalBoxProps {
  item: boolean;
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

// =========================
// TOTAL BUTTON
// =========================

export interface TotalButtonProps {
  onPress?: () => void;
  text: string;
}

// =========================
// STYLED BUTTON
// =========================

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
