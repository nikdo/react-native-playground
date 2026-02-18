import { useState } from 'react';
import { View, StyleSheet } from 'react-native';

import ColorSwatch from './color-swatch';
import { BrandColors } from '@/constants/theme';

type SwatchConfig = {
  id: string;
  dark: string;
  light: string;
};

const SWATCHES: SwatchConfig[] = [
  { id: 'black', dark: BrandColors.black, light: BrandColors.white },
  { id: 'sky', dark: BrandColors.darkSky, light: BrandColors.sky },
  { id: 'pink', dark: BrandColors.darkPink, light: BrandColors.pink },
  { id: 'peach', dark: BrandColors.darkPeach, light: BrandColors.peach },
  { id: 'purple', dark: BrandColors.darkPurple, light: BrandColors.purple },
  { id: 'green', dark: BrandColors.darkGreen, light: BrandColors.green },
  { id: 'yellow', dark: BrandColors.darkYellow, light: BrandColors.yellow },
];

type Selection = { swatchId: string; shade: 'dark' | 'light' };

type SwatchToggleProps = {
  onColorChange: (color: string) => void;
};

export default function SwatchToggle({ onColorChange }: SwatchToggleProps) {
  const [selection, setSelection] = useState<Selection>({ swatchId: 'black', shade: 'light' });

  const handleSelect = (swatch: SwatchConfig, shade: 'dark' | 'light') => {
    setSelection({ swatchId: swatch.id, shade });
    onColorChange(shade === 'dark' ? swatch.dark : swatch.light);
  };

  return (
    <View style={styles.row}>
      {SWATCHES.map((swatch) => (
        <ColorSwatch
          key={swatch.id}
          darkColor={swatch.dark}
          lightColor={swatch.light}
          activeShade={selection.swatchId === swatch.id ? selection.shade : null}
          onSelectDark={() => handleSelect(swatch, 'dark')}
          onSelectLight={() => handleSelect(swatch, 'light')}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
});
