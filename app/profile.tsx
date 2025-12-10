import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import MagnifiedUser from '@/assets/images/magnified-user.svg';
import DefaultText from '@/components/default-text';
import { IconSymbol } from '@/components/ui/icon-symbol';

const SHORT_TEXT = "We don't know much about them yet.";
const LONG_TEXT =
  "We don't know much about them yet. And honestly? That's fine. We spend so much of our lives pretending we know people when we really don't know shit. Your best friend from college? You probably don't know their deepest fear. Your mom? She's got secrets that would make your therapist need a therapist. " +
  "The truth is, not knowing someone is actually the default state of human existence. We're all just walking around with our little masks, pretending we've got it figured out, when in reality we're all confused meat sacks trying to find meaning in a universe that doesn't care. " +
  "So David here? Yeah, we don't know much about him. Maybe he's a secret genius. Maybe he puts pineapple on pizza. Maybe he's the kind of person who claps when the plane lands. Who knows? And more importantly, who cares? " +
  "The beautiful thing about not knowing someone is the potential. Right now, David could be anything. He could be your future best friend, your arch-nemesis, or just another face you'll forget by next Tuesday. And that uncertainty? That's not a bug, it's a feature of life.";

export default function ProfileScreen() {
  const [isExpanded, setIsExpanded] = useState(false);
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.screen}>
      {/* Header with close button */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Pressable style={styles.closeButton} onPress={() => router.back()}>
          <IconSymbol name="xmark" size={20} color="#0f0f0f" />
        </Pressable>
        <View style={styles.headerSpacer} />
        <DefaultText style={styles.headerLabel}>Show long text</DefaultText>
        <Switch
          value={isExpanded}
          onValueChange={setIsExpanded}
          trackColor={{ false: '#d4a5db', true: '#a069aa' }}
          thumbColor="#ffffff"
        />
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        alwaysBounceVertical={false}>
        {/* Content */}
        <View style={styles.content}>
          {/* Avatar */}
          <View style={styles.avatar}>
            <DefaultText style={styles.avatarText}>DG</DefaultText>
          </View>

          {/* Name */}
          <View style={styles.nameContainer}>
            <DefaultText style={styles.name}>David Gregor</DefaultText>
          </View>

          {/* Subtitle */}
          <DefaultText style={styles.subtitle}>
            {isExpanded ? LONG_TEXT : SHORT_TEXT}
          </DefaultText>
        </View>

        {/* Illustration - container has fixed height, SVG overflows visually */}
        <View style={styles.illustrationContainer}>
          <MagnifiedUser
            width={350}
            height={650}
            color="#a069aa"
            style={styles.illustration}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fad2ff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#fad2ff',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerSpacer: {
    flex: 1,
  },
  headerLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f0f0f',
    marginRight: 12,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  content: {
    alignItems: 'center',
    gap: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 112,
    backgroundColor: '#a069aa',
    borderWidth: 2,
    borderColor: '#a069aa',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  avatarText: {
    fontSize: 48,
    fontWeight: '700',
    lineHeight: 52,
    color: '#ffffff',
    textAlign: 'center',
  },
  nameContainer: {
    width: '100%',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 26,
    color: '#0f0f0f',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    color: '#a069aa',
    textAlign: 'center',
    width: 302,
  },
  illustrationContainer: {
    marginTop: 24,
    width: 350,
    height: 200,
    alignSelf: 'center',
    overflow: 'visible',
  },
  illustration: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
