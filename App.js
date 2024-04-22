import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, Button, ScrollView, Animated, Dimensions, TouchableOpacity, AppRegistry, I18nManager} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Header from "./src/components/Header/Header";
import { NavigationContainer } from "@react-navigation/native";
import HomePage from "./src/components/homePage/homePage";
import Event from "./src/components/Event/Event";
import EventsCalender from "./src/components/EventsCalender/EventsCalender";
import Redux from "./src/components/Redux/Redux";
import Organization from "./src/components/Organization/organization";
import Lines from './src/components/Lines/Lines';
import { navigationRef } from './RootNavigation';
import Configuration from "./src/components/Configuration/Configuration";
import {LinearGradient} from 'expo-linear-gradient';
import { Icon } from 'react-native-elements';
import {navigate} from "./RootNavigation";
import {getData, storeData, setArray} from "./src/tools/tools";
import { Provider } from 'react-redux';
import { store } from './store/store';
import { useSelector, useDispatch } from 'react-redux';
import {increment, decrement, setLines, setEvents} from './src/actions/counterActions';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Main from './src/components/Main/Main';
import Footer from './src/components/Footer/Footer';

const Stack = createNativeStackNavigator();
const {width, height} = Dimensions.get('screen');

const appBox = () => {
	return(
		<Provider store={store}>
			<View>
				<Flex></Flex>
			</View>
		</Provider>
	);
}

const Flex = () => {
	const dispatch = useDispatch();
	const [fadeAnimVal, setFadeAnimVal] = useState(-width);
	const [panBoxVal, setPanBoxVal] = useState(0);
	const [organizationNid, setOrganizationNid] = useState(1);
	const boxPan = useRef(new Animated.Value(0)).current;
	const [selectedScreen, setSelectedScreen] = useState("Lines");
	const count = useSelector((store) => store.count.count);
	let [globalData, setGlobalData] = useState({});
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




	const handleIncrement = (value) => {
		dispatch(increment(value));
	};

	I18nManager.forceRTL(false);
	I18nManager.allowRTL(false);

	const changeScrinPan = () => {
		let v = panBoxVal == 0 ? -width : 0;


		setPanBoxVal(v);
		
		Animated.timing(boxPan, {
			toValue: v,
			duration: 280,
			useNativeDriver: false,
		}).start();	

	};




	return (
		<View style={styles.app}>
			<View style={styles.appBox}>
				<Header
					style={styles.header}
					_selectedScreen={selectedScreen}
					_setSelectedScreen={setSelectedScreen}
					_changeScrinPan={changeScrinPan}
				>

				</Header>
				
				
				
				{ (selectedScreen == "Lines" &&  isLinesReady) &&
					<Lines
						_setOrganizationNid={setOrganizationNid}
						_organizationNid={organizationNid}
						_setSelectedScreen={setSelectedScreen}
					></Lines>
				}
				{ (selectedScreen == "Events" &&  isEventsReady) &&
					<EventsCalender></EventsCalender>
				}


				{ (selectedScreen == "Organization") &&
					<Organization _organizationNid={organizationNid}></Organization>
				}

					



				

				{/* <NavigationContainer ref={navigationRef}>
					<Stack.Navigator screenOptions={{ headerShown: false }}>
						<Stack.Screen name="Lines" component={Lines}/>
						<Stack.Screen name="HomePage" component={HomePage} />
						<Stack.Screen name="Configuration" component={Configuration}/>
						<Stack.Screen name="EventsCalender" component={EventsCalender}/>
						<Stack.Screen name="DayEvents" component={DayEvents}/>
						<Stack.Screen name="Event" component={Event}/>
						<Stack.Screen name="Organization" component={Organization}/>
					</Stack.Navigator>
				</NavigationContainer> */}

				
			</View>
			
			

			{/* <Animated.View style={[styles.mainMenuBox, { marginLeft: fadeAnim}]}>
				<LinearGradient
					style={styles.LinearGradient}
					colors={['#27042c','#27042c','#9b0ea5','#9b0ea5','#390641','#390641']}
				>
					<View style={styles.mainMenuList}>
						<View style={styles.mainMenuListBox}>
							<TouchableOpacity  style={styles.mainMenuListItem} onPress={() => {
								navigate("Lines", {});
								fadeIn();
								}}
							>
								<View style={styles.mainMenuListItemBox}>
									<View style={styles.mainMenuListItemIconBox}>
										<Icon style={styles.mainMenuListItemIcon} name='facebook' color='#ed60d6' size={40}/>
									</View>
									<View style={styles.mainMenuListItemtextBox}>
										<Text style={styles.mainMenuListItemtext}>Lines</Text>
									</View>
								</View>
							</TouchableOpacity>

							<TouchableOpacity  style={styles.mainMenuListItem} onPress={() => {
								navigate("Configuration", {});
								fadeIn();
								}}
							>
								<View style={styles.mainMenuListItemBox}>
									<View style={styles.mainMenuListItemIconBox}>
										<Icon style={styles.mainMenuListItemIcon} name='settings' color='#ed60d6' size={40}/>
									</View>
									<View style={styles.mainMenuListItemtextBox}>
										<Text style={styles.mainMenuListItemtext}>Configuration</Text>
									</View>
								</View>
							</TouchableOpacity>
						</View>
					</View>
				</LinearGradient>
			</Animated.View> */}

		</View>
	);
};

const styles = StyleSheet.create({
app: {
	paddingTop: 0,
	justifyContent: 'flex-start',
	marginTop:24,
},
appBox:{
zIndex:1,
height:height-26,
},
header: {
	flex: 1,
},
footer:{
	flex:1
},
LinearGradient:{
	height:"100%",
	width:"100%",
},
mainMenuList:{
height:100,
flexDirection:"row"
},
mainMenuListBox:{
width:width
},
mainMenuListItem:{
	backgroundColor:"#300330",
	height:100,
	borderBottomWidth:1,
	borderBottomColor:"#ffdaff",
	justifyContent: 'center'
},
mainMenuListItemBox:{
flexDirection:"row",
},
mainMenuListItemIconBox:{
	flexDirection:"column"
	},

mainMenuListItemIcon:{
width:80,
},
mainMenuListItemtextBox:{
	flexDirection:"column",
	justifyContent: 'center'
},
mainMenuListItemtext:{
color:"#FFF",
fontSize:20
},






TodaysLines: {
	flex: 2,
},

icon:{
	color: "#FFF"
},
logo: {
	padding: 0,
	flexDirection:'column'
},
logoImage: {
	width: 40,
	height: 40
},
header:{
	backgroundColor:"#000",
	flexDirection:'row',
	padding:10,
},

mainMenu:{
	justifyContent:'center',
	flexDirection:'column',
	flex: 1,
	alignItems: "center",
},
logoAndAppName: {
	flexDirection:'row',
	flex: 4,
	justifyContent:'center',
    alignItems: "center",

},
logoAndAppNameBox:{
	flexDirection:'row',
},

logo: {
	flexDirection:'column'
},
appName: {
	flexDirection:'column'
},
appNameText:{
	color:"#FFF",
	fontSize:20,
	alignSelf:'center'
},
language:{
	justifyContent:'center',
	flexDirection:'column',
	flex: 1
}

});

export default appBox;