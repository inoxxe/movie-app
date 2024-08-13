import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {Movie} from '../../types/screeninterface';
import {COLORS, poster500} from '../utils/constants';
import Icons from './Icons';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');
type Props = {movie: Movie; onPress: () => void; showRating?: boolean};

const HomeMovieList = (props: Props) => {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View>
        <View>
          <Image
            source={{uri: poster500(props.movie.poster_path)}}
            style={styles.image}
          />
          {props.showRating && (
            <>
              <View style={styles.ratingContainer}>
                <Icons.Ionicons
                  name="star"
                  color={COLORS.TITLE_TEXT}
                  size={16}
                />
                <Text style={styles.ratingText}>
                  {props.movie.vote_average.toFixed(2)}
                </Text>
              </View>
              <LinearGradient
                colors={['transparent', 'rgba(31,31,31,0.8), rgba(31,31,31,1']}
                style={styles.gradient}
                start={{x: 0.5, y: 0.5}}
                end={{x: 0.5, y: 1}}
              />
            </>
          )}
        </View>

        <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
          {props.movie.title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default HomeMovieList;

const styles = StyleSheet.create({
  image: {width: width * 0.3, height: height * 0.2, borderRadius: 10},
  title: {color: COLORS.TEXT_PRIMARY, width: width * 0.3, marginTop: 8},
  gradient: {
    width,
    height: 200,
    position: 'absolute',
    bottom: 0,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 3,
    position: 'absolute',
    bottom: 10,
    left: 10,
    zIndex: 10,
  },
  ratingText: {fontSize: 16, color: COLORS.TITLE_TEXT},
});
