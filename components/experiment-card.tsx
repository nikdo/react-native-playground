import { Pressable, StyleSheet, Text, View } from 'react-native';

import { IconSymbol, IconSymbolName } from '@/components/ui/icon-symbol';
import { CustomFonts } from '@/constants/theme';

interface ExperimentCardProps {
  name: string;
  description: string;
  icon: IconSymbolName;
  onPress: () => void;
}

export default function ExperimentCard({
  name,
  description,
  icon,
  onPress,
}: ExperimentCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <IconSymbol name={icon} size={28} color="#333" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <IconSymbol name="chevron.right" size={16} color="#999" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  cardPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontFamily: CustomFonts.bold,
    color: '#000',
    marginBottom: 2,
  },
  description: {
    fontSize: 14,
    fontFamily: CustomFonts.default,
    color: '#666',
  },
});
