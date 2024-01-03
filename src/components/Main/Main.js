import React, {Component } from "react";
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import HomePage from "../homePage/homePage";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Organizations from "../Organizations/Organizations";
import { navigationRef } from '../../../RootNavigation';

const RootStack = createNativeStackNavigator();
const Main = () => {
	return(
		<NavigationContainer ref={navigationRef}>
			<RootStack.Navigator>
				<RootStack.Screen name="HomePage" component={HomePage} />
				<RootStack.Screen name="Organizations" component={Organizations} />
			</RootStack.Navigator>
		</NavigationContainer>
	)
};

export default Main;