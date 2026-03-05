import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing } from '../theme';

export const CARD_WIDTH = 270;
export const CARD_HEIGHT = 372;
/** Card "abajo" (inactiva) primer nivel: 236×323, radius 24. */
export const BACK_CARD_WIDTH = 236;
export const BACK_CARD_HEIGHT = 323;
/** Card "abajo" segundo nivel (la más atrás): 208×279, radius 24. */
export const BACK_CARD_2_WIDTH = 208;
export const BACK_CARD_2_HEIGHT = 279;
const CARD_RADIUS = 24;
/** Altura de la franja inferior (título + descripción). Padding 16 horizontal, 32 abajo. */
const CARD_STRIP_HEIGHT = 100;

export type BenefitCardProps = {
  title: string;
  description: string;
  /** Imagen local (require()) para la ilustración de la card. */
  imageSource?: ImageSourcePropType | null;
  /** URI opcional para imagen remota; si no hay imageSource ni imageUri, se muestra placeholder. */
  imageUri?: string | null;
  /** Color de acento para el placeholder cuando no hay imagen (por slide). */
  placeholderColor?: string;
  /** 0 = principal (270×372), 1 = atrás (236×323), 2 = más atrás (208×279). */
  compactLevel?: 0 | 1 | 2;
};

function getCardSize(compactLevel: 0 | 1 | 2) {
  if (compactLevel === 0) return { width: CARD_WIDTH, height: CARD_HEIGHT };
  if (compactLevel === 1) return { width: BACK_CARD_WIDTH, height: BACK_CARD_HEIGHT };
  return { width: BACK_CARD_2_WIDTH, height: BACK_CARD_2_HEIGHT };
}

export function BenefitCard({
  title,
  description,
  imageSource,
  imageUri,
  placeholderColor = '#9032EB',
  compactLevel = 0,
}: BenefitCardProps) {
  const hasImage = imageSource ?? imageUri;
  const { width, height } = getCardSize(compactLevel);
  const stripHeight = compactLevel === 0 ? CARD_STRIP_HEIGHT : Math.round((CARD_STRIP_HEIGHT * height) / CARD_HEIGHT);
  const illustrationHeight = height - stripHeight;
  return (
    <View style={[styles.card, { width, height }]}>
      <View style={[styles.illustrationWrap, { height: illustrationHeight }]}>
        {hasImage ? (
          <Image
            source={imageSource ?? { uri: imageUri! }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.placeholder, { backgroundColor: placeholderColor }]} />
        )}
        <LinearGradient
          colors={['rgba(75,21,127,0)', 'rgba(75,21,127,0.95)']}
          style={styles.gradientOverlay}
          start={{ x: 0.5, y: 0.55 }}
          end={{ x: 0.5, y: 1 }}
        />
      </View>
      <View style={[styles.strip, { height: stripHeight }]}>
        <Text style={styles.stripTitle} numberOfLines={1}>
          {title}
        </Text>
        <Text style={styles.stripDescription} numberOfLines={2}>
          {description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: CARD_RADIUS,
    overflow: 'hidden',
    backgroundColor: '#dedeff',
  },
  illustrationWrap: {
    position: 'relative',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  placeholder: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.5,
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  strip: {
    height: CARD_STRIP_HEIGHT,
    backgroundColor: '#4b157f',
    paddingHorizontal: 16,
    paddingBottom: 32,
    paddingTop: spacing.sm,
    justifyContent: 'flex-end',
    gap: 4,
  },
  stripTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    letterSpacing: -0.16,
  },
  stripDescription: {
    fontSize: 14,
    color: '#ffffff',
    letterSpacing: -0.14,
    lineHeight: 21,
  },
});
