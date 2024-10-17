import React from 'react';
import {View, FlatList, StyleSheet, Dimensions} from 'react-native';
import Post from '../../components/Post/Post';

const DATA = [
  {
    id: '1',
    username: 'user1',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    image: require('../../asset/broadchurch.mp4'),
    description: 'Beautiful sunset at the beach!',
    type: 'video',
  },
  {
    id: '3',
    username: 'user1',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    image: require('../../asset/video1.mp4'),
    description: 'Beautiful sunset at the beach!',
    type: 'video',
  },
  {
    id: '4',
    username: 'user1',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    image: require('../../asset/video2.mp4'),
    description: 'Beautiful sunset at the beach!',
    type: 'video',
  },
  {
    id: '5',
    username: 'user1',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    image: require('../../asset/video3.mp4'),
    description: 'Beautiful sunset at the beach!',
    type: 'video',
  },
  {
    id: '6',
    username: 'user1',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    image: 'https://picsum.photos/id/237/500/500',
    description: 'Beautiful sunset at the beach!',
    type: 'image',
  },
  {
    id: '2',
    username: 'user2',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    image: 'https://picsum.photos/id/238/500/500',
    description: 'A day in the mountains.',
    type: 'image',
  },
];
const FeedScreen: React.FC = () => {
  const [activeVideo, setActiveVideo] = React.useState<string | null>(null);
  const viewabilityConfig = React.useRef({
    viewAreaCoveragePercentThreshold: 50, // Menentukan berapa persen video terlihat sebelum dianggap terlihat
  });
  const onViewableItemsChanged = React.useRef(({viewableItems}: any) => {
    const visibleVideo = viewableItems.find(
      (item: any) => item.item.type === 'video',
    );

    if (visibleVideo) {
      setActiveVideo(visibleVideo.item.id);
    } else {
      setActiveVideo(null);
    }
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Post
            activeVideo={activeVideo}
            username={item.username}
            avatar={item.avatar}
            image={item.image}
            description={item.description}
            type={item.type}
            id={item.id}
          />
        )}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current}
      />
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
