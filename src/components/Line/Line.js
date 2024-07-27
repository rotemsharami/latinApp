import React, {Component, useState, useEffect, useRef, useCallback} from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity, I18nManager, PanResponder, Animated} from 'react-native';
import {nice_list_text, setArray, getSelectedLang, setRowType, setTextDirection} from "../../tools/tools.js";
import {navigate} from "../../../RootNavigation";
import { useSelector } from 'react-redux';
const {width, height} = Dimensions.get('screen');


const Line = (item) => {
	const count = useSelector((store) => store.count.count);
	const dir = setTextDirection(count.lng);

	const goToOrganizationLine = useCallback((nid) => {
		item._setOrganizationNid(nid);
		item._setSelectedScreen("Organization");
	}, [item._setOrganizationNid, item._setSelectedScreen]);

	return(
		<View style={{
			flexDirection: setRowType(count.lng),
		}}>
			{item != undefined && 

			<View
				style={[styles.itemBox,{
					
				}]}
				key={"today-line-"+item.item.nid}
			>
				<TouchableOpacity style={styles.logoAndTextBox} onPress={() => {
					//goToOrganizationLine(item.item.org_nid)
					navigate("Organization", {"orgNid": item.item.org_nid, "screenType": "lines", "selectedLine": item.item.nid, "source": "Lines"})
				}}>
					<View style={{
						padding:10,
						flexDirection: setRowType(count.lng),
						
					}}>
						<View style={styles.generalImageBox}>
							<View style={styles.generalImage}>
								<Image
									style={{width: '100%', height: '100%'}}
									source={{uri: count.lines.organizations[item.item.org_nid].general_image.replace("public://", "https://latinet.co.il/sites/default/files/")}}
								/>
							</View>
						</View>
						<View style={styles.textBox}>
							<View style={styles.textBoxInner}>
								<View style={[styles.title, {
									paddingLeft: 10,
									paddingRight: 10,
									flex: 1,
									justifyContent: 'center',
									alignItems: 'center',
									width: '100%',

								}]}>
									<Text style={{
										color:"#3a2f3a",
										fontSize:20,
										lineHeight:20,
										flexShrink: 1,
										flex:1,
										alignContent:"center",
										width: '100%',
										fontWeight:"bold",                                 
									}}>{nice_list_text(item.item.dance_floors != null ? item.item.dance_floors : count.lines.organizations[item.item.org_nid].dance_floors, count.lines.taxonomy_terms.dance_floors, count.lng)}</Text>
								</View>
							</View>
							<View style={styles.subTitle}>
								<Text style={{
									color:"#3a2f3a",
									fontSize:14,
									paddingLeft: 10,
									paddingRight: 10,
									textAlign: dir,
								
								}}>{count.lines.organizations[item.item.org_nid][count.lng].title}, {count.lines.organizations[item.item.org_nid][count.lng].city}
								</Text>
							</View>
						</View>
					</View>
				</TouchableOpacity>
			</View>
		}
		</View>
	);
}


const styles = StyleSheet.create({
	DisplayTitle:{
		color:"#FFF",
		fontSize:20,
	},
	display: {
		
	},
	icon: {
		color:"#FFF",
	},
	itemBox:{
		
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
		justifyContent:"center",
		flex:1
	},
});
export default Line;