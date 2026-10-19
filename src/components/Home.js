import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('window');

const posters = [
  { id: '1', image: require('../assets/gambar1.png') },
  { id: '2', image: require('../assets/gambar2.png') },
  { id: '3', image: require('../assets/gambar3.jpeg') },
];

const Home = ({ navigation }) => {
  const flatListRef = useRef(null);
  const user = useSelector(state => state.user);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentIndex < posters.length - 1) {
        flatListRef.current.scrollToIndex({ animated: true, index: currentIndex + 1 });
        setCurrentIndex(currentIndex + 1);
      } else {
        flatListRef.current.scrollToIndex({ animated: true, index: 0 });
        setCurrentIndex(0);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.posterContainer}>
        <Image source={item.image} style={styles.posterImage} />
      </View>
    );
  };

  const renderPagination = () => {
    return (
      <View style={styles.pagination}>
        {posters.map((_, index) => (
          <View
            key={index}
            style={[styles.paginationDot, currentIndex === index ? styles.paginationDotActive : null]}
          />
        ))}
      </View>
    );
  };

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / width);
    setCurrentIndex(index);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to WasteWise 👋</Text>
        <Text style={styles.subtitle}>Making waste management smarter and greener</Text>
      </View>

      <View style={styles.postersContainer}>
        <FlatList
          ref={flatListRef}
          data={posters}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          getItemLayout={(data, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          onMomentumScrollEnd={handleScroll}
        />
        {renderPagination()}
      </View>

      <View style={styles.cardContainer}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Pickup Schedule')}>
          <Ionicons name="calendar" size={50} color="#FFFFFF" />
          <Text style={styles.cardText}>Pickup Schedule</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Report')}>
          <Ionicons name="document-text" size={50} color="#FFFFFF" />
          <Text style={styles.cardText}>Report an Issue</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Chat')}>
          <Ionicons name="chatbubbles" size={50} color="#FFFFFF" />
          <Text style={styles.cardText}>Chat with Us</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-circle" size={50} color="#FFFFFF" />
          <Text style={styles.cardText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f5f1',
  },
  postersContainer: {
    height: 220,
    marginBottom: 16,
  },
  posterContainer: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
  },
  posterImage: {
    width: width * 0.9,
    height: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#174F43',
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#174F43',
    width: '40%',
    marginVertical: 10,
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  cardText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc', 
    marginHorizontal: 5,
  },
  paginationDotActive: {
    backgroundColor: '#174F43',
  },
});

export default Home;
