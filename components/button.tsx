import { Pressable, StyleSheet, Text, View, ViewStyle, TextStyle } from 'react-native';
import { ReactNode } from 'react';

import { BrandColors, CustomFonts } from '@/constants/theme';

// Base unit for 8pt grid system
const base = 8;

type ButtonType = 'primary' | 'subtle';
type ButtonSize = 'regular' | 'compact';

type ButtonProps = {
  caption?: string;
  type?: ButtonType;
  size?: ButtonSize;
  icon?: ReactNode;
  onPress?: () => void;
  disabled?: boolean;
  color?: string;
  inverted?: boolean;
};

// White overlay at 44% on black (#000) ≈ #707070 (close to target #6E7878).
// On white bg it's invisible; on black text/icons it lightens them to gray.
const DISABLED_OVERLAY_OPACITY = 0.44;

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
    disabled && styles.disabledBorder,
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
        pressed && !disabled && { overflow: 'hidden' as const },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {({ pressed }) => (
        <>
          {pressed && !disabled && (
            <View
              style={[
                StyleSheet.absoluteFill,
                isPrimary
                  ? inverted ? styles.pressedOverlayInverted : styles.pressedOverlayPrimary
                  : styles.pressedOverlaySubtle,
              ]}
            />
          )}
          {icon}
          <Text style={textStyle}>{caption}</Text>
          {disabled && <View style={[StyleSheet.absoluteFill, styles.disabledOverlay]} />}
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
  pressedOverlayPrimary: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  pressedOverlayInverted: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  pressedOverlaySubtle: {
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
  },
  disabledBorder: {
    borderColor: '#6E7878',
  },
  disabledOverlay: {
    backgroundColor: `rgba(255, 255, 255, ${DISABLED_OVERLAY_OPACITY})`,
  },
});
