import { faAlignRight } from '@fortawesome/free-solid-svg-icons';
import React, {Component, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity, I18nManager} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import {nice_list_text, setArray, getSelectedLang, setRowType, setTextDirection} from "../../tools/tools.js";
import {navigate} from "../../../RootNavigation";
import { useSelector } from 'react-redux';
const {width, height} = Dimensions.get('screen');

const DayLines = (todaysLinesData) => {
	const count = useSelector((store) => store.count.count);
	const [labels, setLabels] = useState([]);
	useEffect(() => {
		setLabels(setArray(todaysLinesData.todaysLinesData.labels));
	}, []);
	
	//todaysLinesData.todaysLinesData.labels[0]
	
	return(
		<View style={styles.displayBox}>
			<View style={styles.display}>

				<View style={styles.listBox}>
					{setArray(todaysLinesData.todaysLinesData.lines).map((item, key) => {
					return (
					<View  style={[styles.itemBox, {
						
					}]} key={"today-line-"+item.nid}>
						<TouchableOpacity style={styles.logoAndTextBox} onPress={() => navigate("Organization", {nid: item.organization.nid, type:"line", selectedNid:item.nid})}>
						<View style={{
							width: "100%",
							padding:10,
							flexDirection: count.general.lng == "en" ? "row" : "row-reverse",
						}}>
							<View style={styles.generalImageBox}>
								<View style={styles.generalImage}>
									<Image
										style={{width: '100%', height: '100%'}}
										source={{uri:'https://latinet.co.il/'+item.organization.general_image[0]}}
									/>
								</View>
							</View>
							<View style={styles.textBox}>
								<View style={styles.textBoxInner}>
									<View style={styles.title}>
										<Text style={{
											color:"#3a2f3a",
											fontSize:20,
											paddingLeft: 10,
											paddingRight: 10,
											fontWeight:"bold",
										}}>{nice_list_text(item.dance_floors)}</Text>
									</View>
								</View>
								<View style={styles.subTitle}><Text style={{
									color:"#3a2f3a",
									fontSize:14,
									paddingLeft: 10,
									paddingRight: 10,
									textAlign: count.general.lng == "en" ? "left" : "right",
								}}>{item.organization.title}</Text></View>
								</View>
							</View>
						</TouchableOpacity>
					</View>
        			);
        			})}
				</View>
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	DisplayTitle:{
		color:"#FFF",
		fontSize:20,
	},
	display: {
		marginTop:0,
	},
	icon: {
		color:"#FFF",
	},
	itemBox:{
		backgroundColor:"#dbdbdb",
		marginTop:3,
		width: "100%",
	},
	generalImageBox:{
		flexDirection:"column",
		width: 70,
		height:70,
	},
	generalImage:{
		height:"100%",
		width:"100%",
		borderRadius: 150 / 2,
		overflow: "hidden",
	},
	textBox:{
		paddingTop:10
	},
});
export default DayLines;