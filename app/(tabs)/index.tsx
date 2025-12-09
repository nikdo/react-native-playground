import { ScrollView, StyleSheet, View } from 'react-native';

import V3 from '@/assets/images/cityscape-dark.svg';
import Claim from '@/components/claim';
import PrimaryButton from '@/components/primary-button';

export default function HomeScreen() {
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      <Claim text="Time to plan your next workday?!?" />
      <View style={styles.svgContainer}>
        <V3 style={styles.svgImage} color="#0f0" />
      </View>
      <PrimaryButton text="Explore locations" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  svgContainer: {
    marginHorizontal: -20,
    alignSelf: 'stretch',
  },
  svgImage: {
    width: '100%',
    aspectRatio: 195 / 130,
  },
});
