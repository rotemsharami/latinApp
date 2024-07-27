import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { changeEventsSelectedFilters, changeOrganizationsSelectedFilters, changeLinesSelectedFilters, changeLearnsSelectedFilters} from '../../actions/counterActions';
import { getPlayingHeight, setArray, setRowType } from '../../tools/tools';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const { width, height } = Dimensions.get('screen');

const Filters = ({ type }) => {
	const count = useSelector((store) => store.count.count);
	const items = setArray(count.lines[type]);
	const [filters, setFilters] = useState({});
	const dispatch = useDispatch();

	const initializeFilters = useCallback(() => {
		if (items) {
			let _filters = {};
			
			items.forEach(element => {
				if (type === "organizations" || type === "lines" || type === "learn") {
					if (element.area) {
						_filters.area = _filters.area || {};
						_filters.area[element.area] = element.area;
					}
				}
				if (element.dance_floors) {
					_filters.dance_floors = _filters.dance_floors || {};
					element.dance_floors.split(",").forEach(tag => {
						_filters.dance_floors[tag] = tag;
					});
				}

				if (element.gender) {
					_filters.gender = _filters.gender || {};
					element.gender.split(",").forEach(tag => {
						_filters.gender[tag] = tag;
					});
				}




				
				if (element.dance_level) {
					_filters.dance_level = _filters.dance_level || {};
					element.dance_level.split(",").forEach(tag => {
						_filters.dance_level[tag] = tag;
					});
				}



				if (type === "events") {
					if (element.event_types) {
						_filters.event_types = _filters.event_types || {};
						_filters.event_types[element.event_types] = element.event_types;
					}
				}
				if (element.dance_services) {
					_filters.dance_services = _filters.dance_services || {};
					element.dance_services.split(",").forEach(tag => {
						_filters.dance_services[tag] = tag;
					});
				}
				if (element.services) {
					_filters.services = _filters.services || {};
					element.services.split(",").forEach(tag => {
						_filters.services[tag] = tag;
					});
				}
			});

			

			setFilters(currentFilters => {
				if (JSON.stringify(currentFilters) !== JSON.stringify(_filters)) {
					return _filters;
				}
				return currentFilters;
			});
		}
	}, [items, type]);

	useEffect(() => {
		initializeFilters();
	}, [initializeFilters]);

	const changeFilter = (filterType, index) => {
		let updatedFilters = {};
		if (type === "events") {
			updatedFilters = { ...count.eventsSelectedFilters };
		}
		if (type === "organizations") {
			updatedFilters = { ...count.organizationsSelectedFilters };
		}

		if (type === "lines") {
			updatedFilters = { ...count.linesSelectedFilters };
		}

		if (type === "learn") {
			updatedFilters = { ...count.learnsSelectedFilters };
		}



		if (updatedFilters[filterType]?.includes(index)) {
			updatedFilters[filterType] = updatedFilters[filterType].filter(item => item !== index);
		} else {
			updatedFilters[filterType] = [...(updatedFilters[filterType] || []), index];
		}

		if (type === "events") {
			dispatch(changeEventsSelectedFilters(updatedFilters));
		}
		if (type === "organizations") {
			dispatch(changeOrganizationsSelectedFilters(updatedFilters));
		}

		if (type === "lines") {
			dispatch(changeLinesSelectedFilters(updatedFilters));
		}

		if (type === "learn") {
			dispatch(changeLearnsSelectedFilters(updatedFilters));
		}



		

	};

	const isActive = (filterType, key) => {
		let result = false;
		if (type === "events") {
			result = count.eventsSelectedFilters[filterType]?.includes(key);
		}
		if (type === "organizations") {
			result = count.organizationsSelectedFilters[filterType]?.includes(key);
		}

		if (type === "lines") {
			result = count.linesSelectedFilters[filterType]?.includes(key);
		}

		if (type === "learn") {
			result = count.learnsSelectedFilters[filterType]?.includes(key);
		}


		return result;
	};

  	const setFilterTitle = (type) => {
		switch (type) {
			case "dance_floors":
				return count.lines.global_metadata.labels[count.lng][14];
			case "dance_services":
				return count.lines.global_metadata.labels[count.lng][15];
			case "services":
				return count.lines.global_metadata.labels[count.lng][16];
			case "event_type":
				return count.lines.global_metadata.labels[count.lng][17];


			case "area":
				return count.lines.global_metadata.labels[count.lng][19];

			case "gender":
				return count.lines.global_metadata.labels[count.lng][20];

			case "dance_level":
				return count.lines.global_metadata.labels[count.lng][21];



					




		default:
			return type;
		}
  	};


	let removeFilter = ()=> {
		const copy = Object.assign({}, filters);
		delete copy["area"];
		delete copy["gender"];
		delete copy["dance_level"];
		delete copy["dance_services"];
		delete copy["event_types"];
		return copy;
	}

	let _removeFilter = ()=> {
		const copy = Object.assign({}, filters);
		delete copy["dance_floors"];
		delete copy["services"];
		delete copy["event_types"];
		return copy;
	}



	return (
	<View style={{
		backgroundColor: "#545454",
		paddingBottom: 10,
		paddingTop: 10,
		height: getPlayingHeight() - 40
	}}>
	{filters && (
	<View style ={{}}>
		
		{Object.keys(_removeFilter()).map((filterKey) => (
		<View key={"lineFilter-"+filterKey} style={[styles.filtersContainer1, {}]}>
			<View key={`filter-${filterKey}`} style={[styles.filterBoxa, {}]}>
				<View style={styles.filterTitle}>
					<Text style={{
						textAlign: "center",
						color: "#d3d3d3"
					}}>
						{setFilterTitle(filterKey)}
					</Text>
				</View>
				<View style={[styles.filtersButtonsRow, {
					flexDirection: setRowType(count.lng),
					justifyContent: 'space-between',
				}]}>
					{Object.keys(filters[filterKey]).map((tagKey) => (
					<TouchableOpacity
						key={`filterItem-${tagKey}`}
						onPress={() => changeFilter(filterKey, tagKey)}
						style={[styles.filterTag,{
							backgroundColor: isActive(filterKey, tagKey) ? "#730874" : "#d3d3d3",
							borderLeftWidth:1,
							flex:1,
							justifyContent:"center",
							height:36 
						}]}>
							{count.lines.taxonomy_terms[filterKey][tagKey] && (
							<Text
								style={{
									textAlign: "center",
									color: isActive(filterKey, tagKey) ? "#FFF" : "#000",
									lineHeight:14,
								}}
							>
								{count.lines.taxonomy_terms[filterKey][tagKey][count.lng]}
							</Text>
							)}
					</TouchableOpacity>
					))}
				</View>
			</View>
		</View>
		))}
		<View style={[styles.filtersContainer2, {
			flexDirection: setRowType(count.lng),
			justifyContent: 'space-between',
			
			
		}]}>
			{Object.keys(removeFilter()).map((filterKey) => (
			<View key={"blockFilter-"+filterKey} style={{
				flex:1,
				alignItems:"center",
			}}>
				
				<View key={`filter-${filterKey}`} style={[styles.filterBox, {
					alignSelf:"stretch"
				}]}>
					<View style={styles.filterTitle}>
						<Text style={{
							textAlign: "center",
							color: "#d3d3d3"
						}}>
							{setFilterTitle(filterKey)}
						</Text>
					</View>
					{Object.keys(filters[filterKey]).map((tagKey) => (
					<TouchableOpacity
						key={`filterItem-${tagKey}`}
						onPress={() => changeFilter(filterKey, tagKey)}
						style={[
						styles.filterTag,{
							backgroundColor: isActive(filterKey, tagKey) ? "#730874" : "#d3d3d3",
							borderBottomWidth:1,
							borderLeftWidth:1,
							alignContent:"center",
							justifyContent:"center",
							height:36
						}]}>
							{count.lines.taxonomy_terms[filterKey][tagKey] && (
							<Text style={{
								textAlign: "center",
								color: isActive(filterKey, tagKey) ? "#FFF" : "#000",
							}}>
								{count.lines.taxonomy_terms[filterKey][tagKey][count.lng]}
							</Text>
							)}



					</TouchableOpacity>
					))}
				</View>
				
			</View>
			))}
		</View>
	</View>
	)}
</View>
);
};

const styles = StyleSheet.create({
  filtersContainer: {
	

	
  },

  filterBoxa:{
	marginBottom:10
  },
  
  filterTitle: {
    paddingRight: 3,
    paddingLeft: 3,
    paddingBottom: 1
  },
  filterTag: {
    padding: 5,
  },
});

export default Filters;
