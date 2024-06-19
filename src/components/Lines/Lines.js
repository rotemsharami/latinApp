import {Image,StyleSheet,Text,View,Dimensions,Animated, PanResponder, Easing,ImageBackground,TouchableOpacity,I18nManager,ScrollView, SafeAreaView, StatusBar} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import moment from 'moment';
import { setRowType, getSelectedLang, setTextDirection, setArray, nice_list_text, getPlayingHeight, filterDataItem} from '../../tools/tools';
import { useSelector, useDispatch } from 'react-redux';
import OrganizationStudies from '../OrganizationStudies/OrganizationStudies.js';
import Line from '../Line/Line';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';
const {width, height} = Dimensions.get('screen');
let windowH = Dimensions.get('window').height;
import Filters from '../Filters/Filters';
import {changeLinesSelectedFilters} from '../../actions/counterActions';
const logoWidth = width/5;
const textWidth = width - logoWidth;
const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 24; 

const Lines = (info) => {

	const [showFilter, setShowFilter] = useState(false);
	const count = useSelector((store) => store.count.count);
	const dir = setTextDirection(count.lng);
	const [lines, setLines] = useState(undefined);
	const [weeklyData, setWeeklyData] = useState([]);
	const [selectedDanceFloors, setSelectedDanceFloors] = useState([]);
	const [selectedAreas, setSelectedAreas] = useState([]);
	const [selectedDay, setSelectedDay] = useState("0");
	const animationValues = useRef([]).current;
	const [showFilters, setShowFilters] = useState(info.route.params._showFilters);
	const [events, setEvents] = useState(undefined);


	const dispatch = useDispatch();
	const _changeLinesSelectedFilters = (linesSelectedFilters) => {
		dispatch(changeLinesSelectedFilters(linesSelectedFilters));
	};


	let setFilterColor = () => {
		let result = false;
		if(Object.keys(count.linesSelectedFilters).length > 0){
			Object.keys(count.linesSelectedFilters).forEach(key => {
				if(count.linesSelectedFilters[key].length > 0){
					result = true;
				}
			});
		}
		return result;
	}

	let setFiltersResults = () => {
		if(lines != undefined)
			return lines.length + " Items";
	}

	let filterAll = async () => {
		let filterdEvents = setArray(count.lines.lines).filter((event) => {
			return filterDataItem(event, count.linesSelectedFilters);
		});
		return filterdEvents;
	}

	let getTagInfo = (tid, data) => {
		let result = "no";
		let filter = data.filter(item => item.tid == tid);
		if(filter.length > 0)
			result = filter[0].name;
		return result;
	}

	let getSelectedDay = async (index) => {
		return index;
	}

	let setFirstData = async (data) => {
		setLines(pre => data);
		return true;
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
				filterdEvents = lines.filter((event) => {
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
                    return in_day;
                });
				newWeeklyData[index].events = filterdEvents;
            }
        });
		return newWeeklyData;
    }
	
	useEffect(() => {
		if(lines === undefined){
			setLines(setArray(count.lines.lines));
		}
		else{
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
	}, [selectedDay]);

	useEffect(() => {
		if(lines !== undefined){
			filterAll().then(function(all) {
				setLines(pre => all);
				filterDayEvents().then(function(filterd) {
					setWeeklyData(pre => filterd);
				});
			});
		}
		
	}, [count.linesSelectedFilters]);

	return(
		<View style={[styles.box, {}]}>
			{lines != undefined &&
			<View style={[styles.boxContainer, {}]}>
				<View style={{
				paddingTop:10,
				paddingBottom:10,
				paddingRight:10,
				paddingLeft:10,
				justifyContent:"space-between",
				height:40,
				backgroundColor:"#d3d3d3",
				borderTopColor:"#000",
				borderTopWidth:1,
				flexDirection: count.lng == "en" ? "row" : "row-reverse",
			}}>
				{!showFilter &&
				<View></View>
				}
				{showFilter &&
				<TouchableOpacity
					onPress={()=>{
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
					>
						{setFiltersResults()}
					</Text>
				</TouchableOpacity>
				}
				<View style={{
					flexDirection: count.lng == "en" ? "row" : "row-reverse",
					alignSelf:"center",
				}}>
					{setFilterColor() &&
					<TouchableOpacity
						onPress={() => {_changeLinesSelectedFilters({})}}
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
							<MaterialCommunityIcons name={showFilter ? "minus-circle" : "plus-circle"} size={16} color={showFilter ? "#fff" : (setFilterColor() ? "#730874" : "#545454")} />
						</View>
						<View>
							<Text style={{
								color: showFilter ? "#fff" : (setFilterColor() ? "#730874" : "#545454")
							}}>
								{"Filter"}
							</Text>
						</View>
					</TouchableOpacity>
				</View>
			</View>
			{showFilter &&
			<Filters type={"lines"}></Filters>
			}
				{!showFilter &&
				<View>
				<LinearGradient
					style={[styles.linesBox, {
						height: getPlayingHeight()-40-80,
						
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
									<SafeAreaView style={{}}>
										<ScrollView style={{}}>
											<View style={styles.displayBox}>
												<View style={styles.display}>
													<View style={styles.listBox}>
														{setArray(weeklyData[selectedDay].events).map((item, key) => {
														return (
														<View
															key={"day-"+key}
															style={{
															flexDirection: count.lng == "en" ? "row-reverse" : "row-reverse",
															paddingRight:20,
															paddingLeft:20,
															borderBottomWidth:2,
															borderBottomColor:"#FFF"
														}}>
															<View style={{justifyContent:'center'}}>
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

				<View style={[styles.daysControls, {
					flexDirection: count.lng == "en" ? "row" : "row-reverse",
				}]}>
					{Object.keys(weeklyData).map((index) => {
					return(
					<View key={"day-"+index} style={{
						backgroundColor: selectedDay == index ? "#730874" : "#474747",
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
											<View style={[styles.linesAmount, {
												backgroundColor: selectedDay == index ? "#f640b2" : "#d3d3d3", 
											}]}>
												<Text style={[styles.linesAmountText, {
													color: selectedDay == index ? "#d3d3d3" : "#000",
												}]}>
													{weeklyData[index].events.length}
												</Text>
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
								<Text style={{
									color: "#000",
									fontWeight:"bold"
								}}>
									{count.lines.global_metadata.days_of_week_short[count.lng][weeklyData[index].day_index == "7" ? "1" : parseInt(weeklyData[index].day_index)]}
								</Text>
							</View>
							<Text style={{color: "#FFF"}}>{weeklyData[index].date_short}</Text>
						</TouchableOpacity>
					</View>
					);
					})}
            	</View>
			</View>
			}
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
		alignContent:"space-around",
		padding:5
	},
	filterItem:{
		borderWidth:1,
		alignContent:"center",
		padding:3
	},
	daysControls:{
		height:80
	},
	dayFilterItem:{
		flex:1,
		alignItems:"center",
		borderWidth:1,
		borderRightWidth:0
	}
});