import React from 'react';
import { StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { spacing, fonts } from '../theme';

type CalloutBoxProps = {
  text: string;
  style?: ViewStyle;
};

export function CalloutBox({ text, style }: CalloutBoxProps) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.x5,
    marginBottom: spacing.x3,
    paddingVertical: spacing.x4,
    paddingHorizontal: spacing.x5,
    backgroundColor: 'rgba(31,2,48,0.04)',
    borderRadius: 12,
  },
  text: {
    fontFamily: fonts.text,
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: -0.14,
    color: 'rgba(31,2,48,0.62)',
  },
});
