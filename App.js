import React, {useState, useEffect} from 'react';
import {StyleSheet, View, StatusBar, SafeAreaView, Dimensions} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Header from "./src/components/Header/Header";
import EventsCalender from "./src/components/EventsCalender/EventsCalender";
import DayEvents from "./src/components/DayEvents/DayEvents";
import Learns from "./src/components/Learns/Learns";
import Event from "./src/components/Event/Event";
import Organization from "./src/components/Organization/organization";
import Organizations from "./src/components/Organizations/Organizations";
import Lines from './src/components/Lines/Lines';
import { setLines } from './src/actions/counterActions';
import { store } from './store/store';
import { navigationRef } from "./RootNavigation";

const Stack = createNativeStackNavigator();
const { height: windowHeight } = Dimensions.get('window');

const AppBox = () => {
	return(
		<Provider store={store}>
			<GestureHandlerRootView style={{ flex: 1 }}>
				<Flex />
			</GestureHandlerRootView>
		</Provider>
	);
}

const Flex = () => {
	const dispatch = useDispatch();
	const [showFilters, setShowFilters] = useState(false);
	const [selectedScreen, setSelectedScreen] = useState("Organizations");
	const count = useSelector((store) => store.count.count);
	const [isLinesReady, setIsLinesReady] = useState(false);

	useEffect(() => {
		const linesUrl = `https://latinet.co.il/${count.lng}/super_lines/`;
		if (!isLinesReady) {
			fetch(linesUrl)
				.then(res => res.json())
				.then(data => {
					data.data.lines.forEach(element => {
						element.area = data.data.organizations[element.org_nid].area;
						element.services = data.data.organizations[element.org_nid].services;
					});
					if(data.data.learn != undefined)
						data.data.learn.forEach(element => {
							element.area = data.data.organizations[element.org_nid].area;
						});
					dispatch(setLines(data.data));
					setIsLinesReady(true);
				});
		}
	}, [count.lng, isLinesReady]);

	return (
		<View style={styles.app}>
			<StatusBar barStyle="light-content" backgroundColor={"#4a0a55"} />
			<View style={styles.appBox}>
				<Header
					style={styles.header}
					_selectedScreen={selectedScreen}
					_setSelectedScreen={setSelectedScreen}
					_setShowFilters={setShowFilters}
					_showFilters={showFilters}
				/>
				{isLinesReady && 
					<SafeAreaView style={styles.safeAreaView}>
						<NavigationContainer ref={navigationRef}>
							<Stack.Navigator screenOptions={{ headerShown: false }}>
								<Stack.Screen name="Organizations" component={Organizations} />
								<Stack.Screen name="EventsCalender" component={EventsCalender} />
								<Stack.Screen name="Event" component={Event}/>
								<Stack.Screen name="DayEvents" component={DayEvents}/>
								<Stack.Screen name="Learns" component={Learns}/>
								<Stack.Screen name="Organization" component={Organization}/>
								<Stack.Screen name="Lines" component={Lines} initialParams={{ "_showFilters": showFilters }} />
							</Stack.Navigator>
						</NavigationContainer>
					</SafeAreaView>
				}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	app: {
		flex: 1,
		backgroundColor: '#f5f5f5',
	},
	appBox: {
		flex: 1,
	},
	header: {
		// Add your header styles here
	},
	safeAreaView: {
		flex: 1,
	},
});

export default AppBox;
