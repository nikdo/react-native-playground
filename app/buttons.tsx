import { useState } from 'react';
import { View, Image, Switch, Text, StyleSheet } from 'react-native';

import Button from '@/components/button';
import MaterialIcon from '@/components/material-icon';
import { BrandColors, CustomFonts } from '@/constants/theme';

const ICONS = {
  check_circle: '\uf0be',
  cancel: '\ue888',
  share: '\ue80d',
  bookmark: '\ue8e7',
};

export default function ButtonsScreen() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Row 1: Primary Regular */}
        <View style={styles.row}>
          <View style={styles.leftCol}>
            <Button caption="Submit" type="primary" size="regular" disabled={isDisabled} />
          </View>
          <Button
            caption="Confirm"
            type="primary"
            size="regular"
            disabled={isDisabled}
            icon={<MaterialIcon name={ICONS.check_circle} size={24} color={BrandColors.white} />}
          />
        </View>

        {/* Row 2: Subtle Regular */}
        <View style={styles.row}>
          <View style={styles.leftCol}>
            <Button caption="Reset all" type="subtle" size="regular" disabled={isDisabled} />
          </View>
          <Button
            caption="Reject"
            type="subtle"
            size="regular"
            disabled={isDisabled}
            icon={<MaterialIcon name={ICONS.cancel} size={24} color={BrandColors.black} />}
          />
        </View>

        {/* Row 3: Primary Compact */}
        <View style={styles.row}>
          <View style={styles.leftCol}>
            <Button caption="Invite friends" type="primary" size="compact" disabled={isDisabled} />
          </View>
          <Button
            caption="Share"
            type="primary"
            size="compact"
            disabled={isDisabled}
            icon={<MaterialIcon name={ICONS.share} size={20} color={BrandColors.white} />}
          />
        </View>

        {/* Row 4: Subtle Compact */}
        <View style={styles.row}>
          <View style={styles.leftCol}>
            <Button caption="Show more" type="subtle" size="compact" disabled={isDisabled} />
          </View>
          <Button
            caption="Save"
            type="subtle"
            size="compact"
            disabled={isDisabled}
            icon={<MaterialIcon name={ICONS.bookmark} size={20} color={BrandColors.black} />}
          />
        </View>
      </View>

      {showOverlay && (
        <Image
          source={require('../assets/images/buttons-benchmark.png')}
          style={styles.overlay}
          resizeMode="contain"
        />
      )}

      <View style={styles.controls}>
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Disabled</Text>
          <Switch
            value={isDisabled}
            onValueChange={setIsDisabled}
            trackColor={{ false: '#d4d4d4', true: BrandColors.black }}
            thumbColor={BrandColors.white}
          />
        </View>
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Overlay from Figma</Text>
          <Switch
            value={showOverlay}
            onValueChange={setShowOverlay}
            trackColor={{ false: '#d4d4d4', true: BrandColors.black }}
            thumbColor={BrandColors.white}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BrandColors.white,
  },
  content: {
    paddingLeft: 24,
    paddingTop: 48,
    gap: 24,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  leftCol: {
    width: 182,
    alignItems: 'flex-start',
  },
  overlay: {
    position: 'absolute',
    left: 24,
    top: 48,
    width: 342,
    height: 232,
    opacity: 0.8,
  },
  controls: {
    position: 'absolute',
    bottom: 48,
    left: 24,
    right: 24,
    gap: 16,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleLabel: {
    fontFamily: CustomFonts.default,
    fontSize: 16,
    color: BrandColors.black,
  },
});
