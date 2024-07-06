import React, {Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity, I18nManager} from 'react-native';
import { Icon } from 'react-native-elements';
import {nice_list_text, setArray, getSelectedLang, setRowType, setTextDirection, getImageUrl} from "../../tools/tools.js";
import {navigate} from "../../../RootNavigation";
import moment from 'moment';
import { useSelector } from 'react-redux';
import {LinearGradient} from 'expo-linear-gradient';
const {width, height} = Dimensions.get('screen');
const logoWidth = 100;
const textWidth = width - logoWidth;
const DayEvents = (info) => {
const count = useSelector((store) => store.count.count);

let getEventDates = (event) => {
	return moment(event.event_date).format("DD/MM/YYYY");
}


	return(
		<View style={styles.container}>
			{info.route.params.date != undefined &&
				<View style={styles.containerBox}>
					<View
						style={[styles.title, {
							justifyContent:"center",
							paddingRight:15,
							paddingLeft:15,
							height:30
						}]}
					>
						<Text style={[styles.pageTitleText, {
							textAlign: count.lng == "en" ? "left" : "right",
						}]}>{info.route.params.date.format('DD/MM/YYYY')}</Text>
					</View>
					<View style={styles.eventsList}>
						{info.route.params.events != undefined &&
							<View style={styles.eventsListBox}>
								{info.route.params.events.map((event) =>{
									return(
										// <TouchableOpacity kay={"calenderEventItem"+event.nid} onPress={() => navigate("Event", {event: event})}>
										// 	<View style={[styles.eventItem, {
										// 		flexDirection: count.lng == "en" ? "row" : "row-reverse",
												
										// 	}]}>
										// 		<View style={styles.image}>
										// 			<Image
										// 				style={{width: '100%', height: '100%'}}
										// 				source={{uri:getImageUrl(event.general_image)}}
										// 				/>
										// 		</View>
										// 		<View style={[styles.titleAndText, {
										// 			alignItems: count.lng == "en" ? "flex-start" : "flex-end",
										// 			padding:10
										// 		}]}>

										// 			<View style={styles.itemTitle}>
										// 				<Text style={[styles.titleText, {
										// 					textAlign: count.lng == "en" ? "left" : "right",
										// 				}]}>

										// 					{event.title}
										// 			</Text>

										// 				<Text style={[styles.textText, {
										// 					textAlign: count.lng == "en" ? "left" : "right",
										// 				}]}>
										// 					{event.address}
										// 					</Text>
										// 			</View>
										// 		</View>

										// 	</View>
										// </TouchableOpacity>





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
		</View>
	);
}
const styles = StyleSheet.create({
	pageTitleText:{
		fontSize:20
	},
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
		paddingTop:2,
		fontSize:20,
		lineHeight:20,
	},
});
export default DayEvents;