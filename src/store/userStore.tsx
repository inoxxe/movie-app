import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Movie} from '../../types/screeninterface';

type UserState = {
  favoriteMovies: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (movieId: number) => void;
};

const initialState = {
  favoriteMovies: [],
};

const useUserStore = create<UserState>()(
  persist(
    set => ({
      ...initialState,
      addFavorite: movie =>
        set(state => ({
          favoriteMovies: [...state.favoriteMovies, movie],
        })),
      removeFavorite: movieId =>
        set(state => ({
          favoriteMovies: state.favoriteMovies.filter(
            favoriteMovie => favoriteMovie.id !== movieId,
          ),
        })),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useUserStore;
