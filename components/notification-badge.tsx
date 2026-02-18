import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

import { BASE_UNIT, BrandColors, CustomFonts } from '@/constants/theme';

type BadgeSize = 'regular' | 'compact';

type NotificationBadgeProps = {
  count: number;
  size?: BadgeSize;
};

export default function NotificationBadge({
  count,
  size = 'regular',
}: NotificationBadgeProps) {
  const isRegular = size === 'regular';

  const containerStyle: ViewStyle[] = [styles.container];
  const textStyle: TextStyle[] = [
    styles.text,
    isRegular ? styles.regularText : styles.compactText,
  ];

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>{count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: BASE_UNIT * 3,
    height: BASE_UNIT * 3,
    borderRadius: (BASE_UNIT * 3) / 2,
    backgroundColor: '#e34f6a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: CustomFonts.bold,
    fontWeight: 'bold',
    color: BrandColors.white,
    textAlign: 'center',
  },
  regularText: {
    fontSize: BASE_UNIT * 2,
    lineHeight: BASE_UNIT * 3,
  },
  compactText: {
    fontSize: BASE_UNIT * 1.75,
    lineHeight: BASE_UNIT * 2.5,
  },
});
