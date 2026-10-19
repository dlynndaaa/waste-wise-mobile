import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addReport, updateReport, deleteReport } from '../redux/Actions';

export default function Report() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const dispatch = useDispatch();
  const reports = useSelector(state => state.report.reports);

  const handleReport = () => {
    if (title && description) {
      if (isEditing) {
        const updatedReport = {
          id: editingId,
          title,
          description,
          timestamp: new Date().toLocaleString(),
        };
        dispatch(updateReport(updatedReport)); 
        setIsEditing(false);
        setEditingId(null);
      } else {
        const newReport = {
          id: Date.now().toString(),
          title,
          description,
          timestamp: new Date().toLocaleString(),
        };
        dispatch(addReport(newReport)); 
      }
      Alert.alert('Report Submitted', `Title: ${title}\nDescription: ${description}`);
      setTitle('');
      setDescription('');
    } else {
      Alert.alert('Error', 'Please fill out all fields');
    }
  };

  const handleEdit = (id) => {
    const reportToEdit = reports.find(report => report.id === id);
    setTitle(reportToEdit.title);
    setDescription(reportToEdit.description);
    setIsEditing(true);
    setEditingId(id);
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Delete Report',
      'Are you sure you want to delete this report?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => dispatch(deleteReport(id)) }
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.reportItem}>
      <View style={styles.headerContainer}>
        <Text style={styles.reportTimestamp}>{item.timestamp}</Text>
        <View style={styles.buttonContainer}>
          <Button title="Edit" onPress={() => handleEdit(item.id)} color="#2E7D6A" />
          <Button title="Delete" onPress={() => handleDelete(item.id)} color="#C62828" />
        </View>
      </View>
      <Text style={styles.reportTitle}>{item.title}</Text>
      <Text style={styles.reportDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isEditing ? 'Edit Report' : 'Create Report'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />
      <Button title={isEditing ? 'Update Report' : 'Submit Report'} onPress={handleReport} color="#174F43" />
      
      <Text style={styles.historyTitle}>Report History</Text>
      <FlatList
        data={reports}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#174F43',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
    backgroundColor: '#f9f9f9',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  historyTitle: {
    fontSize: 20,
    marginTop: 24,
    marginBottom: 12,
    fontWeight: 'bold',
    color: '#174F43',
  },
  listContainer: {
    paddingBottom: 20,
  },
  reportItem: {
    backgroundColor: '#f7f7f7',
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 2,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reportTimestamp: {
    fontSize: 14,
    color: '#999',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
  },
  reportDescription: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
});
