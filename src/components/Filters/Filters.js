import React, { useState, useEffect, useCallback} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useSelector, useDispatch} from 'react-redux';
import {changeEventsSelectedFilters} from '../../actions/counterActions';
const { width, height } = Dimensions.get('screen');

const Filters = ({ type, info }) => {
  	const count = useSelector((store) => store.count.count);
	const items = count.lines[type];
	const [filters, setFilters] = useState(undefined);
	const [selectedFilters, setSelectedFilters] = useState(count.eventsSelectedFilters);

	const dispatch = useDispatch();
	const _changeEventsSelectedFilters = (eventsSelectedFilters) => {
		dispatch(changeEventsSelectedFilters(eventsSelectedFilters));
	};

 	useEffect(() => {
    if (!filters) {
      let _filters = {};
      switch (type) {
        case "events":
          count.lines[type].forEach(element => {
            if (element.dance_floors) {
              if (!_filters.dance_floors) _filters.dance_floors = {};
              element.dance_floors.split(",").forEach(tag => {
                _filters.dance_floors[tag] = tag;
              });
            }

            if (element.dance_services) {
              if (!_filters.dance_services) _filters.dance_services = {};
              element.dance_services.split(",").forEach(tag => {
                _filters.dance_services[tag] = tag;
              });
            }

            if (element.services) {
              if (!_filters.services) _filters.services = {};
              element.services.split(",").forEach(tag => {
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

	  if(Object.keys(count.eventsSelectedFilters) == 0)
      	setSelectedFilters(_selectedFilters);
      setFilters(_filters);
    }
  }, [filters, type, count.lines]);

  const isActive = (filterType, key) => {
    return selectedFilters && selectedFilters[filterType]?.includes(key);
  };

  const changeFilter = (filterType, index) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (updatedFilters[filterType].includes(index)) {
        updatedFilters[filterType] = updatedFilters[filterType].filter((item) => item !== index);
      } else {
        updatedFilters[filterType] = [...updatedFilters[filterType], index];
      }
	  _changeEventsSelectedFilters(updatedFilters);
	//   info._setEventsFilters(updatedFilters);
      return updatedFilters;
    });
  };

  return (
    <View>
      {/* <Text style={styles.text}>
        {JSON.stringify(count.eventsSelectedFilters, null, 2)}
      </Text> */}
      {filters && (
        <View style={[styles.filtersContainer, { flexDirection: count.lng === "en" ? "row" : "row-reverse" }]}>
          {Object.keys(filters).map((filterKey) => (
            <View key={`filter-${filterKey}`} style={styles.filterBox}>
              <View style={styles.filterTitle}>
                <Text style={{ textAlign: count.lng === "en" ? "left" : "right" }}>{filterKey}</Text>
              </View>
              {Object.keys(filters[filterKey]).map((tagKey) => (
                <TouchableOpacity
                  key={`filterItem-${tagKey}`}
                  onPress={() => changeFilter(filterKey, tagKey)}
                  style={[
                    styles.filterTag,
                    { backgroundColor: isActive(filterKey, tagKey) ? "#000" : "#FFF" },
                  ]}
                >
                  {count.lines.taxonomy_terms[filterKey][tagKey] && (
                    <Text
                      style={{
                        textAlign: count.lng === "en" ? "left" : "right",
                        color: isActive(filterKey, tagKey) ? "#FFF" : "#000",
                      }}
                    >
                      {count.lines.taxonomy_terms[filterKey][tagKey][count.lng]}
                    </Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    margin: 10,
    fontSize: 16,
  },
  filtersContainer: {
    justifyContent: 'space-around',
  },
  filterBox: {
    margin: 10,
  },
  filterTitle: {
    marginBottom: 10,
  },
  filterTag: {
    padding: 5,
  },
});

export default Filters;
