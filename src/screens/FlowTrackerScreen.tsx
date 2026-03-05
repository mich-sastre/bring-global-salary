import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Svg, { Circle, Path } from 'react-native-svg';
import { NavBackIcon } from '../components/icons/NavBackIcon';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors, fonts, spacing } from '../theme';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'FlowTracker'>;

const LAYOUT_DEBUG = false;
const stroke = LAYOUT_DEBUG ? { borderWidth: 1, borderColor: 'red' } : {};

const TIMELINE_STEPS = [
  {
    title: 'Request sent',
    subtitle: 'Subtitle',
    status: 'done' as const,
  },
  {
    title: 'Acceptance in the other app',
    subtitle: 'Process description how to continue',
    status: 'pending' as const,
  },
  {
    title: 'ETA payroll',
    subtitle: 'Subtitle description',
    status: 'pending' as const,
  },
];

export function FlowTrackerScreen({ navigation }: Props) {
  return (
    <View style={[styles.container, stroke]}>
      <View style={[styles.topBar, stroke]}>
        <Pressable
          style={[styles.backButton, stroke]}
          hitSlop={12}
          onPress={() => navigation.goBack()}
        >
          <NavBackIcon size={24} color="#111111" opacity={1} />
        </Pressable>
        <Pressable style={[styles.helpButton, stroke]} hitSlop={12}>
          <HeadsetIcon />
        </Pressable>
      </View>

      <ScrollView
        style={[styles.scrollContent, stroke]}
        contentContainerStyle={styles.scrollInner}
      >
        <View style={[styles.headerText, stroke]}>
          <Text style={[styles.title, stroke]}>Payroll is coming</Text>
          <Text style={[styles.subtitle, stroke]}>Subtitle next steps</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={[styles.benefitsScroll, stroke]}
          contentContainerStyle={styles.benefitsInner}
        >
          <View style={[styles.benefitCard, stroke]}>
            <Text style={[styles.benefitTitle, stroke]}>Benefit #1</Text>
            <Text style={[styles.benefitDescription, stroke]}>
              Description of benefit #1
            </Text>
          </View>
          <View style={[styles.benefitCard, stroke]}>
            <Text style={[styles.benefitTitle, stroke]}>Highlight title</Text>
            <Text style={[styles.benefitDescription, stroke]}>
              Lörem ipsum parang mede losmos en hir mobillångfilm. Kasade
              ossade. Did san an regen.
            </Text>
          </View>
        </ScrollView>

        <View style={[styles.timeline, stroke]}>
          {TIMELINE_STEPS.map((step, index) => {
            const isFirst = index === 0;
            const isLast = index === TIMELINE_STEPS.length - 1;
            const isDone = step.status === 'done';

            return (
              <View key={index} style={[styles.timelineStep, stroke]}>
                <View style={[styles.bulletCol, stroke]}>
                  {!isFirst && (
                    <View
                      style={[
                        styles.trackTop,
                        { backgroundColor: isDone ? colors.primary : 'rgba(0,0,0,0.12)' },
                      ]}
                    />
                  )}
                  <View
                    style={[
                      styles.bullet,
                      {
                        backgroundColor: isDone
                          ? colors.primary
                          : 'rgba(0,0,0,0.32)',
                      },
                      stroke,
                    ]}
                  />
                  {!isLast && (
                    <View
                      style={[
                        styles.trackBottom,
                        {
                          backgroundColor: isDone
                            ? colors.primary
                            : 'rgba(0,0,0,0.12)',
                        },
                      ]}
                    />
                  )}
                </View>
                <View style={[styles.stepContent, stroke]}>
                  <Text
                    style={[
                      styles.stepTitle,
                      !isDone && styles.stepTitlePending,
                      stroke,
                    ]}
                  >
                    {step.title}
                  </Text>
                  <Text style={[styles.stepSubtitle, stroke]}>
                    {step.subtitle}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View style={[styles.footer, stroke]}>
        <PrimaryButton
          label="Call to action"
          onPress={() => navigation.navigate('Onboarding')}
        />
      </View>
    </View>
  );
}

function HeadsetIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2C6.48 2 2 6.48 2 12V20C2 21.1 2.9 22 4 22H8V13H4V12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12V13H16V22H20C21.1 22 22 21.1 22 20V12C22 6.48 17.52 2 12 2ZM6 15V20H4V15H6ZM20 20H18V15H20V20Z"
        fill="black"
        fillOpacity={0.96}
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 56,
  },
  topBar: {
    height: 44,
    paddingHorizontal: spacing.x6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    flex: 1,
  },
  scrollInner: {
    paddingBottom: spacing.x6,
  },
  headerText: {
    paddingTop: spacing.x4,
    paddingHorizontal: spacing.x6,
    gap: spacing.x2,
  },
  title: {
    fontFamily: fonts.label,
    fontSize: 28,
    lineHeight: 33.6,
    letterSpacing: -0.84,
    color: 'rgba(0,0,0,0.96)',
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 18,
    lineHeight: 23.4,
    letterSpacing: -0.18,
    color: 'rgba(0,0,0,0.64)',
  },
  benefitsScroll: {
    marginTop: spacing.x4,
  },
  benefitsInner: {
    paddingHorizontal: spacing.x6,
    gap: 8,
  },
  benefitCard: {
    width: 327,
    backgroundColor: '#dedeff',
    borderRadius: 16,
    paddingHorizontal: spacing.x4,
    paddingVertical: spacing.x5,
    gap: 4,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  benefitTitle: {
    fontFamily: fonts.label,
    fontSize: 14,
    lineHeight: 18.2,
    letterSpacing: -0.14,
    color: 'rgba(0,0,0,0.96)',
  },
  benefitDescription: {
    fontFamily: fonts.text,
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: -0.14,
    color: 'rgba(0,0,0,0.64)',
  },
  timeline: {
    marginTop: spacing.x6,
    paddingHorizontal: spacing.x6,
  },
  timelineStep: {
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  bulletCol: {
    width: 12,
    alignItems: 'center',
    marginRight: 32,
  },
  trackTop: {
    width: 2,
    height: 16,
  },
  bullet: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  trackBottom: {
    width: 2,
    flex: 1,
  },
  stepContent: {
    flex: 1,
    paddingTop: spacing.x3,
    paddingBottom: spacing.xl,
    gap: spacing.x2,
  },
  stepTitle: {
    fontFamily: fonts.label,
    fontSize: 14,
    lineHeight: 18.2,
    letterSpacing: -0.14,
    color: 'rgba(0,0,0,0.96)',
  },
  stepTitlePending: {
    color: 'rgba(0,0,0,0.64)',
  },
  stepSubtitle: {
    fontFamily: fonts.text,
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: -0.14,
    color: 'rgba(0,0,0,0.64)',
  },
  footer: {
    paddingHorizontal: spacing.x6,
    paddingTop: spacing.x4,
    paddingBottom: spacing.x6,
    backgroundColor: '#ffffff',
  },
});
