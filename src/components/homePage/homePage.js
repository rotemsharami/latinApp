import React, {useRef, useState, useEffect} from 'react';
import { View, Text, ScrollView, I18nManager, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import Slider from '../Slider/Slider';
import TodaysLines from '../TodaysLines/TodaysLines';
import {setArray, getSelectedLang} from "../../tools/tools.js";
import EventsList from '../EventsList/EventsList';
import { useSelector, useDispatch } from 'react-redux';

const lng = getSelectedLang();



const HomePage = (info) => {

	

	const [todaysLinesData, setTodaysLinesData] = useState([]);
	const [events, setEvents] = useState([]);
	const count = useSelector((store) => store.count.count);
	const [organizationsCarusel, setOrganizationsCarusel] = useState({});
	let url = 'https://latinet.co.il/'+count.general.lng+'/general_data/';
	const [organization, setOrganization] = useState({});
	useEffect(() => {
		fetch(url)
		.then((res) => res.json())
		.then((data) => {
			setOrganizationsCarusel(data.data);
		});
	}, []);
	return(
		<View style={styles.container}>
			<ScrollView
				contentContainerStyle={styles.SVContainer}
			>
				<Slider organizationsCarusel={setArray(organizationsCarusel.organizations_carusel)}></Slider>
				<TodaysLines todaysLinesData={{lines:setArray(organizationsCarusel.todays_lines), labels: setArray(organizationsCarusel.labels)}}></TodaysLines>
				{events.length > 0 && <EventsList events={{events, lng:sdata}}></EventsList>}
			</ScrollView>
		</View>
	);
}
const styles = StyleSheet.create({
	container:{
		flex:1
	},
	SVContainer:{
		paddingBottom: 78
	}
});
export default HomePage;