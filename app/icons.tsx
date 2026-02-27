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

type IconCategory =
  | 'remove-custom'
  | 'remove-lucide'
  | 'remove-material'
  | 'denizen-only'
  | 'reserved';

const iconCategories: Record<string, IconCategory> = Object.assign(
  {},
  // Candidates for removal — custom icons (41)
  ...([
    'bottomless', 'calendar', 'camera', 'carrot', 'cart', 'chair',
    'chevronRight', 'couch', 'digital-key', 'dog', 'envelope', 'eye',
    'filters', 'flame', 'flower', 'gluten-free', 'house', 'kitchenSecond',
    'lactose-free', 'meal', 'message', 'outdoor', 'paper-plane', 'people',
    'phone', 'pin', 'printer', 'refrigerator', 'snowflake', 'sun', 't-shirt',
    'tick', 'user', 'user-plus', 'utensils', 'vegan', 'vegetarian',
    'video-call', 'website', 'wifi', 'window',
  ] as const).map((n) => ({ [n]: 'remove-custom' as const })),
  // Candidates for removal — Lucide / converted SVGs (17)
  ...([
    'activity', 'back', 'bike', 'bus-front', 'circle-parking', 'eclipse',
    'heart-pulse', 'land-plot', 'martini', 'navigation', 'phone-call',
    'shower-head', 'trees', 'unlock', 'user-plus-2', 'users-2', 'waves',
  ] as const).map((n) => ({ [n]: 'remove-lucide' as const })),
  // Candidates for removal — Google Material Symbols (3)
  ...([
    'sound_detection', 'spa', 'visibility_lock',
  ] as const).map((n) => ({ [n]: 'remove-material' as const })),
  // Denizen-only static code (11)
  ...([
    'breakfast', 'chevron-double-down', 'cork-pin', 'cup', 'drop', 'flipchart',
    'gift', 'pause', 'pinboard', 'projector', 'whiteboard',
  ] as const).map((n) => ({ [n]: 'denizen-only' as const })),
  // Material icons reserved for future use (28)
  ...([
    'bakery_dining', 'bike_scooter', 'celebration', 'chat_bubble',
    'coffee_maker', 'cookie', 'cooking', 'credit_card', 'door_sliding',
    'forest', 'forum', 'group', 'groups', 'info', 'key', 'key_vertical',
    'local_parking', 'local_pizza', 'lock', 'logout', 'loyalty', 'settings',
    'star_half', 'styler', 'table_restaurant', 'tv', 'vital_signs', 'work',
  ] as const).map((n) => ({ [n]: 'reserved' as const })),
);

const TAG_LABEL: Record<IconCategory, string> = {
  'remove-custom': 'remove',
  'remove-lucide': 'remove · lucide',
  'remove-material': 'remove · material',
  'denizen-only': 'denizen-only',
  reserved: 'keep · future',
};

const TAG_COLOR: Record<IconCategory, string> = {
  'remove-custom': '#cc3333',
  'remove-lucide': '#cc3333',
  'remove-material': '#cc3333',
  'denizen-only': '#b07d00',
  reserved: '#5577bb',
};

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
      {iconNames.map((name) => {
        const category = iconCategories[name];
        const isRemovable = category?.startsWith('remove');
        const color = category ? TAG_COLOR[category] : BrandColors.black;
        return (
          <View
            key={name}
            style={[styles.row, isRemovable && styles.rowRemovable]}
          >
            <DenizenIcon name={name} size={24} color={color} />
            <Text style={[styles.label, category && { color }]}>
              {name}
              {category && (
                <Text style={[styles.tag, { color }]}>
                  {' '}
                  [{TAG_LABEL[category]}]
                </Text>
              )}
            </Text>
          </View>
        );
      })}
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
  rowRemovable: {
    opacity: 0.55,
  },
  tag: {
    fontSize: 12,
  },
});
