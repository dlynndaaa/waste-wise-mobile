import { useNavigation } from 'expo-router';
import Profile from '../../components/Profile';

export default function ProfilePage() {
  const navigation = useNavigation();
  return <Profile navigation={navigation} />;
}