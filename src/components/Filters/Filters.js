import React, {Component, useState, useEffect, useRef, useCallback} from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions, TouchableOpacity, I18nManager, PanResponder, Animated} from 'react-native';
import {nice_list_text, setArray, getSelectedLang, setRowType, setTextDirection} from "../../tools/tools.js";
import {navigate} from "../../../RootNavigation";
import { useSelector } from 'react-redux';
const {width, height} = Dimensions.get('screen');


const Filters = (type) => {
	const count = useSelector((store) => store.count.count);
	const items = count.lines[type.type];
	const [filters, setFilters] = useState(undefined);
	const [selectedFilters, setSelectedFilters] = useState(undefined);


	useEffect(() => {
		if(filters == undefined){
		let _filters = {};

		switch (type.type) {
			case "events":
				count.lines[type.type].forEach(element => {
					if(element.dance_floors != undefined){
						if(_filters.dance_floors == undefined)
							_filters.dance_floors = {};
						element.dance_floors.split(",").forEach(tag => {
							_filters.dance_floors[tag] = tag;
						});
					}
	
					if(element.dance_services != undefined){
						if(_filters.dance_services == undefined)
							_filters.dance_services = {};
						element.dance_services.split(",").forEach(tag => {
							_filters.dance_services[tag] = tag;
						});
					}
	
					if(element.global_services != undefined){
						if(_filters.services == undefined)
						_filters.services = {};
						element.global_services.split(",").forEach(tag => {
							_filters.services[tag] = tag;
						});
					}
				});
				break;
			default:
				break;
		}

		let _selectedFilters = {};
		Object.keys(_filters).forEach(key => {
			_selectedFilters[key] = [];
		});
		setSelectedFilters(_selectedFilters);

		setFilters(_filters);

		}

	}, [filters, selectedFilters]);



	const isActive = (type, key) => {

		

		let result = false;
		if(selectedFilters[type] != undefined){
			if(selectedFilters[type].includes(key))
				result = true;
		}
		return result;
	}


	

	let getSelectedFilters = async (type, index) => {
		console.log(selectedFilters);
		let oldFilterData = selectedFilters;
		if (oldFilterData[type].includes(index))
			oldFilterData[type] = oldFilterData[type].filter(a => a !== index);
		else
			oldFilterData[type] = [...oldFilterData[type], index];

			

		return oldFilterData;
	}

	function changeFilter(type, index) {
		getSelectedFilters(type, index).then(function(_filterData) {
			setSelectedFilters(pre => _filterData);
		});
	}



	return(
		
		<View>
		{filters != undefined && 
		<View style={{
			flexDirection: count.lng == "en" ? "row" : "row-reverse",
			justifyContent:"space-around"
		}}>
            {Object.keys(filters).map((filterKey)=>{
				return(
					<View style={[styles.filterBox, {
						
					}]}>
						<View style={[styles.filterTitle, {

						}]}>
							<Text style={{
								textAlign: count.lng == "en" ? "left" : "right",
							}}>{filterKey}</Text>
						</View>
						{Object.keys(filters[filterKey]).map((tagKey)=>{
							return(
								<TouchableOpacity
									onPress={() => changeFilter(filterKey, tagKey)}

									style={{
									flexDirection:"column",
									padding:5,
									backgroundColor: isActive(filterKey, tagKey) ? "#000" :"#FFF"
									}}
								>
									{count.lines.taxonomy_terms[filterKey][tagKey] != undefined && 
										<Text style={{
											textAlign: count.lng == "en" ? "left" : "right",
											color:"#000"
										}}>{count.lines.taxonomy_terms[filterKey][tagKey][count.lng]}</Text>
									}
								</TouchableOpacity>
							);
						})}



					</View>
				);
			})}
			
		</View>
		}
		</View>
	);
}


const styles = StyleSheet.create({});
export default Filters;