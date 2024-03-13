import {Image,StyleSheet,Text,View,Dimensions,Animated,Easing,ImageBackground,TouchableOpacity,I18nManager,ScrollView, SafeAreaView, StatusBar} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import OrganizationBox from '../organizationBox/organizationBox.js';
import DanceServices from '../DanceServices/DanceServices';
import DanceFloors from '../DanceFloors/DanceFloors.js';
import SliderX from '../SliderX/SliderX.js';
import OrganizationLines from '../OrganizationLines/OrganizationLines.js';
import Services from '../Services/Services.js';
import Location from '../Location/Location';
import ContactInfo from '../ContactInfo/ContactInfo.js';
import storage from '../../storage/storage';
import OrganizationEvents from '../OrganizationEvents/OrganizationEvents.js';
import RenderHtml from 'react-native-render-html';
import { setRowType, getSelectedLang, setTextDirection, setArray, nice_list_text} from '../../tools/tools';
import { useSelector, useDispatch } from 'react-redux';
import OrganizationStudies from '../OrganizationStudies/OrganizationStudies.js';

const {width, height} = Dimensions.get('screen');
const logoWidth = width/5;
const textWidth = width - logoWidth;
const setText = (text) => {
	return {html:text}
}

const Lines = () => {
	
	const renderersProps = {
		ul: {
		  enableExperimentalRtl: true
		}
	  };

    const lng = getSelectedLang();
	const count = useSelector((store) => store.count.count);
	const dir = setTextDirection(count.general.lng);

	let url = 'https://latinet.co.il/'+lng+'/lines_data/';
	const [lines, setLines] = useState({});

	



	useEffect(() => {
		fetch(url)
		.then((res) => res.json())
		.then((data) => {

			console.log("ddd");

			setLines(data);
			


			
		});
	}, []);
	return(
		<View style={styles.container}>
			<Text>{JSON.stringify(lines)}</Text>
		</View>
	);
}
export default Lines;
const styles = StyleSheet.create({
	container:{
		flex: 1
	}
});