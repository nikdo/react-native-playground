import { Asset } from 'expo-asset';
import * as Notifications from 'expo-notifications';
import { useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';

import { BrandColors, CustomFonts } from '@/constants/theme';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

const INTERRUPTION_LEVELS = [
  'passive',
  'active',
  'timeSensitive',
  'critical',
] as const;

type InterruptionLevel = (typeof INTERRUPTION_LEVELS)[number];

const AVATARS = [
  { name: 'None', source: null },
  { name: 'Lea', source: require('@/assets/images/avatar-lea.png') },
  { name: 'David', source: require('@/assets/images/avatar-david.png') },
  { name: 'Sofia', source: require('@/assets/images/avatar-sofia.png') },
] as const;

export default function NotificationsScreen() {
  const [title, setTitle] = useState('Hello!');
  const [subtitle, setSubtitle] = useState('');
  const [body, setBody] = useState('This is a test notification.');
  const [categoryIdentifier, setCategoryIdentifier] = useState('');
  const [threadIdentifier, setThreadIdentifier] = useState('');
  const [launchImageName, setLaunchImageName] = useState('');
  const [badge, setBadge] = useState('');
  const [relevanceScore, setRelevanceScore] = useState('');
  const [sound, setSound] = useState(true);
  const [interruptionLevel, setInterruptionLevel] =
    useState<InterruptionLevel>('active');
  const [delay, setDelay] = useState('3');
  const [avatarIndex, setAvatarIndex] = useState(0);

  async function requestPermissions() {
    const { status: existing } = await Notifications.getPermissionsAsync();
    if (existing === 'granted') return true;

    const { status } = await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
        allowCriticalAlerts: true,
      },
    });
    return status === 'granted';
  }

  async function sendNotification() {
    const granted = await requestPermissions();
    if (!granted) {
      Alert.alert(
        'Permission denied',
        'Enable notifications in Settings to test this screen.',
      );
      return;
    }

    const seconds = Math.max(1, parseInt(delay, 10) || 1);

    const content: Record<string, unknown> = {
      interruptionLevel,
    };
    if (title) content.title = title;
    if (subtitle) content.subtitle = subtitle;
    if (body) content.body = body;
    if (categoryIdentifier) content.categoryIdentifier = categoryIdentifier;
    if (launchImageName) content.launchImageName = launchImageName;
    if (badge) content.badge = parseInt(badge, 10);
    if (sound) content.sound = 'default';
    if (threadIdentifier) content.threadIdentifier = threadIdentifier;
    if (relevanceScore) content.relevanceScore = parseFloat(relevanceScore);

    const selectedAvatar = AVATARS[avatarIndex];
    if (selectedAvatar.source) {
      const asset = Asset.fromModule(selectedAvatar.source as number);
      await asset.downloadAsync();
      if (asset.localUri) {
        content.attachments = [{ identifier: 'avatar', url: asset.localUri, type: 'public.png' }];
      }
    }

    await Notifications.scheduleNotificationAsync({
      content: content as Notifications.NotificationContentInput,
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds,
      },
    });
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Content</Text>

        <Field label="Title">
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Notification title"
          />
        </Field>

        <Field label="Subtitle (iOS)">
          <TextInput
            style={styles.input}
            value={subtitle}
            onChangeText={setSubtitle}
            placeholder="Secondary title"
          />
        </Field>

        <Field label="Body">
          <TextInput
            style={[styles.input, styles.multiline]}
            value={body}
            onChangeText={setBody}
            placeholder="Notification body"
            multiline
          />
        </Field>

        <Field label="Avatar Attachment">
          <View style={styles.avatarRow}>
            {AVATARS.map((avatar, index) => (
              <Pressable
                key={avatar.name}
                style={[
                  styles.avatarOption,
                  avatarIndex === index && styles.avatarOptionSelected,
                ]}
                onPress={() => setAvatarIndex(index)}
              >
                {avatar.source ? (
                  <Image source={avatar.source} style={styles.avatarImage} />
                ) : (
                  <View style={[styles.avatarImage, styles.avatarNone]}>
                    <Text style={styles.avatarNoneText}>--</Text>
                  </View>
                )}
                <Text style={styles.avatarName}>{avatar.name}</Text>
              </Pressable>
            ))}
          </View>
        </Field>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Identifiers</Text>

        <Field label="Category Identifier">
          <TextInput
            style={styles.input}
            value={categoryIdentifier}
            onChangeText={setCategoryIdentifier}
            placeholder="Action category ID"
            autoCapitalize="none"
          />
        </Field>

        <Field label="Thread Identifier">
          <TextInput
            style={styles.input}
            value={threadIdentifier}
            onChangeText={setThreadIdentifier}
            placeholder="Grouping thread ID"
            autoCapitalize="none"
          />
        </Field>

        <Field label="Launch Image Name">
          <TextInput
            style={styles.input}
            value={launchImageName}
            onChangeText={setLaunchImageName}
            placeholder="Launch image name"
            autoCapitalize="none"
          />
        </Field>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Options</Text>

        <Field label="Badge Number">
          <TextInput
            style={styles.input}
            value={badge}
            onChangeText={setBadge}
            placeholder="0"
            keyboardType="number-pad"
          />
        </Field>

        <Field label="Relevance Score (0–1)">
          <TextInput
            style={styles.input}
            value={relevanceScore}
            onChangeText={setRelevanceScore}
            placeholder="0.0"
            keyboardType="decimal-pad"
          />
        </Field>

        <View style={styles.toggleRow}>
          <Text style={styles.fieldLabel}>Sound</Text>
          <Switch
            value={sound}
            onValueChange={setSound}
            trackColor={{ false: '#d4d4d4', true: BrandColors.darkSky }}
            thumbColor={BrandColors.white}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Interruption Level</Text>
        <View style={styles.pickerRow}>
          {INTERRUPTION_LEVELS.map((level) => (
            <Pressable
              key={level}
              style={[
                styles.pickerOption,
                interruptionLevel === level && styles.pickerOptionSelected,
              ]}
              onPress={() => setInterruptionLevel(level)}
            >
              <Text
                style={[
                  styles.pickerOptionText,
                  interruptionLevel === level &&
                    styles.pickerOptionTextSelected,
                ]}
              >
                {level}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Trigger</Text>
        <Field label="Delay (seconds)">
          <TextInput
            style={styles.input}
            value={delay}
            onChangeText={setDelay}
            placeholder="3"
            keyboardType="number-pad"
          />
        </Field>
      </View>

      <Pressable style={styles.sendButton} onPress={sendNotification}>
        <Text style={styles.sendButtonText}>Send Notification</Text>
      </Pressable>
    </ScrollView>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.almostWhite,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 60,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: CustomFonts.default,
    color: '#888888',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  field: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 15,
    fontFamily: CustomFonts.bold,
    color: BrandColors.black,
    marginBottom: 6,
  },
  input: {
    backgroundColor: BrandColors.white,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    fontFamily: CustomFonts.default,
    color: BrandColors.black,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#D0D0D0',
  },
  multiline: {
    minHeight: 72,
    textAlignVertical: 'top',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  pickerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  pickerOption: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: BrandColors.white,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#D0D0D0',
  },
  pickerOptionSelected: {
    backgroundColor: BrandColors.darkSky,
    borderColor: BrandColors.darkSky,
  },
  pickerOptionText: {
    fontSize: 14,
    fontFamily: CustomFonts.default,
    color: BrandColors.black,
  },
  pickerOptionTextSelected: {
    color: BrandColors.white,
  },
  avatarRow: {
    flexDirection: 'row',
    gap: 12,
  },
  avatarOption: {
    alignItems: 'center',
    gap: 4,
    padding: 6,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  avatarOptionSelected: {
    borderColor: BrandColors.darkSky,
  },
  avatarImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  avatarNone: {
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarNoneText: {
    fontSize: 14,
    fontFamily: CustomFonts.default,
    color: '#888',
  },
  avatarName: {
    fontSize: 12,
    fontFamily: CustomFonts.default,
    color: BrandColors.black,
  },
  sendButton: {
    backgroundColor: BrandColors.darkSky,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 4,
  },
  sendButtonText: {
    fontSize: 17,
    fontFamily: CustomFonts.bold,
    color: BrandColors.white,
  },
});
