import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity, I18nManager} from 'react-native';

import React, {useRef, useState, useEffect} from 'react';
import {setArray, getSelectedLang, setTextDirection, setRowType} from "../../tools/tools.js";
import { Icon } from 'react-native-elements';
import RenderHtml from 'react-native-render-html';
import { useSelector, useDispatch } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ContactInfoX from '../ContactInfoX/ContactInfoX';
import DanceServices from '../DanceServices/DanceServices';
import DanceFloors from '../DanceFloors/DanceFloors';

import ServicesX from '../ServicesX/ServicesX';




import moment from 'moment';
const {width, height} = Dimensions.get('screen');
const logoWidth = width/3;
const textWidth = width - logoWidth;
const Event = (event) => {
	const lng = getSelectedLang();
	const count = useSelector((store) => store.count.count);
	const dir = setTextDirection(count.general.lng);

	const [eventData, setEventData] = useState();


	useEffect(() => {
		let url = 'https://latinet.co.il/'+lng+'/event/'+event.route.params.event.nid;
		fetch(url)
		.then((res) => res.json())
		.then((data) => {
			setEventData(data.data);
			console.log(data.data);


	
		});
	}, []);



	let getDateType = () => {
		let type = "0";
		
		if(event.route.params.event.event_end_date != undefined){
			let months = moment(event.route.params.event.event_date).month() == moment(event.route.params.event.event_end_date).month();
			let years = moment(event.route.params.event.event_date).year() == moment(event.route.params.event.event_end_date).year();
			if(months && years){
				type = "1"; // dd-dd / mm / yyyyn 
			}else if(years && months == false){
				type = "2"; // dd/mm - dd/mm / yyyy
			}else if(years == false && months == false){
				type = "3"; // dd/mm/yyyy - dd/mm/yyyy
			}
		}
		
		return type;
    }


    return(
        <View style={styles.section}>
			{eventData != undefined && 
				<View style={styles.sectionBox}>




				<View style={styles.eventItem}>
					<View style={styles.image}>
						<Image
							style={{width: '100%', height: '100%'}}
							source={{uri:'https://latinet.co.il/'+event.route.params.event.general_image[0]}}
							/>
					</View>
					<View style={styles.titleAndText}>
						<View style={styles.itemTitle}>
							<Text style={styles.titleText}>{event.route.params.event.title}</Text>
							<Text style={styles.textText}>{event.route.params.event.address}</Text>						
							<View>
								<Text>{moment(event.route.params.event.event_date).format("DD/MM/YYYY")}{event.route.params.event.event_end_date != undefined ? " - "+moment(event.route.params.event.event_end_date).format("DD/MM/YYYY")  : ""}</Text>
							</View>

						</View>
					</View>

				</View>


				
				
				
				<View style={styles.danceFloorsAndServices}>
					<View style={styles.danceFloors}>
						<DanceFloors danceServices={eventData.dance_floors}></DanceFloors>
					</View>
					<View style={styles.services}>
						<DanceServices danceServices={eventData.dance_services}></DanceServices>
					</View>
				</View>
				<ServicesX services={eventData.services}></ServicesX>
				<ContactInfoX itemInfo={event}></ContactInfoX>
			</View>
			}

        </View>
    );
}
export default Event;
const styles = StyleSheet.create({
	danceFloorsAndServices:{
flexDirection:"row"
	},
	danceFloors:{
		flexDirection:"column"
	},
	services:{
		flexDirection:"column"
	},
	container:{
		flex:1,
	},
	containerBox:{
		
	},	
	eventsList:{
	},

	eventsListBox:{
	},
	eventItem:{
		padding:10,
		flexDirection:"row",
		width:"100%"
	},
	image:{
		width:logoWidth,
		height:logoWidth,
	},
	titleAndText:{
		color: '#000',
		justifyContent:"center",
		height:logoWidth,
		width:textWidth-30,
		
		
	},
	title:{
		fontWeight:"bold",
		
		
	},
	itemTitle:{
		padding:10,
		width:width-logoWidth

	},
	titleText:{
		fontSize:30,
		lineHeight:30,

		
	},
	textText:{

	}
});          
