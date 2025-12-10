import { StyleSheet, Switch, View } from 'react-native';

import Avatar from '@/components/avatar';
import DefaultText from '@/components/default-text';

export type CoworkingMember = {
  id: string;
  type: 'photo' | 'initials' | 'incognito';
  imageSource?: string | number;
  initials?: string;
};

type CoworkingSessionProps = {
  enabled: boolean;
  onToggle: (value: boolean) => void;
  members?: CoworkingMember[];
  onAvatarPress?: (member: CoworkingMember) => void;
};

export default function CoworkingSession({
  enabled,
  onToggle,
  members = [],
  onAvatarPress,
}: CoworkingSessionProps) {
  const memberCount = members.length;

  return (
    <View style={styles.container}>
      {/* Toggle row */}
      <View style={styles.toggleRow}>
        <View style={styles.labelContainer}>
          <DefaultText style={styles.title}>Coworking session</DefaultText>
          <DefaultText style={styles.subtitle}>Let others see that I'm here</DefaultText>
        </View>
        <Switch
          value={enabled}
          onValueChange={onToggle}
          trackColor={{ false: '#e9e9ea', true: '#a069aa' }}
          thumbColor="#ffffff"
        />
      </View>

      {/* Intel section */}
      <View style={styles.intelContainer}>
        <View style={styles.countRow}>
          <DefaultText style={styles.countText}>
            Working with {memberCount} other member{memberCount !== 1 ? 's' : ''}
          </DefaultText>
        </View>

        {/* Faces grid - only shown when enabled */}
        {enabled && members.length > 0 && (
          <View style={styles.facesGrid}>
            {members.map((member) => (
              <Avatar
                key={member.id}
                type={member.type}
                imageSource={member.imageSource}
                initials={member.initials}
                size={64}
                onPress={onAvatarPress ? () => onAvatarPress(member) : undefined}
              />
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fad2ff',
    borderRadius: 16,
    padding: 16,
    paddingVertical: 12,
    gap: 16,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  labelContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 24,
    color: '#000000',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
    color: '#000000',
  },
  intelContainer: {
    gap: 8,
  },
  countRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  countText: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    color: '#a069aa',
  },
  facesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
});
