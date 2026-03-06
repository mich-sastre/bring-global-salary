import React from 'react';
import { Pressable, StyleSheet, View, type ViewStyle } from 'react-native';
import { CountrySelector } from './CountrySelector';
import { NavBackIcon } from './icons/NavBackIcon';
import { headerRowPaddingVertical } from '../theme';

type OnboardingNavBarProps = {
  onBack?: () => void;
  style?: ViewStyle;
};

/**
 * Parte 1 del header: barra con ícono atrás + selector de país.
 * Separado para poder reutilizarlo y mantener la estructura clara.
 */
export function OnboardingNavBar({ onBack, style }: OnboardingNavBarProps) {
  return (
    <View style={[styles.header, style]}>
      <View style={styles.dropdownCenter} pointerEvents="box-none">
        <CountrySelector />
      </View>
      <Pressable style={styles.backButton} hitSlop={12} onPress={onBack}>
        <NavBackIcon size={24} opacity={1} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    alignSelf: 'stretch',
    height: 64,
    paddingVertical: headerRowPaddingVertical,
    justifyContent: 'center',
  },
  dropdownCenter: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 10,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    zIndex: 1,
  },
});
