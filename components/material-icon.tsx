import { View, Text, TextStyle } from 'react-native';

type MaterialIconProps = {
  name: string; // Unicode codepoint string, e.g. '\uf0be'
  size: number;
  color: string;
};

// Font metrics: ascent=1056, descent=-96, upm=960
// Natural line height = (1056 + 96) / 960 = 1.2 * fontSize
// Glyph is centered within the natural line height, so to center
// within a size×size box we offset by -(naturalLineHeight - size) / 2
const LINE_HEIGHT_RATIO = 1.2;

export default function MaterialIcon({ name, size, color }: MaterialIconProps) {
  const naturalLineHeight = Math.round(size * LINE_HEIGHT_RATIO);
  const offset = -(naturalLineHeight - size) / 2;

  const textStyle: TextStyle = {
    fontFamily: 'MaterialSymbolsRounded-Filled',
    fontSize: size,
    lineHeight: naturalLineHeight,
    textAlign: 'center',
    color,
    marginTop: offset,
  };

  return (
    <View
      style={{
        width: size,
        height: size,
        overflow: 'hidden',
      }}
    >
      <Text style={textStyle} allowFontScaling={false}>
        {name}
      </Text>
    </View>
  );
}
