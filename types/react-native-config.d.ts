declare module 'react-native-config' {
  export interface NativeConfig {
    API_KEY?: string;
    API_ACCESS_TOKEN?: string;
    BASE_URL?: string;
    IMAGE_URL?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
