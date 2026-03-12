import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useCountry } from '../context/CountryContext';
import { getAllCountryConfigs } from '../config';
import { colors, spacing, fonts } from '../theme';
import { NavChevronDownIcon } from './icons/NavChevronDownIcon';

export function CountrySelector() {
  const { activeCountry, setActiveCountry, config } = useCountry();
  const [open, setOpen] = useState(false);
  const countries = getAllCountryConfigs();

  const handleSelect = (code: typeof config.code) => {
    setActiveCountry(code);
    setOpen(false);
  };

  return (
    <>
      <Pressable
        style={styles.trigger}
        onPress={() => setOpen(true)}
        accessibilityLabel={`País seleccionado: ${config.displayName}. Toca para cambiar.`}
        accessibilityRole="button"
      >
        <Text style={styles.triggerText} numberOfLines={1}>
          {config.displayName}
        </Text>
        <NavChevronDownIcon size={16} opacity={1} />
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Seleccionar país</Text>
            <ScrollView style={styles.list} keyboardShouldPersistTaps="handled">
              {countries.map((c) => (
                <Pressable
                  key={c.code}
                  style={[
                    styles.option,
                    c.code === activeCountry && styles.optionActive,
                  ]}
                  onPress={() => handleSelect(c.code)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      c.code === activeCountry && styles.optionTextActive,
                    ]}
                  >
                    {c.displayName}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
            <Pressable
              style={styles.closeButton}
              onPress={() => setOpen(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(31,2,48,0.08)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 64,
    minWidth: 100,
    maxWidth: 220,
  },
  triggerText: {
    fontFamily: fonts.label,
    fontSize: 16,
    lineHeight: 20.8,
    letterSpacing: -0.16,
    color: colors.text,
    flex: 1,
    textAlign: 'center',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  modalContent: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: spacing.lg,
    width: '100%',
    maxWidth: 320,
    maxHeight: '80%',
  },
  modalTitle: {
    fontFamily: fonts.label,
    fontSize: 18,
    lineHeight: 23.4,
    letterSpacing: -0.18,
    color: colors.text,
    marginBottom: spacing.md,
  },
  list: {
    maxHeight: 300,
  },
  option: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: 8,
  },
  optionActive: {
    backgroundColor: 'rgba(130,10,209,0.12)',
  },
  optionText: {
    fontFamily: fonts.text,
    fontSize: 16,
    lineHeight: 20.8,
    letterSpacing: -0.16,
    color: colors.text,
  },
  optionTextActive: {
    fontWeight: '600',
    color: colors.primary,
  },
  closeButton: {
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  closeButtonText: {
    fontFamily: fonts.label,
    fontSize: 16,
    lineHeight: 20.8,
    letterSpacing: -0.16,
    color: colors.primary,
  },
});
