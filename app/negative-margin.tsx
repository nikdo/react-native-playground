import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

import FlyingUp from '@/assets/images/flying-up.svg';
import { CustomFonts } from '@/constants/theme';

const SCREEN_PADDING = 20;

export default function NegativeMarginScreen() {
  const { width: screenWidth } = useWindowDimensions();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.title}>Negative Margin</Text>
      <Text style={styles.subtitle}>Breaking out of parent padding</Text>

      <View style={styles.boxContainer}>
        {/* Regular box respecting padding */}
        <View style={styles.box}>
          <Text style={styles.boxLabel}>Box 1 (respects padding)</Text>
        </View>

        {/* Full-width box using negative margin */}
        <View style={styles.fullWidthBox}>
          <Text style={styles.fullWidthBoxLabel}>
            Full-width box (negative margin)
          </Text>
        </View>

        {/* Regular box respecting padding */}
        <View style={styles.box}>
          <Text style={styles.boxLabel}>Box 3 (respects padding)</Text>
        </View>

        {/* Full-width SVG using negative margin */}
        <View style={styles.svgContainer}>
          <FlyingUp width={screenWidth} />
        </View>

        {/* Regular box respecting padding */}
        <View style={styles.box}>
          <Text style={styles.boxLabel}>Box 4 (respects padding)</Text>
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
    padding: SCREEN_PADDING,
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
  boxContainer: {
    flex: 1,
    gap: 16,
  },
  box: {
    height: 80,
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxLabel: {
    fontSize: 14,
    fontFamily: CustomFonts.default,
    color: '#666666',
  },
  fullWidthBox: {
    height: 120,
    backgroundColor: '#3B82F6',
    marginHorizontal: -SCREEN_PADDING,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullWidthBoxLabel: {
    fontSize: 14,
    fontFamily: CustomFonts.default,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  svgContainer: {
    marginHorizontal: -SCREEN_PADDING,
    backgroundColor: '#FEF3C7', // Light yellow background to make SVG visible
  },
});
