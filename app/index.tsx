import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ExperimentCard from '@/components/experiment-card';
import { BrandColors, CustomFonts } from '@/constants/theme';

const EXPERIMENTS = [
  {
    id: 'buttons',
    name: 'Buttons',
    description: 'Custom button variants and states.',
    icon: 'rectangle.fill' as const,
    route: '/buttons' as const,
  },
  {
    id: 'coworking',
    name: 'Coworking',
    description: 'Session card with avatars.',
    icon: 'person.2.fill' as const,
    route: '/coworking' as const,
  },
  {
    id: 'negative-margin',
    name: 'Negative Margin',
    description: 'Breaking out of parent padding.',
    icon: 'arrow.left.and.right' as const,
    route: '/negative-margin' as const,
  },
  {
    id: 'badges',
    name: 'Badges',
    description: 'Notification badge in two sizes.',
    icon: 'app.badge.fill' as const,
    route: '/badges' as const,
  },
  {
    id: 'icons',
    name: 'Denizen Icons',
    description: 'All IcoMoon icons from selection.json.',
    icon: 'star.fill' as const,
    route: '/icons' as const,
  },
  {
    id: 'denizen-buttons',
    name: 'Denizen Buttons',
    description: 'Real denizen-app Button via Metro aliasing.',
    icon: 'rectangle.fill' as const,
    route: '/denizen-buttons' as const,
  },
  {
    id: 'notifications',
    name: 'Push Notifications',
    description: 'Configure and trigger iOS local notifications.',
    icon: 'bell.fill' as const,
    route: '/notifications' as const,
  },
  {
    id: 'color-game',
    name: 'Color Game',
    description: 'Landscape game POC with color-changing circle.',
    icon: 'circle.fill' as const,
    route: '/color-game' as const,
  },
  {
    id: 'range-slider',
    name: 'Range Slider',
    description: 'Draggable range slider inside a scrollable view.',
    icon: 'slider.horizontal.3' as const,
    route: '/range-slider' as const,
  },
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.contentContainer,
        { paddingTop: insets.top + 20 },
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Experiments</Text>
        <Text style={styles.subtitle}>React Native playground</Text>
      </View>

      <View style={styles.cardList}>
        {EXPERIMENTS.map((experiment) => (
          <ExperimentCard
            key={experiment.id}
            name={experiment.name}
            description={experiment.description}
            icon={experiment.icon}
            onPress={() => router.push(experiment.route)}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.almostWhite,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 34,
    fontFamily: CustomFonts.bold,
    color: '#000',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: CustomFonts.default,
    color: '#666',
  },
  cardList: {
    flex: 1,
  },
});
