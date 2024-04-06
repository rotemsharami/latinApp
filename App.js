import React, {useRef, useState, useEffect} from 'react';
import {StyleSheet, View, Text, Image, Button, ScrollView, Animated, Dimensions, TouchableOpacity, AppRegistry} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Header from "./src/components/Header/Header";
import { NavigationContainer } from "@react-navigation/native";
import HomePage from "./src/components/homePage/homePage";
import DayEvents from "./src/components/DayEvents/DayEvents";
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
import {increment, decrement} from './src/actions/counterActions';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Main from './src/components/Main/Main';
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
const Flex = (navigation) => {
	const dispatch = useDispatch();
	const [fadeAnimVal, setFadeAnimVal] = useState(-width);
	const fadeAnim = useRef(new Animated.Value(-width)).current;
	const [lng, setLng] = useState("he");
	let [globalData, setGlobalData] = useState({});
	const handleIncrement = (value) => {
		dispatch(increment(value));
	};
	const getUsers = async () => {
		let res = await axios.get("https://latinet.co.il/en/general_data/");
		let { data } = res.data.data;
		return res.data.data;
	};
	const fadeIn = () => {
		let v = fadeAnimVal == 0 ? -width : 0;
		setFadeAnimVal(v);
		Animated.timing(fadeAnim, {
			toValue: v,
			duration: 280,
			useNativeDriver: false,
		}).start();	
	};
	return (
		<View style={styles.app}>
			<View style={styles.appBox}>
				<Header style={styles.header} fadeIn={fadeIn}></Header>
				
				

				<NavigationContainer ref={navigationRef}>
					<Stack.Navigator screenOptions={{ headerShown: false }}>
						<Stack.Screen name="Lines" component={Lines}/>
						<Stack.Screen name="HomePage" component={HomePage} />
						<Stack.Screen name="Configuration" component={Configuration}/>

						<Stack.Screen name="EventsCalender" component={EventsCalender}/>
						

						<Stack.Screen name="DayEvents" component={DayEvents}/>
						<Stack.Screen name="Event" component={Event}/>
						
						<Stack.Screen name="Organization" component={Organization}/>
						
					</Stack.Navigator>
				</NavigationContainer>
			</View>
			
			<Animated.View style={[styles.mainMenuBox, { marginLeft: fadeAnim}]}>
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
			</Animated.View>
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
height:height,
},
header: {
	flex: 1,
},
LinearGradient:{
	height:"100%",
	width:"100%",
},
mainMenuBox:{
	height:height-60,
	width:width,
	top:60,
	position:'absolute',
	zIndex:2,
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