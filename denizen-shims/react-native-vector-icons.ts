// Shim for react-native-vector-icons — wraps @expo/vector-icons.
// Denizen's Icon calls createIconSetFromIcoMoon(config) with 1 arg,
// but @expo/vector-icons needs (config, fontFamily, fontFile).
import { createIconSetFromIcoMoon as expoCreateIconSetFromIcoMoon } from '@expo/vector-icons';

export function createIconSetFromIcoMoon(config: object) {
  return expoCreateIconSetFromIcoMoon(
    config as any,
    'denizen-icons',
    'denizen-icons.ttf',
  );
}
