import React, {Component, useState, useRef, useEffect} from "react";
import {StyleSheet, View, Text, Image, Dimensions, SafeAreaView, Animated, TouchableOpacity, I18nManager} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import {nice_list_text, setArray, getSelectedLang, setRowType, setTextDirection} from "../../tools/tools.js";
import { useSelector, useDispatch } from 'react-redux';
import { Flex } from "@react-native-material/core";
const {width, height} = Dimensions.get('screen');
import {navigate, navigationRef} from "../../../RootNavigation";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {increment, decrement, changeLanguage} from '../../actions/counterActions';
const logoWidth = 40;
const textWidth = width - logoWidth;



const Header = (info) => {
	//console.log(navigationRef?.getRootState()?.routes[0]);
	const dispatch = useDispatch();
	const changeLng = (lng) => {
		dispatch(changeLanguage(lng));
	};



	const [selectedRouth, setSelectedRouth] = useState("Lines");
	
	
	
	const lng = getSelectedLang();
	const count = useSelector((store) => store.count.count);
	const dir = setTextDirection(count.general.lng);

	console.log(count.general);

	
	useEffect(() => {

		
	}, []);

	return(
		<View style={styles.headerContainer}>
			<View style={styles.header}>
				<TouchableOpacity onPress={()=>{
					navigate("Lines", {});
					setSelectedRouth("Lines");
					}}>
					<View style={styles.logoAndAppName}>
						<View style={styles.logo}>
							<Image style={styles.logoImage} source={require('../../../assets/logo.png')} />
						</View>
						<View style={styles.appName}>
							<Text style={{
							paddingRight: I18nManager.isRTL ? 5 : 0,
							paddingLeft: I18nManager.isRTL ? 0 : 5,
							fontWeight:"bold",
							color:"#FFF",
							fontSize:40,
							alignSelf:'center',

						}}>LatinApp</Text>
						</View>
					</View>
				</TouchableOpacity>
				<View style={styles.mainMenu}>
					<TouchableOpacity onPress={()=>changeLng(count.general.lng == "en" ? "he" : "en")}>
						<View style={styles.lang}>
							<Text style={styles.langText}>{count.general.lng == "en" ? "עב" : "EN"}</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
			<View style={styles.headerMenuAndTitle}>
				<View style={styles.headerMenuTitle}>
					<Text style={styles.headerMenuTitleText}>{selectedRouth == "Lines" ? "Lines" : "Events"}</Text>
				</View>
				<View style={styles.headerMenu}>

					<TouchableOpacity onPress={()=>{
						navigate("EventsCalender", {});
						setSelectedRouth("Events");

						}}>
						<View style={styles.headerMenuItem}>
                            <MaterialCommunityIcons name="calendar-star" size={30} color={selectedRouth == "Events" ? "#f640b2" : "#FFF"} />
                        </View>
					</TouchableOpacity>
					<TouchableOpacity onPress={()=>{
						navigate("Lines", {});
						setSelectedRouth("Lines");
						}}>
						<View style={[styles.headerMenuItem,{}]}>
                            <MaterialCommunityIcons name="clock-time-four-outline" size={30} color={selectedRouth == "Lines" ? "#f640b2" : "#FFF"} />
                        </View>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	)
};
const styles = StyleSheet.create({

	lang:{
	paddingRight:10
	},
	langText:{
		color:"#fff",
		fontSize:26
	},


	headerMenuTitleText:{
		color:"#FFF",
		fontSize:30
	},
	headerMenuItem:{
		width:40,
		backgroundColor:"#4a0a55",
		
	},
	headerMenuTitle:{
		width:width - (2 * 40)
	},
	headerMenu:{
		flexDirection:"row"
	},
	headerMenuAndTitle:{
		flexDirection:"row",
		backgroundColor:"#4a0a55",
		padding:5
	},
	header:{
		backgroundColor:"#4a0a55",
		padding:10,
		borderBottomColor:"#FFF",
		borderBottomWidth:2,
		flexDirection:"row",
		

	},
	logoAndAppName:{
		width:width-70,
		flexDirection:"row"
		
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
		padding:10
	},
});

export default Header;