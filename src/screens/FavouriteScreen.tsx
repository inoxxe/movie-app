import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS, GlobalStyles} from '../utils/constants';
import useUserStore from '../store/userStore';

import MovieItemWithRating from '../components/MovieItemWithRating';
import {HomeTabScreenProps} from '../../types/screeninterface';

const FavouriteScreen = ({navigation}: HomeTabScreenProps<'Favourite'>) => {
  const userStore = useUserStore();

  return (
    <SafeAreaView style={GlobalStyles.container}>
      {userStore.favoriteMovies.length !== 0 ? (
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContent}
          data={userStore.favoriteMovies}
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
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            This is looks empty, Add your favourite movie by clicking heart icon
            in movie detail
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default FavouriteScreen;

const styles = StyleSheet.create({
  list: {padding: 16},
  listContent: {rowGap: 16, paddingBottom: 40},
  emptyContainer: {flex: 1, justifyContent: 'center', paddingHorizontal: 16},
  emptyText: {textAlign: 'center', color: COLORS.TEXT_PRIMARY},
});
