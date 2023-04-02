import {
  FlatList,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import axios from 'axios';

const HomeScreen = () => {
  const [APIRes, setAPIRes] = useState<APIresponse>();
  const [Page, setPage] = useState(1);
  const listRef = useRef<FlatList>(null);
  useEffect(() => {
    axios
      .get(`https://www.wisdomapp.in/api/v1/content/?page=${Page}&limit=10`)
      .then(res => {
        setAPIRes(res.data);
      });
  }, [Page]);
  return (
    <FlatList
      ref={listRef}
      data={APIRes?.results}
      renderItem={vid => (
        <View key={vid.item.id} style={styles.videoContainer}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(vid.item.resource_link);
            }}>
            <Image
              source={{
                uri: `https://img.youtube.com/vi/${vid.item.video_id}/mqdefault.jpg`,
              }}
              style={styles.thumbnail}
            />
          </TouchableOpacity>
          {/* <YoutubePlayer
            height={200}
            videoId={vid.item.video_id}
            initialPlayerParams={{controls: false}}
          /> */}
          <View style={styles.videoMeta}>
            <Image
              style={styles.channelAvatar}
              source={{uri: vid.item.channel.creator.logo}}
            />
            <View>
              <Text style={styles.videoTitle}>{vid.item.title}</Text>
              <Text style={styles.channelName}>
                {vid.item.channel.channel_name} • {vid.item.view_count} views
              </Text>
            </View>
          </View>
          {vid.index === 9 ? (
            <View style={styles.ButtonBar}>
              <TouchableOpacity
                disabled={Page === 1}
                onPress={() => {
                  setPage(Page - 1);
                  listRef.current?.scrollToOffset({
                    offset: 0,
                    animated: true,
                  });
                }}>
                <Text style={styles.prevButton}>Prev</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setPage(Page + 1);
                  listRef.current?.scrollToOffset({
                    offset: 0,
                    animated: true,
                  });
                }}>
                <Text style={styles.nextButton}>Next</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      )}
      style={styles.Home}
    />
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  Home: {
    backgroundColor: '#222',
    height: '100%',
    width: '100%',
  },
  videoContainer: {
    width: '100%',
    flexDirection: 'column',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  thumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginRight: 10,
  },
  videoTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  channelName: {
    color: '#888',
    marginTop: 5,
  },
  videoMeta: {
    margin: 5,
    width: '85%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  channelAvatar: {
    height: 40,
    width: 40,
    margin: 10,
    aspectRatio: 1,
    borderRadius: 100,
  },
  nextButton: {
    backgroundColor: '#127',
    color: '#fff',
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  prevButton: {
    backgroundColor: '#127',
    color: '#fff',
    fontSize: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  ButtonBar: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
