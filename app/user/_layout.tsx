// screens/UserLayout.tsx
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";


// Import your SVGs from the assets folder
import { colors } from "@/utils/baseStyles";
import ActivityActiveIcon from '../../assets/acivity-active.svg';
import ActivityIcon from '../../assets/activity.svg';
import HomeActiveIcon from '../../assets/home-active.svg';
import HomeIcon from '../../assets/home.svg';
import ProfileActiveIcon from '../../assets/profile-active.svg';
import ProfileIcon from '../../assets/profile.svg';
import Activity from "./Activity";
import Home from "./Home";


const Tab = createBottomTabNavigator();

const UserLayout = () => {

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          let IconComponent;

          // Check which route is active and return the appropriate icon
          if (route.name === 'Home') {
            IconComponent = focused ? HomeActiveIcon : HomeIcon;
          } else if (route.name === 'Activity') {
            IconComponent = focused ? ActivityActiveIcon : ActivityIcon;
          } else if (route.name === 'Profile') {
            IconComponent = focused ? ProfileActiveIcon : ProfileIcon;
          }

          // Return the appropriate SVG component with props for size and color
          return IconComponent
            ? <IconComponent width={size} height={size} fill={color} />
            : null; // or <DefaultIcon />
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondary,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.dark,  // No background behind the tab bar
          height: 60,
          marginBottom: 20,  // Add bottom margin to give it a little space from the edge
          marginLeft: 20,  // Add bottom margin to give it a little space from the edge
          marginRight: 20,  // Add bottom margin to give it a little space from the edge
          borderRadius: 30,  // This will give it rounded corners
          position: 'absolute',  // Keep it floating above the content
          left: 20,            // Adjust these values to move the tab bar as needed
          right: 20,
          bottom: 20,
          shadowColor: '#000', // Shadow color
          shadowOffset: { width: 0, height: 5 },  // Shadow direction and distance
          shadowOpacity: 0.25, // Shadow intensity
          shadowRadius: 10,    // Shadow blur
          elevation: 10,       // For Android, adds a nice lift effect
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Activity" component={Activity} />
      {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
    </Tab.Navigator>
  );
};

export default UserLayout;