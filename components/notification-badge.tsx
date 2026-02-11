import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

import { CustomFonts } from '@/constants/theme';

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
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#e34f6a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: CustomFonts.bold,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  regularText: {
    fontSize: 16,
    lineHeight: 24,
  },
  compactText: {
    fontSize: 14,
    lineHeight: 20,
  },
});
