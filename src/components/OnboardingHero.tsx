import React from 'react';
import { StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { spacing, fonts } from '../theme';

type OnboardingHeroProps = {
  title: string;
  subtitle: string;
  style?: ViewStyle;
};

/**
 * Parte 2 del header: bloque de título y subtítulo, divididos en dos componentes.
 * Título y subtítulo son elementos independientes para poder reutilizarlos o animarlos por separado.
 */
export function OnboardingHero({ title, subtitle, style }: OnboardingHeroProps) {
  return (
    <View style={[styles.block, style]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    alignSelf: 'stretch',
    alignItems: 'center',
    paddingTop: spacing.x3,
    paddingRight: spacing.x5,
    paddingBottom: spacing.x5,
    paddingLeft: spacing.x5,
    gap: spacing.x2,
  },
  /** [Magic] Title/Medium – Font Display, 600, 28px, 120% line height */
  title: {
    fontFamily: fonts.label,
    fontSize: 28,
    color: '#1f0230',
    lineHeight: 33.6,
    letterSpacing: 0,
    textAlign: 'center',
  },
  /** [Magic] Subtitle/Medium/Default – Font Text, 400, 18px, 130% line height */
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 18,
    color: 'rgba(31,2,48,0.62)',
    lineHeight: 23.4,
    letterSpacing: 0,
    textAlign: 'center',
  },
});
