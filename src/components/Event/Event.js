import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity, I18nManager, Animated} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import React, {useRef, useState, useEffect} from 'react';
import {setArray, setTextDirection, setRowType, getPlayingHeight, getImageUrl} from "../../tools/tools.js";
import { Icon } from 'react-native-elements';
import RenderHtml from 'react-native-render-html';
import { useSelector, useDispatch } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ContactInfoX from '../ContactInfoX/ContactInfoX';
import ContactInfo from '../ContactInfo/ContactInfo';
import { WebView } from 'react-native-webview';

import DanceServices from '../DanceServices/DanceServices';
import DanceFloors from '../DanceFloors/DanceFloors';

import ServicesX from '../ServicesX/ServicesX';




import moment from 'moment';
const {width, height} = Dimensions.get('screen');
const logoWidth = width/3;
const textWidth = width - logoWidth;



const Event = (event) => {
	const count = useSelector((store) => store.count.count);
	const dir = setTextDirection(count.lng);
	const scaleAnim = useRef(new Animated.Value(0)).current;






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

<View
	style={[styles.container,{
		flex:1
	}]}
    >

        <View style={[styles.section, {
			flex:1,
		}]}>
			{event.route.params.event != undefined && 
				<View style={[styles.sectionBox, {
					flex:1
				}]}>




				<View style={[styles.eventItem, {
					
					alignItems:"center"
				}]}>
					<View style={styles.image}>
						<Image
							style={{width: '100%', height: '100%'}}
							source={{uri:getImageUrl(event.route.params.event.general_image)}}
							/>
					</View>
					<View style={[styles.titleAndText, {
						
					}]}>
						<View style={styles.itemTitle}>
							<Text style={[styles.titleText, {
								textAlign: "center",
							}]}>{event.route.params.event.title}</Text>
							<Text style={[styles.textText, {
								textAlign: "center",
							}]}>{event.route.params.event.address}</Text>						
							<View style={{
								alignItems:"center"
							}}>
								<Text style={{
									 textAlign: "center",
									 fontSize:16
								}}>{moment(event.route.params.event.event_date).format("DD/MM/YYYY")}{event.route.params.event.event_end_date != undefined ? " - "+moment(event.route.params.event.event_end_date).format("DD/MM/YYYY")  : ""}</Text>
							</View>

						</View>
					</View>

				</View>


								{/* <View>
									<WebView
										style={styles.video}
										javaScriptEnabled={true}
										source={{ uri: event.route.params.event.youtube_video }}
									/>

								</View> */}
				


				
							<View style={[styles.danceFloorsAndServices, {
								flexDirection: count.lng == "en" ? "row" :"row-reverse",
								justifyContent:"space-between",
								alignItems:"stretch",
								flex:1
							}]}>

								<LinearGradient style={{
									flex:1,
									padding:5
								}}
									colors={['#FFF','#efdbf7']}
								>

									<View style={styles.centerBox}>
										<DanceServices danceServices={event.route.params.event.dance_services}></DanceServices>
									</View>
								</LinearGradient>

								<LinearGradient style={{
									flex:1,
									padding:5
								}}
									colors={['#FFF','#efdbf7']}
								>
									<View style={styles.centerBox}>
										<DanceFloors danceServices={event.route.params.event.dance_floors}></DanceFloors>
									</View>
								</LinearGradient>


								<LinearGradient style={{
									flex:1,
									padding:5
								}}
									colors={['#FFF','#efdbf7']}
								>
									
									<View style={styles.centerBox}>
										<ServicesX services={event.route.params.event.global_services}></ServicesX>
									</View>
								</LinearGradient>
							</View>
				
							<ContactInfo organization={event.route.params.event}></ContactInfo>

			</View>
			}

        </View>
		</View>
    );
}
export default Event;
const styles = StyleSheet.create({
	
	eventItem:{
		padding:10,
	},
	image:{
		width:width*0.7,
		height:width*0.7,
	},
	titleAndText:{
		color: '#000',
		
		
	},
	title:{
		fontWeight:"bold",
		
		
	},
	itemTitle:{
		padding:10,

	},
	titleText:{
		fontSize:30,
		lineHeight:31,

		
	},
	textText:{

	}
});          
