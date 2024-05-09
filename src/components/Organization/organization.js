import {Image,StyleSheet,Text,View,Dimensions,Animated,Easing,ImageBackground,TouchableOpacity,I18nManager,ScrollView, SafeAreaView, StatusBar, Pressable} from 'react-native';
import React, {useRef, useState, useEffect, useCallback} from 'react';
import OrganizationBox from '../organizationBox/organizationBox.js';
import OrganizationBoxLink from '../OrganizationBoxLink/OrganizationBoxLink.js';
import DanceServices from '../DanceServices/DanceServices';
import DanceFloors from '../DanceFloors/DanceFloors.js';
import SliderX from '../SliderX/SliderX.js';
import OrganizationLines from '../OrganizationLines/OrganizationLines.js';
import ServicesX from '../ServicesX/ServicesX.js';
import {LinearGradient} from 'expo-linear-gradient';
import ContactInfo from '../ContactInfo/ContactInfo.js';
import storage from '../../storage/storage';
import OrganizationEvents from '../OrganizationEvents/OrganizationEvents.js';
import { setRowType, setTextDirection, setArray, nice_list_text} from '../../tools/tools';
import { useSelector, useDispatch } from 'react-redux';
import OrganizationStudies from '../OrganizationStudies/OrganizationStudies.js';

const {width, height} = Dimensions.get('screen');
const logoWidth = 70;
const textWidth = 70 - logoWidth;
const setText = (text) => {
	return {html:text}
}

const Organization = (info) => {

	console.log(info);

	const changeOrganizationScreen = useCallback((screenType) => {
		info._setOrganizationScreen(screenType);
	}, [info.route.params.screenType]);
	const count = useSelector((store) => store.count.count);
	const [sdata, setSdata] = useState({});
	// useEffect(() => {
	// 	storage
	// 	.load({
	// 	  key: 'latinApp',
	// 	  autoSync: true,
	// 	  syncInBackground: true,
	// 	  syncParams: {
	// 		extraFetchOptions: {
	// 		},
	// 		someFlag: true
	// 	  }
	// 	})
	// 	.then(ret => {
	// 		setSdata(ret);
	// 	})
	// 	.catch(err => {
	// 	  console.warn(err.message);
	// 	  switch (err.name) {
	// 		case 'NotFoundError':
	// 		  break;
	// 		case 'ExpiredError':
	// 		  break;
	// 	  }
	// 	});
	// }, [sdata]);


	const getSelectedLine = () => {
		let result = undefined;
		if((info.route.params.source == "Organizations" || info.route.params.source == "Learns") && (count.lines.organizations[info.route.params.orgNid].lines.length > 0))
			result = count.lines.organizations[info.route.params.orgNid].lines[0].nid;
		if(info.route.params.source == "Lines" && info.route.params.selectedLine != undefined)
			result = info.route.params.selectedLine;
		return result;
	}

	const getSelectedLearn = () => {
		let result = undefined;
		if(info.route.params.source == "Organizations" && count.lines.organizations[info.route.params.orgNid].learn.length > 0)
			result = count.lines.organizations[info.route.params.orgNid].learn[0].nid;
		if(info.route.params.source == "Learns" && info.route.params.selectedLearn != undefined)
			result = info.route.params.selectedLearn;
		return result;
	}

	
    const [selectedLine, setSelectedLine] = useState(getSelectedLine());    
	const [selectedLearn, setSelectedLearn] = useState(getSelectedLearn());  

	const setSelectedMenuItem = (name) => {
		setMenu(menu.map(artwork => {
			if (artwork.name === name) {
				return { ...artwork, active: true };
			} else {
				return { ...artwork, active: false };
			}
		}));
	}
	const menuOn = (type) => {
		return menu.filter(item => item.name == type && item.active).length > 0;
	}

	let setMenuItems = () => {
		let menu = [
			{name: "info", title: count.lines.global_metadata.labels[count.lng][1], active: info.route.params.screenType == "info"}
		];
		if(count.lines.organizations[info.route.params.orgNid].lines.length > 0){
			menu.push({name: "lines", title: count.lines.global_metadata.labels[count.lng][2], active: info.route.params.screenType == "lines"});
		}
		if(count.lines.organizations[info.route.params.orgNid].events != undefined){
			menu.push({name: "events", title:count.lines.global_metadata.labels[count.lng][2], active: info.route.params.screenType == "events"});
		}
		if(count.lines.organizations[info.route.params.orgNid].learn.length > 0){
			menu.push({name: "learns", title: count.lines.global_metadata.labels[count.lng][11], active: info.route.params.screenType == "learns"});
		}
		return menu;
	}
	const [menu, setMenu] = useState(setMenuItems());

	return(
		<LinearGradient style={styles.container}
            colors={['#FFF', '#FFF', '#efdbf7']}
        >
			<OrganizationBox style={{flex:1}} organization={count.lines.organizations[info.route.params.orgNid]}></OrganizationBox>
			<View style={styles.organizationMenu}>
			{menu.map((prop, key) => {
			return (
				<View key={"menu"+key}>
					<Pressable style={
						{
							flexDirection:"column",
							color:"#FFF",
							justifyContent:"center",
							width:width / menu.length,
							backgroundColor: prop.active ? "#474747" : "#bbacc1",
							height:30
						}
					}
					onPress={() => { setSelectedMenuItem(prop.name)}}>
						<Text style={{
								color:prop.active ? "#ff99d9" : "#000",
								textAlign:"center"
							}}>{prop.title}</Text>
					</Pressable>
				</View>
			);
			})}
			</View>
			<View style={[styles.subContainer, {flex:1}]}>
				<View>
					{menuOn("info") &&
						<View>
							<SliderX gallery={count.lines.organizations[info.route.params.orgNid].gallery}></SliderX>

							<View style={[styles.danceFloorsAndServices, {
								flexDirection: count.lng == "en" ? "row" :"row-reverse",
								
							}]}>
								<LinearGradient style={styles.danceServices}
									colors={['#FFF','#efdbf7']}
								>
									<View style={styles.centerBox}>
										<DanceServices danceServices={count.lines.organizations[info.route.params.orgNid].dance_services}></DanceServices>
									</View>
								</LinearGradient>

								<LinearGradient style={styles.danceFloors}
									colors={['#FFF','#efdbf7']}
								>
									<View style={styles.centerBox}>
										<DanceFloors danceServices={count.lines.organizations[info.route.params.orgNid].dance_floors}></DanceFloors>
									</View>
								</LinearGradient>
								<LinearGradient style={styles.globalServices}
									colors={['#FFF','#efdbf7']}
								>
									
									<View style={styles.centerBox}>
										<ServicesX services={count.lines.organizations[info.route.params.orgNid].global_services}></ServicesX>
									</View>
								</LinearGradient>
							</View>
						</View>
					}
					{(menuOn("lines")) && 
						<OrganizationLines
							_selectedLine={selectedLine}
							_setSelectedLine={setSelectedLine}
							organizationLines={{organizationLines:count.lines.organizations[info.route.params.orgNid].lines,
							selectedNid: info.route.params.screenType == "line" ? info.route.params.selectedNid : 0}}
						></OrganizationLines>
					}
					{/* {menuOn("events") &&
						<OrganizationEvents organizationEvents={{organizationEvents:organization.events, selectedNid: info.route.params.screenType == "event" ? info.route.params.selectedNid : 0}}></OrganizationEvents>
					} */}

					{menuOn("learns") &&
					<OrganizationStudies
						_selectedLearn={selectedLearn}
						_setSelectedLearn={setSelectedLearn}
						_organizationLearn={count.lines.organizations[info.route.params.orgNid].learn}
						>
						</OrganizationStudies>
					}

				</View>
			</View>
			<ContactInfo organization={count.lines.organizations[info.route.params.orgNid]}></ContactInfo>
		</LinearGradient>
	);
}
export default Organization;
const styles = StyleSheet.create({
	container:{
		flex:1
	},
	centerBox:{
		alignSelf: "baseline"
	},
	danceServices:{
		width:100,
		justifyContent:"center",
		height:height-110-100-30-(Math.round(height/3))-50-72,
	},
	danceFloors:{
		width:120,
		backgroundColor:"#efdbf7",
		justifyContent:"center",
		height:height-110-100-30-(Math.round(height/3))-50-72,
	},
	globalServices:{
		width:width-220,
		backgroundColor:"#efdbf7",
		justifyContent:"center",
		height:height-110-100-30-(Math.round(height/3))-50-72,

	},
	fullInfoBox:{
		paddingLeft:10,
		paddingRight:10
	},
	otherOrganizationsLabel:{
		padding:10
	},
	logoImage:{
		width:logoWidth,
		height:logoWidth
	},
	contentContainer:{
		
	},
	menuItem:{
		flexDirection:"column",
		justifyContent:"center",
		width:"50%"
	},
	menuItemText:{
		color:"#FFF",
		textAlign:"center"
	},
	organizationMenu:{
		flexDirection: 'row',
		height:30
	},
	DanceServicesAndDanceFloors:{
		flexDirection:"row"
	},
	otherOrganizationsLabelText:{
		fontSize:20
	}
});