// VideoPlayer.tsx
import React, {useRef, useState} from 'react';
import {View, TouchableOpacity, Slider, Text} from 'react-native';
import Video from 'react-native-video';
import styles from './styles';

interface VideoPlayerProps {
  source: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({source}) => {
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <View>
      <Video
        ref={videoRef}
        source={{uri: source}}
        style={styles.video}
        paused={!isPlaying}
        muted={isMuted}
        resizeMode="contain"
        // autoplay logic will go here
      />
      <View style={styles.controls}>
        <TouchableOpacity onPress={togglePlayPause}>
          <Text>{isPlaying ? 'Pause' : 'Play'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleMute}>
          <Text>{isMuted ? 'Unmute' : 'Mute'}</Text>
        </TouchableOpacity>
        <Slider
          style={styles.slider}
          // Slider control for video timeline will go here
        />
      </View>
    </View>
  );
};

export default VideoPlayer;
