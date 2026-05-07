import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { hp, rf, wp } from '.././constants/ResponsiveUI';
import { useNavigation } from '@react-navigation/native';
import { useAppTheme } from '.././hooks/themeContext';
import { HeaderProps } from '.././interfaces/type';
import fontFamilies from '.././assets/fonts/font';

export default function Header({ text, backText }: HeaderProps) {
  const navigation = useNavigation();
  const { theme } = useAppTheme();
  return (
    <View style={styles.header}>
      <Text
        onPress={() => navigation.goBack()}
        style={[styles.backText, { color: theme.text }]}
      >
        {backText}
      </Text>
      <Text style={[styles.title, { color: theme.text }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  backText: {
    fontSize: rf(16),
    marginBottom: hp(10),
    fontFamily: fontFamilies.poppins.bold,
  },
  header: {
    flexDirection: 'row',
  },
  title: {
    flex: 1,
    textAlign: 'center',
    marginRight: wp(15),
    fontSize: rf(16),
    fontFamily: fontFamilies.poppins.bold,
  },
});
