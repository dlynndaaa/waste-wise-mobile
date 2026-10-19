import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/Actions';
import { Ionicons } from '@expo/vector-icons';

export default function Profile({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigation.navigate('Login');
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#174F43" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="person-circle" size={80} color="#174F43" />
        <Text style={styles.title}>My Profile</Text>
      </View>
      {user ? (
        <View style={styles.profile}>
          <View style={styles.profileRow}>
            <Text style={styles.label}>Name:</Text>
            <Text style={styles.value}>{user.nama}</Text>
          </View>
          <View style={styles.profileRow}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{user.email}</Text>
          </View>
          <View style={styles.profileRow}>
            <Text style={styles.label}>No. Hp:</Text>
            <Text style={styles.value}>{user.nomor_telepon}</Text>
          </View>
          <View style={styles.profileRow}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>{user.alamat}</Text>
          </View>
          <Button title="Logout" onPress={handleLogout} color="#174F43" />
        </View>
      ) : (
        <Text style={styles.errorText}>Failed to load profile data.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#174F43',
    marginTop: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginTop: 8,
    fontWeight: 'bold',
    color: '#174F43',
  },
  profile: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#174F43',
    padding: 16,
    borderRadius: 10,
    width: '100%',
    backgroundColor: '#F0F0F0',
  },
  profileRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  label: {
    fontWeight: 'bold',
    width: '30%',
    color: '#174F43',
  },
  value: {
    width: '70%',
    color: '#333',
  },
  errorText: {
    color: 'red',
    marginTop: 20,
  },
});
