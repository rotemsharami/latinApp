import React, {useRef, Component, useState, useEffect } from 'react';
import { Animated, Easing, View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity, I18nManager, ScrollView} from 'react-native';
import { Icon } from 'react-native-elements';
import {nice_list_text, setArray, getSelectedLang, setRowType, setTextDirection, getImageUrl, getPlayingHeight} from "../../tools/tools.js";
import {navigate} from "../../../RootNavigation";
import moment from 'moment';
import { useSelector } from 'react-redux';
const {width, height} = Dimensions.get('screen');
const logoWidth = 100;
const textWidth = width - logoWidth;
const AllEventsList = () => {
	const count = useSelector((store) => store.count.count);
	const scaleAnim = useRef(new Animated.Value(0)).current;



	return(
		<ScrollView
			style={[styles.container,{
				height:getPlayingHeight()-37,
			}]}
		>
			{count != undefined &&
				<View style={[styles.containerBox, {
					
				}]}>
					<View style={styles.eventsList}>
						{count.lines != undefined &&
							<View style={styles.eventsListBox}>
								{count.lines.events.map((event) => {
									console.log(event.nid);
									return(
										<TouchableOpacity kay={"calenderEventItem"+event.nid} onPress={() => navigate("Event", {event: event})}>
										<View style={[styles.eventItem, {
											flexDirection: count.lng == "en" ? "row" : "row-reverse",
											
										}]}>
											<View style={styles.image}>
												<Image
													style={{width: '100%', height: '100%'}}
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
		</ScrollView>
	);
}
const styles = StyleSheet.create({
	containerBox:{
		padding:5
	},
	eventItem:{
		marginBottom:10
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