import {Image,StyleSheet,Text,View,Dimensions,Animated, PanResponder, Easing,ImageBackground,TouchableOpacity,I18nManager,ScrollView, SafeAreaView, StatusBar} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import moment from 'moment';
import { setRowType, getSelectedLang, setTextDirection, setArray, nice_list_text, getPlayingHeight} from '../../tools/tools';
import { useSelector, useDispatch } from 'react-redux';
import OrganizationStudies from '../OrganizationStudies/OrganizationStudies.js';
import Line from '../Line/Line';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';
const {width, height} = Dimensions.get('screen');
let windowH = Dimensions.get('window').height;

const logoWidth = width/5;
const textWidth = width - logoWidth;
const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 24; 

const setText = (text) => {
	return {html:text}
}

const Lines = (info) => {
	const count = useSelector((store) => store.count.count);
	const dir = setTextDirection(count.lng);
	const [lines, setLines] = useState(count.lines);
	const [weeklyData, setWeeklyData] = useState([]);
	const [selectedDanceFloors, setSelectedDanceFloors] = useState([]);
	const [selectedAreas, setSelectedAreas] = useState([]);
	const [selectedDay, setSelectedDay] = useState("0");
	const animationValues = useRef([]).current;
	
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
                "day_of_week": count.lines.global_metadata.days_of_week[count.lng][dayObject.day()],
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
				filterdEvents = count.lines.lines.filter((event) => {
					let wd = event.week_day == "7" ? "0" : event.week_day;
                    let in_day = parseInt(wd) == parseInt(day.day_index);
					
					
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
                        if(event.dance_floors != null){
                            event.dance_floors.split(",").forEach(function(key) {
                                if(selectedDanceFloors.indexOf(key) != -1)
                                     in_type = true;
                            });
                        }
                    }
                    if(selectedAreas.length > 0){
                        in_area = false;
                        let area = count.lines.organizations[event.org_nid].area ;
						if(selectedAreas.indexOf(area) != -1)
							in_area = true;
                        
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
	}, [count.lng]);


	useEffect(() => {
		let url = 'https://latinet.co.il/'+count.lng+'/lines_data/';
		if(lines === undefined){
			// fetch(url)
			// .then((res) => res.json())
			// .then((data) => {
				//setLines(pre => data.data);
				setLines(count.lines);


				  

			// });
		}
		if(lines != undefined){
			filterDayEvents().then(function(filterd) {
				setWeeklyData(pre => filterd);

				

				//animationValues.current = setArray(weeklyData[selectedDay].events).map(() => new Animated.Value(-60));

			// Animated.stagger(60, weeklyData[selectedDay].events.map(item => Animated.timing(item, {
			// 	toValue: 0,
			// 	duration: 180,
			// 	useNativeDriver: true,
			//   })).concat()).start();

				
			});
		}
	}, [lines]);

	useEffect(() => {
		if(weeklyData.length > 0){
			filterDayEvents().then(function(filterd) {
				setWeeklyData(pre => filterd);
				// animationValues.current = setArray(weeklyData[selectedDay].events).map(() => new Animated.Value(-60));

				// Animated.stagger(60, weeklyData[selectedDay].events.map(item => Animated.timing(item, {
				// 	toValue: 0,
				// 	duration: 180,
				// 	useNativeDriver: true,
				//   })).concat()).start();

			});
		}

	}, [selectedAreas, selectedDanceFloors, selectedDay]);






	return(
		<View
			style={[styles.box]}
			>
			{lines != undefined &&

			<View style={styles.filters}>

				{info._showFilters && 

				<View style={[styles.filtersBox, {
					height:height-110-(height-windowH-STATUS_BAR_HEIGHT)-STATUS_BAR_HEIGHT-80
				}]}>
					<View style={styles.containerValues}>
						<View style={[styles.filterItems, {
							flexDirection: count.lng == "en" ? "row" : "row-reverse",
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
											>{getTagInfo(index, lines.dance_floors[count.lng])}</Text>
										</TouchableOpacity>
									</View>
								);
							})}
						</View>
						<View style={[styles.filterItems, {
							flexDirection: count.lng == "en" ? "row" : "row-reverse",
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
											>{getTagInfo(index, lines.areas[count.lng])}</Text>
										</TouchableOpacity>
									</View>
								);
							})}
						</View>
					</View>
				</View>

				}

				{!info._showFilters && 
				<LinearGradient style={[styles.linesBox, {
					height: height-110-(height-windowH-STATUS_BAR_HEIGHT)-STATUS_BAR_HEIGHT-80
				}]}
					colors={['#efdbf7','#FFF']}
					
				>


				{weeklyData[selectedDay] !== undefined && 
					<View style={styles.day}>
						{weeklyData[selectedDay].events !== undefined && 
							<View style={styles.linesList}>
									{weeklyData[selectedDay] !== undefined && 
										<View>
											{weeklyData[selectedDay].events !== undefined && 
												<View>
													{weeklyData[selectedDay].events[0] !== undefined && 
														<SafeAreaView style={{
															
															

															}}>


																


															<ScrollView style={{}}>
																



																<View style={styles.displayBox}>
																	<View style={styles.display}>
																		<View style={styles.listBox}>
																			{setArray(weeklyData[selectedDay].events).map((item, key) => {
																			return (
																				// <Animated.View
																				// 	key={key}
																				// 	style={[styles.item, { transform: [{ translateX: animationValues[key] }] }]}
																				// >
																					<View style={{
																						flexDirection: count.lng == "en" ? "row" : "row-reverse",
																						paddingRight:20,
																						paddingLeft:20,
																						borderBottomWidth:2,
																						borderBottomColor:"#FFF"

																					}}>
																						<View style={{
																							justifyContent:'center',
																							
																						}}>
																							<Text style={{backgroundColor:"#474747", color:"#FFF", width:19, textAlign: 'center', borderRadius:30}}>{key+1}</Text>
																						</View>
																						<Line
																							key={"line-"+item.nid}
																							item={item}
																							_organizationNid={info._organizationNid}
																							_setOrganizationNid={info._setOrganizationNid}
																							_setSelectedScreen={info._setSelectedScreen}
																							>
																						</Line>
																					</View>
																			// </Animated.View>
																			);
																			})}
																		</View>
																	</View>
																</View>



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

				</LinearGradient>
				}

				<View style={[styles.daysControls, {
					flexDirection: count.lng == "en" ? "row" : "row-reverse",
				}]}>
					{Object.keys(weeklyData).map((index) => {
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
										>{count.lines.global_metadata.days_of_week_short[count.lng][weeklyData[index].day_index == "7" ? "1" : parseInt(weeklyData[index].day_index)]}</Text>
								</View>
									<Text
										style={{
											color: selectedDay == index ? "#FFF" : "#000",
										}}
									>{weeklyData[index].date_short}</Text>
								</TouchableOpacity>
							</View>
						);
					})}
            	</View>








			</View>
			}
		</View>
	);
}
export default Lines;
const styles = StyleSheet.create({
	filters:{

	},
	filtersBox:{
		backgroundColor:"#d3d3d3"
	},
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
		height:80
	},
	dayFilterItem:{
		flex:1,
		alignItems:"center",
		borderWidth:1,
		borderRightWidth:0
	}
});