import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../theme';

type ProgressBarProps = {
  /** Valor entre 0 y 1 (0 % – 100 %). */
  progress: number;
};

export function ProgressBar({ progress }: ProgressBarProps) {
  const clamped = Math.min(1, Math.max(0, progress));
  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${clamped * 100}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(31,2,48,0.08)',
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 2,
    backgroundColor: colors.primary,
  },
});
