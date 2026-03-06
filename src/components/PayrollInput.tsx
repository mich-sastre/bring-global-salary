import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import { colors, spacing, fonts } from '../theme';

type PayrollInputProps = {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  validated?: boolean;
  keyboardType?: 'default' | 'numeric' | 'number-pad';
  debug?: boolean;
};

export function PayrollInput({
  label,
  placeholder,
  value,
  onChangeText,
  validated = false,
  keyboardType = 'number-pad',
  debug = false,
}: PayrollInputProps) {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;
  const lineColor = focused || hasValue ? colors.primary : 'rgba(31,2,48,0.12)';
  const stroke = debug ? { borderWidth: 1, borderColor: 'red' } : {};

  return (
    <View style={[styles.container, stroke]}>
      <Text style={[styles.label, stroke]}>{label}</Text>

      <View style={[styles.inputRow, stroke]}>
        <TextInput
          style={[styles.input, hasValue && styles.inputFilled]}
          placeholder={placeholder}
          placeholderTextColor="rgba(31,2,48,0.32)"
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          keyboardType={keyboardType}
          autoCorrect={false}
        />
        {validated && hasValue && (
          <ShieldCheckIcon size={24} color="#000000" opacity={0.64} />
        )}
      </View>

      <View style={[styles.line, { backgroundColor: lineColor }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.x6,
  },
  /** Label/Small/Strong: 500, 14px, 130% line height, -1% letter spacing */
  label: {
    fontFamily: fonts.display,
    fontSize: 14,
    lineHeight: 18.2,
    letterSpacing: -0.14,
    color: '#1f0230',
    marginBottom: spacing.x3,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingBottom: spacing.x3,
  },
  /** Title/XSmall: 500, 20px, 120% line height, -2% letter spacing */
  input: {
    flex: 1,
    fontFamily: fonts.display,
    fontSize: 20,
    lineHeight: 24,
    letterSpacing: -0.4,
    color: 'rgba(31,2,48,0.32)',
    padding: 0,
  },
  inputFilled: {
    color: '#1f0230',
  },
  line: {
    height: 1,
    borderRadius: 0.5,
  },
});
