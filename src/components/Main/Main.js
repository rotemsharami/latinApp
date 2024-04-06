import {Image,StyleSheet,Text,View,Dimensions,Animated,Easing,ImageBackground,TouchableOpacity,I18nManager,ScrollView, SafeAreaView, StatusBar} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import Lines from '../Lines/Lines.js';
import EventsCalender from '../EventsCalender/EventsCalender.js';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
const Main = (info) => {
	const count = useSelector((store) => store.count.count);
	console.log(count);
	return(
		<View>
			{count.selectedScreen == "Lines" && 
				<Lines></Lines>
			}

			{count.selectedScreen == "Events" && 
				<EventsCalender></EventsCalender>
			}
		</View>
	)
};

export default Main;