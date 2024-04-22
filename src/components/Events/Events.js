import {Image,StyleSheet,Text,View,Dimensions,Animated,Easing,ImageBackground,TouchableOpacity,I18nManager,ScrollView, SafeAreaView, StatusBar} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import moment from 'moment';
import { setRowType, getSelectedLang, setTextDirection, setArray, nice_list_text, getTranslationString, getTranslationMonth} from '../../tools/tools';
import { useSelector, useDispatch } from 'react-redux';
import OrganizationStudies from '../OrganizationStudies/OrganizationStudies';
import DayLines from '../DayLines/DayLines.js';
import AllEventsList from '../AllEventsList/AllEventsList';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {navigate} from "../../../RootNavigation";
import {LinearGradient} from 'expo-linear-gradient';

const {width, height} = Dimensions.get('screen');
const logoWidth = width/5;
const textWidth = width - logoWidth;

const Events = (info) => {
	const count = useSelector((store) => store.count.count);

	




	  

	return(
		<View></View>
	);
}
export default Events;
const styles = StyleSheet.create({

});