import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackButton from '../components/BackButton';
import {COLORS, GlobalStyles, poster500} from '../utils/constants';
import API from '../services/api';
import {MovieDetail, RootStackScreenProps} from '../../types/screeninterface';
import Icons from '../components/Icons';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import useUserStore from '../store/userStore';
import {MovieDetailResponse} from '../services/api.types';
import CastItem from '../components/CastItem';

const {width, height} = Dimensions.get('window');

const MovieDetailScreen = ({route}: RootStackScreenProps<'Movie Detail'>) => {
  const userStore = useUserStore();
  const [isFavourite, setIsFavourite] = useState(false);
  const {movie_id} = route.params;
  const [movieDetail, setMovieDetail] = useState<MovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getMovieDetail = async () => {
    try {
      const res = (await API.fetchMovieDetails(
        movie_id,
      )) as MovieDetailResponse;
      setMovieDetail(res);
      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Error', 'An unknown error occurred');
      }
    }
  };

  useEffect(() => {
    getMovieDetail();
  }, []);

  useEffect(() => {
    const movieExists = userStore.favoriteMovies.some(
      movie => movie.id === movieDetail?.id,
    );

    // Set the isFavourite state based on the result
    setIsFavourite(movieExists);
  }, [userStore.favoriteMovies, movieDetail]);

  if (isLoading) {
    return (
      <ActivityIndicator size={'large'} style={styles.activityIndicator} />
    );
  }

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <BackButton style={styles.backButton} />
      <TouchableOpacity
        style={styles.favouriteButton}
        onPress={() => {
          isFavourite
            ? userStore.removeFavorite(movieDetail?.id)
            : userStore.addFavorite(movieDetail);
        }}>
        <Icons.Ionicons
          name="heart"
          color={isFavourite ? COLORS.PRIMARY_ACCENT : COLORS.TEXT_PRIMARY}
          size={24}
        />
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Image
            source={{uri: poster500(movieDetail?.backdrop_path)}}
            style={styles.backdropImage}
          />
          <View style={styles.posterContainer}>
            <Image
              source={{uri: poster500(movieDetail?.poster_path)}}
              style={styles.posterImage}
            />
            <View style={styles.movieInfo}>
              <Text style={styles.movieTitle}>{movieDetail?.title}</Text>
              <View style={styles.ratingContainer}>
                <Icons.Ionicons name="star" color={COLORS.TITLE_TEXT} />
                <Text style={styles.ratingText}>
                  {movieDetail?.vote_average.toFixed(2)}
                </Text>
                <Icons.Entypo
                  name="dot-single"
                  color={COLORS.TEXT_PRIMARY}
                  size={24}
                />
                <Text style={styles.releaseDate}>
                  {moment(movieDetail?.release_date).format('YYYY')}
                </Text>
              </View>
            </View>
          </View>
          <LinearGradient
            colors={['transparent', 'rgba(31,31,31,0.8), rgba(31,31,31,1']}
            style={styles.gradient}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
          />
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <Text style={styles.sectionText}>{movieDetail?.overview}</Text>
          <Text style={styles.sectionTitle}>Genre</Text>
          <View style={styles.genreContainer}>
            {movieDetail?.genres.map((genre, index) => {
              const showComma = index + 1 !== movieDetail?.genres.length;
              return (
                <Text key={genre.id} style={styles.genreText}>
                  {genre.name}
                  {showComma ? ', ' : ''}
                </Text>
              );
            })}
          </View>
          <Text style={styles.sectionTitle}>Casts</Text>
          <FlatList
            style={styles.castList}
            showsHorizontalScrollIndicator={false}
            horizontal
            contentContainerStyle={styles.castContentContainer}
            data={movieDetail?.credits.cast.slice(0, 10)}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <CastItem cast={item} />}
          />
          <Text style={styles.sectionTitle}>Production Companies</Text>
          <View style={styles.productionCompaniesContainer}>
            {movieDetail?.production_companies.map((company, index) => {
              const showComma =
                index + 1 !== movieDetail?.production_companies.length;
              return (
                <Text key={company.id} style={styles.productionCompanyText}>
                  {company.name}
                  {showComma ? ', ' : ''}
                </Text>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    backgroundColor: COLORS.DARK_BACKGROUND,
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 10 : 58,
    zIndex: 10,
  },
  favouriteButton: {
    marginEnd: 10,
    padding: 10,
    position: 'absolute',
    top: Platform.OS === 'android' ? 10 : 58,
    zIndex: 10,
    right: 0,
  },
  backdropImage: {
    width,
    height: height * 0.3,
  },
  posterContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    flexDirection: 'row',
    zIndex: 10,
  },
  posterImage: {
    width: width * 0.2,
    height: height * 0.15,
  },
  movieInfo: {
    marginStart: 16,
    marginTop: 10,
  },
  movieTitle: {
    width: width * 0.6,
    fontSize: 24,
    color: COLORS.TEXT_PRIMARY,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: COLORS.TITLE_TEXT,
    marginStart: 2,
    fontWeight: 'bold',
  },
  releaseDate: {
    color: COLORS.TEXT_PRIMARY,
  },
  gradient: {
    width,
    height: 200,
    position: 'absolute',
    bottom: 0,
  },
  detailsContainer: {
    flex: 1,
    paddingHorizontal: 16,
    rowGap: 16,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    color: COLORS.TEXT_PRIMARY,
  },
  sectionText: {
    fontSize: 12,
    color: COLORS.TEXT_SECONDARY,
  },
  genreContainer: {
    flexDirection: 'row',
  },
  genreText: {
    fontSize: 12,
    color: COLORS.TEXT_SECONDARY,
  },
  castList: {
    maxHeight: 140,
  },
  castContentContainer: {
    columnGap: 10,
  },
  productionCompaniesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  productionCompanyText: {
    fontSize: 12,
    color: COLORS.TEXT_SECONDARY,
  },
});

export default MovieDetailScreen;
