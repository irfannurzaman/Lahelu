import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import IconSimple from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/Foundation';
import Video, {VideoRef} from 'react-native-video';
import Slider from '@react-native-community/slider';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

type PostProps = {
  username: string;
  avatar: string;
  image: any;
  description: string;
  type: string;
  activeVideo: any;
  id: string;
};

const Post: React.FC<PostProps> = ({
  username,
  avatar,
  image,
  description,
  type,
  activeVideo,
  id,
}) => {
  const videoRef = React.useRef<VideoRef>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [duration, setDuration] = useState(0); // Durasi total video
  const [currentTime, setCurrentTime] = useState(0); // Waktu saat ini
  const [isSliding, setIsSliding] = useState(false); // Untuk mendeteksi apakah pengguna sedang menggeser slider

  const toggleLike = () => setLiked(!liked);

  const [isPlaying, setIsPlaying] = React.useState(true);
  const [isMuted, setIsMuted] = React.useState(false);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const onLoad = (data: any) => {
    setDuration(data.duration); // Set durasi video
  };

  // Fungsi yang dipanggil setiap ada update posisi video
  const onProgress = (data: any) => {
    if (!isSliding) {
      setCurrentTime(data.currentTime); // Update posisi hanya jika slider tidak sedang di-drag
    }
  };

  // Fungsi ketika slider digeser
  const onSlidingComplete = (value: number) => {
    videoRef.current?.seek(value); // Seek ke posisi yang diinginkan
    setCurrentTime(value);
    setIsSliding(false); // Setelah selesai menggeser
  };

  return (
    <View style={styles.postContainer}>
      {/* Post Header */}
      <View style={styles.header}>
        <Image source={{uri: avatar}} style={styles.avatar} />
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.jam}>20 jam</Text>
      </View>

      {/* Post Image */}
      {type === 'video' ? (
        <View style={{position: 'relative'}}>
          <Video
            fullscreen={isFullscreen}
            ref={videoRef}
            source={{uri: image}} // Replace with your video URL
            style={styles.postImage}
            paused={activeVideo !== id}
            muted={isMuted}
            resizeMode="cover"
            onLoad={onLoad} // Ketika video dimuat
            onProgress={onProgress}
            onBuffer={() => console.log('Buffering...')} // Callback when remote video is buffering
            onError={error => console.error('Error', error)} // Callback when video cannot be loaded
          />
          {currentTime == duration && (
            <TouchableOpacity
              onPress={() => {
                videoRef.current?.seek(0); // Seek ke posisi yang diinginkan
                setCurrentTime(0);
              }}
              style={styles.playButton}>
              <EvilIcons name="play-circle" size={100} color="#fff" />
            </TouchableOpacity>
          )}
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={duration}
            value={currentTime}
            onValueChange={onSlidingComplete}
            minimumTrackTintColor="#1EB1FC"
            maximumTrackTintColor="#d3d3d3"
            thumbTintColor="transparent"
          />
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              flexDirection: 'row',
              padding: 10,
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity onPress={toggleMute} style={{marginRight: 10}}>
              <IconSimple
                name={!isMuted ? 'volume-high' : 'volume-mute'}
                size={20}
                color={'#ffffff'}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsFullscreen(!isFullscreen)}>
              <SimpleLineIcons
                name={'size-fullscreen'}
                size={13}
                color={'#ffffff'}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </Text>
          </View>
        </View>
      ) : (
        <Image source={{uri: image}} style={styles.postImage} />
      )}

      {/* Post Actions */}
      <View style={styles.actions}>
        <TouchableOpacity onPress={toggleLike}>
          <Icon
            name={liked ? 'heart' : 'heart-outline'}
            size={28}
            color={liked ? 'red' : 'black'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginLeft: 10,
            borderWidth: 1,
            paddingHorizontal: 7,
            paddingVertical: 2,
            borderRadius: 100,
          }}>
          <Text style={{fontSize: 12, fontWeight: 'bold'}}>#meme</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginLeft: 10,
            borderWidth: 1,
            paddingHorizontal: 7,
            paddingVertical: 2,
            borderRadius: 100,
          }}>
          <Text style={{fontSize: 12, fontWeight: 'bold'}}>#kocak</Text>
        </TouchableOpacity>
      </View>

      {/* Post Description */}
      <Text style={styles.description}>
        <Text style={styles.username}>{username} </Text>
        {description}
      </Text>
    </View>
  );
};

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

const styles = StyleSheet.create({
  playButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -50}, {translateY: -50}], // Pusatkan tombol
    alignItems: 'center',
    justifyContent: 'center',
  },
  postContainer: {
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  username: {
    fontWeight: 'bold',
    marginLeft: 10,
  },
  jam: {
    fontSize: 9,
    marginLeft: 5,
  },
  postImage: {
    width: '100%',
    height: 400,
  },
  fullscreenVideo: {
    width: '100%',
    height: '100%',
  },
  actions: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  description: {
    padding: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '100%',
    height: 200,
    backgroundColor: 'black',
  },
  slider: {
    width: '100%',
    position: 'absolute',
    bottom: -4,
    height: 10,
  },
  timeContainer: {
    marginTop: 10,
    position: 'absolute',
    marginHorizontal: 10,
    right: 0,
  },
  timeText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default Post;
