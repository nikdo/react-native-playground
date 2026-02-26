import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BrandColors, CustomFonts } from '@/constants/theme';

const icoMoonConfig = require('../assets/fonts/denizen-icons-selection.json');
const DenizenIcon = createIconSetFromIcoMoon(
  icoMoonConfig,
  'denizen-icons',
  'denizen-icons.ttf',
);

const iconNames: string[] = icoMoonConfig.icons.map(
  (icon: { properties: { name: string } }) => icon.properties.name,
);

export default function IconsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.contentContainer,
        { paddingBottom: insets.bottom + 40 },
      ]}
    >
      {iconNames.map((name) => (
        <View key={name} style={styles.row}>
          <DenizenIcon name={name} size={24} color={BrandColors.black} />
          <Text style={styles.label}>{name}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.almostWhite,
  },
  contentContainer: {
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  label: {
    marginLeft: 16,
    fontSize: 15,
    fontFamily: CustomFonts.default,
    color: BrandColors.black,
  },
});
