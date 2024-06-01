import {Image,StyleSheet,Text,View,Dimensions,Animated,Easing,ImageBackground,TouchableOpacity,I18nManager,ScrollView, SafeAreaView, StatusBar} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import moment from 'moment';
import { setRowType, getSelectedLang, setTextDirection, setArray, nice_list_text, getTranslationString, getTranslationMonth, getPlayingHeight, filterDataItem} from '../../tools/tools';
import { useSelector, useDispatch } from 'react-redux';
import OrganizationStudies from '../OrganizationStudies/OrganizationStudies';
import AllEventsList from '../AllEventsList/AllEventsList';
import Filters from '../Filters/Filters';
import DayEvents from '../DayEvents/DayEvents';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {navigate} from "../../../RootNavigation";
import {LinearGradient} from 'expo-linear-gradient';
import {changeEventsSelectedFilters} from '../../actions/counterActions';

const {width, height} = Dimensions.get('screen');
const logoWidth = width/5;
const textWidth = width - logoWidth;

const EventsCalender = (navigateProps) => {
	const count = useSelector((store) => store.count.count);
	const dir = setTextDirection(count.lng);
	const [lines, setLines] = useState(undefined);
	const [events, setEvents] = useState(undefined);
	const [weeklyData, setWeeklyData] = useState([]);
	const [selectedDanceFloors, setSelectedDanceFloors] = useState([]);
	const [selectedAreas, setSelectedAreas] = useState([]);
	const [selectedDay, setSelectedDay] = useState("0");
	const [selectedMonth, setSelectedMonth] = useState(moment().format("MM"));
	const [selectedDisplay, setSelectedDisplay] = useState("Calender");
	const [showFilter, setShowFilter] = useState(false);
	const scaleAnim = useRef(new Animated.Value(0)).current;

	
	const dispatch = useDispatch();
	const _changeEventsSelectedFilters = (eventsSelectedFilters) => {
		dispatch(changeEventsSelectedFilters(eventsSelectedFilters));
	};



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
					//filterdEvents = count.lines.events.filter((event) => {
					if(events != undefined){
						filterdEvents = events.filter((event) => {
						
						let today = moment();
						let in_day = event.event_date == moment(day.date).format('YYYY-MM-DD');
						//let otherFilters = filterDataItem(event, count.eventsSelectedFilters);
						//let result = in_day && otherFilters;
						let result = in_day;

						return result;
						});
					}
					if(newWeeklyData[weekIndex][dayIndex].events != undefined){
						newWeeklyData[weekIndex][dayIndex].events = filterdEvents;
					}
				}
			});
        });
		return newWeeklyData;
    }

	let filterAll = async () => {
		let filterdEvents = count.lines.events.filter((event) => {
			return filterDataItem(event, count.eventsSelectedFilters);
		});
		return filterdEvents;
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
		if(events === undefined){
			Animated.timing(
				scaleAnim,
			  {
				toValue: 1,
				duration: 180,
				easing: Easing.linear,
				useNativeDriver: true
			  }
			).start();
			setEvents(pre => count.lines.events);

		}
		if(events != undefined){
			filterDayEvents().then(function(filterd) {
				setWeeklyData(pre => filterd);
			});
		}
	}, [events]);

	useEffect(() => {
		if(weeklyData.length > 0){
			filterDayEvents().then(function(filterd) {
				setWeeklyData(pre => filterd);
			});
		}
	}, [selectedMonth]);

	useEffect(() => {
		filterAll().then(function(all) {
			setEvents(pre => all);
			filterDayEvents().then(function(filterd) {
				setWeeklyData(pre => filterd);
			});
		});
		
	}, [count.eventsSelectedFilters]);




	
	
	let setFilterColor = () => {
		let result = false;
		if(Object.keys(count.eventsSelectedFilters).length > 0){
			Object.keys(count.eventsSelectedFilters).forEach(key => {
				if(count.eventsSelectedFilters[key].length > 0){
					result = true;
				}
			});
		}
		return result;
	}


	let setFiltersResults = () => {
		return events.length + " Items";
	}

	  

	return(
		<View>
			{events != undefined &&
			<Animated.View
			style={[styles.container,{
				transform: [{ scale: scaleAnim}],
				
			}]}
			>
					<View style={{
						paddingRight:10,
						paddingLeft:10,
						justifyContent:"space-between",
						height:40,
						backgroundColor:"#d3d3d3",
						borderTopColor:"#000",
						borderTopWidth:1,
						flexDirection: count.lng == "en" ? "row" : "row-reverse",
					}}>


						{showFilter &&
							<TouchableOpacity

								onPress={()=>{
									setSelectedDisplay("List");
									setShowFilter(false);
								}}

								style={[styles.calenderListSwitch, {
									flexDirection: count.lng == "en" ? "row" : "row-reverse",
									alignSelf:"center",
									
								}]}
							>
								<Text 
									style={{
										textDecorationLine:'underline'
									}}
								>{setFiltersResults()}</Text>
							</TouchableOpacity>
						}

						{!showFilter &&
						<View
							style={[styles.calenderListSwitch, {
								flexDirection: count.lng == "en" ? "row" : "row-reverse",
								alignSelf:"center",
								
							}]}
						>

							<View style={[styles.calenderListSwitchButton,{
								borderBottomWidth:2,
								borderColor: selectedDisplay == "Calender" ? "#545454" : "#d3d3d3"

								}]}>
								<TouchableOpacity style={[styles.calenderListSwitchButtonTouch, {
									flexDirection: count.lng == "en" ? "row" : "row-reverse",
								}]} onPress={()=>{
									setSelectedDisplay("Calender")
									}}>
									<View style={styles.calenderListSwitchButtonIconBox}>
										<MaterialCommunityIcons name="calendar-blank" size={15} color={"#545454"} />
									</View>
									<View style={styles.calenderListSwitchButtonText}>
										<Text style={[styles.calenderListSwitchButtonTextText, {
											color: "#545454",
										}]}>{getTranslationString("Calender", count.lng)}</Text>
									</View>
								</TouchableOpacity>
							</View>
							<View style={[styles.calenderListSwitchButton,{
								borderBottomWidth:2,
								borderBlockColor: selectedDisplay == "List" ? "#545454" : "#d3d3d3"


								}]}>
								<TouchableOpacity style={[styles.calenderListSwitchButtonTouch, {
									flexDirection: count.lng == "en" ? "row" : "row-reverse",
									
								}]} onPress={()=>setSelectedDisplay("List")}>
									<View style={styles.calenderListSwitchButtonIconBox}>
										<MaterialCommunityIcons name="view-list" size={15} color={"#545454"} />
									</View>
									<View style={styles.calenderListSwitchButtonText}>
									<Text style={[styles.calenderListSwitchButtonTextText, {
											color: "#545454"
										}]}>{getTranslationString("List", count.lng)}</Text>
									</View>
								</TouchableOpacity>
							</View>
						</View>
						}

						<View style={{
							flexDirection: count.lng == "en" ? "row" : "row-reverse",
							alignSelf:"center",
						}}>

							{setFilterColor() &&
							<TouchableOpacity
								onPress={() => {_changeEventsSelectedFilters({})}}
								

								style={{
									borderWidth:2,
									borderColor:"#730874",
									backgroundColor:"#730874",
									borderRadius:3,
									marginRight:3,
									marginLeft:3,
								}}
							>
								<MaterialCommunityIcons name="trash-can" size={18} color="#FFF" />
							</TouchableOpacity>
							}


							<TouchableOpacity
								onPress={() => {setShowFilter(showFilter ? false :true)}}
								style={{
									flexDirection: count.lng == "en" ? "row" : "row-reverse",
									height:24,
									paddingRight:4,
									paddingLeft:4,
									borderWidth:2,
									borderRadius:3,
									borderColor: showFilter ? (setFilterColor() ? "#730874" : "#545454")  :   (setFilterColor() ? "#730874" : "#545454"),
									backgroundColor: showFilter ? (setFilterColor() ? "#730874" : "#545454")  : "#d3d3d3"
							}}>
								<View  style={{
									paddingTop:2,
									paddingLeft:count.lng == "en" ? 0 : 2,
									paddingRight:count.lng == "en" ? 2 : 0	,
								}}>
									<MaterialCommunityIcons name={showFilter ? "chevron-up-circle" : "chevron-down-circle"} size={16} color={showFilter ? "#fff" : (setFilterColor() ? "#730874" : "#545454")} />
								</View>
								<View  style={{
									
								}}>
									<Text style={{
										color: showFilter ? "#fff" : (setFilterColor() ? "#730874" : "#545454")
									}}>{"Filter"}</Text>
								</View>
							</TouchableOpacity>





						</View>




					</View>


					{showFilter &&
						<Filters type={"events"} info={navigateProps.route.params}></Filters>
					}

					{selectedDisplay == "List" &&
						<AllEventsList style={{
						}}></AllEventsList>
					}

					{selectedDisplay == "Calender" &&
					<View>
					<View style={styles.calenderSection}>
						<View style={styles.containerBox}>
							<View style={[styles.daysOfWeekContainer, {
								height:31
							}]}>
								<LinearGradient style={[styles.daysOfWeek, {
									
								}]}
								colors={['#a7a7a7','#888888','#a7a7a7']}
								>
									{Object.keys(count.lines.global_metadata.days_of_week[count.lng]).map((index) => {
										return(
											<View key={"calenderDayHeader-"+index} style={{
												flex:1,
												alignItems:"center",
												borderRightWidth:index == 6 ? 0 : 1,
												paddingBottom:5,
												paddingTop:5,
												borderBottomWidth:1,
											}}>
												<Text
													style={{
														color: "#FFF",
													}}
												>{count.lines.global_metadata.days_of_week_short[count.lng][index]}</Text>
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
																			borderRadius:100,
																			backgroundColor:"#474747",
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
							<Text style={styles.calenderMonthText}>{count.lines.global_metadata.months[count.lng][moment(moment().year()+"-"+selectedMonth+"-01").month()]}</Text>
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

					</View>
					}
					
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
		padding:0
	},
	calenderSection:{
		width:width,
		backgroundColor:"#999",
		height:getPlayingHeight()-70-37,
		alignItems:"center"
	},
	calenderListSwitchButtonIconBox:{
		paddingTop:3
	},

	calenderListSwitchButton:{
		paddingRight:4,
		paddingLeft:4,
		paddingBottom:2
	},
	calenderListSwitch:{
		borderWidth:0,
		borderColor:"#d3d3d3"
		
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