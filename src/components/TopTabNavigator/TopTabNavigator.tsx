import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import FreshTab from '../../page/FeedScreen/FeedScreen';
import TrendingTab from '../../page/FeedScreen/TrendingTab';
import MyTabBar from '../TabBarItem/TabBarItem';
import {Text, View} from 'react-native';

const Tab = createMaterialTopTabNavigator();

function FreshScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>FreshScreen!</Text>
    </View>
  );
}

function TradingScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>TradingScreen!</Text>
    </View>
  );
}

const TopTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      //   tabBar={props => <MyTabBar {...props} />}
      screenOptions={{
        tabBarLabelStyle: {fontSize: 12},
        tabBarIndicatorStyle: {backgroundColor: 'black'},
      }}>
      <Tab.Screen name="Home" component={FreshTab} />
      <Tab.Screen name="Fresh" component={FreshScreen} />
      <Tab.Screen name="Trending" component={TradingScreen} />
    </Tab.Navigator>
  );
};

export default TopTabNavigator;
