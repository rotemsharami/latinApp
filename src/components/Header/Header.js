import React, {Component, useState, useRef, useEffect} from "react";
import {StyleSheet, View, Text, Image, Dimensions, SafeAreaView, Animated} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { navigationRef } from '../../../RootNavigation';
import {nice_list_text, setArray, getSelectedLang, setRowType, setTextDirection} from "../../tools/tools.js";
import { useSelector } from 'react-redux';
const {width, height} = Dimensions.get('screen');

const Header = (info) => {

	const lng = getSelectedLang();
	const count = useSelector((store) => store.count.count);
	const dir = setTextDirection(count.general.lng);

	return(
		<SafeAreaView>
			<View style={styles.headerBox}>
				<View style={styles.header}>
					<View style={styles.mainMenu}>
						<Button style={{backgroundColor:'#fff', padding:0}} icon={<Icon name='bars' backgroundColor='#777' type='font-awesome' color='#fff'/>} onPress={()=>info.fadeIn()}></Button>
					</View>
					<View style={{
						flexDirection: setRowType(count.general.lng),
						width:width-60
						}}> 
						<View style={{
							flexDirection: setRowType(count.general.lng),

						}}>
							<View style={styles.logo}>
								<Image style={styles.logoImage} source={require('../../../assets/logo.png')} />
							</View>
							<View style={styles.appName}>
								<Text style={{
								paddingRight: lng =="he" ? 5 : 0,
								paddingLeft: lng =="he" ? 0 : 5,
								fontWeight:"bold",
								color:"#FFF",
								fontSize:40,
								alignSelf:'center',
		
							}}>Latinet</Text>
							</View>
						</View>
					</View>
				</View>
			</View>
		</SafeAreaView>
	)
};
const styles = StyleSheet.create({
	mainMenuButton:{
		backgroundColor:'#f442a6',
	},
	header:{
		backgroundColor:"#4a0a55",
		flexDirection:'row',
		padding:10,
		borderBottomColor:"#000",
		borderBottomWidth:2,
	},
	icon:{
		color: "#FFF"
	},
	logo: {
		padding: 5,
		flexDirection:'column'
	},
	appName:{
		
		flexDirection:'column'
	},
	appNameText:{
		fontSize:20,
	},
	logoImage: {
		width: 50,
		height: 50,
	},
	mainMenu:{
		flexDirection:'column',
		width:40
	},
	logoAndAppName: {

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
	language:{
		justifyContent:'center',
		flexDirection:'column',
		flex: 1
	}
});

export default Header;