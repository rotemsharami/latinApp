import React, {Component, useState, useRef, useEffect} from "react";
import {StyleSheet, View, Text, Image, Dimensions, SafeAreaView, Animated, TouchableOpacity, I18nManager} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { navigationRef } from '../../../RootNavigation';
import {nice_list_text, setArray, getSelectedLang, setRowType, setTextDirection} from "../../tools/tools.js";
import { useSelector } from 'react-redux';
import { Flex } from "@react-native-material/core";
const {width, height} = Dimensions.get('screen');

const Header = (info) => {

	const lng = getSelectedLang();
	const count = useSelector((store) => store.count.count);
	const dir = setTextDirection(count.general.lng);

	return(
		<View style={styles.header}> 
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

			<View style={styles.mainMenu}>
				<TouchableOpacity onPress={()=>info.fadeIn()}>
					<View><Icon name='bars' type='font-awesome' color='#FFF' size={30}/></View>
				</TouchableOpacity>
			</View>
		</View>
	)
};
const styles = StyleSheet.create({
	header:{
		backgroundColor:"#4a0a55",
		padding:10,
		borderBottomColor:"#FFF",
		borderBottomWidth:2,
		flexDirection:"row",
		

	},
	logoAndAppName:{
		width:width-60,
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