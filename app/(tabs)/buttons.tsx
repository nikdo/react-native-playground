import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';

import Button from '@/components/button';
import { CustomFonts } from '@/constants/theme';

export default function ButtonsScreen() {
  const handlePress = (variant: string) => {
    Alert.alert('Button Pressed', `You pressed the ${variant} button`);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.title}>Button Showcase</Text>
      <Text style={styles.subtitle}>Based on Figma Design</Text>

      {/* Primary Regular */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Primary / Regular</Text>
        <Button
          caption="Submit"
          type="primary"
          size="regular"
          onPress={() => handlePress('Primary Regular')}
        />
      </View>

      {/* Subtle Regular */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Subtle / Regular</Text>
        <Button
          caption="Submit"
          type="subtle"
          size="regular"
          onPress={() => handlePress('Subtle Regular')}
        />
      </View>

      {/* Primary Compact */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Primary / Compact</Text>
        <Button
          caption="Submit"
          type="primary"
          size="compact"
          onPress={() => handlePress('Primary Compact')}
        />
      </View>

      {/* Subtle Compact */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Subtle / Compact</Text>
        <Button
          caption="Submit"
          type="subtle"
          size="compact"
          onPress={() => handlePress('Subtle Compact')}
        />
      </View>

      {/* All variants side by side */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>All Variants</Text>
        <View style={styles.variantsGrid}>
          <Button caption="Primary" type="primary" size="regular" />
          <Button caption="Subtle" type="subtle" size="regular" />
          <View style={styles.compactRow}>
            <Button caption="Primary" type="primary" size="compact" />
            <Button caption="Subtle" type="subtle" size="compact" />
          </View>
        </View>
      </View>

      {/* Disabled states */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Disabled States</Text>
        <View style={styles.disabledRow}>
          <Button caption="Disabled" type="primary" size="compact" disabled />
          <Button caption="Disabled" type="subtle" size="compact" disabled />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contentContainer: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontFamily: CustomFonts.bold,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: CustomFonts.default,
    color: '#666666',
    marginBottom: 32,
  },
  section: {
    marginBottom: 32,
    alignItems: 'flex-start',
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: CustomFonts.default,
    color: '#888888',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  variantsGrid: {
    gap: 16,
    alignItems: 'flex-start',
  },
  compactRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  disabledRow: {
    flexDirection: 'row',
    gap: 12,
  },
});
