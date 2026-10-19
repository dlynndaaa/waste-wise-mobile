import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux'; 

export default function PickupSchedule() {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = 'https://api.jsonbin.io/v3/b/66973ceeacd3cb34a8673797';

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        setSchedule(data.record.jadwal_pengumpulan);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching schedule:', error);
        setLoading(false);
      });
  }, []);

  const renderScheduleDay = (day) => (
    <View style={styles.scheduleCard}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{day}</Text>
      </View>
      <View style={styles.infoContainer}>
        {schedule
          .filter(item => item.hari_pengumpulan.includes(day))
          .map((item, index) => (
            <View key={index}>
              <Text style={styles.scheduleText}><Text style={styles.label}>Zona:</Text> {item.zona}</Text>
              <Text style={styles.scheduleText}><Text style={styles.label}>Jenis Sampah:</Text> {item.jenis_sampah.join(', ')}</Text>
            </View>
          ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#1D6354" />
      ) : (
        <FlatList
          data={['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => renderScheduleDay(item)}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  listContainer: {
    paddingBottom: 20,
  },
  scheduleCard: {
    backgroundColor: '#1D6354',
    borderRadius: 10,
    marginVertical: 8,
    overflow: 'hidden',
    elevation: 4,
    flexBasis: '48%', 
    marginHorizontal: '1%', 
  },
  dateContainer: {
    backgroundColor: '#174F43',
    padding: 8,
  },
  dateText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  infoContainer: {
    padding: 16,
    backgroundColor: '#E8F5E9',
  },
  scheduleText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
  },
});
