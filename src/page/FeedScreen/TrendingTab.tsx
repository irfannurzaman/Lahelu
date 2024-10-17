import React from 'react';
import {View, FlatList, StyleSheet, Text} from 'react-native';
import Post from '../../components/Post/Post';

const DATA = [
  {
    id: '1',
    username: 'user1',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    image: 'https://picsum.photos/id/237/500/500',
    description: 'Beautiful sunset at the beach!',
  },
  {
    id: '2',
    username: 'user2',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    image: 'https://picsum.photos/id/238/500/500',
    description: 'A day in the mountains.',
  },
];

const FeedScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Trending</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default FeedScreen;
