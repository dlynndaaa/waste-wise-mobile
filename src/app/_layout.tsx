import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import store from '../redux/Store';

function RootNavigation() {
  const user = useSelector((state: any) => state.user.user);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';

    if (!user && !inAuthGroup) {
      router.replace('/(auth)/login' as any);
    } else if (user && inAuthGroup) {
      router.replace('/(tabs)' as any);
    }
  }, [user, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}