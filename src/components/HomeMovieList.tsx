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

const {width, height} = Dimensions.get('window');
type Props = {movie: Movie; onPress: () => void};

const HomeMovieList = (props: Props) => {
  return (
    <TouchableWithoutFeedback onPress={props.onPress}>
      <View>
        <Image
          source={{uri: poster500(props.movie.poster_path)}}
          style={styles.image}
        />
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
});
