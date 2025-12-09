import { StyleSheet, Text, View } from 'react-native';

import { CustomFonts } from '@/constants/theme';

type ClaimProps = {
  text: string;
};

export default function Claim({ text }: ClaimProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 8,
    padding: 20,
    width: '100%',
  },
  text: {
    fontSize: 32,
    lineHeight: 32,
    fontWeight: 'bold',
    fontFamily: CustomFonts.claim,
    textTransform: 'uppercase',
    textAlign: 'center',
    flexWrap: 'wrap',
  },
});
