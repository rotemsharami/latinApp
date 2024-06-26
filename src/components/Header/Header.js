import React, {Component, useState, useRef, useEffect, useCallback} from "react";
import {StyleSheet, View, Text, Image, Dimensions, SafeAreaView, Animated, TouchableOpacity, I18nManager} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import {nice_list_text, setArray, getSelectedLang, setRowType, setTextDirection, getTranslationString} from "../../tools/tools.js";
import { useSelector, useDispatch } from 'react-redux';
import { Flex } from "@react-native-material/core";
const {width, height} = Dimensions.get('screen');
import {navigate, navigationRef, getRouteName} from "../../../RootNavigation";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {increment, decrement, changeLanguage, changeSelectedScreen, changeShowFilter} from '../../actions/counterActions';
const logoWidth = 40;
const textWidth = width - logoWidth;



const Header = (info) => {


	const dispatch = useDispatch();
	const changeScreen = (screen) => {
		dispatch(changeSelectedScreen(screen));
	};

	const changeLng = (lng) => {
		dispatch(changeLanguage(lng));
	};

	const _changeShowFilter = (value) => {
		dispatch(changeShowFilter(value));
	};


	
	const changeTheScreen = useCallback((screen) => {
		info._setSelectedScreen(screen);
	}, [info._setSelectedScreen]);
	

	const [selectedRouth, setSelectedRouth] = useState("Lines");
	
	
	const count = useSelector((store) => store.count.count);
	const dir = setTextDirection(count.lng);


	const setTitle = () => {
		if(count.lines != undefined){
			let title = "Bug!";
			if(info._selectedScreen == "Lines"){
				title = count.lines.global_metadata.labels[count.lng][2];
			}
			if(info._selectedScreen == "Organizations" || info._selectedScreen == "Organization"){
				title = count.lines.global_metadata.labels[count.lng][10];
			}
			if(info._selectedScreen == "Learns"){
				title = count.lines.global_metadata.labels[count.lng][11];
			}
			if(info._selectedScreen == "EventsCalender" || info._selectedScreen == "EventsList" || info._selectedScreen == "Event" || info._selectedScreen == "DayEvents"){
				title = count.lines.global_metadata.labels[count.lng][3];
			}
			return title;
		}
	}
	

	useEffect(() => {
		const unsubscribe = navigationRef.addListener('state', () => {
			info._setSelectedScreen(navigationRef.getCurrentRoute().name);
		});
	
		return unsubscribe;
	}, []);




	return(
		<View style={styles.headerContainer}>
			<View style={styles.header}>
				<View style={styles.logoAndAppName}>
					<View style={styles.logo}>
						<Image style={styles.logoImage} source={require('../../../assets/logo.png')} />
					</View>
					<View style={styles.appName}>
						<Text style={{

						fontWeight:"bold",
						color:"#FFF",
						fontSize:40,
						alignSelf:'center',

					}}>LatinApp</Text>
					</View>
				</View>
				<View style={styles.mainMenu}>
					<TouchableOpacity onPress={()=>changeLng(count.lng == "en" ? "he" : "en")}>
						<View style={styles.lang}>
							<Text style={styles.langText}>{count.lng == "en" ? "עב" : "EN"}</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
			<View style={[styles.headerMenuAndTitle, {
				flexDirection: count.lng == "en" ? "row" : "row-reverse",
			}]}>
				
					<View style={styles.headerMenuTitle}>
						<Text style={styles.headerMenuTitleText}>{setTitle()}</Text>
					</View>
				
				


				<View style={[styles.headerMenu, {
					flexDirection: count.lng == "en" ? "row" : "row-reverse",
				}]}>


					<TouchableOpacity onPress={() => {
						navigate("Learns", {});
						}}>
						<View style={[styles.headerMenuItem, {
							borderRightWidth:1,
							borderEndColor:"#1e1e1e",
							height:50,
							backgroundColor:"#545454"
						}]}>
                            <MaterialCommunityIcons name="school" size={30} color={info._selectedScreen == "Learns" ? "#ff85d1" : "#d3d3d3"} />
                        </View>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => {
						navigate("EventsCalender", {});
						}}>
						<View style={[styles.headerMenuItem, {
							borderRightWidth:1,
							borderEndColor:"#1e1e1e",
							height:50,
							backgroundColor:"#545454"
						}]}>
                            <MaterialCommunityIcons name="calendar-star" size={30} color={info._selectedScreen == "EventsCalender" || info._selectedScreen == "Event" || info._selectedScreen == "DayEvents" ? "#ff85d1" : "#d3d3d3"} />
                        </View>
					</TouchableOpacity>
					<TouchableOpacity onPress={()=>{
						navigate("Lines", {});
						}}>
						<View style={[styles.headerMenuItem, {
							borderRightWidth:1,
							borderEndColor:"#1e1e1e",
							height:50,
							backgroundColor:"#545454"
						}]}>
                            <MaterialCommunityIcons name="clock-time-four-outline" size={30} color={info._selectedScreen == "Lines" ? "#ff85d1" : "#d3d3d3"} />
                        </View>
					</TouchableOpacity>

					<TouchableOpacity onPress={()=>{
						navigate("Organizations", {});
						}}>
						<View style={[styles.headerMenuItem, {
							borderRightWidth:1,
							borderEndColor:"#1e1e1e",
							height:50,
							backgroundColor:"#545454"
						}]}>
                            <MaterialCommunityIcons name="view-grid" size={30} color={info._selectedScreen == "Organizations" || info._selectedScreen == "Organization" ? "#ff85d1" : "#d3d3d3"} />
                        </View>
					</TouchableOpacity>


				</View>
			</View>
		</View>
	)
};
const styles = StyleSheet.create({
	headerMenuTitleTextFilter:{
		color:"#FFF"
	},
	filterButtonText:{

	},
	headerMenuTitleText:{

	},
	headerMenuTitleWithFilter:{
		flexDirection:"row"
	},
	headerContainer:{
		height:110,
		backgroundColor:"red"
	},
	lang:{
	},
	langText:{
		color:"#fff",
		fontSize:20,
		textDecorationLine:"underline",
		paddingRight:10,
		paddingLeft:10,
	},

	headerMenuTitleText:{
		color:"#d3d3d3",
		fontSize:28,
		paddingRight:15,
		paddingLeft:15,
		paddingTop:5,

	},
	headerMenuItem:{
		width:40,
		height:40,
		alignItems:"center",
		justifyContent: 'center',

		
	},
	headerMenuTitle:{
		width:width - (4 * 42),
	},
	headerMenu:{
		
	},
	headerMenuAndTitle:{
		backgroundColor:"#545454",
		
	},
	header:{
		backgroundColor:"#4a0a55",
		flexDirection:"row",
		

	},
	logoAndAppName:{
		width:width-50,
		flexDirection:"row",
		
	},
	icon:{
		color: "#FFF"
	},
	logo: {
		padding: 5,
	},
	appNameText:{
		fontSize:20,
	},
	logoImage: {
		width: 50,
		height: 50,
	},
	mainMenu:{
		alignSelf:"center",
	},
});

export default Header;