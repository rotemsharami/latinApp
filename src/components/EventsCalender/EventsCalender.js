import {Image,StyleSheet,Text,View,Dimensions,Animated,Easing,ImageBackground,TouchableOpacity,I18nManager,ScrollView, SafeAreaView, StatusBar} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import moment from 'moment';
import { setRowType, getSelectedLang, setTextDirection, setArray, nice_list_text} from '../../tools/tools';
import { useSelector, useDispatch } from 'react-redux';
import OrganizationStudies from '../OrganizationStudies/OrganizationStudies.js';
import DayLines from '../DayLines/DayLines.js';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {navigate} from "../../../RootNavigation";
const {width, height} = Dimensions.get('screen');
const logoWidth = width/5;
const textWidth = width - logoWidth;



const setText = (text) => {

	return {html:text}
}

const EventsCalender = () => {
    const lng = getSelectedLang();
	const count = useSelector((store) => store.count.count);
	const dir = setTextDirection(count.general.lng);
	const [lines, setLines] = useState(undefined);
	const [weeklyData, setWeeklyData] = useState([]);
	const [selectedDanceFloors, setSelectedDanceFloors] = useState([]);
	const [selectedAreas, setSelectedAreas] = useState([]);
	const [selectedDay, setSelectedDay] = useState("0");

	let getTagInfo = (tid, data) => {
		let result = "no";
		let filter = data.filter(item => item.tid == tid);
		if(filter.length > 0)
			result = filter[0].name;
		return result;
	}

	let getSelectedDanceFloor = async (index) => {
		let oldSelectedDanceFloors = selectedDanceFloors;
		if (oldSelectedDanceFloors.includes(index))
			oldSelectedDanceFloors = oldSelectedDanceFloors.filter(a => a !== index);
		else
			oldSelectedDanceFloors = [...oldSelectedDanceFloors, index];
		return oldSelectedDanceFloors;
	}

	let _getSelectedDanceFloor = async () => {
		let oldSelectedDanceFloors = selectedDanceFloors;
		return oldSelectedDanceFloors;
	}

	let getSelectedAreas = async (index) => {
		let oldSelectedAreas = selectedAreas;
		if (oldSelectedAreas.includes(index))
			oldSelectedAreas = oldSelectedAreas.filter(a => a !== index);
		else
			oldSelectedAreas = [...oldSelectedAreas, index];
		return oldSelectedAreas;
	}

	let getSelectedDay = async (index) => {
		return index;
	}

	let setFirstData = async (data) => {
		setLines(pre => data);
		return true;
	}

	function changeDanceFloor(index) {
		getSelectedDanceFloor(index).then(function(_selectedDanceFloor) {
			setSelectedDanceFloors(pre => _selectedDanceFloor);
		});
	}

	function changeAreas(area) {
		getSelectedAreas(area).then(function(_selectedAreas) {
			setSelectedAreas(pre=>_selectedAreas);
		});
	}

	function changeDay(day) {
		getSelectedDay(day).then(function(_selectedDay) {
			setSelectedDay(pre=>_selectedDay);
		});
	}



    const set_zero = (num)=> {
        return num < 10 ? "0"+num : num;
    }


    const getWeekly = () => {

		let date_obj = moment();

        const startOfMonth = date_obj.startOf('month').day();
        const endOfMonth = parseInt(date_obj.endOf('month').format('DD'));
        let endOfMonthAddition = 6 - date_obj.endOf('month').day();
        let week = [];
        let month = [];
        let i = 1 - startOfMonth;
        let day_index = 1;
        let all_days = endOfMonth+endOfMonthAddition;
        while(i <= all_days){
            let  day = {active:false};
            if(i >= 1 && i <= endOfMonth){
                
                let dayObject = moment(date_obj.year()+"-"+(date_obj.format("MM"))+"-"+set_zero(day_index), 'YYYY-MM-DD');
                day = {
                    active: true,
                    day_of_month: day_index,
                    date: moment(date_obj.year()+"-"+(date_obj.month()+1)+"-"+set_zero(day_index), 'YYYY-MM-DD'),
                    today: dayObject.isSame(moment(), 'day'),
                    vecationDay: dayObject.day() == 5 || dayObject.day() == 6,
                    events: []
                };
                day_index++;
            }
            week.push(day);
            if(week.length == 7){
                month.push(week);
                week = [];
            }
            i++;
        }
        return month;

    };



    let filterDayEvents = async() => {
		const newWeeklyData =  getWeekly();
		let filterdEvents = [];
        newWeeklyData.forEach((week, weekIndex) => {
			week.forEach((day, dayIndex) => {
				if(day.events != undefined){
					filterdEvents = lines.events.filter((event) => {
						let today = moment();
						let in_day = event.event_date == moment(day.date).format('YYYY-MM-DD');
						const formattedDate = moment(today).format('YYYY-MM-DD');
						let result = in_day;
						return result;
					});
					if(newWeeklyData[weekIndex][dayIndex].events != undefined){
						newWeeklyData[weekIndex][dayIndex].events = filterdEvents;
					}
				}
			});
        });
		
		
		return newWeeklyData;
    }

	useEffect(() => {
		setLines(undefined);
	}, [count.general.lng]);

	useEffect(() => {
		console.log(count.general.lng);
		let url = 'https://latinet.co.il/'+count.general.lng+'/events_data/';
		if(lines === undefined){
			fetch(url)
			.then((res) => res.json())
			.then((data) => {
				setLines(pre => data.data);
			});
		}
		if(lines != undefined){
			filterDayEvents().then(function(filterd) {
				setWeeklyData(pre => filterd);
			});
		}
	}, [count.general.lng, lines]);

	useEffect(() => {
		if(weeklyData.length > 0){
			filterDayEvents().then(function(filterd) {
				
				setWeeklyData(pre => filterd);
			});
		}
	}, [selectedAreas, selectedDanceFloors, selectedDay]);

	return(
		<View>
			{lines != undefined &&
				<View style={styles.container}>
					<View style={styles.containerBox}>
						<View style={styles.daysOfWeekContainer}>
							<View style={styles.daysOfWeek}>
								{Object.keys(lines.days_of_week).map((index) => {
									return(
										<View key={"dnacFloor-"+index} style={{
											flex:1,
											alignItems:"center",
											borderRightWidth:index == 6 ? 0 : 1,
											paddingBottom:5,
											paddingTop:5,
											borderBottomWidth:1
										}}>
											<TouchableOpacity onPress={() => changeDanceFloor(index)}>
												<Text
													style={{
														color: selectedDanceFloors.includes(index) ? "#FFF" : "#000",
													}}
												>{lines.days_of_week_short[index]}</Text>
											</TouchableOpacity>
										</View>
									);
								})}
							</View>
						</View>
					
						{weeklyData != undefined && 
							<View style={styles.daysOfWeekContainer}>
								{Object.keys(weeklyData).map((weekIndex) => {
									return(
										<View key={"week-"+weekIndex} style={{
											borderBottomWidth:1
										}}>
											<View style={styles.calenderWeekContainer}>
												{Object.keys(weeklyData[weekIndex]).map((dayIndex) => {
													return(
														<View
															key={"day-"+weekIndex+"-"+dayIndex}
															
															style={{
																flex:1,
																alignItems:"center",
																borderRightWidth:dayIndex == 6 ? 0 : 1,
																paddingBottom:5,
																paddingTop:5,
																backgroundColor:weeklyData[weekIndex][dayIndex].today ? "#ffbaff" : "#FFF"
															}}
>
															<TouchableOpacity
															onPress={() => {
																navigate("DayEvents", {events:weeklyData[weekIndex][dayIndex].events, date:weeklyData[weekIndex][dayIndex].date});
															}}
														

														>
															<View style={styles.dayEvents}>
																{weeklyData[weekIndex][dayIndex].events != undefined && 
									
																		<Text>{weeklyData[weekIndex][dayIndex].events.length > 0 ? "*" : " "}</Text>
																	
																}
																</View>
															<View style={styles.dayDate}>
																{weeklyData[weekIndex][dayIndex].day_of_month != undefined && 
																	<Text>{weeklyData[weekIndex][dayIndex].day_of_month}</Text>
																}
															</View>
															</TouchableOpacity>
															
														</View>
														
													);
												})}
											</View>
										</View>
									);
								})}
							</View>
						}
					</View>
				</View>

				

			}
		</View>
	);
}
export default EventsCalender;
const styles = StyleSheet.create({
	container:{
		padding:10
	},
	containerBox:{
		borderRightWidth:1,
		borderLeftWidth:1,
		borderColor:"#000"
	},
	daysOfWeek:{
		flexDirection:"row",
		alignContent:"space-around",
		alignSelf:"stretch",
		borderTopWidth:1,
		borderColor:"#000"
	},
	calenderWeekContainer:{
		flexDirection:'row'
	},
	calenderDay:{
		
	},
	dayEvents:{
		
	},
	dayDate:{
		
	},




});