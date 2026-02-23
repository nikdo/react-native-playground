import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import ColorSwatch from "./color-swatch";
import { BrandColors, CustomFonts } from "@/constants/theme";

type SwatchConfig = {
  id: string;
  dark: string;
  light: string;
};

const SWATCHES: SwatchConfig[] = [
  { id: "black", dark: BrandColors.black, light: BrandColors.white },
  { id: "sky", dark: BrandColors.darkSky, light: BrandColors.sky },
  { id: "pink", dark: BrandColors.darkPink, light: BrandColors.pink },
  { id: "peach", dark: BrandColors.darkPeach, light: BrandColors.peach },
  { id: "purple", dark: BrandColors.darkPurple, light: BrandColors.purple },
  { id: "green", dark: BrandColors.darkGreen, light: BrandColors.green },
  { id: "yellow", dark: BrandColors.darkYellow, light: BrandColors.yellow },
];

type Selection = { swatchId: string; shade: "dark" | "light" };

type SwatchToggleProps = {
  onColorChange: (colors: {
    background: string;
    button: string;
    inverted: boolean;
  }) => void;
};

export default function SwatchToggle({ onColorChange }: SwatchToggleProps) {
  const [selection, setSelection] = useState<Selection>({
    swatchId: "black",
    shade: "light",
  });

  const handleSelect = (swatch: SwatchConfig, shade: "dark" | "light") => {
    setSelection({ swatchId: swatch.id, shade });
    if (shade === "light") {
      onColorChange({
        background: swatch.light,
        button: swatch.dark,
        inverted: false,
      });
    } else {
      onColorChange({
        background: swatch.dark,
        button: swatch.dark,
        inverted: true,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label} maxFontSizeMultiplier={1}>Background color</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {SWATCHES.map((swatch) => (
          <ColorSwatch
            key={swatch.id}
            darkColor={swatch.dark}
            lightColor={swatch.light}
            activeShade={
              selection.swatchId === swatch.id ? selection.shade : null
            }
            onSelectDark={() => handleSelect(swatch, "dark")}
            onSelectLight={() => handleSelect(swatch, "light")}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  label: {
    fontFamily: CustomFonts.default,
    fontSize: 16,
    color: BrandColors.black,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
});
