import { Pressable, View, StyleSheet } from 'react-native';
import { BrandColors } from '@/constants/theme';

type ColorSwatchProps = {
  darkColor: string;
  lightColor: string;
  activeShade: 'dark' | 'light' | null;
  onSelectDark: () => void;
  onSelectLight: () => void;
};

const DOT_SIZE = 12;

export default function ColorSwatch({
  darkColor,
  lightColor,
  activeShade,
  onSelectDark,
  onSelectLight,
}: ColorSwatchProps) {
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.half, { backgroundColor: darkColor }]}
        onPress={onSelectDark}
      >
        {activeShade === 'dark' && (
          <View style={[styles.dot, { backgroundColor: lightColor }]} />
        )}
      </Pressable>
      <Pressable
        style={[styles.half, { backgroundColor: lightColor }]}
        onPress={onSelectLight}
      >
        {activeShade === 'light' && (
          <View style={[styles.dot, { backgroundColor: darkColor }]} />
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 44,
    height: 68,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: BrandColors.black,
    overflow: 'hidden',
  },
  half: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
  },
});
