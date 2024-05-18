import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, Button, ScrollView, Animated, Dimensions, TouchableOpacity, AppRegistry, I18nManager, StatusBar, SafeAreaView} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Header from "./src/components/Header/Header";
import EventsCalender from "./src/components/EventsCalender/EventsCalender";
import DayEvents from "./src/components/DayEvents/DayEvents";
import Learns from "./src/components/Learns/Learns";
import Event from "./src/components/Event/Event";
import Organization from "./src/components/Organization/organization";
import Organizations from "./src/components/Organizations/Organizations";
import Lines from './src/components/Lines/Lines';
import {getData, storeData, setArray, getPlayingHeight} from "./src/tools/tools";
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

	const [eventsFilters, setEventsFilters] = useState({});




	useEffect(() => {
		let linesUrl = 'https://latinet.co.il/'+count.lng+'/super_lines/';
		if(isLinesReady === false){
			fetch(linesUrl)
			.then((res) => res.json())
			.then((data) => {
				dispatch(setLines(data.data));
				setIsLinesReady(true);
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
				{isLinesReady && 
				<SafeAreaView style={{
					height:getPlayingHeight()
				}}>
					<NavigationContainer ref={navigationRef}>
						<Stack.Navigator screenOptions={{ headerShown: false }}>
							<Stack.Screen name="Organizations" component={Organizations} />
							<Stack.Screen name="EventsCalender" component={EventsCalender} />
							<Stack.Screen name="Event" component={Event}/>
							<Stack.Screen name="DayEvents" component={DayEvents}/>
							<Stack.Screen name="Learns" component={Learns}/>
							<Stack.Screen name="Organization" component={Organization}/>
							<Stack.Screen name="Lines" component={Lines} initialParams={{"_showFilters": showFilters }}/>
						</Stack.Navigator>
					</NavigationContainer>
				</SafeAreaView>
				}
			</View>
		</View>
	);
};
const styles = StyleSheet.create({});
export default appBox;