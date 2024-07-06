import React, { useRef, useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View, Dimensions, Animated, PanResponder, Easing, ImageBackground, TouchableOpacity, I18nManager, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import moment from 'moment';
import { setRowType, getSelectedLang, setTextDirection, setArray, nice_list_text, getPlayingHeight, filterDataItem } from '../../tools/tools';
import { useSelector, useDispatch } from 'react-redux';
import OrganizationStudies from '../OrganizationStudies/OrganizationStudies.js';
import Line from '../Line/Line';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Filters from '../Filters/Filters';
import { changeLinesSelectedFilters } from '../../actions/counterActions';

const { width, height } = Dimensions.get('screen');
const logoWidth = width / 5;
const textWidth = width - logoWidth;
const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 24;

const Lines = (info) => {
	const [showFilter, setShowFilter] = useState(false);
	const count = useSelector((store) => store.count.count);
	const dir = setTextDirection(count.lng);
	const [lines, setLines] = useState(undefined);
	const [weeklyData, setWeeklyData] = useState([]);
	const [selectedDay, setSelectedDay] = useState("0");
	const animationValues = useRef([]).current;
	const [showFilters, setShowFilters] = useState(info.route.params._showFilters);

	const dispatch = useDispatch();
	const _changeLinesSelectedFilters = (linesSelectedFilters) => {
		dispatch(changeLinesSelectedFilters(linesSelectedFilters));
	};

	const setFilterColor = () => {
		let result = false;
		if (Object.keys(count.linesSelectedFilters).length > 0) {
			Object.keys(count.linesSelectedFilters).forEach(key => {
				if (count.linesSelectedFilters[key].length > 0) {
					result = true;
				}
			});
		}
		return result;
	};

	const setFiltersResults = () => {
		if (lines != undefined)
			return lines.length + " " + count.lines.global_metadata.labels[count.lng][22];
	};

	const filterAll = async () => {
		let filteredEvents = setArray(count.lines.lines).filter((event) => {
			return filterDataItem(event, count.linesSelectedFilters);
		});
		return filteredEvents;
	};

	const getSelectedDay = async (index) => {
		return index;
	};

	const setFirstData = async (data) => {
		setLines(pre => data);
		return true;
	};

	const changeDay = (day) => {
		getSelectedDay(day).then(function (_selectedDay) {
			setSelectedDay(pre => _selectedDay);
		});
	};

	const getWeekly = () => {
		let date_obj = moment();
		let weekly = [];
		let this_week_start = date_obj;
		let dayObject = this_week_start;
		for (let i = 0; i < 7; i++) {
			dayObject = dayObject.add(i == 0 ? 0 : 1, 'days');
			let object = {
				"number": i,
				"date": dayObject.format('YYYY-MM-DD'),
				"dayObject": dayObject,
				"date_short": dayObject.format('DD/MM'),
				"active": dayObject.format('YYYY-MM-DD') == moment().format('YYYY-MM-DD') ? true : false,
				"day_of_week": count.lines.global_metadata.days_of_week[count.lng][dayObject.day()],
				"day_index": dayObject.day(),
				"events": []
			};
			weekly.push(object);
		}
		return weekly;
	};

	const filterDayEvents = async () => {
		const newWeeklyData = getWeekly();
		let filteredEvents = [];
		newWeeklyData.forEach((day, index) => {
			if (day.events != undefined) {
				filteredEvents = lines.filter((event) => {
					let wd = event.week_day == "7" ? "0" : event.week_day;
					let in_day = parseInt(wd) == parseInt(day.day_index);
					if (event.changed_type != undefined && event.event_type[Object.keys(event.event_type)[0]].tid == "49") {
						if (event.changed_type == "1") {
							if (event.date_of_changed_line != undefined) {
								if (event.moved_to != undefined)
									in_day = (day.date == moment(event.moved_to, "YYYY-MM-DD").format('YYYY-MM-DD')) || parseInt(event.week_day) == day.day_index;
							}
						}
					}
					return in_day;
				});
				newWeeklyData[index].events = filteredEvents;
			}
		});
		return newWeeklyData;
	};

	useEffect(() => {
		if (lines === undefined) {
			setLines(setArray(count.lines.lines));
		} else {
			filterDayEvents().then(function (filtered) {
				setWeeklyData(pre => filtered);
			});
		}
	}, [lines]);

	useEffect(() => {
		if (weeklyData.length > 0) {
			filterDayEvents().then(function (filtered) {
				setWeeklyData(pre => filtered);
			});
		}
	}, [selectedDay]);

	useEffect(() => {
		if (lines !== undefined) {
			filterAll().then(function (all) {
				setLines(pre => all);
				filterDayEvents().then(function (filtered) {
					setWeeklyData(pre => filtered);
				});
			});
		}
	}, [count.linesSelectedFilters]);

	return (
		<View style={styles.container}>
			{lines != undefined &&
				<View style={styles.container}>
					<View style={[styles.headerContainer, {
						flexDirection: count.lng === "en" ? "row" : "row-reverse",
					}]}>
						{!showFilter && <View></View>}
						{showFilter &&
							<TouchableOpacity
								onPress={() => { setShowFilter(false); }}
								style={[styles.filterResultContainer, {
									flexDirection: count.lng === "en" ? "row" : "row-reverse",
								}]}
							>
								<Text style={styles.filterResultText}>{setFiltersResults()}</Text>
							</TouchableOpacity>
						}
						<View style={[styles.filterContainer,{
							flexDirection: count.lng === "en" ? "row" : "row-reverse",
						}]}>
							{setFilterColor() &&
								<TouchableOpacity
									onPress={() => { _changeLinesSelectedFilters({}) }}
									style={styles.trashIconContainer}
								>
									<MaterialCommunityIcons name="trash-can" size={18} color="#FFF" />
								</TouchableOpacity>
							}
							<TouchableOpacity
								onPress={() => { setShowFilter(showFilter ? false : true) }}
								style={[styles.filterToggleContainer, {
				

									flexDirection: count.lng === "en" ? "row" : "row-reverse",
									height: 27,
									paddingLeft: count.lng === "en" ? 0 : 2,
									paddingRight: count.lng === "en" ? 2 : 0,
									borderWidth: 2,
									borderRadius: 3,
									borderColor: showFilter ? (setFilterColor() ? "#730874" : "#545454") : (setFilterColor() ? "#730874" : "#545454"),
									backgroundColor: showFilter ? (setFilterColor() ? "#730874" : "#545454") : "#d3d3d3"



								}]}
							>
								<View style={[styles.filterIconContainer, {
									              paddingTop: 3,
												  paddingLeft: count.lng === "en" ? 0 : 2,
												  paddingRight: count.lng === "en" ? 2 : 0,
								}]}>
									<MaterialCommunityIcons name={showFilter ? "minus-circle" : "plus-circle"} size={16} color={showFilter ? "#fff" : (setFilterColor() ? "#730874" : "#545454")} />
								</View>
								<Text style={[styles.filterToggleText, {
									fontWeight:"normal",
									fontSize:14,
									color: showFilter ? "#fff" : (setFilterColor() ? "#730874" : "#545454")
								}]}>
									{count.lines.global_metadata.labels[count.lng][18]}
								</Text>
							</TouchableOpacity>
						</View>
					</View>
					{showFilter && <Filters type={"lines"} />}
					{!showFilter &&
						<View style={styles.contentContainer}>
							<LinearGradient
								style={styles.linesBox}
								colors={['#efdbf7', '#FFF']}
							>
								{weeklyData[selectedDay] !== undefined &&
									<View style={styles.day}>
										{weeklyData[selectedDay].events !== undefined &&
											<View style={styles.linesList}>
												{weeklyData[selectedDay] !== undefined &&
													<SafeAreaView style={{ flex: 1 }}>
														<ScrollView>
															<View style={styles.displayBox}>
																<View style={styles.display}>
																	<View style={styles.listBox}>
																		{setArray(weeklyData[selectedDay].events).map((item, key) => {
																			return (
																				<View key={"day-" + key} style={[styles.lineContainer, {
																					flexDirection: count.lng === "en" ? "row" : "row-reverse",
																				}]}>
																					<View style={styles.lineNumberContainer}>
																						<Text style={styles.lineNumber}>{key + 1}</Text>
																					</View>
																					<Line
																						key={"line-" + item.nid}
																						item={item}
																						_organizationNid={info._organizationNid}
																						_setOrganizationNid={info._setOrganizationNid}
																						_setSelectedScreen={info._setSelectedScreen}
																					/>
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
							</LinearGradient>
							<View style={styles.daysControls}>
								{Object.keys(weeklyData).map((index) => {
									return (
										<View key={"day-" + index} style={[styles.dayFilterItem, { backgroundColor: selectedDay == index ? "#730874" : "#474747" }]}>
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
																					<View style={[styles.linesAmount, { backgroundColor: selectedDay == index ? "#f640b2" : "#d3d3d3" }]}>
																						<Text style={[styles.linesAmountText, { color: selectedDay == index ? "#d3d3d3" : "#000" }]}>
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
													<Text style={styles.dayShortText}>
														{count.lines.global_metadata.days_of_week_short[count.lng][weeklyData[index].day_index == "7" ? "1" : parseInt(weeklyData[index].day_index)]}
													</Text>
												</View>
												<Text style={styles.dateText}>{weeklyData[index].date_short}</Text>
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
	container: {
		flex: 1,
	},
	headerContainer: {
		paddingTop: 10,
		paddingBottom: 10,
		paddingRight: 10,
		paddingLeft: 10,
		justifyContent: "space-between",
		height: 40,
		backgroundColor: "#d3d3d3",
		borderTopColor: "#000",
		borderTopWidth: 1,
	},
	filterResultContainer: {
		alignSelf: "center",
	},
	filterResultText: {
		textDecorationLine:'underline',
		fontWeight:"normal",
		fontSize:14
	},
	filterContainer: {
		alignSelf: "center",
	},
	trashIconContainer: {
		borderWidth: 2,
		borderColor: "#730874",
		backgroundColor: "#730874",
		borderRadius: 3,
		marginRight: 3,
		marginLeft: 3,
	},
	filterToggleContainer: {
		height: 24,
		paddingRight: 4,
		paddingLeft: 4,
		borderWidth: 2,
		borderRadius: 3,
	},
	filterIconContainer: {
		paddingTop: 2,
		paddingLeft: 0,
		paddingRight: 2,
	},
	filterToggleText: {
		color: "#545454",
		fontWeight:"normal"
	},
	contentContainer: {
		flex: 1,
	},
	linesBox: {
		flex: 1,
	},
	day: {
		flex: 1,
	},
	linesList: {
		flex: 1,
	},
	displayBox: {
		flex: 1,
	},
	display: {
		flex: 1,
	},
	listBox: {
		flex: 1,
	},
	lineContainer: {
		paddingRight: 20,
		paddingLeft: 20,
		borderBottomWidth: 2,
		borderBottomColor: "#FFF",
	},
	lineNumberContainer: {
		justifyContent: 'center'
	},
	lineNumber: {
		backgroundColor: "#474747",
		color: "#FFF",
		width: 19,
		textAlign: 'center',
		borderRadius: 30
	},
	daysControls: {
		height: 80,
		flexDirection: 'row',
	},
	dayFilterItem: {
		flex: 1,
		alignItems: "center",
		borderWidth: 1,
		borderRightWidth: 0,
		paddingTop: 15
	},
	linesAmount: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 20,
		height: 20,
		borderRadius: 5,
		position: "absolute",
		zIndex: 999999999,
		top: -10
	},
	dayShort: {
		borderRadius: 40,
		borderWidth: 2,
		width: 40,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: "#FFF"
	},
	dayShortText: {
		color: "#000",
		fontWeight: "bold"
	},
	dateText: {
		color: "#FFF"
	}
});
