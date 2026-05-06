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
