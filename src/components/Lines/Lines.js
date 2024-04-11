import {Image,StyleSheet,Text,View,Dimensions,Animated,Easing,ImageBackground,TouchableOpacity,I18nManager,ScrollView, SafeAreaView, StatusBar} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import moment from 'moment';
import { setRowType, getSelectedLang, setTextDirection, setArray, nice_list_text} from '../../tools/tools';
import { useSelector, useDispatch } from 'react-redux';
import OrganizationStudies from '../OrganizationStudies/OrganizationStudies.js';
import DayLines from '../DayLines/DayLines.js';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const {width, height} = Dimensions.get('screen');
const logoWidth = width/5;
const textWidth = width - logoWidth;
const setText = (text) => {
	return {html:text}
}

const Lines = () => {
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

    let getWeekly = () => {
        let date_obj = moment();
        let weekly = [];
        let this_week_start = date_obj;
        let dayObject = this_week_start;
        for (let i = 0; i < 7; i++) {
            dayObject = dayObject.add(i==0 ? 0 : 1, 'days');
            let object = {
                "number": i,
                "date": dayObject.format('YYYY-MM-DD'),
                "dayObject": dayObject,
                "date_short": dayObject.format('DD/MM'),
                "active": dayObject.format('YYYY-MM-DD') == moment().format('YYYY-MM-DD') ? true : false,
                "day_of_week": lines.days_of_week[dayObject.day()],
                "day_index": dayObject.day(),
                "events":[]
            };
            weekly.push(object);
        }
        return weekly;
    };

    let filterDayEvents = async() => {
		const newWeeklyData =  getWeekly();
		let filterdEvents = [];
        newWeeklyData.forEach((day, index) => {
            if(day.events != undefined){
				filterdEvents = lines.events.filter((event) => {
                    let in_day;
                    if(event.event_type[Object.keys(event.event_type)[0]].tid == "49"){
                        in_day = parseInt(event.week_day) == parseInt(day.day_index);
                    }
					
                    else if(event.event_type[Object.keys(event.event_type)[0]].tid == "55"){
                        in_day = day.date == event.event_date;
                    }
					
                    if(event.changed_type != undefined && event.event_type[Object.keys(event.event_type)[0]].tid == "49"){
                        if(event.changed_type == "1"){
                            if(event.date_of_changed_line != undefined){
                                if(event.moved_to != undefined)
                                    in_day = (day.date == moment(event.moved_to, "YYYY-MM-DD").format('YYYY-MM-DD')) || parseInt(event.week_day) == day.day_index;
                            }
                        }
                    }
                    let in_type = true;
                    let in_area = true;
                    let in_event_types = true;
                    if(selectedDanceFloors.length > 0){
                        in_type = false;
                        if(event.dance_floors != undefined){
                            Object.keys(event.dance_floors).forEach(function(key) {
                                if(selectedDanceFloors.indexOf(event.dance_floors[key].tid) != -1)
                                    in_type = true;
                            });
                        }
                    }
                    if(selectedAreas.length > 0){
                        in_area = false;
                        let areas = event.area != undefined ? event.area : event.organization.area;
                        if(areas[Object.keys(areas)[0]] != undefined){ 
                            if(selectedAreas.indexOf(areas[Object.keys(areas)[0]].tid) != -1)
                                in_area = true;
                        }
                    }
                    let result = in_day == true && in_type == true && in_area == true;
					
                    return result;

                });
				newWeeklyData[index].events = filterdEvents;
            }
        });
		return newWeeklyData;
    }

	useEffect(() => {
		setLines(undefined);
	}, [count.general.lng]);


	useEffect(() => {
		let url = 'https://latinet.co.il/'+count.general.lng+'/lines_data/';
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
		<View style={styles.container}>
			{lines != undefined &&
			<View style={styles.containerValues}>
				<View style={[styles.filterItems, {
					flexDirection: count.general.lng == "en" ? "row" : "row-reverse",
				}]}>
					<View style={styles.filterIcon}><MaterialCommunityIcons name="music" size={14} color="#fff" /></View>
					{Object.keys(lines.used_dance_floors).map((index) => {
						return(
							<View key={"dnacFloor-"+index} style={{
								backgroundColor: selectedDanceFloors.includes(index) ? "#730874" : "#FFF",
								borderWidth:1,
								alignContent:"center",
								padding:3
							}}>
								<TouchableOpacity onPress={() => changeDanceFloor(index)}>
									<Text
										style={{
											color: selectedDanceFloors.includes(index) ? "#FFF" : "#000",
										}}
									>{getTagInfo(index, lines.dance_floors)}</Text>
								</TouchableOpacity>
							</View>
						);
					})}
				</View>
				<View style={[styles.filterItems, {
					flexDirection: count.general.lng == "en" ? "row" : "row-reverse",
				}]}>
					<View style={styles.filterIcon}><MaterialCommunityIcons name="map-marker" size={14} color="#fff" /></View>
					{Object.keys(lines.used_area).map((index) => {
						return(
							<View key={"area-"+index} style={{
								backgroundColor: selectedAreas.includes(index) ? "#730874" : "#FFF",
								borderWidth:1,
								alignContent:"center",
								padding:3
							}}>
								<TouchableOpacity onPress={() => changeAreas(index)}>
								<Text
										style={{
											color: selectedAreas.includes(index) ? "#FFF" : "#000",
										}}
									>{getTagInfo(index, lines.areas)}</Text>
								</TouchableOpacity>
							</View>
						);
					})}
				</View>
				<View style={[styles.daysControls, {
					flexDirection: count.general.lng == "en" ? "row" : "row-reverse",
				}]}>
					{Object.keys(lines.days_of_week_short).map((index) => {
						return(
							<View key={"day-"+index} style={{
								backgroundColor: selectedDay == index ? "#730874" : "#e7e7e7",
								flex:1,
								alignItems:"center",
								borderWidth:1,
								borderRightWidth:0,
								paddingTop:15
							}}>
								<TouchableOpacity onPress={() => changeDay(index)}>
								{weeklyData[index] !== undefined && 
									<View style={styles.day}>
										{weeklyData[index].events !== undefined && 
											<View style={styles.linesList}>
													{weeklyData[index] !== undefined && 
														<View>
															{weeklyData[index].events !== undefined && 
																<View>
																	{weeklyData[index].events[0] !== undefined &&
																		<View style={styles.linesAmount}>
																			<Text style={styles.linesAmountText}>{weeklyData[index].events.length}</Text>
																		</View>
																	}
																</View>
															}
														</View>
													}
											</View>
										}
									</View>
								}
								<View style={styles.dayShort}>
									<Text
											style={{
												color: "#000",
											}}
										>{lines.days_of_week_short[index]}</Text>

								</View>
								<Text
										style={{
											color: selectedDay == index ? "#FFF" : "#000",
										}}
									>{lines.days_of_week_short_date[index]}</Text>
								</TouchableOpacity>
							</View>
						);
					})}
            	</View>
				{weeklyData[selectedDay] !== undefined && 
					<View style={styles.day}>
						{weeklyData[selectedDay].events !== undefined && 
							<View style={styles.linesList}>
									{weeklyData[selectedDay] !== undefined && 
										<View>
											{weeklyData[selectedDay].events !== undefined && 
												<View>
													{weeklyData[selectedDay].events[0] !== undefined && 
														<SafeAreaView style={{height:height-340}}>
															<ScrollView style={{flex:1}}>
																<DayLines todaysLinesData={{lines:weeklyData[selectedDay].events, labels: []}}></DayLines>
															</ScrollView>
														</SafeAreaView>
													}
												</View>
											}
										</View>
									}
							</View>
						}
					</View>
				}
			</View>
			}
		</View>
	);
}
export default Lines;
const styles = StyleSheet.create({
	linesAmount:{
		backgroundColor:"#f640b2",
		alignItems: 'center',
		justifyContent: 'center',
		width: 20,  // Adjust width and height as needed
		height: 20,
		borderRadius: 5,
		position:"absolute",
		zIndex:999999999,
		top:-10
		
	},
	dayShort:{
		borderRadius: 40, 
		borderWidth:2,
		width:40,
		height:40,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor:"#FFF"

	},
	linesAmountText:{
		color:"#FFF"
	},
	filterIcon:{
		backgroundColor:"#000",
		alignItems: 'center',
		justifyContent: 'center',
		
	},
	linesList:{

	},
	container:{
		flex: 1
	},
	filterItems:{
		flexDirection:"row",
		alignContent:"space-around",
		alignSelf:"stretch",
		padding:5
	},
	filterItem:{
		borderWidth:1,
		alignContent:"center",
		padding:3
	},
	daysControls:{
		flexDirection:"row",
	},
	dayFilterItem:{
		flex:1,
		alignItems:"center",
		borderWidth:1,
		borderRightWidth:0
	}
});