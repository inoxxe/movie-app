import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import Icons from './Icons';
import moment from 'moment';
import {Movie} from '../../types/screeninterface';
import {COLORS, poster500} from '../utils/constants';

const {width, height} = Dimensions.get('window');

type Props = {movie: Movie; onPress: () => void};

const CarouselCard = (props: Props) => {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View style={styles.container}>
        <Image
          source={{uri: poster500(props.movie.poster_path)}}
          style={styles.image}
        />
        <Text style={styles.title}>{props.movie.title}</Text>
        <View style={styles.details}>
          <Icons.Ionicons name="star" color={COLORS.TITLE_TEXT} />
          <Text style={styles.rating}>
            {props.movie.vote_average.toFixed(2)}
          </Text>
          <Icons.Entypo
            name="dot-single"
            color={COLORS.TEXT_PRIMARY}
            size={24}
          />
          <Text style={styles.year}>
            {moment(props.movie.release_date).format('YYYY')}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CarouselCard;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image: {
    width: width * 0.5,
    height: height * 0.3,
    borderRadius: 10,
  },
  title: {
    fontSize: 16,
    color: COLORS.TEXT_PRIMARY,
    marginTop: 10,
    textAlign: 'center',
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    color: COLORS.TITLE_TEXT,
    marginStart: 2,
    fontWeight: 'bold',
  },
  year: {
    color: COLORS.TEXT_PRIMARY,
  },
});
