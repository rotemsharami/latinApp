import React, {useRef, Component, useState, useEffect } from 'react';
import { Animated, Easing, View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity, I18nManager, ScrollView} from 'react-native';
import { Icon } from 'react-native-elements';
import {nice_list_text, setArray, getSelectedLang, setRowType, setTextDirection, getImageUrl, getPlayingHeight, filterDataItem} from "../../tools/tools.js";
import {navigate} from "../../../RootNavigation";
import moment from 'moment';
import { useSelector } from 'react-redux';
import {LinearGradient} from 'expo-linear-gradient';
const {width, height} = Dimensions.get('screen');
const logoWidth = 100;
const textWidth = width - logoWidth;
const AllEventsList = () => {
	const count = useSelector((store) => store.count.count);
	const scaleAnim = useRef(new Animated.Value(0)).current;

	const [events, setEvents] = useState(undefined);

    let filterEvents = async() => {
		let filterdEvents = count.lines.events.filter((event) => {
			return filterDataItem(event, count.eventsSelectedFilters);
		});
		return filterdEvents;
    }

	useEffect(() => {
		if(events == undefined){
			filterEvents().then(function(filterd) {
				setEvents(pre => filterd);
			});
		}
	}, []);

	useEffect(() => {
		if(events != undefined){
			if(events.length > 0){
				filterEvents().then(function(filterd) {
					setEvents(pre => filterd);
				});
			}
		}
	}, [count.eventsSelectedFilters]);



	let getEventDates = (event) => {
		return moment(event.event_date).format("DD/MM/YYYY");
	}


	return(
		<ScrollView
			style={[styles.container,{
				flex:1
			}]}
		>
			{count != undefined &&
				<View style={[styles.containerBox, {
					
				}]}>
					<View style={styles.eventsList}>
						{events != undefined &&
							<View style={styles.eventsListBox}>
								{events.map((event) => {
									return(
										<TouchableOpacity kay={"calenderEventItem"+event.nid} onPress={() => navigate("Event", {event: event})} key={"calenderEventItem-"+event.nid}>
											<LinearGradient style={[styles.eventItem, {
												flexDirection: count.lng == "en" ? "row" : "row-reverse",
											}]}
												colors={["#FFF", "#FFF", '#fbefff',]}
											>
												<View style={styles.image}>
													<Image
														style={{width: '80%', height: '80%'}}
														source={{uri:getImageUrl(event.general_image)}}
														/>
												</View>
												<View style={[styles.titleAndText, {
													alignItems: count.lng == "en" ? "flex-start" : "flex-end",
													padding:10
												}]}>
													<View style={styles.itemTitle}>
														<Text style={[styles.titleText, {
															textAlign: count.lng == "en" ? "left" : "right",
														}]}>
															{event.title}
														</Text>
														<Text style={[styles.textText, {
															textAlign: count.lng == "en" ? "left" : "right",
														}]}>
															{getEventDates(event)}
														</Text>
														<Text style={[styles.textText, {
															textAlign: count.lng == "en" ? "left" : "right",
														}]}>
															{event.city}
														</Text>
													</View>
												</View>
											</LinearGradient>
										</TouchableOpacity>
									);
								})}
							</View>
						}
					</View>
				</View>
			}
		</ScrollView>
	);
}
const styles = StyleSheet.create({
	containerBox:{
	},
	eventItem:{
		
	},
	image:{
		width:logoWidth,
		height:logoWidth,
		alignItems:"center",
		justifyContent:"center",
		alignContent:"center"
	},
	titleAndText:{
		color: '#000',
		height:logoWidth,
		width:width-logoWidth,
	},
	title:{
		fontWeight:"bold",
	},
	titleText:{
		fontSize:20,
		lineHeight:20,
	},
});
export default AllEventsList;