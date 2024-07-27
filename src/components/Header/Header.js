import React, {Component, useState, useRef, useEffect, useCallback} from "react";
import {StyleSheet, View, Text, Image, Dimensions, SafeAreaView, Animated, TouchableOpacity, I18nManager, Linking} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import {nice_list_text, setArray, getSelectedLang, setRowType, setTextDirection, getTranslationString, setSimpleRow} from "../../tools/tools.js";
import { useSelector, useDispatch } from 'react-redux';
import { Flex } from "@react-native-material/core";
const {width, height} = Dimensions.get('screen');
import {navigate, navigationRef, getRouteName} from "../../../RootNavigation";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {increment, decrement, changeLanguage, changeSelectedScreen, changeShowFilter} from '../../actions/counterActions';
import { LinearGradient } from 'expo-linear-gradient';
const logoWidth = 60;
const textWidth = width - logoWidth;



const Header = (info) => {
	

	const changeShowMenu = useCallback(() => {
        info._setshowMenu(info._showMenu ? false : true);


	}, [info._showMenu]);



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
			if(info._selectedScreen == "Posts" || info._selectedScreen == "Post"){
				title = count.lines.global_metadata.labels[count.lng][31];
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
		<View style={[styles.headerContainer, {
			height: info._showMenu ? 50 : 100
		}]}>
			<LinearGradient
				style={[styles.header, {
					flexDirection: setRowType(count.lng),
					justifyContent:"space-between"
					
				}]}
				colors={['#5b086b', '#350747', '#350747']}
			>
				<View style={[styles.mainMenu, {
					width:60
				}]}>
					<TouchableOpacity onPress={()=>changeShowMenu()}>
						<MaterialCommunityIcons name={!info._showMenu ? "menu" : "close-thick"} size={30} color="#d3d3d3" />
					</TouchableOpacity>
				</View>

				<View style={[styles.logoAndAppName, {
					flexDirection: setSimpleRow(count.lng)
				}]}>
					<View style={styles.logo}>
						<Image style={styles.logoImage} source={require('../../../assets/logo.png')} />
					</View>
					<View style={[styles.appName, {
						flexDirection: setSimpleRow(count.lng)
					}]}>
						<Text style={{
						fontWeight:"bold",
						color:"#FFF",
						fontSize:36,
					}}>Latin</Text>
						<Text style={{
						fontWeight:"bold",
						color:"#ff99d9",
						fontSize:36,
					}}>app</Text>
					</View>
				</View>
				
				<View style={[styles.mainMenu, {
					width:60
				}]}>
					<TouchableOpacity onPress={()=>changeLng(count.lng == "en" ? "he" : "en")}>
						<View style={styles.lang}>
							<Text style={styles.langText}>{count.lng == "en" ? "עב" : "EN"}</Text>
						</View>
					</TouchableOpacity>
				</View>

			</LinearGradient>



			{!info._showMenu && 

			<LinearGradient
				style={[styles.headerMenuAndTitle, {
					flexDirection: setRowType(count.lng),
					flex:1,
					justifyContent:"space-between"
				}]}
				colors={['#555', '#6f6f6f', '#555']}
			>

				
				<View style={styles.headerMenuTitle}>
					<Text style={styles.headerMenuTitleText}>{setTitle()}</Text>
				</View>
				
				


				<View style={[styles.headerMenu, {
					flexDirection: setRowType(count.lng),
				}]}>


					<TouchableOpacity onPress={() => {
						navigate("Learns", {});
						}}>


						<LinearGradient
							style={[styles.headerMenuItem, {
								borderRightWidth:1,
								borderEndColor:"#1e1e1e",
								height:50,
								backgroundColor:"#545454"
							}]}
							colors={['#555', '#373736', '#555']}
						>

                            <MaterialCommunityIcons name="school" size={30} color={info._selectedScreen == "Learns" ? "#ff85d1" : "#d3d3d3"} />
                        </LinearGradient>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => {
						navigate("EventsCalender", {});
						}}>

						<LinearGradient
							style={[styles.headerMenuItem, {
								borderRightWidth:1,
								borderEndColor:"#1e1e1e",
								height:50,
								backgroundColor:"#545454"
							}]}
							colors={['#555', '#373736', '#555']}
						>
                            <MaterialCommunityIcons name="calendar-star" size={30} color={info._selectedScreen == "EventsCalender" || info._selectedScreen == "Event" || info._selectedScreen == "DayEvents" ? "#ff85d1" : "#d3d3d3"} />
                        </LinearGradient>
					</TouchableOpacity>
					<TouchableOpacity onPress={()=>{
						navigate("Lines", {});
						}}>
						<LinearGradient
							style={[styles.headerMenuItem, {
								borderRightWidth:1,
								borderEndColor:"#1e1e1e",
								height:50,
								backgroundColor:"#545454"
							}]}
							colors={['#555', '#373736', '#555']}
						>
                            <MaterialCommunityIcons name="clock-time-four-outline" size={30} color={info._selectedScreen == "Lines" ? "#ff85d1" : "#d3d3d3"} />
                        </LinearGradient>
					</TouchableOpacity>

					<TouchableOpacity onPress={()=>{
						navigate("Organizations", {});
						}}>
						<LinearGradient
							style={[styles.headerMenuItem, {
								borderRightWidth:1,
								borderEndColor:"#1e1e1e",
								height:50,
								backgroundColor:"#545454"
							}]}
							colors={['#555', '#373736', '#555']}
						>
                            <MaterialCommunityIcons name="view-grid" size={30} color={info._selectedScreen == "Organizations" || info._selectedScreen == "Organization" ? "#ff85d1" : "#d3d3d3"} />
                        </LinearGradient>
					</TouchableOpacity>


					<TouchableOpacity onPress={()=>{
						navigate("Posts", {});
						}}>
						<LinearGradient
							style={[styles.headerMenuItem, {
								borderRightWidth:1,
								borderEndColor:"#1e1e1e",
								height:50,
								backgroundColor:"#545454"
							}]}
							colors={['#555', '#373736', '#555']}
						>
                            <MaterialCommunityIcons name="message-text" size={30} color={info._selectedScreen == "Posts" || info._selectedScreen == "Post" ? "#ff85d1" : "#d3d3d3"} />
                        </LinearGradient>
					</TouchableOpacity>



				</View>
			</LinearGradient>
			}
		</View>
	)
};
const styles = StyleSheet.create({
	headerMenuTitleTextFilter:{
		color:"#FFF"
	},
	filterButtonText:{

	},

	headerMenuTitleWithFilter:{
		
	},
	headerContainer:{
		
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
		fontWeight:"bold"
	},

	headerMenuTitleText:{
		color:"#d3d3d3",
		fontSize:28,
		fontWeight:"normal",
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
		
	},
	headerMenu:{
		
	},
	headerMenuAndTitle:{
		backgroundColor:"#545454",
		
	},
	header:{
		flex: 1,
		justifyContent:"space-between"
	},
	logoAndAppName:{
		paddingLeft:10,
		paddingRight:10,
		
	},
	icon:{
		color: "#FFF"
	},
	logo: {
		paddingTop:4,
		height:60,
		width:50,
		alignItems:"center",
	},
	appNameText:{
		fontSize:20,
	},
	logoImage: {
		width: 43,
		height: 43,
	},
	mainMenu:{
		alignSelf:"center",
		alignItems:"center",
		width:50,
	},
});

export default Header;