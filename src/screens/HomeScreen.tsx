import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, GlobalStyles} from '../utils/constants';
import API from '../services/api';
import Carousel from 'react-native-snap-carousel';
import {HomeTabScreenProps, Movie} from '../../types/screeninterface';
import CarouselCard from '../components/CarouselCard';
import HomeMovieList from '../components/HomeMovieList';
import {MovieResponse} from '../services/api.types';

const {width} = Dimensions.get('window');

const HomeScreen = ({navigation}: HomeTabScreenProps<'Home'>) => {
  const [trending, setTrending] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isBannerLoading, setIsBannerLoading] = useState(true);

  const getTrendingMovie = async () => {
    try {
      const res = (await API.fetchTrendingMovies()) as MovieResponse;
      setTrending(res.results);
      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Error', 'An unknown error occurred');
      }
    }
  };

  const getPopularMovies = async () => {
    try {
      const res = (await API.fetchPopularMovie()) as MovieResponse;
      setPopular(res.results);
      setIsBannerLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Error', 'An unknown error occurred');
      }
    }
  };

  useEffect(() => {
    getTrendingMovie();
    getPopularMovies();
  }, []);

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <View style={styles.container}>
        {isBannerLoading ? (
          <ActivityIndicator style={styles.loader} size={'small'} />
        ) : (
          <Carousel
            data={popular}
            firstItem={1}
            inactiveSlideOpacity={0.6}
            sliderWidth={width}
            itemWidth={200}
            slideStyle={styles.slideStyle}
            renderItem={({item}) => (
              <CarouselCard
                movie={item}
                onPress={() =>
                  navigation.navigate('Movie Detail', {movie_id: item.id})
                }
              />
            )}
            useScrollView={true}
            initialScrollIndex={popular.length}
            getItemLayout={(data, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            horizontal={true}
            loop={true}
            loopClonesPerSide={popular.length}
          />
        )}
        <Text style={styles.trendingText}>Trending</Text>
        {isLoading ? (
          <ActivityIndicator style={styles.loader} size="small" />
        ) : (
          <FlatList
            showsHorizontalScrollIndicator={false}
            style={styles.flatList}
            horizontal
            contentContainerStyle={styles.flatListContent}
            data={trending}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <HomeMovieList
                movie={item}
                onPress={() =>
                  navigation.navigate('Movie Detail', {movie_id: item.id})
                }
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loader: {
    flex: 1,
  },
  slideStyle: {
    display: 'flex',
    alignItems: 'center',
  },
  trendingText: {
    color: COLORS.TITLE_TEXT,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: -40,
  },
  flatList: {
    marginTop: 16,
  },
  flatListContent: {
    columnGap: 12,
  },
});
