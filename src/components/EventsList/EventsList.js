import { faAlignRight } from '@fortawesome/free-solid-svg-icons';
import React, {Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions} from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import {nice_list_text, getDateFormat} from "../../tools/tools.js";
const {width, height} = Dimensions.get('screen');
const Item = (v) => {
	return(
		<View style={styles.itemBox}>
			<View style={styles.item}>
				<View style={styles.generalImageBox}>
					<View style={styles.generalImage}>
						<Image
							style={{width: '100%', height: '100%'}}
							source={{uri:'https://latinet.co.il/'+v.item.item.general_image}}
						/>
					</View>
				</View>
				<View style={styles.textBox}>
					<View style={styles.textBoxInner}>
						<View style={styles.title}>
							<Text style={styles.titleText}>{v.item.item.title}</Text>
						</View>
					</View>
					<View style={styles.subTitle}><Text style={styles.subTitleText}>{getDateFormat(v.item.item.event_date, 1)}</Text></View>
					<View style={styles.subTitle}><Text style={styles.subTitleText}>{v.item.item.city}</Text></View>
				</View>
			</View>
		</View>
	);
}
const EventsList = ({events}) => {
	return(
		<View style={styles.displayBox}>
			<View style={styles.display}>
				<View style={styles.displayHeader}>
					<View style={styles.iconBox}>
						<Icon name='g-translate' color='#00aced' style={styles.icon} />
					</View>
					<View style={styles.DisplayTitletBox}>
						<Text style={styles.DisplayTitle}>אירועים</Text>
					</View>
				</View>
				<View style={styles.listBox}>
					<FlatList
						style={styles.list}
						data={events}
						renderItem={(item) => <Item item={item} />}
						keyExtractor={item => item.nid}
					/>
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
	displayBox:{
		justifyContent:"center",
		width:"100%",
		flexDirection:"row",
	},
	display: {
		flexDirection:"column",
		width:width-20,
		marginTop:10,
	},
	displayHeader: {
		backgroundColor:"#333444",
		flexDirection:'row',
		justifyContent:"center",
		padding:10,
		width:"100%",
		borderTopLeftRadius:10,
		borderTopRightRadius:10,
	},
	iconBox: {
		flexDirection:"column"
	},
	icon: {
		color:"#FFF",
	},
	textBox: {
		flexDirection:"column"
	},
	itemBox:{
		backgroundColor:"#dbdbdb",
		marginTop:3,
		width: "100%",
	},
	item:{
		width: "100%",
		padding:10,
		flexDirection:"row"
	},
	generalImageBox:{
		flexDirection:"column",
		width: (width-20)*0.2,
		height:(width-20)*0.2,
	},
	generalImage:{
		height:"100%",
		width:"100%",
		overflow: "hidden",
		
	},
	textBox:{
		flexDirection:"column",
		width: width - ((width-20) * 0.2),
		paddingRight:10,
	},
	titleText:{
		paddingTop:3,
		color:"#3a2f3a",
		fontSize:20,
		paddingRight:10,
		fontWeight:"bold",
		textAlign:"left",
		lineHeight:20,
	},
	subTitle:{
		textAlign:"right"
	},
	subTitleText:{
		color:"#3a2f3a",
		fontSize:14,
		paddingRight:10,
		textAlign:"left"
	},
	listBox:{
		flexDirection:'row',
		justifyContent:"center",
		width:"100%",
		borderTopLeftRadius:10,
		borderTopRightRadius:10,
	},
});

export default EventsList;