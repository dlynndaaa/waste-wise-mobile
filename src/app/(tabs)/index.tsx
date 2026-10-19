import { useNavigation } from 'expo-router';
import Home from '../../components/Home';

export default function HomePage() {
  const navigation = useNavigation();
  return <Home navigation={navigation} />;
}