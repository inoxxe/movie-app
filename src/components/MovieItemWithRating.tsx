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
import moment from 'moment';
const {width, height} = Dimensions.get('window');

type Props = {movie: Movie; onPress: () => void};

const MovieItemWithRating = (props: Props) => {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={styles.container}>
        <Image
          source={{uri: poster500(props.movie.poster_path)}}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{props.movie.title}</Text>
          <View style={styles.ratingContainer}>
            <Icons.Ionicons name="star" color={COLORS.TITLE_TEXT} />
            <Text style={styles.voteAverage}>
              {props.movie.vote_average.toFixed(2)}
            </Text>
            <Icons.Entypo
              name="dot-single"
              color={COLORS.TEXT_PRIMARY}
              size={24}
            />
            <Text style={styles.releaseDate}>
              {moment(props.movie.release_date).format('YYYY')}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  image: {
    width: width * 0.3,
    height: height * 0.2,
    borderRadius: 10,
  },
  textContainer: {
    marginStart: 16,
    rowGap: 5,
  },
  title: {
    fontSize: 16,
    color: COLORS.TEXT_PRIMARY,
    width: width * 0.5,
    flexWrap: 'wrap',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voteAverage: {
    color: COLORS.TITLE_TEXT,
    marginStart: 2,
    fontWeight: 'bold',
  },
  releaseDate: {
    color: COLORS.TEXT_PRIMARY,
  },
});

export default MovieItemWithRating;
