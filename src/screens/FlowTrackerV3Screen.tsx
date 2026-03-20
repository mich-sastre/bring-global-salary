import React from 'react';
import { Image, Platform, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Box,
  Header,
  Badge,
  Button,
  NText,
  CreditLetterIcon,
  useNuDSTheme,
} from '@nubank/nuds-vibecode-react-native';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'FlowTrackerV3'>;

const headerArtwork = require('../../assets/tracker-header-artwork.png');
const cardArtworkImage = require('../../assets/tracker-card-artwork.png');

export function FlowTrackerV3Screen({ navigation }: Props) {
  const theme = useNuDSTheme();

  return (
    <Box surface="screen" style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Header
          type="artwork"
          title="¡Tu nómina está en camino!"
          subtitle="La próxima vez que tu empresa envíe tu pago, estará en Nu. Te avisaremos si surge algo. Ponte a gusto."
          showSubtitle
          showTopBar
          showAction={false}
          onBackPress={() => navigation.goBack()}
          illustration={
            <Image
              source={headerArtwork}
              style={styles.artworkImage}
              resizeMode="contain"
            />
          }
        />

        {/* Timeline section */}
        <View style={styles.timelineSection}>
          {/* Step card */}
          <View style={[styles.stepCard, { backgroundColor: theme.color.surface.subtle }]}>
            {/* Card artwork */}
            <Image
              source={cardArtworkImage}
              style={styles.cardArtwork}
              resizeMode="cover"
            />

            {/* Step content with bullet */}
            <View style={styles.stepBody}>
              {/* Bullet track */}
              <View style={styles.bulletColumn}>
                <View style={[styles.bulletTrack, { backgroundColor: theme.color.surface.accent.primary }]} />
                <View
                  style={[
                    styles.bulletCircle,
                    { backgroundColor: theme.color.surface.accent.primary },
                  ]}
                >
                  <CreditLetterIcon size={20} color="#ffffff" />
                </View>
              </View>

              {/* Text content */}
              <View style={styles.stepTextContent}>
                <Badge label="En proceso" color="accent" />
                <NText variant="subtitleMediumStrong" style={{ marginTop: 12 }}>
                  Solicitud enviada
                </NText>
                <NText variant="paragraphSmallDefault" tone="secondary" style={{ marginTop: 4 }}>
                  Estamos creando una conexión con el otro banco.
                </NText>
              </View>
            </View>
          </View>

          {/* Track connector */}
          <View style={styles.trackConnector}>
            <View style={[styles.connectorLine, { backgroundColor: theme.color.border.default }]} />
          </View>

          {/* Checkpoint */}
          <View style={styles.checkpoint}>
            {/* Bullet */}
            <View style={styles.checkpointBulletCol}>
              <View style={[styles.checkpointTrack, { backgroundColor: theme.color.border.default }]} />
              <View
                style={[
                  styles.checkpointDot,
                  { backgroundColor: theme.color.surface.strong },
                ]}
              />
            </View>

            {/* Checkpoint text */}
            <View style={styles.checkpointContent}>
              <NText variant="labelSmallStrong" tone="secondary">
                Todo estará listo para el [15 de diciembre].
              </NText>
              <NText variant="paragraphSmallDefault" tone="secondary" style={{ marginTop: 8 }}>
                Una vez que la conexión esté lista, tendrás tu salario aquí en Nu.
              </NText>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom bar with enabled button */}
      <View style={{ paddingHorizontal: theme.spacing[4], paddingVertical: theme.spacing[5] }}>
        <Button
          label="Entendido"
          variant="primary"
          expanded
          onPress={() => navigation.popToTop()}
        />
      </View>
    </Box>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 47 : StatusBar.currentHeight ?? 0,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  artworkImage: {
    width: 150,
    height: 150,
  },
  timelineSection: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  stepCard: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  cardArtwork: {
    width: '100%',
    height: 143,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  stepBody: {
    flexDirection: 'row',
    paddingLeft: 32,
    paddingRight: 24,
  },
  bulletColumn: {
    alignItems: 'center',
    width: 32,
    marginLeft: -16,
  },
  bulletTrack: {
    width: 2,
    height: 19,
  },
  bulletCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepTextContent: {
    flex: 1,
    paddingVertical: 24,
    paddingLeft: 12,
  },
  trackConnector: {
    paddingLeft: 32,
    height: 24,
  },
  connectorLine: {
    width: 2,
    height: '100%',
  },
  checkpoint: {
    flexDirection: 'row',
    paddingLeft: 32,
    borderRadius: 12,
  },
  checkpointBulletCol: {
    alignItems: 'center',
    width: 12,
    marginLeft: -6,
  },
  checkpointTrack: {
    width: 2,
    height: 16,
  },
  checkpointDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  checkpointContent: {
    flex: 1,
    paddingTop: 12,
    paddingBottom: 32,
    paddingLeft: 26,
  },
});
