import React, { useMemo, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Svg, { Circle, Path } from 'react-native-svg';
import { NavBackIcon } from '../components/icons/NavBackIcon';
import { fonts, spacing } from '../theme';
import { useCountry } from '../context/CountryContext';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'FlowBankSelection'>;

const FALLBACK_BANKS = ['Bank #1', 'Bank #2', 'Bank #3', 'Bank #4', 'Bank #5'];

export function FlowBankSelectionScreen({ navigation }: Props) {
  const { config } = useCountry();
  const [search, setSearch] = useState('');

  const banks = (config.bankNames?.length ? config.bankNames : FALLBACK_BANKS).slice(0, 5);

  const filteredBanks = useMemo(() => {
    const text = search.trim().toLowerCase();
    if (!text) {
      return banks;
    }
    return banks.filter((bankName) => bankName.toLowerCase().includes(text));
  }, [banks, search]);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Pressable
          style={styles.backButton}
          hitSlop={12}
          onPress={() => navigation.goBack()}
        >
          <NavBackIcon size={24} color="#111111" opacity={1} />
        </Pressable>
        <View style={styles.progressWrap} pointerEvents="none">
          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>
        </View>
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>Select a bank</Text>
        <Text style={styles.subtitle}>Description/start find my bank</Text>
      </View>

      <View style={styles.searchWrap}>
        <SearchIcon />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search"
          placeholderTextColor="rgba(0,0,0,0.64)"
          autoCorrect={false}
          style={styles.searchInput}
        />
      </View>

      <View style={styles.listTitleWrap}>
        <Text style={styles.listTitle}>Title</Text>
      </View>

      <View style={styles.list}>
        {filteredBanks.map((bankName) => (
          <Pressable
            key={bankName}
            style={styles.row}
            onPress={() => navigation.navigate('FlowConfirmation')}
          >
            <View style={styles.bankIconWrap}>
              <BankIcon />
            </View>
            <Text style={styles.bankName}>{bankName}</Text>
            <ChevronRightIcon />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function SearchIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Circle cx={11} cy={11} r={6.5} stroke="#111111" strokeOpacity={0.64} strokeWidth={2} />
      <Path d="M16 16L20 20" stroke="#111111" strokeOpacity={0.64} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

function BankIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 8V10H5L5 17H7L7 10H11L11 17H13V10H17V17H19V10H21V8L12 2L3 8ZM17.3944 8H6.60555L12 4.4037L17.3944 8Z"
        fill="black"
        fillOpacity={0.96}
      />
      <Path
        d="M3 21V19H21V21H3Z"
        fill="black"
        fillOpacity={0.96}
      />
    </Svg>
  );
}

function ChevronRightIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M9 6L15 12L9 18" stroke="#111111" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" />
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
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: spacing.x6,
    top: 10,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressWrap: {
    alignSelf: 'center',
    width: 128,
  },
  progressTrack: {
    width: '100%',
    height: 4,
    backgroundColor: '#d6d6db',
  },
  progressFill: {
    width: '56%',
    height: '100%',
    backgroundColor: '#820ad1',
  },
  header: {
    paddingTop: spacing.x4,
    paddingHorizontal: spacing.x6,
    gap: spacing.x2,
  },
  title: {
    fontFamily: fonts.label,
    fontSize: 28,
    lineHeight: 33.6,
    letterSpacing: -0.84,
    color: '#111111',
  },
  subtitle: {
    fontFamily: fonts.text,
    fontSize: 18,
    lineHeight: 23.4,
    letterSpacing: -0.18,
    color: 'rgba(17,17,17,0.72)',
  },
  searchWrap: {
    marginTop: spacing.x6,
    marginHorizontal: spacing.x6,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#efefef',
    paddingHorizontal: spacing.x4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.x3,
  },
  searchInput: {
    flex: 1,
    fontFamily: fonts.label,
    fontSize: 16,
    lineHeight: 20.8,
    letterSpacing: -0.16,
    color: '#111111',
    padding: 0,
  },
  listTitleWrap: {
    paddingHorizontal: spacing.x6,
    paddingTop: spacing.x6,
    paddingBottom: spacing.x3,
  },
  listTitle: {
    fontFamily: fonts.label,
    fontSize: 16,
    lineHeight: 20.8,
    letterSpacing: -0.16,
    color: 'rgba(17,17,17,0.72)',
  },
  list: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.08)',
  },
  row: {
    height: 80,
    paddingHorizontal: spacing.x6,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.12)',
  },
  bankIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#efefef',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bankName: {
    flex: 1,
    marginLeft: spacing.x4,
    fontFamily: fonts.label,
    fontSize: 16,
    lineHeight: 20.8,
    letterSpacing: -0.16,
    color: '#111111',
  },
});
