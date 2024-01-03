import {Image,StyleSheet,Text,View,Dimensions,Animated,Easing,ImageBackground,TouchableOpacity,I18nManager,ScrollView, SafeAreaView, StatusBar} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import OrganizationBox from '../organizationBox/organizationBox.js';
import DanceServices from '../DanceServices/DanceServices';
import DanceFloors from '../DanceFloors/DanceFloors.js';
import SliderX from '../SliderX/SliderX.js';
import OrganizationLines from '../OrganizationLines/OrganizationLines.js';
import Services from '../Services/Services.js';
import ContactInfo from '../ContactInfo/ContactInfo.js';
import storage from '../../storage/storage';
import OrganizationEvents from '../OrganizationEvents/OrganizationEvents.js';
import RenderHtml from 'react-native-render-html';
import { setRowType, getSelectedLang, setTextDirection, setArray, nice_list_text} from '../../tools/tools';
import { useSelector, useDispatch } from 'react-redux';
import OrganizationStudies from '../OrganizationStudies/OrganizationStudies.js';

const {width, height} = Dimensions.get('screen');
const logoWidth = width/5;
const textWidth = width - logoWidth;
const setText = (text) => {
	return {html:text}
}

const Organization = (info) => {
	const renderersProps = {
		ul: {
		  enableExperimentalRtl: true
		}
	  };

    const lng = getSelectedLang();
	const count = useSelector((store) => store.count.count);
	const dir = setTextDirection(count.general.lng);
	const [sdata, setSdata] = useState({});
	useEffect(() => {
		storage
		.load({
		  key: 'latinApp',
		  autoSync: true,
		  syncInBackground: true,
		  syncParams: {
			extraFetchOptions: {
			},
			someFlag: true
		  }
		})
		.then(ret => {
			setSdata(ret);
		})
		.catch(err => {
		  console.warn(err.message);
		  switch (err.name) {
			case 'NotFoundError':
			  break;
			case 'ExpiredError':
			  break;
		  }
		});
	}, [sdata]);
	let url = 'https://latinet.co.il/'+sdata.lng+'/organization_mobile/'+info.route.params.nid;
	const [organization, setOrganization] = useState({});
	const [danceServicesList, setDanceServices] = useState([]);
	const [servicesList, setServicesList] = useState([]);
	const [danceFloors, setDanceFloors] = useState([]);
	const [gallery, setGallery] = useState([]);
	const [organizationLines, setOrganizationLines] = useState([]);
	const [organizationEvents, setOrganizationEvents] = useState([]);
	const [organizationStudies, setOrganizationStudies] = useState([]);
	

	const [menu, setMenu] = useState([]);
	const [logo, setLogoUrl] = useState("");
	const setLogo = (value) => {
		return "https://latinet.co.il/"+value;
	}
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
		fetch(url)
		.then((res) => res.json())
		.then((data) => {
			setOrganization(data.data);
			setDanceServices(data.data.dance_services);
			setDanceFloors(data.data.dance_floors);
			setGallery(data.data.gallery);
			if(data.data.lines != undefined){
				setOrganizationLines(data.data.lines);
			}
			if(data.data.events != undefined){
				setOrganizationEvents(data.data.events);
			}

			if(data.data.org_courses != undefined){
				setOrganizationStudies(data.data.org_courses);
			}

			setServicesList(data.data.services);
			let menu = [
				{name: "info", title: data.data.labels[0], active: info.route.params.type == "global" ? true : false}
			];
			if(data.data.lines != undefined){
				menu.push({name: "lines", title: data.data.labels[1], active: info.route.params.type == "line" ? info.route.params.selectedNid : 0});
			}
			if(data.data.events != undefined){
				menu.push({name: "events", title: data.data.labels[2], active: info.route.params.type == "event" ? info.route.params.selectedNid : 0});
			}
			if(data.data.org_courses != undefined){
				menu.push({name: "studies", title: data.data.labels[3], active: info.route.params.type == "studie" ? info.route.params.selectedNid : 0});
			}

			

			setMenu(menu);
		});
	}, [sdata]);
	return(
		<View style={styles.container}>
			<OrganizationBox organization={organization}></OrganizationBox>
			<View style={styles.organizationMenu}>
			{menu.map((prop, key) => {
			return (
				<TouchableOpacity key={key} style={
					StyleSheet.create({
						flexDirection:"column",
						color:prop.active ? "#000" : "#FFF",
						justifyContent:"center",
						width:width / menu.length,
						backgroundColor: prop.active ? "#000" : "#FFF",
						height:30
					})
				} onPress={() => setSelectedMenuItem(prop.name)}>
					<Text style={{
							color:prop.active ? "#FFF" : "#000",
							textAlign:"center"
						}}>{prop.title}</Text>
				</TouchableOpacity>
			);
			})}
			</View>
			<View style={styles.subContainer}>
				<ScrollView
					style={styles.scrollView} 
					contentContainerStyle={styles.contentContainer}>
					<View>
						{menuOn("info") &&
							<View>
								<SliderX gallery={gallery}></SliderX>
								<View style={styles.DanceServicesAndDanceFloors}>
									<DanceServices danceServices={danceServicesList}></DanceServices>
									<DanceFloors danceFloors={danceFloors}></DanceFloors>
								</View>
								<View>
									<Services services={servicesList}></Services>
								</View>
								<View style={styles.fullInfoBox}>
									<RenderHtml
										contentWidth={width}
										source={setText(organization.text)}
										enableExperimentalMarginCollapsing={true}
										tagsStyles={{
											li:{
												paddingLeft:5,
												textAlign:dir,
												direction:"ltr",
											},
											ul:{
												direction:"ltr",
												alignContent:"flex-end"
											}
										}}
										renderersProps={renderersProps}
										style={{backgroundColor:"none"}}
									/>
								</View>
							</View>
						}
						{menuOn("lines") &&
							<OrganizationLines organizationLines={{organizationLines, labels:organization.labels, selectedNid: info.route.params.type == "line" ? info.route.params.selectedNid : 0}}></OrganizationLines>
						}
						{menuOn("events") &&
							<OrganizationEvents organizationEvents={{organizationEvents, labels:organization.labels, selectedNid: info.route.params.type == "event" ? info.route.params.selectedNid : 0}}></OrganizationEvents>
						}
						{menuOn("studies") &&
							<OrganizationStudies organizationStudies={{organizationStudies, labels:organization.labels, selectedNid: info.route.params.type == "studie" ? info.route.params.selectedNid : 0}}></OrganizationStudies>
						}

					</View>
				</ScrollView>
			</View>
		</View>
	);
}
export default Organization;
const styles = StyleSheet.create({
	fullInfoBox:{
		paddingLeft:10,
		paddingRight:10
	},
	container:{
		flex: 1,
	},
	contentContainer:{
		paddingBottom: 100
	},
	subContainer:{
		height:500,
		flex: 1,
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
		width:"100%",
		backgroundColor:"#000"
	},
	DanceServicesAndDanceFloors:{
		flexDirection: 'row',
	}
});