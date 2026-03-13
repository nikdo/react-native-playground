import { useRef, useState } from "react";
import {
  View,
  Switch,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
} from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// TODO: Re-enable when denizen-app internal imports are fixed
// import { Button as DenizenButton } from "@ui-library/core/Button";
// import type { ButtonColor } from "@ui-library/core/Button/styles";
type ButtonColor = string;
import PlaygroundButton from "@/components/button";
import { BrandColors, CustomFonts } from "@/constants/theme";

// Placeholder while denizen-app Button import is broken
function DenizenButton({ children, ...props }: { children: React.ReactNode; [key: string]: any }) {
  return (
    <View style={{ padding: 12, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, opacity: 0.4 }}>
      <Text style={{ fontFamily: CustomFonts.default, color: '#999' }}>{children}</Text>
    </View>
  );
}

const COLOR_OPTIONS: {
  label: string;
  bg: string;
  color: ButtonColor;
  inverted: boolean;
}[] = [
  {
    label: "Black on White",
    bg: BrandColors.white,
    color: "black",
    inverted: false,
  },
  {
    label: "Black on Black",
    bg: BrandColors.black,
    color: "black",
    inverted: true,
  },
  { label: "Sky", bg: BrandColors.sky, color: "darkSky", inverted: false },
  {
    label: "Sky inverted",
    bg: BrandColors.darkSky,
    color: "darkSky",
    inverted: true,
  },
  { label: "Pink", bg: BrandColors.pink, color: "darkPink", inverted: false },
  {
    label: "Pink inverted",
    bg: BrandColors.darkPink,
    color: "darkPink",
    inverted: true,
  },
  {
    label: "Green",
    bg: BrandColors.green,
    color: "darkGreen",
    inverted: false,
  },
  {
    label: "Peach",
    bg: BrandColors.peach,
    color: "darkPeach",
    inverted: false,
  },
  {
    label: "Purple",
    bg: BrandColors.purple,
    color: "darkPurple",
    inverted: false,
  },
  {
    label: "Yellow",
    bg: BrandColors.yellow,
    color: "darkYellow",
    inverted: false,
  },
];

export default function DenizenButtonsScreen() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [colorIdx, setColorIdx] = useState(0);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { bottom: bottomInset } = useSafeAreaInsets();

  const { bg, color, inverted } = COLOR_OPTIONS[colorIdx];

  return (
    <View style={[styles.container, { backgroundColor: bg }]}>
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentInner}
      >
        {/* Side-by-side comparison: Outlined Regular */}
        <View style={styles.comparisonRow}>
          <View style={styles.comparisonCol}>
            <Text
              style={[
                styles.comparisonLabel,
                { color: inverted ? "#fff" : "#999" },
              ]}
            >
              Denizen
            </Text>
            <DenizenButton
              variant="outlined"
              size="regular"
              color={color}
              inverted={inverted}
              disabled={isDisabled}
              loading={isLoading}
            >
              Reset all
            </DenizenButton>
          </View>
          <View style={styles.comparisonCol}>
            <Text
              style={[
                styles.comparisonLabel,
                { color: inverted ? "#fff" : "#999" },
              ]}
            >
              Playground
            </Text>
            <PlaygroundButton
              caption="Reset all"
              variant="outlined"
              size="regular"
              color={
                inverted
                  ? BrandColors.white
                  : ((BrandColors as Record<string, string>)[color] ??
                    BrandColors.black)
              }
              inverted={inverted}
              disabled={isDisabled}
              loading={isLoading}
            />
          </View>
          <View style={styles.baselineRule} />
        </View>

        <Text
          style={[styles.sectionLabel, { color: inverted ? "#fff" : "#000" }]}
        >
          Denizen UI Library Button
        </Text>

        {/* Row 1: Filled Regular */}
        <View style={styles.row}>
          <View style={styles.leftCol}>
            <DenizenButton
              variant="filled"
              size="regular"
              color={color}
              inverted={inverted}
              disabled={isDisabled}
              loading={isLoading}
            >
              Submit
            </DenizenButton>
          </View>
          <DenizenButton
            variant="filled"
            size="regular"
            color={color}
            inverted={inverted}
            disabled={isDisabled}
            loading={isLoading}
            icon="check_circle"
          >
            Confirm
          </DenizenButton>
        </View>

        {/* Row 2: Outlined Regular */}
        <View style={styles.row}>
          <View style={styles.leftCol}>
            <DenizenButton
              variant="outlined"
              size="regular"
              color={color}
              inverted={inverted}
              disabled={isDisabled}
              loading={isLoading}
            >
              Reset all
            </DenizenButton>
          </View>
          <DenizenButton
            variant="outlined"
            size="regular"
            color={color}
            inverted={inverted}
            disabled={isDisabled}
            loading={isLoading}
            icon="cancel"
          >
            Reject
          </DenizenButton>
        </View>

        {/* Row 3: Filled Compact */}
        <View style={styles.row}>
          <View style={styles.leftCol}>
            <DenizenButton
              variant="filled"
              size="compact"
              color={color}
              inverted={inverted}
              disabled={isDisabled}
              loading={isLoading}
            >
              Invite friends
            </DenizenButton>
          </View>
          <DenizenButton
            variant="filled"
            size="compact"
            color={color}
            inverted={inverted}
            disabled={isDisabled}
            loading={isLoading}
            icon="share"
          >
            Share
          </DenizenButton>
        </View>

        {/* Row 4: Outlined Compact */}
        <View style={styles.row}>
          <View style={styles.leftCol}>
            <DenizenButton
              variant="outlined"
              size="compact"
              color={color}
              inverted={inverted}
              disabled={isDisabled}
              loading={isLoading}
            >
              Show more
            </DenizenButton>
          </View>
          <DenizenButton
            variant="outlined"
            size="compact"
            color={color}
            inverted={inverted}
            disabled={isDisabled}
            loading={isLoading}
            icon="bookmark"
          >
            Save
          </DenizenButton>
        </View>

        {/* Full-width button */}
        <DenizenButton
          variant="filled"
          color={color}
          inverted={inverted}
          disabled={isDisabled}
          loading={isLoading}
        >
          Select membership
        </DenizenButton>

        {/* Long text: wraps to two lines then ellipsis */}
        <View style={{ flexDirection: "row", gap: 16 }}>
          <View style={{ flex: 1 }}>
            <DenizenButton
              variant="filled"
              size="regular"
              color={color}
              inverted={inverted}
              disabled={isDisabled}
              loading={isLoading}
            >
              This is a very long button label
            </DenizenButton>
          </View>
          <View style={{ flex: 1 }}>
            <DenizenButton
              variant="outlined"
              size="regular"
              color={color}
              inverted={inverted}
              disabled={isDisabled}
              loading={isLoading}
            >
              An extremely long label that should be truncated with ellipsis
            </DenizenButton>
          </View>
        </View>
      </ScrollView>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[72 + bottomInset]}
        index={1}
        enableDynamicSizing={true}
        backgroundStyle={styles.sheetBackground}
        handleIndicatorStyle={styles.sheetHandle}
        style={styles.sheetShadow}
      >
        <BottomSheetView
          style={[
            styles.sheetContent,
            { paddingBottom: Math.max(bottomInset, 24) },
          ]}
        >
          <Text style={styles.sheetTitle} maxFontSizeMultiplier={1}>
            Debug Controls
          </Text>
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel} maxFontSizeMultiplier={1}>
              Loading
            </Text>
            <Switch
              value={isLoading}
              onValueChange={setIsLoading}
              trackColor={{ false: "#d4d4d4", true: BrandColors.black }}
              thumbColor={BrandColors.white}
            />
          </View>
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel} maxFontSizeMultiplier={1}>
              Disabled
            </Text>
            <Switch
              value={isDisabled}
              onValueChange={setIsDisabled}
              trackColor={{ false: "#d4d4d4", true: BrandColors.black }}
              thumbColor={BrandColors.white}
            />
          </View>
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel} maxFontSizeMultiplier={1}>
              Color
            </Text>
            <View style={styles.colorChips}>
              {COLOR_OPTIONS.map((opt, i) => (
                <Text
                  key={opt.label}
                  style={[styles.chip, i === colorIdx && styles.chipActive]}
                  onPress={() => setColorIdx(i)}
                  maxFontSizeMultiplier={1}
                >
                  {opt.label}
                </Text>
              ))}
            </View>
          </View>
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
    paddingTop: 24,
    paddingBottom: 360,
    gap: 24,
  },
  sectionLabel: {
    fontFamily: CustomFonts.bold,
    fontSize: 18,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  leftCol: {
    width: 182,
    alignItems: "flex-start",
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
    flexWrap: "wrap",
    gap: 8,
  },
  toggleLabel: {
    fontFamily: CustomFonts.default,
    fontSize: 16,
    color: BrandColors.black,
  },
  colorChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  chip: {
    fontFamily: CustomFonts.default,
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
    color: "#333",
    overflow: "hidden",
  },
  chipActive: {
    backgroundColor: BrandColors.black,
    color: BrandColors.white,
  },
  comparisonRow: {
    flexDirection: "row",
    gap: 16,
  },
  comparisonCol: {
    alignItems: "flex-start",
    gap: 4,
  },
  comparisonLabel: {
    fontFamily: CustomFonts.default,
    fontSize: 12,
  },
  baselineRule: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 52,
    height: 2,
    backgroundColor: "red",
  },
});
