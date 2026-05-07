import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { lightTheme, darkTheme } from '.././utils/color';
import { CustomButtonProps } from '.././interfaces/type';
import { useAppTheme } from '.././hooks/themeContext';
import fontFamilies from '.././assets/fonts/font';
import { wp } from '.././constants/ResponsiveUI';

const CustomButton = ({ title, onPress }: CustomButtonProps) => {
  const { dark } = useAppTheme();
  const theme = dark ? darkTheme : lightTheme;

  const styles = StyleSheet.create({
    button: {
      backgroundColor: theme.button,
      padding: wp(12),
      borderRadius: 8,
      paddingHorizontal: wp(20),
    },
    buttonTitle: {
      color: '#fff',
      textAlign: 'center',
      fontFamily: fontFamilies.poppins.Regular,
    },
  });

  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonTitle}>{title}</Text>
    </TouchableOpacity>
  );
};
export default CustomButton;
