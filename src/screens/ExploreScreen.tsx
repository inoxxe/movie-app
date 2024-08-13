import {
  ActivityIndicator,
  Alert,
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {COLORS, GlobalStyles} from '../utils/constants';
import Icons from '../components/Icons';
import _ from 'lodash';
import API from '../services/api';
import {HomeTabScreenProps, Movie} from '../../types/screeninterface';
import {MovieResponse} from '../services/api.types';
import MovieItemWithRating from '../components/MovieItemWithRating';

const ExploreScreen = ({navigation}: HomeTabScreenProps<'Explore'>) => {
  const [text, setText] = useState('');
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);

  const searchMovie = async (query: string) => {
    setIsloading(true);
    try {
      const res = (await API.fetchMovieByName(query)) as MovieResponse;
      if (res.total_results < 1 && query !== '') {
        setIsEmpty(true);
      }
      setMovieList(res.results);
      setIsloading(false);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Error', 'An unknown error occurred');
      }
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    _.debounce(text => {
      searchMovie(text);
    }, 500), // 500ms delay
    [],
  );

  const handleSearch = (text: string) => {
    setIsEmpty(false);
    setText(text);
    debouncedSearch(text);
  };
  return (
    <SafeAreaView style={GlobalStyles.container}>
      <View style={styles.container}>
        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <Icons.MaterialIcons name="search" size={24} color={'black'} />
            <TextInput
              placeholder="Search movie by title"
              style={styles.searchInput}
              onChangeText={handleSearch}
              defaultValue={text}
              enterKeyHint="search"
              placeholderTextColor={COLORS.TEXT_SECONDARY}
            />
            {text !== '' && (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={() => {
                  setIsEmpty(false);
                  setText('');
                  setMovieList([]);
                }}>
                <Icons.MaterialCommunityIcons
                  name="close"
                  color={'white'}
                  size={20}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        {isLoading ? (
          <ActivityIndicator style={styles.loader} size={'large'} />
        ) : isEmpty ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No results found for "{text}". Please try searching for another
              movie.
            </Text>
          </View>
        ) : (
          <FlatList
            style={styles.list}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            data={movieList}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <MovieItemWithRating
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

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {paddingHorizontal: 16, flex: 1},
  searchRow: {flexDirection: 'row', alignItems: 'center', columnGap: 21},
  searchContainer: {
    backgroundColor: 'white',
    borderRadius: 24,
    alignItems: 'center',
    flexDirection: 'row',
    paddingStart: 10,
    paddingVertical: Platform.OS === 'android' ? 0 : 10,
    flex: 1,
  },
  searchInput: {
    marginStart: 10,
    marginEnd: 10,
    flex: 1,
    color: COLORS.DARK_BACKGROUND,
    fontFamily: 'DMSans-Regular',
    fontSize: 14,
  },
  clearButton: {
    backgroundColor: COLORS.PRIMARY_ACCENT,
    borderRadius: 20,
    marginEnd: 10,
  },
  loader: {flex: 1},
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyText: {
    color: COLORS.TEXT_PRIMARY,
    textAlign: 'center',
  },
  list: {
    marginTop: 10,
  },
  listContent: {
    rowGap: 10,
    paddingBottom: 40,
  },
});
