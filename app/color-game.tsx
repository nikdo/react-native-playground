import * as ScreenOrientation from 'expo-screen-orientation';
import { useRouter } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEffect, useState, useCallback } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const COLORS = [
  '#FF6B6B',
  '#4ECDC4',
  '#45B7D1',
  '#FFA07A',
  '#98D8C8',
  '#F7DC6F',
  '#BB8FCE',
  '#85C1E9',
  '#F1948A',
  '#82E0AA',
];

const VIDEO_SOURCE =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

export default function ColorGameScreen() {
  const [colorIndex, setColorIndex] = useState(0);
  const router = useRouter();

  const player = useVideoPlayer(VIDEO_SOURCE, (player) => {
    player.loop = true;
    player.play();
  });

  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);

  useEffect(() => {
    ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );
    return () => {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    };
  }, []);

  const animatedCircleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const triggerBeat = useCallback(() => {
    setColorIndex((prev) => (prev + 1) % COLORS.length);
    scale.value = withSequence(
      withTiming(1.4, { duration: 80 }),
      withTiming(1, { duration: 200 })
    );
    opacity.value = withSequence(
      withTiming(0.8, { duration: 60 }),
      withTiming(0, { duration: 400 })
    );
  }, []);

  return (
    <View style={styles.container}>
      <VideoView
        player={player}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        nativeControls={false}
      />

      <View style={styles.overlay}>
        <Pressable style={styles.button} onPress={triggerBeat}>
          <View style={styles.buttonInner} />
        </Pressable>

        <View style={styles.center}>
          <Animated.View
            style={[
              styles.circle,
              { backgroundColor: COLORS[colorIndex] },
              animatedCircleStyle,
            ]}
          />
        </View>

        <Pressable style={styles.button} onPress={triggerBeat}>
          <View style={styles.buttonInner} />
        </Pressable>
      </View>

      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
  },
  button: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: 'rgba(22, 33, 62, 0.7)',
    borderWidth: 2,
    borderColor: '#e94560',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e94560',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
