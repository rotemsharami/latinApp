import React, {Component, useState, useRef, useEffect} from "react";
import {StyleSheet, View, Text, Image, Dimensions, SafeAreaView, Animated, TouchableOpacity, I18nManager} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import {nice_list_text, setArray, setRowType, setTextDirection, getTranslationString} from "../../tools/tools.js";
import { useSelector, useDispatch } from 'react-redux';
import { Flex } from "@react-native-material/core";
const {width, height} = Dimensions.get('screen');
import {navigate, navigationRef} from "../../../RootNavigation";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {increment, decrement, changeLanguage} from '../../actions/counterActions';
const logoWidth = 40;
const textWidth = width - logoWidth;



const Footer = () => {
	//console.log(navigationRef?.getRootState()?.routes[0]);
	const dispatch = useDispatch();
	const changeLng = (lng) => {
		dispatch(changeLanguage(lng));
	};

	const count = useSelector((store) => store.count.count);
	const dir = setTextDirection(count.lng);

	return(
		<View style={styles.headerContainer}>
			<Text>ffff</Text>
		</View>
	)
};
const styles = StyleSheet.create({



});

export default Footer;