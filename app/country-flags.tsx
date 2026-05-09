import { ScrollView, StyleSheet, Text, View } from 'react-native';

import CountryFlag from '@/components/country-flag';
import { BrandColors, CustomFonts } from '@/constants/theme';

const SAMPLE_CODES = ['CZ', 'US', 'DE', 'JP', 'BR', 'GB', 'FR', 'KR'];
const SIZES = [16, 24, 32, 48, 64];

export default function CountryFlagsScreen() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Country Flags</Text>
        <Text style={styles.subtitle}>Using country-flag-icons</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>2:3 Rectangular</Text>
        <View style={styles.row}>
          {SAMPLE_CODES.map((code) => (
            <CountryFlag key={code} code={code} size={32} />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Circle</Text>
        <View style={styles.row}>
          {SAMPLE_CODES.map((code) => (
            <CountryFlag key={code} code={code} variant="circle" size={40} />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sizes — 2:3</Text>
        <View style={styles.sizesRow}>
          {SIZES.map((s) => (
            <View key={s} style={styles.sizeItem}>
              <CountryFlag code="CZ" size={s} />
              <Text style={styles.sizeLabel}>{s}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sizes — Circle</Text>
        <View style={styles.sizesRow}>
          {SIZES.map((s) => (
            <View key={s} style={styles.sizeItem}>
              <CountryFlag code="CZ" variant="circle" size={s} />
              <Text style={styles.sizeLabel}>{s}</Text>
            </View>
          ))}
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
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontFamily: CustomFonts.bold,
    fontWeight: 'bold',
    color: BrandColors.black,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: CustomFonts.default,
    color: '#666666',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: CustomFonts.default,
    color: '#888888',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    alignItems: 'center',
  },
  sizesRow: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'flex-end',
  },
  sizeItem: {
    alignItems: 'center',
    gap: 4,
  },
  sizeLabel: {
    fontSize: 12,
    fontFamily: CustomFonts.default,
    color: '#888888',
  },
});
