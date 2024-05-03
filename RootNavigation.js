import { createNavigationContainerRef, useRoute, useNavigation} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

export function getRouteName() {
  return navigationRef.current?.getCurrentRoute();
}