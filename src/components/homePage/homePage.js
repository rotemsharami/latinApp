import React, {useRef, useState, useEffect} from 'react';
import { View, Text, ScrollView, I18nManager, SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import Slider from '../Slider/Slider';
import TodaysLines from '../TodaysLines/TodaysLines';
import {setArray} from "../../tools/tools.js";
import EventsList from '../EventsList/EventsList';
import { useSelector, useDispatch } from 'react-redux';
import SliderZ from '../SliderZ/SliderZ';
import EventsCalender from '../EventsCalender/EventsCalender';





const HomePage = (info) => {


	const count = useSelector((store) => store.count.count);


	const [events, setEvents] = useState([]);
	const [organizationsCarusel, setOrganizationsCarusel] = useState({});
	
	
	//const lng = "en";
	

	

	useEffect(() => {
			let url = 'https://latinet.co.il/'+count.lng+'/general_data/';
			fetch(url)
			.then((res) => res.json())
			.then((data) => {
				setOrganizationsCarusel(data.data);
			});
		
	}, [count.lng]);
	return(
		<View style={styles.container}>
			<ScrollView
				horizontal={false}
				contentContainerStyle={styles.SVContainer}
			>
				{/* {organizationsCarusel != undefined &&
					<Slider organizationsCarusel={setArray(organizationsCarusel.organizations_carusel)}></Slider>
				} */}
				<TodaysLines todaysLinesData={{lines:setArray(organizationsCarusel.todays_lines), labels: setArray(organizationsCarusel.labels)}}></TodaysLines>

				<EventsCalender></EventsCalender>


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