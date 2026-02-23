import { useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

const opacity = {
  shimmer: 0.4,
};

type ShimmerOverlayProps = {
  color: string;
};

export default function ShimmerOverlay({ color }: ShimmerOverlayProps) {
  const [width, setWidth] = useState(0);
  const translateX = useSharedValue(-1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const handleLayout = (e: { nativeEvent: { layout: { width: number } } }) => {
    const w = e.nativeEvent.layout.width;
    setWidth(w);
    translateX.value = -w * 1.5;
    translateX.value = withRepeat(
      withTiming(0, { duration: 1500, easing: Easing.linear }),
      -1,
    );
  };

  // Known issues:
  // - Android: overlay does not cover the button border (all sides)
  // - iOS: overlay does not cover the top and bottom borders
  return (
    <View
      style={[StyleSheet.absoluteFill, { opacity: opacity.shimmer }]}
      pointerEvents="none"
      onLayout={handleLayout}
    >
      {width > 0 && (
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            { width: width * 3, flexDirection: "row" },
            animatedStyle,
          ]}
        >
          {[0, 1].map((i) => (
            <LinearGradient
              key={i}
              colors={["transparent", color, "transparent"]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={{ width: width * 1.5, height: "100%" }}
            />
          ))}
        </Animated.View>
      )}
    </View>
  );
}
