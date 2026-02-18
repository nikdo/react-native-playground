import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

import NotificationBadge from '@/components/notification-badge';
import { BrandColors, CustomFonts } from '@/constants/theme';

export default function BadgesScreen() {
  const [isLargeFont, setIsLargeFont] = useState(true);
  const badgeSize = isLargeFont ? 'regular' : 'compact';

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Badge Showcase</Text>
          <Text style={styles.subtitle}>Based on Figma Design</Text>
        </View>
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Large font</Text>
          <Switch
            value={isLargeFont}
            onValueChange={setIsLargeFont}
            trackColor={{ false: '#d4d4d4', true: '#e34f6a' }}
            thumbColor={BrandColors.white}
          />
        </View>
      </View>

      {/* Standalone badges */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Standalone</Text>
        <View style={styles.row}>
          <NotificationBadge count={1} size={badgeSize} />
          <NotificationBadge count={3} size={badgeSize} />
          <NotificationBadge count={12} size={badgeSize} />
        </View>
      </View>

      {/* Inline with text */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Inline with Label</Text>
        <View style={styles.inlineRow}>
          <Text style={styles.label}>Requests</Text>
          <NotificationBadge count={3} size={badgeSize} />
        </View>
      </View>

      {/* Menu item context */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Menu Item</Text>
        <View style={styles.menuCard}>
          <View style={styles.menuItem}>
            <Text style={styles.menuIcon}>{'\u25A0'}</Text>
            <Text style={styles.menuLabel}>Payment accounts</Text>
          </View>
          <View style={styles.menuItem}>
            <Text style={styles.menuIcon}>{'\u25A0'}</Text>
            <Text style={styles.menuLabel}>Offers</Text>
            <NotificationBadge count={12} size={badgeSize} />
          </View>
          <View style={styles.menuItem}>
            <Text style={styles.menuIcon}>{'\u25A0'}</Text>
            <Text style={styles.menuLabel}>Log out</Text>
          </View>
        </View>
      </View>

      {/* Drilldown navigation context */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Drilldown Navigation</Text>
        <View style={styles.drilldownCard}>
          <View style={styles.drilldownItem}>
            <Text style={styles.drilldownLabel}>Profile</Text>
            <Text style={styles.chevron}>{'>'}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.drilldownItem}>
            <Text style={styles.drilldownLabel}>Coworking buddies</Text>
            <NotificationBadge count={3} size={badgeSize} />
            <Text style={styles.chevron}>{'>'}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.drilldownItem}>
            <Text style={styles.drilldownLabel}>About</Text>
            <Text style={styles.chevron}>{'>'}</Text>
          </View>
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
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 16,
  },
  toggleLabel: {
    fontSize: 16,
    fontFamily: CustomFonts.default,
    fontWeight: '600',
    color: BrandColors.black,
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
    gap: 16,
    alignItems: 'center',
  },
  inlineRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontFamily: CustomFonts.bold,
    fontWeight: 'bold',
    color: BrandColors.black,
    lineHeight: 24,
  },
  menuCard: {
    backgroundColor: BrandColors.white,
    borderRadius: 8,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 12,
    paddingLeft: 12,
    paddingRight: 16,
  },
  menuIcon: {
    fontSize: 16,
    color: BrandColors.black,
    width: 24,
    textAlign: 'center',
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    fontFamily: CustomFonts.default,
    color: BrandColors.black,
    lineHeight: 24,
  },
  drilldownCard: {
    backgroundColor: BrandColors.white,
    borderRadius: 8,
    overflow: 'hidden',
  },
  drilldownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    padding: 15,
    minHeight: 60,
  },
  drilldownLabel: {
    flex: 1,
    fontSize: 20,
    fontFamily: CustomFonts.default,
    color: BrandColors.black,
    lineHeight: 24,
  },
  chevron: {
    fontSize: 18,
    color: '#AAB4B4',
    fontWeight: '300',
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E0E0E0',
  },
});
