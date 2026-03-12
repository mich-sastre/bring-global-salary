import React from 'react';
import { Pressable, StyleSheet, Text, type ViewStyle } from 'react-native';
import { colors, fonts } from '../theme';

type PrimaryButtonProps = {
  label: string;
  onPress?: () => void;
  style?: ViewStyle;
  disabled?: boolean;
};

export function PrimaryButton({ label, onPress, style, disabled }: PrimaryButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
    >
      <Text style={[styles.label, disabled && styles.labelDisabled]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    backgroundColor: colors.primary,
    borderRadius: 64,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    backgroundColor: '#efefef',
  },
  label: {
    fontFamily: fonts.label,
    fontSize: 16,
    color: '#ffffff',
    lineHeight: 20.8,
    letterSpacing: -0.16,
  },
  labelDisabled: {
    color: 'rgba(17,17,17,0.32)',
  },
});
