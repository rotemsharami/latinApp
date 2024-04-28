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


	const changeOrganizationScreen = useCallback((screenType) => {
		info._setOrganizationScreen(screenType);
	}, [info._organizationScreen]);
    const scrollRef = useRef();
	const [organizationNid, setOrganizationNid] = useState(info._organizationNid);
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
	
	const [organization, setOrganization] = useState({});
	const [menu, setMenu] = useState([]);
	const [organizationLinesData, setOrganizationLinesData] = useState([]);
    const [selectedLine, setSelectedLine] = useState(null);    

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

	useEffect(() => {

		
			setOrganization(count.lines.organizations[info._organizationNid]);
			setOrganizationLinesData(count.lines.organizations[info._organizationNid]);

			//console.log(count.lines.organizations[info._organizationNid].lines);

			setSelectedLine(count.lines.organizations[info._organizationNid].lines.length > 0 ? count.lines.organizations[info._organizationNid].lines[0].nid : null);
			
			let menu = [
				{name: "info", title: count.lines.global_metadata.labels[count.lng][1], active: info._organizationScreen == "info"}
			];
			if(count.lines.organizations[info._organizationNid].lines != undefined){
				menu.push({name: "lines", title: count.lines.global_metadata.labels[count.lng][2], active: info._organizationScreen == "lines"});
			}
			if(count.lines.organizations[info._organizationNid].events != undefined){
				menu.push({name: "events", title:count.lines.global_metadata.labels[count.lng][2], active: info._organizationScreen == "events"});
			}
			if(count.lines.organizations[info._organizationNid].studies != undefined){
				menu.push({name: "studies", title: count.lines.global_metadata.labels[count.lng][2], active: info._organizationScreen == "studies"});
			}
			setMenu(menu);
			scrollRef.current?.scrollTo({
				y: 0,
				animated: true,
			});
		
	}, [organizationNid, count.lng]);

	return(
		

		<LinearGradient style={styles.container}
            colors={['#FFF', '#FFF', '#efdbf7']}
        >

			<OrganizationBox organization={count.lines.organizations[info._organizationNid]}></OrganizationBox>
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
					onPress={() => {
						scrollRef.current?.scrollTo({
							y: 0,
							animated: true,
						});
						setSelectedMenuItem(prop.name)
						}}>
						<Text style={{
								color:prop.active ? "#ff99d9" : "#000",
								textAlign:"center"
							}}>{prop.title}</Text>
					</Pressable>
				</View>
			);
			})}
			</View>
			<View style={styles.subContainer}>
				<View>
					{menuOn("info") &&
						<View>
							<SliderX gallery={organization.gallery}></SliderX>

							<View style={[styles.danceFloorsAndServices, {
								flexDirection: count.lng == "en" ? "row" :"row-reverse",
								
							}]}>

								<LinearGradient style={styles.danceServices}
									colors={['#FFF','#efdbf7']}
								>

									<View style={styles.centerBox}>
										<DanceServices danceServices={count.lines.organizations[info._organizationNid].dance_services}></DanceServices>
									</View>
								</LinearGradient>

								<LinearGradient style={styles.danceFloors}
									colors={['#FFF','#efdbf7']}
								>
									<View style={styles.centerBox}>
										<DanceFloors danceServices={count.lines.organizations[info._organizationNid].dance_floors}></DanceFloors>
									</View>
								</LinearGradient>


								<LinearGradient style={styles.globalServices}
									colors={['#FFF','#efdbf7']}
								>
									
									<View style={styles.centerBox}>
										<ServicesX services={count.lines.organizations[info._organizationNid].global_services}></ServicesX>
									</View>
								</LinearGradient>
							</View>
						</View>
					}
					{(menuOn("lines") && selectedLine != null) && 
						<OrganizationLines
							_selectedLine={selectedLine}
							_setSelectedLine={setSelectedLine}
							organizationLines={{organizationLines:count.lines.organizations[info._organizationNid].lines,
							selectedNid: info._organizationScreen == "line" ? info.route.params.selectedNid : 0}}
						></OrganizationLines>
					}
					{/* {menuOn("events") &&
						<OrganizationEvents organizationEvents={{organizationEvents:organization.events, selectedNid: info._organizationScreen == "event" ? info.route.params.selectedNid : 0}}></OrganizationEvents>
					} */}
					{/* {menuOn("studies") &&
						<OrganizationStudies organizationStudies={{organizationStudies: organization.org_courses, selectedNid: info._organizationScreen == "studie" ? info.route.params.selectedNid : 0}}></OrganizationStudies>
					} */}
				</View>
			</View>
			<ContactInfo organization={count.lines.organizations[info._organizationNid]}></ContactInfo>
		</LinearGradient>
	);
}
export default Organization;
const styles = StyleSheet.create({
	container:{
		
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