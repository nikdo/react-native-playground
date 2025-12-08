import { Pressable, StyleSheet, Text, View } from 'react-native';

import { CustomFonts } from '@/constants/theme';

type PrimaryButtonProps = {
  text: string;
  onPress?: () => void;
};

export default function PrimaryButton({ text, onPress }: PrimaryButtonProps) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={onPress}>
        <Text style={styles.buttonText}>{text}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#000000',
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 48,
    minWidth: '60%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: CustomFonts.default,
  },
});
