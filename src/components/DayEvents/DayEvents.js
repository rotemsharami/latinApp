import React, {Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity, I18nManager} from 'react-native';
import { Icon } from 'react-native-elements';
import {nice_list_text, setArray, getSelectedLang, setRowType, setTextDirection} from "../../tools/tools.js";
import {navigate} from "../../../RootNavigation";
import moment from 'moment';
const {width, height} = Dimensions.get('screen');

const logoWidth = 100;
const textWidth = width - logoWidth;

const DayEvents = (info) => {
	return(
		<View style={styles.container}>
			{info.route.params.date != undefined &&
				<View style={styles.containerBox}>
					<View
						style={[styles.title, {
							paddingTop:10,
							justifyContent:"center",
							alignItems:"center"
						}]}
					>
						<Text style={styles.pageTitleText}>{info.route.params.date.format('DD/MM/YYYY')}</Text>
					</View>
					<View style={styles.eventsList}>
						{info.route.params.events != undefined &&
							<View style={styles.eventsListBox}>
								{info.route.params.events.map((event) =>{
									return(
										<TouchableOpacity onPress={() => navigate("Event", {event: event})}>
																		
										<View style={styles.eventItem}>
											<View style={styles.image}>
												<Image
													style={{width: '100%', height: '100%'}}
													source={{uri:'https://latinet.co.il/'+event.general_image[0]}}
													/>
											</View>
											<View style={styles.titleAndText}>
												<View style={styles.itemTitle}>
													<Text style={styles.titleText}>{event.title}</Text>
													<Text style={styles.textText}>{event.address}</Text>
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
		fontSize:20,
		lineHeight:20,

		
	},
	textText:{

	}
});
export default DayEvents;