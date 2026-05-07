import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '.././hooks/themeContext';
import { StyledButtonProps } from '.././interfaces/type';
import { color } from '.././utils/color';
import fontFamilies from '.././assets/fonts/font';
import { wp } from '.././constants/ResponsiveUI';

const TodoListButton = ({ title, onPress, isSelected }: StyledButtonProps) => {
  const { theme } = useAppTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        { backgroundColor: theme.button },
        isSelected && styles.highlightedButton,
      ]}
    >
      <Text style={[styles.text, isSelected && styles.highlightedText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: wp(10),
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  highlightedButton: {
    backgroundColor: '#7BA05B',
    borderColor: '#abc1cfff',
  },
  text: {
    color: color.white,
    fontFamily: fontFamilies.poppins.Regular,
    textAlign: 'center',
  },
  highlightedText: {
    color: color.white,
    fontFamily: fontFamilies.poppins.semiBold,
  },
});

export default TodoListButton;
