import React from 'react';
import {View, StyleSheet, Animated, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ProfileScreen from '../../page/ProfileScreen/ProfileScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import TopTabNavigator from '../TopTabNavigator/TopTabNavigator';

const FeedScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <TopTabNavigator />
    </View>
  );
};

const Tab = createBottomTabNavigator();

const MainNavigator: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={FeedScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (
            <Icon name="person" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MainNavigator;
