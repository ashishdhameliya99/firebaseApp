import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import fontFamilies from '.././assets/fonts/font';
import { rf, wp } from '.././constants/ResponsiveUI';
import { color } from '.././utils/color';
interface CardTitle {
  title: string | number;
}
export default function CardTitleDigit({ title }: CardTitle) {
  return (
    <View>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontFamily: fontFamilies.poppins.bold,
    fontSize: rf(20),
    padding: wp(10),
    color: color.white,
  },
});
