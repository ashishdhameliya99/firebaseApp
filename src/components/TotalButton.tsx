import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { color } from '.././utils/color';
import { wp } from '.././constants/ResponsiveUI';
import fontFamilies from '.././assets/fonts/font';
import { useAppTheme } from '.././hooks/themeContext';
import { TotalButtonProps } from '.././interfaces/type';

export default function TotalButton({ onPress, text }: TotalButtonProps) {
  const { theme } = useAppTheme();
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: theme.dashBoardButton }]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: theme.dashBoardButtonText }]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: color.lightGreen,
    paddingHorizontal: wp(10),
    alignSelf: 'flex-start',
    borderRadius: 10,
    marginBottom: wp(10),
    marginLeft: wp(5),
  },
  buttonText: {
    fontFamily: fontFamilies.poppins.Regular,
    color: 'white',
  },
});
