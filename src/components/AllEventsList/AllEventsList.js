import React, {Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity, I18nManager} from 'react-native';
import { Icon } from 'react-native-elements';
import {nice_list_text, setArray, getSelectedLang, setRowType, setTextDirection} from "../../tools/tools.js";
import {navigate} from "../../../RootNavigation";
import moment from 'moment';
import { useSelector } from 'react-redux';
const {width, height} = Dimensions.get('screen');
const logoWidth = 100;
const textWidth = width - logoWidth;
const AllEventsList = (events) => {
const count = useSelector((store) => store.count.count);
	return(
		<View style={styles.container}>
			{events != undefined &&
				<View style={styles.containerBox}>
					<View style={styles.eventsList}>
						{events.events != undefined &&
							<View style={styles.eventsListBox}>
								{events.events.map((event) =>{
									return(
										<TouchableOpacity kay={"calenderEventItem"+event.nid} onPress={() => navigate("Event", {event: event})}>
										<View style={[styles.eventItem, {
											flexDirection: count.general.lng == "en" ? "row" : "row-reverse",
											
										}]}>
											<View style={styles.image}>
												<Image
													style={{width: '100%', height: '100%'}}
													source={{uri:'https://latinet.co.il/'+event.general_image[0]}}
													/>
											</View>
											<View style={[styles.titleAndText, {
												alignItems: count.general.lng == "en" ? "flex-start" : "flex-end",
												padding:10
											}]}>

												<View style={styles.itemTitle}>
													<Text style={[styles.titleText, {
														textAlign: count.general.lng == "en" ? "left" : "right",
													}]}>

														{event.title}
												</Text>

													<Text style={[styles.textText, {
														textAlign: count.general.lng == "en" ? "left" : "right",
													}]}>
														{event.address}
														</Text>
												</View>
											</View>

										</View>
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
	eventItem:{
		padding:10
	},
	image:{
		width:logoWidth,
		height:logoWidth,
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