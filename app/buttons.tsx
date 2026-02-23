import { useCallback, useRef, useState } from "react";
import { View, Image, Switch, Text, ScrollView, StyleSheet, Platform } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Button from "@/components/button";
import SwatchToggle from "@/components/swatch-toggle";
import { BrandColors, CustomFonts } from "@/constants/theme";

export default function ButtonsScreen() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState<string>(
    BrandColors.white,
  );
  const [buttonColor, setButtonColor] = useState<string>(BrandColors.black);
  const [inverted, setInverted] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);
  const { bottom: bottomInset } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <ScrollView style={styles.content} contentContainerStyle={styles.contentInner}>
        {/* Row 1: Filled Regular */}
        <View style={styles.row}>
          <View style={styles.leftCol}>
            <Button
              caption="Submit"
              variant="filled"
              size="regular"
              color={buttonColor}
              inverted={inverted}
              disabled={isDisabled}
              loading={isLoading}
            />
          </View>
          <Button
            caption="Confirm"
            variant="filled"
            size="regular"
            color={buttonColor}
            inverted={inverted}
            disabled={isDisabled}
            loading={isLoading}
            icon="check_circle"
          />
        </View>

        {/* Row 2: Outlined Regular */}
        <View style={styles.row}>
          <View style={styles.leftCol}>
            <Button
              caption="Reset all"
              variant="outlined"
              size="regular"
              color={buttonColor}
              inverted={inverted}
              disabled={isDisabled}
              loading={isLoading}
            />
          </View>
          <Button
            caption="Reject"
            variant="outlined"
            size="regular"
            color={buttonColor}
            inverted={inverted}
            disabled={isDisabled}
            loading={isLoading}
            icon="cancel"
          />
        </View>

        {/* Row 3: Filled Compact */}
        <View style={styles.row}>
          <View style={styles.leftCol}>
            <Button
              caption="Invite friends"
              variant="filled"
              size="compact"
              color={buttonColor}
              inverted={inverted}
              disabled={isDisabled}
              loading={isLoading}
            />
          </View>
          <Button
            caption="Share"
            variant="filled"
            size="compact"
            color={buttonColor}
            inverted={inverted}
            disabled={isDisabled}
            loading={isLoading}
            icon="share"
          />
        </View>

        {/* Row 4: Outlined Compact */}
        <View style={styles.row}>
          <View style={styles.leftCol}>
            <Button
              caption="Show more"
              variant="outlined"
              size="compact"
              color={buttonColor}
              inverted={inverted}
              disabled={isDisabled}
              loading={isLoading}
            />
          </View>
          <Button
            caption="Save"
            variant="outlined"
            size="compact"
            color={buttonColor}
            inverted={inverted}
            disabled={isDisabled}
            loading={isLoading}
            icon="bookmark"
          />
        </View>

        {/* Full-width button */}
        <Button
          caption="Select membership"
          variant="filled"
          color={buttonColor}
          inverted={inverted}
          disabled={isDisabled}
          loading={isLoading}
        />

        {/* Long text: wraps to two lines then ellipsis */}
        <View style={{ flexDirection: "row", gap: 16 }}>
          <View style={{ flex: 1 }}>
            <Button
              caption="This is a very long button label"
              variant="filled"
              size="regular"
              color={buttonColor}
              inverted={inverted}
              disabled={isDisabled}
              loading={isLoading}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Button
              caption="An extremely long label that should be truncated with ellipsis"
              variant="outlined"
              size="regular"
              color={buttonColor}
              inverted={inverted}
              disabled={isDisabled}
              loading={isLoading}
            />
          </View>
        </View>
      </ScrollView>

      {showOverlay && (
        <Image
          source={require("../assets/images/buttons-benchmark.png")}
          style={styles.overlay}
          resizeMode="contain"
        />
      )}

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[72 + bottomInset]}
        index={1}
        enableDynamicSizing={true}
        backgroundStyle={styles.sheetBackground}
        handleIndicatorStyle={styles.sheetHandle}
        style={styles.sheetShadow}
      >
        <BottomSheetView style={[styles.sheetContent, { paddingBottom: Math.max(bottomInset, 24) }]}>
          <Text style={styles.sheetTitle} maxFontSizeMultiplier={1}>Debug Controls</Text>
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel} maxFontSizeMultiplier={1}>Loading</Text>
            <Switch
              value={isLoading}
              onValueChange={setIsLoading}
              trackColor={{ false: "#d4d4d4", true: BrandColors.black }}
              thumbColor={BrandColors.white}
            />
          </View>
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel} maxFontSizeMultiplier={1}>Disabled</Text>
            <Switch
              value={isDisabled}
              onValueChange={setIsDisabled}
              trackColor={{ false: "#d4d4d4", true: BrandColors.black }}
              thumbColor={BrandColors.white}
            />
          </View>
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel} maxFontSizeMultiplier={1}>Overlay from Figma</Text>
            <Switch
              value={showOverlay}
              onValueChange={setShowOverlay}
              trackColor={{ false: "#d4d4d4", true: BrandColors.black }}
              thumbColor={BrandColors.white}
            />
          </View>
          <SwatchToggle
            onColorChange={({ background, button, inverted: inv }) => {
              setBackgroundColor(background);
              setButtonColor(button);
              setInverted(inv);
            }}
          />
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
  },
  contentInner: {
    paddingTop: 48,
    paddingBottom: 360,
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
  sheetBackground: {
    backgroundColor: BrandColors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    ...Platform.select({
      android: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderLeftWidth: StyleSheet.hairlineWidth,
        borderRightWidth: StyleSheet.hairlineWidth,
        borderColor: "rgba(0, 0, 0, 0.15)",
      },
    }),
  },
  sheetHandle: {
    backgroundColor: "#C4C4C4",
    width: 36,
    height: 4,
  },
  sheetShadow: {
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  sheetContent: {
    paddingHorizontal: 24,
    gap: 16,
  },
  sheetTitle: {
    fontFamily: CustomFonts.bold,
    fontSize: 18,
    color: BrandColors.black,
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
