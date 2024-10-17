// TopTabs.tsx
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import HomeScreen from '../page/Home/HomeScreen';
import FreshScreen from '../page/Fresh/FreshScreen';
import TrendingScreen from '../page/Trending/TrendingScreen';

const Tab = createMaterialTopTabNavigator();

export default function TopTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Fresh" component={FreshScreen} />
      <Tab.Screen name="Trending" component={TrendingScreen} />
    </Tab.Navigator>
  );
}
