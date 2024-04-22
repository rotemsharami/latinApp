import {Image,StyleSheet,Text,View,Dimensions,Animated,Easing,ImageBackground,TouchableOpacity,I18nManager,ScrollView, SafeAreaView, StatusBar} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import moment from 'moment';
import { setRowType, getSelectedLang, setTextDirection, setArray, nice_list_text, getTranslationString, getTranslationMonth} from '../../tools/tools';
import { useSelector, useDispatch } from 'react-redux';
import OrganizationStudies from '../OrganizationStudies/OrganizationStudies';
import AllEventsList from '../AllEventsList/AllEventsList';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {navigate} from "../../../RootNavigation";
import {LinearGradient} from 'expo-linear-gradient';

const {width, height} = Dimensions.get('screen');
const logoWidth = width/5;
const textWidth = width - logoWidth;

const EventsCalender = () => {
	const count = useSelector((store) => store.count.count);
	const dir = setTextDirection(count.lng);
	const [lines, setLines] = useState(undefined);
	const [weeklyData, setWeeklyData] = useState([]);
	const [selectedDanceFloors, setSelectedDanceFloors] = useState([]);
	const [selectedAreas, setSelectedAreas] = useState([]);
	const [selectedDay, setSelectedDay] = useState("0");
	const [selectedMonth, setSelectedMonth] = useState(moment().format("MM"));
	const [selectedDisplay, setSelectedDisplay] = useState("Calender");

	const scaleAnim = useRef(new Animated.Value(0)).current;

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

	let getSelectedMonth = async (index) => {
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

	function changeMonth(type) {
		let currentMonth = moment(moment().year()+"-"+selectedMonth+"-02");
		let _currentMonth =  type == 1 ? currentMonth.add(1, 'months').format("MM") : currentMonth.subtract(1, 'months').format("MM");
		setSelectedMonth(_currentMonth);
	}


	

    const set_zero = (num)=> {
        return num < 10 ? "0"+num : num;
    }


    const getWeekly = () => {


		let date_obj = moment();

		

		date_obj = moment(date_obj.year()+"-"+selectedMonth+"-01");

		//console.log(stringTodayDate);

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

	let getDayEventsState = (events) => {
		let result = false;
		if(events != undefined){
			if(events.length > 0){
				if(events[0] != undefined){
					if(events[0].general_image != undefined){
						result = true;
					}
				}
			}
		}
		return result;
	}


	useEffect(() => {
		setLines(undefined);
	}, [count.lng]);

	useEffect(() => {
		//let url = 'https://latinet.co.il/'+count.lng+'/events_data/';
		if(lines === undefined){
			// fetch(url)
			// .then((res) => res.json())
			// .then((data) => {
			// 	setLines(pre => data.data);
			// });
			Animated.timing(
				scaleAnim,
			  {
				toValue: 1,
				duration: 180,
				easing: Easing.linear,
				useNativeDriver: true
			  }
			).start();
			setLines(pre => count.events);

		}
		if(lines != undefined){
			filterDayEvents().then(function(filterd) {
				setWeeklyData(pre => filterd);
			});
		}
	}, [lines]);

	useEffect(() => {
		if(weeklyData.length > 0){
			filterDayEvents().then(function(filterd) {
				setWeeklyData(pre => filterd);
			});
		}
	}, [selectedMonth]);


	




	  

	return(
		<View>
			{lines != undefined &&
			<Animated.View
			style={[styles.container,{
				transform: [{ scale: scaleAnim }],
				alignItems: 'center',
				justifyContent: 'center'
			}]}
			>

					<View style={[styles.calenderListSwitch, {
							flexDirection: count.lng == "en" ? "row" : "row-reverse",
							alignSelf: count.lng == "en" ? "flex-start" : "flex-end",
					}]}>

						<View style={[styles.calenderListSwitchButton,{backgroundColor: selectedDisplay == "Calender" ? "#730874" :"#FFF"}]}>
							<TouchableOpacity style={[styles.calenderListSwitchButtonTouch, {
								flexDirection: count.lng == "en" ? "row" : "row-reverse",
							}]} onPress={()=>setSelectedDisplay("Calender")}>
								<View style={styles.calenderListSwitchButtonIconBox}>
									<MaterialCommunityIcons name="calendar-blank" size={15} color={selectedDisplay == "Calender" ? "#FFF" :"#000"} />
								</View>
								<View style={styles.calenderListSwitchButtonText}>
									<Text style={[styles.calenderListSwitchButtonTextText, {
										color: selectedDisplay == "Calender" ? "#FFF" :"#000"
									}]}>{getTranslationString("Calender", count.lng)}</Text>
								</View>
							</TouchableOpacity>
						</View>
						<View style={[styles.calenderListSwitchButton,{backgroundColor: selectedDisplay == "List" ? "#730874" :"#FFF"}]}>
							<TouchableOpacity style={[styles.calenderListSwitchButtonTouch, {
								flexDirection: count.lng == "en" ? "row" : "row-reverse",
								
							}]} onPress={()=>setSelectedDisplay("List")}>
								<View style={styles.calenderListSwitchButtonIconBox}>
									<MaterialCommunityIcons name="view-list" size={15} color={selectedDisplay == "List" ? "#FFF" :"#000"} />
								</View>
								<View style={styles.calenderListSwitchButtonText}>
								<Text style={[styles.calenderListSwitchButtonTextText, {
										color: selectedDisplay == "List" ? "#FFF" :"#000"
									}]}>{getTranslationString("List", count.lng)}</Text>
								</View>
							</TouchableOpacity>
						</View>
					</View>



					<View style={styles.calenderSection}>

						<View style={styles.containerBox}>
							<View style={[styles.daysOfWeekContainer, {
								height:31
							}]}>
								<LinearGradient style={[styles.daysOfWeek, {
									
								}]}
								colors={['#a7a7a7','#888888','#a7a7a7']}
								>
									{Object.keys(lines.days_of_week).map((index) => {
										return(
											<View key={"dnacFloor-"+index} style={{
												flex:1,
												alignItems:"center",
												borderRightWidth:index == 6 ? 0 : 1,
												paddingBottom:5,
												paddingTop:5,
												borderBottomWidth:1,
											}}>
												<TouchableOpacity onPress={() => changeDanceFloor(index)}>
													<Text
														style={{
															color: "#FFF",
														}}
													>{lines.days_of_week_short[index]}</Text>
												</TouchableOpacity>
											</View>
										);
									})}
								</LinearGradient>
							</View>
						
							{weeklyData != undefined && 
								<LinearGradient
									style={styles.daysOfWeekContainer}
									resizeMode="cover"
									colors={['#FFF','#f3c6ff','#efd7ff']}
								>
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
																	resizeMode: 'cover',
																	justifyContent: 'center',
																	alignItems: 'center',
																	borderRightWidth:dayIndex == 6 ? 0 : 1,
																	height:(height-340) / 5,
																	height:60
																	
																}}
															>

																{getDayEventsState(weeklyData[weekIndex][dayIndex].events) &&
																	<TouchableOpacity
																		onPress={() => {
																			navigate("DayEvents", {events:weeklyData[weekIndex][dayIndex].events, date:weeklyData[weekIndex][dayIndex].date});
																		}}
																	>
																		<View style={[styles.dayDate, {
																			backgroundColor:"#000",
																			borderRadius:100,
																			width:40,
																			height:40,
																			alignContent:"center",
																			justifyContent:"center"
																		}]}>
																			{weeklyData[weekIndex][dayIndex].day_of_month != undefined && 
																				<Text style={{
																					color:"#FFF",
																					alignSelf:"center",
																					fontSize:15
																				}}>{weeklyData[weekIndex][dayIndex].day_of_month}</Text>
																			}
																		</View>
																		</TouchableOpacity>
																	}

																{getDayEventsState(weeklyData[weekIndex][dayIndex].events) == false &&
																	<View style={[styles.dayDate, {
																		borderRadius:100,
																		width:30,
																		height:30,
																		alignContent:"center",
																		justifyContent:"center"
																	}]}>
																		{weeklyData[weekIndex][dayIndex].day_of_month != undefined && 
																			<Text style={{
																				color: weeklyData[weekIndex][dayIndex].today ? "#000" : "#999",
																				alignSelf:"center",
																				fontSize:15
																			}}>{weeklyData[weekIndex][dayIndex].day_of_month}</Text>
																		}
																	</View>
																}
															</View>
														);

													})}
												</View>
											</View>
										);
									})}
								</LinearGradient>
							}
						</View>
					</View>
					

					
					<View style={[styles.calenderButtonsAndMonth, {
						flexDirection: count.lng == "en" ? "row" : "row-reverse",
					}]}>
						<View style={[styles.calenderButton, {
							flexDirection: count.lng == "en" ? "column" : "column-reverse",
						}]}>
							<TouchableOpacity onPress={()=>changeMonth(1)}>
								<View style={styles.iconBox}>
									<MaterialCommunityIcons name={count.lng == "en" ? "arrow-left-bold-circle" : "arrow-right-bold-circle"} size={30} color="#000" />
								</View>
							</TouchableOpacity>
						</View>
						<View style={styles.calenderMonth}>
							<Text style={styles.calenderMonthText}>{lines.months[moment(moment().year()+"-"+selectedMonth+"-01").month()]}</Text>
						</View>
						<View style={[styles.calenderButton, {
							flexDirection: count.lng == "en" ? "column" : "column-reverse",
						}]}>
							<TouchableOpacity onPress={()=>changeMonth(0)}>
							<View style={styles.iconBox}>
								<MaterialCommunityIcons name={count.lng == "en" ? "arrow-right-bold-circle" : "arrow-left-bold-circle"} size={30} color="#000" />
							</View>
							</TouchableOpacity>
						</View>
					</View>
					
				</Animated.View>
			}
		</View>
	);
}
export default EventsCalender;
const styles = StyleSheet.create({
	eventlogoImage:{
		width:"100%",
		height:"100%",

	},
	eventlogo:{

	},
	calenderListSwitchButtonTouch:{
		padding:3
	},
	calenderSection:{
		width:width,
		backgroundColor:"#999",
		height:height-300,
		alignItems:"center"
	},
	calenderListSwitchButtonIconBox:{
		paddingTop:3
	},

	calenderListSwitchButton:{
		
	},
	calenderListSwitch:{
		borderWidth:1,
		margin:10
	},
	calenderButtonsAndMonth:{
		backgroundColor:"#474747",
		height:70,
		alignItems:"center"
		
		
	},
	calenderMonthText:{
		fontSize:26,
		color:"#FFF"
	},
	calenderMonth:{
		width: width - (2 * 40) - 20,
		alignItems:"center"
	},
	calenderButton:{
		width:40,
		alignItems:"center"
	},
	container:{
	},
	containerBox:{
		borderRightWidth:1,
		borderLeftWidth:1,
		borderColor:"#000",
		width:width-2,
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