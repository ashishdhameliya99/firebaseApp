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
  autoCapital?: 'none' | 'sentences' | 'words' | 'characters' | 'undefined';
}
export interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  textStyle?: StyleProp<TextStyle>;
}
