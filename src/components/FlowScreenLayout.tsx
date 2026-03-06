import React from 'react';
import { StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { OnboardingNavBar } from './OnboardingNavBar';
import { spacing, fonts } from '../theme';

type FlowScreenLayoutProps = {
  title: string;
  subtitle: string;
  onBack?: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
};

export function FlowScreenLayout({
  title,
  subtitle,
  onBack,
  children,
  style,
}: FlowScreenLayoutProps) {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.navContainer}>
        <OnboardingNavBar onBack={onBack} />
      </View>

      <View style={styles.headerText}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 56,
  },
  navContainer: {
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  headerText: {
    paddingTop: spacing.x2,
    paddingHorizontal: spacing.x6,
    paddingBottom: spacing.x6,
    gap: spacing.x2,
  },
  title: {
    fontFamily: fonts.label,
    fontSize: 28,
    color: 'rgba(0,0,0,0.96)',
    lineHeight: 33.6,
    letterSpacing: 0,
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 18,
    color: 'rgba(0,0,0,0.64)',
    lineHeight: 23.4,
    letterSpacing: 0,
  },
});
