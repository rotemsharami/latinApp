import React from 'react';
import React, {Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from "./src/components/homePage/homePage";
import Organizations from "./src/components/Organizations/Organizations";
import Ionicons from 'react-native-vector-icons/Ionicons';

const BottomMenu = () => {
	const Tab = createBottomTabNavigator();
	return(
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;
						if (route.name === 'HomePage') {
							iconName = focused ? 'ios-home' : 'ios-home-outline';
						} else if (route.name === 'Organizations') {
							iconName = focused ? 'ios-list' : 'ios-list-outline';
						}
						return <Ionicons name={iconName} size={size} color={color} />;
					},
					tabBarActiveTintColor: 'tomato',
					tabBarInactiveTintColor: 'gray',
				})}
				>
				<Tab.Screen name="HomePage" component={HomePage} />
				<Tab.Screen name="Organizations" component={Organizations} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}



export default BottomMenu;
