import { useState } from 'react';
import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/Actions';

export default function Login() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      alert('Please fill in both email and password.');
      return;
    }

    const apiUrl = 'https://api.jsonbin.io/v3/b/66978153ad19ca34f888d529';

    fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const users = data.record.registrasi_pengguna;
        const user = users.find((user: any) => user.email === email && user.password === password);
        if (user) {
          dispatch(setUser(user));
          // Karena menggunakan Expo Router + Redux Guard di _layout.tsx,
          // aplikasi akan otomatis pindah halaman saat user tersimpan di Redux!
        } else {
          alert('Login failed. Please check your credentials.');
        }
      })
      .catch(error => {
        console.error('Error logging in:', error);
        alert('An error occurred while logging in.');
      });
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} /> 
      {/* Catatan: Sesuaikan jalur gambar logo.png jika letak foldernya berbeda */}
      <Text style={styles.appName}>Waste Wise</Text>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#ccc"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Login" onPress={handleLogin} color="#B0C4B1" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#174F43',
    padding: 16,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  appName: {
    fontSize: 36,
    color: '#FFFFFF',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  innerContainer: {
    width: '100%',
    backgroundColor: '#1D6354',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#B0C4B1',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    color: '#FFFFFF',
    borderRadius: 5,
  },
});