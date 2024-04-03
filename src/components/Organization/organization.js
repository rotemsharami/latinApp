import {Image,StyleSheet,Text,View,Dimensions,Animated,Easing,ImageBackground,TouchableOpacity,I18nManager,ScrollView, SafeAreaView, StatusBar} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import OrganizationBox from '../organizationBox/organizationBox.js';
import OrganizationBoxLink from '../OrganizationBoxLink/OrganizationBoxLink.js';
import DanceServices from '../DanceServices/DanceServices';
import DanceFloors from '../DanceFloors/DanceFloors.js';
import SliderX from '../SliderX/SliderX.js';
import OrganizationLines from '../OrganizationLines/OrganizationLines.js';
import ServicesX from '../ServicesX/ServicesX.js';
import Location from '../Location/Location';
import ContactInfo from '../ContactInfo/ContactInfo.js';
import storage from '../../storage/storage';
import OrganizationEvents from '../OrganizationEvents/OrganizationEvents.js';
import RenderHtml from 'react-native-render-html';
import { setRowType, getSelectedLang, setTextDirection, setArray, nice_list_text} from '../../tools/tools';
import { useSelector, useDispatch } from 'react-redux';
import OrganizationStudies from '../OrganizationStudies/OrganizationStudies.js';

const {width, height} = Dimensions.get('screen');
const logoWidth = 70;
const textWidth = 70 - logoWidth;
const setText = (text) => {
	return {html:text}
}

const Organization = (info) => {
    const scrollRef = useRef();
	const [organizationNid, setOrganizationNid] = useState(info.route.params.nid);
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
	
	const [organization, setOrganization] = useState({});
	const [menu, setMenu] = useState([]);
	const [organizationLinesData, setOrganizationLinesData] = useState([]);

    const [selectedLine, setSelectedLine] = useState();    


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
		let url = 'https://latinet.co.il/'+lng+'/organization_mobile/'+organizationNid;
		fetch(url)
		.then((res) => res.json())
		.then((data) => {
			setOrganization(data.data);
			//organizationLines:organization.lines
			setOrganizationLinesData(data.data.lines);
			console.log(setArray(data.data.lines)[0].nid);
			setSelectedLine(setArray(data.data.lines)[0].nid);

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
			scrollRef.current?.scrollTo({
				y: 0,
				animated: true,
			});
		});
	}, [organizationNid]);

	return(
		<View style={styles.container}>
			<OrganizationBox organization={organization}></OrganizationBox>
			<View style={styles.organizationMenu}>
			{menu.map((prop, key) => {
			return (
				<View key={"menu"+key}>
					<TouchableOpacity style={
						{
							flexDirection:"column",
							color:prop.active ? "#730874" : "#FFF",
							justifyContent:"center",
							width:width / menu.length,
							backgroundColor: prop.active ? "#730874" : "#FFF",
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
								color:prop.active ? "#FFF" : "#730874",
								textAlign:"center"
							}}>{prop.title}</Text>
					</TouchableOpacity>
				</View>
			);
			})}
			</View>
			<View style={styles.subContainer}>
				<ScrollView
					ref={scrollRef}
					style={styles.scrollView} 
					contentContainerStyle={styles.contentContainer}>
					<View>
						{menuOn("info") &&
							<View>
								<SliderX gallery={organization.gallery}></SliderX>




								<View style={styles.danceFloorsAndServices}>
									<View style={styles.danceFloors}>
										<DanceFloors danceServices={organization.dance_floors}></DanceFloors>
									</View>
									<View style={styles.services}>
										<DanceServices danceServices={organization.dance_floors}></DanceServices>
									</View>
								</View>



								<ServicesX services={organization.services}></ServicesX>
								<Location organization={organization}></Location>



							</View>
						}
						{(menuOn("lines") && organizationLinesData != undefined) && 
							<OrganizationLines _selectedLine={selectedLine} _setSelectedLine={setSelectedLine} organizationLines={{organizationLines:organizationLinesData, labels:organization.labels, selectedNid: info.route.params.type == "line" ? info.route.params.selectedNid : 0}}></OrganizationLines>
						}
						{menuOn("events") &&
							<OrganizationEvents organizationEvents={{organizationEvents:organization.events, labels:organization.labels, selectedNid: info.route.params.type == "event" ? info.route.params.selectedNid : 0}}></OrganizationEvents>
						}
						{menuOn("studies") &&
							<OrganizationStudies organizationStudies={{organizationStudies: organization.org_courses, labels:organization.labels, selectedNid: info.route.params.type == "studie" ? info.route.params.selectedNid : 0}}></OrganizationStudies>
						}



						</View>
						<View style={styles.ContactInfoFooter}>
							{Object.keys(organization).length > 0 &&  
								<ContactInfo organization={organization}></ContactInfo>
							}
						</View>
							{organization.other_organizations != undefined &&
								<View style={styles.otherOrganizations}>
									{/* <Text>{JSON.stringify(organization.other_organizations, null, 2)}</Text> */}
									<View style={styles.otherOrganizationsLabel}>
										<Text style={styles.otherOrganizationsLabelText}>{organization.labels[10]}</Text>
									</View>
									{organization.other_organizations.map((item, key) => {
										return (
											<OrganizationBoxLink _setOrganizationNid={setOrganizationNid} organization={item} key={"org-"+key}></OrganizationBoxLink>
										);
									})}
								</View>
							}
				</ScrollView>
			</View>
		</View>
	);
}
export default Organization;
const styles = StyleSheet.create({

	danceFloorsAndServices:{
		flexDirection:"row"
	},
	danceFloors:{
		flexDirection:"column"
	},
	services:{
		flexDirection:"column"
	},


	fullInfoBox:{
		paddingLeft:10,
		paddingRight:10
	},
	otherOrganizationsLabel:{
		padding:10
	},
	container:{
		flex: 1,
	},
	logoImage:{
		width:logoWidth,
		height:logoWidth
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
		backgroundColor:"#730874"
	},
	DanceServicesAndDanceFloors:{
		flexDirection:"row"
	},
	ContactInfoFooter:{
		
	},
	otherOrganizationsLabelText:{
		fontSize:20
	}
});