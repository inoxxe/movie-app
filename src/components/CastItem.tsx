import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CastMember} from '../../types/screeninterface';
import {COLORS, poster185} from '../utils/constants';
import Icons from './Icons';

type Props = {cast: CastMember};

const CastItem = (props: Props) => {
  return (
    <View>
      {props.cast.profile_path !== null ? (
        <Image
          source={{uri: poster185(props.cast.profile_path)}}
          style={styles.image}
        />
      ) : (
        <View style={styles.placeholderContainer}>
          <Icons.Ionicons name="person" color={'black'} size={48} />
        </View>
      )}
      <Text style={styles.castName}>{props.cast.name}</Text>
    </View>
  );
};

export default CastItem;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 50, // 100 / 2
  },
  placeholderContainer: {
    width: 100,
    height: 100,
    borderRadius: 50, // 100 / 2
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  castName: {
    marginTop: 5,
    color: COLORS.TEXT_SECONDARY,
    width: 100,
    flexWrap: 'wrap',
    textAlign: 'center',
  },
});
