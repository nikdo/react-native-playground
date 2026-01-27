import { Pressable, StyleSheet, Text, ViewStyle, TextStyle } from 'react-native';

import { CustomFonts } from '@/constants/theme';

// Base unit for 8pt grid system
const base = 8;

type ButtonType = 'primary' | 'subtle';
type ButtonSize = 'regular' | 'compact';

type ButtonProps = {
  caption?: string;
  type?: ButtonType;
  size?: ButtonSize;
  onPress?: () => void;
  disabled?: boolean;
};

export default function Button({
  caption = 'Submit',
  type = 'primary',
  size = 'regular',
  onPress,
  disabled = false,
}: ButtonProps) {
  const isPrimary = type === 'primary';
  const isRegular = size === 'regular';

  const buttonStyle: ViewStyle[] = [
    styles.buttonBase,
    isPrimary ? styles.primaryBackground : styles.subtleBackground,
    isRegular ? styles.regularPadding : styles.compactPadding,
    ...(disabled ? [styles.disabled] : []),
  ];

  const textStyle: TextStyle[] = [
    styles.textBase,
    isPrimary ? styles.primaryText : styles.subtleText,
    isRegular ? styles.regularText : styles.compactText,
  ];

  return (
    <Pressable
      style={({ pressed }) => [
        ...buttonStyle,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={textStyle}>{caption}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonBase: {
    borderWidth: 2,
    borderColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: base,
  },
  primaryBackground: {
    backgroundColor: '#000000',
  },
  subtleBackground: {
    backgroundColor: '#FFFFFF',
  },
  regularPadding: {
    paddingVertical: 1.5 * base - 2, // -2 compensating for border
    paddingHorizontal: 4 * base - 2, // -2 compensating for border
    minWidth: 20 * base,
    borderRadius: 3 * base,
  },
  compactPadding: {
    // 0.5 * base - 2 (border) + 2 (20px line-height not on grid) = 0.5 * base
    paddingVertical: 0.5 * base,
    paddingHorizontal: 1.5 * base - 2, // -2 compensating for border
    borderRadius: 2 * base,
  },
  textBase: {
    fontFamily: CustomFonts.bold,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  subtleText: {
    color: '#000000',
  },
  regularText: {
    fontSize: 2 * base,
    lineHeight: 3 * base,
  },
  compactText: {
    fontSize: 14, // design exception
    lineHeight: 20, // design exception
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
});
