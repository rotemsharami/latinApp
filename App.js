import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, Button, ScrollView, Animated, Dimensions, TouchableOpacity, AppRegistry, I18nManager, StatusBar} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Header from "./src/components/Header/Header";

import EventsCalender from "./src/components/EventsCalender/EventsCalender";

import DayEvents from "./src/components/DayEvents/DayEvents";

import Event from "./src/components/Event/Event";

import HomePage from "./src/components/HomePage/HomePage";



import Organization from "./src/components/Organization/organization";
import Organizations from "./src/components/Organizations/Organizations";
import Lines from './src/components/Lines/Lines';
import {getData, storeData, setArray} from "./src/tools/tools";
import {navigate, navigationRef} from "./RootNavigation";
import { Provider } from 'react-redux';
import { store } from './store/store';
import { useSelector, useDispatch } from 'react-redux';
import {increment, decrement, setLines, setEvents} from './src/actions/counterActions';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Stack = createNativeStackNavigator();
const {width, height} = Dimensions.get('screen');
StatusBar.setHidden(false);

const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 24; 
const WINDOW_HEIGHT = Dimensions.get('window').height;



const appBox = () => {
	return(
		<Provider store={store}>
			<View>
				<Flex></Flex>
			</View>
		</Provider>
	);
}

const Flex = (navigation) => {
	const dispatch = useDispatch();
	const [showFilters, setShowFilters] = useState(false);
	const [organizationNid, setOrganizationNid] = useState(1);
	const [organizationScreen, setOrganizationScreen] = useState("lines");
	const [selectedScreen, setSelectedScreen] = useState("Organizations");
	const count = useSelector((store) => store.count.count);
	const [isLinesReady, setIsLinesReady] = useState(false);
	const [isEventsReady, setEventsReady] = useState(false);

	useEffect(() => {
		let linesUrl = 'https://latinet.co.il/'+count.lng+'/super_lines/';
		if(isLinesReady === false){
			fetch(linesUrl)
			.then((res) => res.json())
			.then((data) => {
				dispatch(setLines(data.data));
				setIsLinesReady(true);
				let EventsUrl = 'https://latinet.co.il/'+count.lng+'/events_data/';
				if(isEventsReady === false){
					fetch(EventsUrl)
					.then((res) => res.json())
					.then((data) => {
						dispatch(setEvents(data.data));
						setEventsReady(true);
					});
				}
			});
		}
	}, [count.lng, isLinesReady]);
	return (
		<View style={styles.app}>
			<StatusBar barStyle="light-content" backgroundColor={"#4a0a55"}/>
			<View style={styles.appBox}>
				<Header
					style={styles.header}
					_selectedScreen={selectedScreen}
					_setSelectedScreen={setSelectedScreen}
					_setShowFilters={setShowFilters}
					_showFilters={showFilters}
				>
				</Header>

				
				<NavigationContainer ref={navigationRef}>
					<Stack.Navigator screenOptions={{ headerShown: false }}>
						<Stack.Screen name="HomePage" component={HomePage} />
						<Stack.Screen name="Configuration" component={Configuration}/>

						<Stack.Screen name="DayEvents" component={DayEvents}/>
						<Stack.Screen name="Event" component={Event}/>
						
						<Stack.Screen name="Organization" component={Organization}/>
						<Stack.Screen name="Lines" component={Lines}/>
					</Stack.Navigator>
				</NavigationContainer>
				

				{/* { (selectedScreen == "Lines" &&  isLinesReady) &&
					<Lines
						_setOrganizationNid={setOrganizationNid}
						_organizationNid={organizationNid}
						_setSelectedScreen={setSelectedScreen}
						_showFilters={showFilters}
					></Lines>
				}
				{ (selectedScreen == "Events" &&  isEventsReady) &&
					<EventsCalender></EventsCalender>
				}
				{ (selectedScreen == "Organizations" &&  isEventsReady) &&
					<Organizations
						_setOrganizationNid={setOrganizationNid}
						_organizationNid={organizationNid}
						_setSelectedScreen={setSelectedScreen}
						_setOrganizationScreen={setOrganizationScreen}
					></Organizations>
				}
				{ (selectedScreen == "Organization") &&
					<Organization
						_organizationNid={organizationNid}
						_organizationScreen={organizationScreen}
						_setOrganizationScreen={setOrganizationScreen}
					></Organization>
				} */}



			</View>
		</View>
	);
};
const styles = StyleSheet.create({});
export default appBox;