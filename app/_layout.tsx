import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { useColorScheme } from '@/hooks/use-color-scheme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    SaansMedium: require('../assets/fonts/SaansMedium.ttf'),
    SaansBold: require('../assets/fonts/SaansBold.ttf'),
    'Saans-Regular': require('../assets/fonts/SaansMedium.ttf'),
    'Saans-Bold': require('../assets/fonts/SaansBold.ttf'),
    'BagossCondensed-Bold': require('../assets/fonts/BagossCondensed-Bold.ttf'),
    'MaterialSymbolsRounded-Filled': require('../assets/fonts/MaterialSymbolsRounded-Filled.ttf'),
    'denizen-icons': require('../assets/fonts/denizen-icons.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="buttons" options={{ title: 'Buttons' }} />
          <Stack.Screen name="coworking" options={{ title: 'Coworking' }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          <Stack.Screen
            name="profile"
            options={{
              presentation: 'fullScreenModal',
              headerShown: false,
            }}
          />
          <Stack.Screen name="negative-margin" options={{ title: 'Negative Margin' }} />
          <Stack.Screen name="badges" options={{ title: 'Badges' }} />
          <Stack.Screen name="icons" options={{ title: 'Denizen Icons' }} />
          <Stack.Screen name="denizen-buttons" options={{ title: 'Denizen Buttons' }} />
          <Stack.Screen name="notifications" options={{ title: 'Push Notifications' }} />
          <Stack.Screen name="color-game" options={{ title: 'Color Game', headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
