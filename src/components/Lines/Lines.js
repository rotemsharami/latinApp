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
	const [lines, setLines] = useState(undefined);

	let getTagInfo = (tid, data) => {
		let result = "no";
		let filter = data.filter(item => item.tid == tid);
		if(filter.length > 0){
			result = filter[0].name;
		}
		console.log("ddd");
		return result;
	}



	useEffect(() => {
		fetch(url)
		.then((res) => res.json())
		.then((data) => {

			

			setLines(data.data);
			


			
		});
	}, []);
	return(
		<View style={styles.container}>
			
			{lines != undefined &&
			<View style={styles.containerValues}>
				<View style={styles.filterItems}>
					{Object.keys(lines.used_dance_floors).map((index) => {
						return(
							<View style={styles.filterItem}>
								<TouchableOpacity>
									<Text>{getTagInfo(index, lines.dance_floors)}</Text>
								</TouchableOpacity>
							</View>
						);
					})}
				</View>


				<View style={styles.filterItems}>
					{Object.keys(lines.used_area).map((index) => {
						return(
							<View style={styles.filterItem}>
								<TouchableOpacity>
									<Text>{getTagInfo(index, lines.areas)}</Text>
								</TouchableOpacity>
							</View>
						);
					})}
				</View>


				<View style={styles.daysControls}>
					{Object.keys(lines.days_of_week_short).map((index) => {
						return(
							<View style={styles.dayFilterItem}>
								<TouchableOpacity>
									<Text>{lines.days_of_week_short[index]}</Text>
									<Text>{lines.days_of_week_short_date[index]}</Text>
								</TouchableOpacity>
							</View>
						);
					})}
            	</View>




			</View>
			}
			


		</View>
	);
}
export default Lines;
const styles = StyleSheet.create({
	container:{
		flex: 1
	},
	filterItems:{
		flexDirection:"row",
		alignContent:"space-around",
		alignSelf:"stretch",
	},
	filterItem:{
		borderWidth:1,
		alignContent:"center",
		padding:3
	},
	daysControls:{
		flexDirection:"row",
	},
	dayFilterItem:{
		flex:1,
		alignItems:"center",
		borderWidth:1,
		borderRightWidth:0
	}
});