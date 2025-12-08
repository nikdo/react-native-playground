import { StyleSheet, Text, TextProps } from 'react-native';

import { CustomFonts } from '@/constants/theme';

type DefaultTextProps = TextProps;

export default function DefaultText({ style, ...props }: DefaultTextProps) {
  return <Text style={[styles.default, style]} {...props} />;
}

const styles = StyleSheet.create({
  default: {
    fontFamily: CustomFonts.default,
  },
});
