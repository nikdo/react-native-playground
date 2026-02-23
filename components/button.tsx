import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  TextStyle,
} from "react-native";

import ShimmerOverlay from "@/components/shimmer-overlay";
import MaterialIcon from "@/components/material-icon";
import { BrandColors, CustomFonts } from "@/constants/theme";

// Base unit for 8pt grid system
const base = 8;

const opacity = {
  disabled: 0.56,
  pressed: 0.75,
  pressedSubtleOverlay: 0.08,
};

type ButtonVariant = "filled" | "outlined";
type ButtonSize = "regular" | "compact";

type ButtonProps = {
  caption?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  color?: string;
  inverted?: boolean;
};

export default function Button({
  caption = "Submit",
  variant = "filled",
  size = "regular",
  icon,
  onPress,
  disabled = false,
  loading = false,
  color = BrandColors.black,
  inverted = false,
}: ButtonProps) {
  const isFilled = variant === "filled";
  const isRegular = size === "regular";
  const isDisabled = disabled || loading;

  const inkColor = inverted ? BrandColors.white : color;
  const onInkColor = inverted ? color : BrandColors.white;

  const buttonStyle: ViewStyle[] = [
    styles.buttonBase,
    isFilled
      ? { backgroundColor: inkColor, borderColor: "transparent" }
      : { borderColor: inkColor },
    isRegular ? styles.regularPadding : styles.compactPadding,
  ].filter(Boolean) as ViewStyle[];

  const textStyle: TextStyle[] = [
    styles.textBase,
    isFilled ? { color: onInkColor } : { color: inkColor },
    isRegular ? styles.regularText : styles.compactText,
  ];

  return (
    <Pressable
      style={({ pressed }) => [
        ...buttonStyle,
        pressed && !isDisabled && isFilled && { opacity: opacity.pressed },
        isDisabled && { opacity: opacity.disabled },
      ]}
      onPress={onPress}
      disabled={isDisabled}
    >
      {({ pressed }) => (
        <>
          {pressed && !isDisabled && !isFilled && (
            <View
              style={[
                StyleSheet.absoluteFill,
                {
                  backgroundColor: inkColor,
                  opacity: opacity.pressedSubtleOverlay,
                },
              ]}
            />
          )}
          {loading && (
            <ShimmerOverlay color={isFilled ? onInkColor : inkColor} />
          )}
          {icon && (
            <MaterialIcon
              name={icon}
              size={isRegular ? 24 : 20}
              color={isFilled ? onInkColor : inkColor}
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
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: base,
    overflow: "hidden",
  },
  outlinedBackground: {
    backgroundColor: "transparent",
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
    fontWeight: "bold",
    textAlign: "center",
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
