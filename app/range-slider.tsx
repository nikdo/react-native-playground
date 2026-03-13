import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import RangeSlider from 'rn-range-slider';

import { BrandColors, CustomFonts } from '@/constants/theme';

function Thumb() {
  return <View style={styles.thumb} />;
}

function Rail() {
  return <View style={styles.rail} />;
}

function RailSelected() {
  return <View style={styles.railSelected} />;
}

function Label({ text }: { text: number }) {
  return (
    <View style={styles.labelContainer}>
      <Text style={styles.labelText}>{text}</Text>
    </View>
  );
}

function Notch() {
  return <View style={styles.notch} />;
}

export default function RangeSliderScreen() {
  const [low, setLow] = useState(20);
  const [high, setHigh] = useState(80);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(
    (value: number) => <Label text={value} />,
    [],
  );
  const renderNotch = useCallback(() => <Notch />, []);

  const handleValueChange = useCallback(
    (newLow: number, newHigh: number) => {
      setLow(newLow);
      setHigh(newHigh);
    },
    [],
  );

  return (
    <ScrollView
      scrollEnabled={scrollEnabled}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.heading}>Before We Slide</Text>

      <Text style={styles.body}>
        Every slider has a story. This one just wants to be dragged.
      </Text>
      <Text style={styles.body}>
        Fun fact: the average human finger has touched approximately 2.6 million
        phone screens. Yours is about to touch one more.
      </Text>
      <Text style={styles.body}>
        Scientists confirm: sliding things is 47% more satisfying than tapping
        them. We didn't make up that number. Okay, we did.
      </Text>
      <Text style={styles.body}>
        If you're reading this instead of sliding, you're doing it wrong.
      </Text>

      <View style={styles.sliderSection}>
        <Text style={styles.subheading}>Pick Your Range</Text>
        <Text style={styles.values}>
          {low} — {high}
        </Text>
        <RangeSlider
          style={styles.slider}
          min={0}
          max={100}
          step={1}
          low={low}
          high={high}
          floatingLabel
          renderThumb={renderThumb}
          renderRail={renderRail}
          renderRailSelected={renderRailSelected}
          renderLabel={renderLabel}
          renderNotch={renderNotch}
          onValueChanged={handleValueChange}
          onSliderTouchStart={() => setScrollEnabled(false)}
          onSliderTouchEnd={() => setScrollEnabled(true)}
        />
      </View>

      <Text style={styles.heading}>After The Slide</Text>

      <Text style={styles.body}>
        Congratulations. You moved two dots. Your parents must be proud.
      </Text>
      <Text style={styles.body}>
        The space between your thumbs is not a metaphor. Or is it?
      </Text>
      <Text style={styles.body}>
        Hot take: scrolling is just vertical sliding. This whole screen is a
        slider if you think about it.
      </Text>
      <Text style={styles.body}>
        "I came for the range slider, I stayed for the scroll." — Nobody, ever.
      </Text>
      <Text style={styles.body}>
        Plot twist: the real range was the friends we made along the way.
      </Text>
      <Text style={styles.body}>
        If you've scrolled this far, you either love sliders or you're avoiding
        something. Either way, respect.
      </Text>
      <Text style={styles.body}>
        Pro tip: try sliding with your nose. We won't judge. Much.
      </Text>
      <Text style={styles.body}>
        This concludes today's TED Talk on dragging circles across glass.
      </Text>
    </ScrollView>
  );
}

const THUMB_SIZE = 28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.almostWhite,
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 80,
  },
  heading: {
    fontSize: 28,
    fontFamily: CustomFonts.bold,
    color: BrandColors.black,
    marginBottom: 16,
    marginTop: 8,
  },
  subheading: {
    fontSize: 20,
    fontFamily: CustomFonts.bold,
    color: BrandColors.black,
    marginBottom: 4,
  },
  body: {
    fontSize: 16,
    fontFamily: CustomFonts.default,
    color: '#444',
    lineHeight: 24,
    marginBottom: 16,
  },
  values: {
    fontSize: 16,
    fontFamily: CustomFonts.default,
    color: BrandColors.darkPurple,
    marginBottom: 12,
  },
  sliderSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginVertical: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  slider: {
    height: 40,
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: BrandColors.darkPurple,
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  rail: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#E0E0E0',
  },
  railSelected: {
    height: 6,
    borderRadius: 3,
    backgroundColor: BrandColors.darkPurple,
  },
  labelContainer: {
    backgroundColor: BrandColors.darkPurple,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  labelText: {
    fontSize: 14,
    fontFamily: CustomFonts.bold,
    color: '#fff',
  },
  notch: {
    width: 8,
    height: 8,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 4,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: BrandColors.darkPurple,
  },
});
