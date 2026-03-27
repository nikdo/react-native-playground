import { StyleSheet, View, ViewStyle } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { BASE_UNIT } from '@/constants/theme';

import * as flags3x2 from 'country-flag-icons/string/3x2';
import * as flags1x1 from 'country-flag-icons/string/1x1';

type CountryFlagVariant = 'circle' | '2:3';

type CountryFlagProps = {
  /** ISO 3166-1 alpha-2 country code, e.g. "US", "CZ" */
  code: string;
  variant?: CountryFlagVariant;
  /** Height for 2:3, diameter for circle */
  size?: number;
  style?: ViewStyle;
};

const flagMap3x2 = flags3x2 as Record<string, string>;
const flagMap1x1 = flags1x1 as Record<string, string>;

export default function CountryFlag({
  code,
  variant = '2:3',
  size = BASE_UNIT * 3,
  style,
}: CountryFlagProps) {
  if (variant === 'circle') {
    const svg = flagMap1x1[code];
    if (!svg) return null;

    const radius = size / 2;
    return (
      <View style={[styles.circle, { width: size, height: size, borderRadius: radius }, style]}>
        <SvgXml xml={svg} width={size} height={size} />
      </View>
    );
  }

  const svg = flagMap3x2[code];
  if (!svg) return null;

  const width = size * 1.5;
  return (
    <View style={[{ width, height: size, overflow: 'hidden' }, style]}>
      <SvgXml xml={svg} width={width} height={size} />
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    overflow: 'hidden',
  },
});
