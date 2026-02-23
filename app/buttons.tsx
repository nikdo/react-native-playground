import { useState } from "react";
import { View, Image, Switch, Text, StyleSheet } from "react-native";

import Button from "@/components/button";
import SwatchToggle from "@/components/swatch-toggle";
import { BrandColors, CustomFonts } from "@/constants/theme";

export default function ButtonsScreen() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState<string>(
    BrandColors.white,
  );
  const [buttonColor, setButtonColor] = useState<string>(BrandColors.black);
  const [inverted, setInverted] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>
        {/* Row 1: Primary Regular */}
        <View style={styles.row}>
          <View style={styles.leftCol}>
            <Button
              caption="Submit"
              type="primary"
              size="regular"
              color={buttonColor}
              inverted={inverted}
              disabled={isDisabled}
            />
          </View>
          <Button
            caption="Confirm"
            type="primary"
            size="regular"
            color={buttonColor}
            inverted={inverted}
            disabled={isDisabled}
            icon="check_circle"
          />
        </View>

        {/* Row 2: Subtle Regular */}
        <View style={styles.row}>
          <View style={styles.leftCol}>
            <Button
              caption="Reset all"
              type="subtle"
              size="regular"
              color={buttonColor}
              inverted={inverted}
              disabled={isDisabled}
            />
          </View>
          <Button
            caption="Reject"
            type="subtle"
            size="regular"
            color={buttonColor}
            inverted={inverted}
            disabled={isDisabled}
            icon="cancel"
          />
        </View>

        {/* Row 3: Primary Compact */}
        <View style={styles.row}>
          <View style={styles.leftCol}>
            <Button
              caption="Invite friends"
              type="primary"
              size="compact"
              color={buttonColor}
              inverted={inverted}
              disabled={isDisabled}
            />
          </View>
          <Button
            caption="Share"
            type="primary"
            size="compact"
            color={buttonColor}
            inverted={inverted}
            disabled={isDisabled}
            icon="share"
          />
        </View>

        {/* Row 4: Subtle Compact */}
        <View style={styles.row}>
          <View style={styles.leftCol}>
            <Button
              caption="Show more"
              type="subtle"
              size="compact"
              color={buttonColor}
              inverted={inverted}
              disabled={isDisabled}
            />
          </View>
          <Button
            caption="Save"
            type="subtle"
            size="compact"
            color={buttonColor}
            inverted={inverted}
            disabled={isDisabled}
            icon="bookmark"
          />
        </View>

        {/* Full-width button */}
        <Button
          caption="Select membership"
          type="primary"
          color={buttonColor}
          inverted={inverted}
          disabled={isDisabled}
        />
      </View>

      {showOverlay && (
        <Image
          source={require("../assets/images/buttons-benchmark.png")}
          style={styles.overlay}
          resizeMode="contain"
        />
      )}

      <View style={styles.swatchBar}>
        <SwatchToggle
          onColorChange={({ background, button, inverted: inv }) => {
            setBackgroundColor(background);
            setButtonColor(button);
            setInverted(inv);
          }}
        />
      </View>

      <View style={styles.debugControls}>
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Disabled</Text>
          <Switch
            value={isDisabled}
            onValueChange={setIsDisabled}
            trackColor={{ false: "#d4d4d4", true: BrandColors.black }}
            thumbColor={BrandColors.white}
          />
        </View>
        <View style={styles.toggleRow}>
          <Text style={styles.toggleLabel}>Overlay from Figma</Text>
          <Switch
            value={showOverlay}
            onValueChange={setShowOverlay}
            trackColor={{ false: "#d4d4d4", true: BrandColors.black }}
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
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 48,
    gap: 24,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  leftCol: {
    width: 182,
    alignItems: "flex-start",
  },
  overlay: {
    position: "absolute",
    left: 24,
    top: 48,
    width: 342,
    height: 232,
    opacity: 0.8,
  },
  swatchBar: {
    position: "absolute",
    bottom: 48,
    left: 0,
    right: 0,
  },
  debugControls: {
    position: "absolute",
    bottom: 48 + 64 + 16,
    left: 24,
    right: 24,
    gap: 16,
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  toggleLabel: {
    fontFamily: CustomFonts.default,
    fontSize: 16,
    color: BrandColors.black,
  },
});
