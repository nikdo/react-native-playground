import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import CoworkingSession, { CoworkingMember } from '@/components/coworking-session';

// Sample coworking members data
const SAMPLE_MEMBERS: CoworkingMember[] = [
  {
    id: '1',
    type: 'photo',
    imageSource: require('@/assets/images/avatar-sofia.png'),
  },
  {
    id: '2',
    type: 'photo',
    imageSource: require('@/assets/images/avatar-lea.png'),
  },
  {
    id: '3',
    type: 'photo',
    imageSource: require('@/assets/images/avatar-david.png'),
  },
  {
    id: '4',
    type: 'initials',
    initials: 'DG',
  },
  {
    id: '5',
    type: 'initials',
    initials: 'EK',
  },
  {
    id: '6',
    type: 'incognito',
  },
  {
    id: '7',
    type: 'incognito',
  },
];

export default function CoworkingScreen() {
  const [isEnabled, setIsEnabled] = useState(true);

  return (
    <View style={styles.screen}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        alwaysBounceVertical={false}>
        <CoworkingSession
          enabled={isEnabled}
          onToggle={setIsEnabled}
          members={SAMPLE_MEMBERS}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 97,
    paddingHorizontal: 20,
  },
});
