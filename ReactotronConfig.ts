import Reactotron from 'reactotron-react-native';
import reactotronZustand from 'reactotron-plugin-zustand';
import useUserStore from './src/store/userStore';

const reactotron = Reactotron.configure({name: 'Movie App'})
  .use(
    reactotronZustand({
      stores: [{name: 'user', store: useUserStore}],
    }),
  ) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!
console.tron = reactotron;

declare global {
  interface Console {
    tron: typeof reactotron;
  }
}
export default reactotron;
