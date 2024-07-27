import React, {Component, useState, useEffect, useRef, useCallback} from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity, I18nManager, PanResponder, Animated, Linking} from 'react-native';
import {nice_list_text, setArray, getSelectedLang, setRowType, setTextDirection, setSimpleRow} from "../../tools/tools.js";
import {navigate} from "../../../RootNavigation";
import { useSelector } from 'react-redux';
const {width, height} = Dimensions.get('screen');
import {LinearGradient} from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const Menu = () => {
	
	const count = useSelector((store) => store.count.count);
    return (

		<LinearGradient
		style={[styles.menuContainer, {}]}
		colors={['#000', '#350747', '#5b086b']}
	>

			<View>
				<Text style={{
					paddingTop:5,
					paddingBottom:5,
					color:"#FFF",
					fontSize:17,
					lineHeight:22
				}}>
					{count.lines.global_metadata.labels[count.lng][28]}
				</Text>
			</View>





            <TouchableOpacity
				onPress={() => { Linking.openURL("https://latinet.co.il/he/ClubsAndLineManagers"); }}
				style={[styles.menuItemButton, {flexDirection: setSimpleRow(count.lng)}]}
			>
				<View style={[styles.menuItemBox, {
				flexDirection: setRowType(count.lng),
				borderBottomWidth:1,
				
			}]}>
					<MaterialCommunityIcons name="view-grid" size={30} color={"#FFF"} />
					<Text style={styles.menuItem}>{count.lines.global_metadata.labels[count.lng][23]}</Text>
				</View>
            </TouchableOpacity>

            <TouchableOpacity
				onPress={() => { Linking.openURL("https://latinet.co.il/he/Producers"); }}
				style={[styles.menuItemButton, {flexDirection: setSimpleRow(count.lng)}]}
			>
				<View style={[styles.menuItemBox, {
				flexDirection: setRowType(count.lng),
				borderBottomWidth:1,
			}]}>
					<MaterialCommunityIcons name="calendar-star" size={30} color={"#FFF"} />
					<Text style={styles.menuItem}>{count.lines.global_metadata.labels[count.lng][24]}</Text>
				</View>
            </TouchableOpacity>

            <TouchableOpacity
				onPress={() => { Linking.openURL("https://latinet.co.il/he/AddCourse"); }}
				style={[styles.menuItemButton, {flexDirection: setSimpleRow(count.lng)}]}
			>
				<View style={[styles.menuItemBox, {
				flexDirection: setRowType(count.lng),
				borderBottomWidth:1,
			}]}>
					<MaterialCommunityIcons name="school" size={30} color={"#FFF"} />
					<Text style={styles.menuItem}>{count.lines.global_metadata.labels[count.lng][25]}</Text>
				</View>
            </TouchableOpacity>

            <TouchableOpacity
				onPress={() => { Linking.openURL("https://latinet.co.il/"+count.lng+"/TermsOfUseAndRights"); }}
				style={[styles.menuItemButton, {flexDirection: setSimpleRow(count.lng)}]}
			>
				<View style={[styles.menuItemBox, {
				flexDirection: setRowType(count.lng),
				borderBottomWidth:1,
			}]}>
					<MaterialCommunityIcons name="account-circle" size={30} color={"#FFF"} />
					<Text style={styles.menuItem}>{count.lines.global_metadata.labels[count.lng][26]}</Text>
				</View>
            </TouchableOpacity>


            <TouchableOpacity
				onPress={() => { Linking.openURL("https://latinet.co.il/"+count.lng+"/privacy_policy"); }}
				style={[styles.menuItemButton, {flexDirection: setSimpleRow(count.lng)}]}
			>
				<View style={[styles.menuItemBox, {
				flexDirection: setRowType(count.lng),
				borderBottomWidth:1,
			}]}>
					<MaterialCommunityIcons name="account-circle" size={30} color={"#FFF"} />
					<Text style={styles.menuItem}>{count.lines.global_metadata.labels[count.lng][29]}</Text>
				</View>
            </TouchableOpacity>


            <TouchableOpacity
				onPress={() => { Linking.openURL("https://latinet.co.il/"+count.lng+"/Accessibility"); }}
				style={[styles.menuItemButton, {flexDirection: setSimpleRow(count.lng)}]}
			>
				<View style={[styles.menuItemBox, {
				flexDirection: setRowType(count.lng),
				borderBottomWidth:1,
			}]}>
					<MaterialCommunityIcons name="wheelchair-accessibility" size={30} color={"#FFF"} />
					<Text style={styles.menuItem}>{count.lines.global_metadata.labels[count.lng][27]}</Text>
				</View>
            </TouchableOpacity>

            <TouchableOpacity
				onPress={() => { Linking.openURL("https://latinet.co.il/"+count.lng+"/form/global-report"); }}
				style={[styles.menuItemButton, {flexDirection: setSimpleRow(count.lng)}]}
			>
				<View style={[styles.menuItemBox, {
				flexDirection: setRowType(count.lng),
				borderBottomWidth:1,
			}]}>
					<MaterialCommunityIcons name="wheelchair-accessibility" size={30} color={"#FFF"} />
					<Text style={styles.menuItem}>{count.lines.global_metadata.labels[count.lng][30]}</Text>
				</View>
            </TouchableOpacity>



        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    menuContainer: {
        padding: 10,
		flex:1,
    },
	menuItemButton:{
		width:"100%",
	},
	menuItemBox:{
		borderBottomColor: "#FFF",
		alignContent:"center",
		alignItems:"center",
		width:"100%",
	},
    menuItem: {
        padding: 10,
        fontSize: 17,
		color:"#FFF"
    },
});

export default Menu;