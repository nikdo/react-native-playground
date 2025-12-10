import { Image, Pressable, StyleSheet, View } from 'react-native';

import ManInBlack from '@/assets/images/man-in-black.svg';
import DefaultText from '@/components/default-text';

type AvatarType = 'photo' | 'initials' | 'incognito';

type AvatarProps = {
  type: AvatarType;
  imageSource?: string | number;
  initials?: string;
  size?: number;
  onPress?: () => void;
};

export default function Avatar({
  type,
  imageSource,
  initials = '',
  size = 64,
  onPress,
}: AvatarProps) {
  const borderRadius = size / 2;

  const content = (() => {
    if (type === 'photo' && imageSource) {
      return (
        <View style={[styles.container, { width: size, height: size, borderRadius }]}>
          <Image
            source={typeof imageSource === 'string' ? { uri: imageSource } : imageSource}
            style={[styles.photo, { borderRadius }]}
          />
        </View>
      );
    }

    if (type === 'initials') {
      const fontSize = size * 0.375;
      return (
        <View
          style={[
            styles.container,
            styles.initialsContainer,
            { width: size, height: size, borderRadius },
          ]}>
          <DefaultText style={[styles.initialsText, { fontSize, lineHeight: fontSize * 1.08 }]}>
            {initials}
          </DefaultText>
        </View>
      );
    }

    // Incognito type
    return (
      <View
        style={[
          styles.container,
          styles.incognitoContainer,
          { width: size, height: size, borderRadius },
        ]}>
        <ManInBlack width={size} height={size} color="#a069aa" />
      </View>
    );
  })();

  if (onPress) {
    return <Pressable onPress={onPress}>{content}</Pressable>;
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  initialsContainer: {
    backgroundColor: '#a069aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    color: '#ffffff',
    fontWeight: '700',
    textAlign: 'center',
  },
  incognitoContainer: {
    borderWidth: 2,
    borderColor: '#a069aa',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
