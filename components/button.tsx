import { Pressable, StyleSheet, Text, View, ViewStyle, TextStyle } from 'react-native';

import MaterialIcon from '@/components/material-icon';
import { BrandColors, CustomFonts } from '@/constants/theme';

// Base unit for 8pt grid system
const base = 8;

type ButtonType = 'primary' | 'subtle';
type ButtonSize = 'regular' | 'compact';

type ButtonProps = {
  caption?: string;
  type?: ButtonType;
  size?: ButtonSize;
  icon?: string;
  onPress?: () => void;
  disabled?: boolean;
  color?: string;
  inverted?: boolean;
};

export default function Button({
  caption = 'Submit',
  type = 'primary',
  size = 'regular',
  icon,
  onPress,
  disabled = false,
  color = BrandColors.black,
  inverted = false,
}: ButtonProps) {
  const isPrimary = type === 'primary';
  const isRegular = size === 'regular';

  const inkColor = inverted ? BrandColors.white : color;
  const onInkColor = inverted ? color : BrandColors.white;

  const buttonStyle: ViewStyle[] = [
    styles.buttonBase,
    { borderColor: inkColor },
    isPrimary ? { backgroundColor: inkColor } : styles.subtleBackground,
    isRegular ? styles.regularPadding : styles.compactPadding,
  ].filter(Boolean) as ViewStyle[];

  const textStyle: TextStyle[] = [
    styles.textBase,
    isPrimary ? { color: onInkColor } : { color: inkColor },
    isRegular ? styles.regularText : styles.compactText,
  ];

  return (
    <Pressable
      style={({ pressed }) => [
        ...buttonStyle,
        pressed && !disabled && isPrimary && { opacity: 0.75 },
        disabled && { opacity: 0.56 },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {({ pressed }) => (
        <>
          {pressed && !disabled && !isPrimary && (
            <View style={[StyleSheet.absoluteFill, { backgroundColor: inkColor, opacity: 0.08 }]} />
          )}
          {icon && (
            <MaterialIcon
              name={icon}
              size={isRegular ? 24 : 20}
              color={isPrimary ? onInkColor : inkColor}
            />
          )}
          <Text style={textStyle}>{caption}</Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonBase: {
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: base,
    overflow: 'hidden',
  },
  subtleBackground: {
    backgroundColor: 'transparent',
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
  regularText: {
    fontSize: 2 * base,
    lineHeight: 3 * base,
  },
  compactText: {
    fontSize: 14, // design exception
    lineHeight: 20, // design exception
  },
});
