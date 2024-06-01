import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { changeEventsSelectedFilters } from '../../actions/counterActions';
import { getPlayingHeight } from '../../tools/tools';

const { width, height } = Dimensions.get('screen');

const Filters = ({ type }) => {
  const count = useSelector((store) => store.count.count);
  const items = count.lines[type];
  const [filters, setFilters] = useState({});
  const dispatch = useDispatch();

  const initializeFilters = useCallback(() => {
    if (type === "events" && items) {
      let _filters = {};

      items.forEach(element => {
        if (element.dance_floors) {
          _filters.dance_floors = _filters.dance_floors || {};
          element.dance_floors.split(",").forEach(tag => {
            _filters.dance_floors[tag] = tag;
          });
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

      setFilters(_filters);
    }
  }, [items, type]);

  useEffect(() => {
    initializeFilters();
  }, [initializeFilters]);

  const changeFilter = (filterType, index) => {
    const updatedFilters = { ...count.eventsSelectedFilters };

    if (updatedFilters[filterType]?.includes(index)) {
      updatedFilters[filterType] = updatedFilters[filterType].filter(item => item !== index);
    } else {
      updatedFilters[filterType] = [...(updatedFilters[filterType] || []), index];
    }

    dispatch(changeEventsSelectedFilters(updatedFilters));
  };

  const isActive = (filterType, key) => {
    return count.eventsSelectedFilters[filterType]?.includes(key);
  };

  const setFilterTitle = (type) => {
    switch (type) {
      case "dance_floors":
        return count.lines.global_metadata.labels[count.lng][14];
      case "dance_services":
        return count.lines.global_metadata.labels[count.lng][15];
      case "services":
        return count.lines.global_metadata.labels[count.lng][16];
      default:
        return type;
    }
  };

  return (
    <View style={{
      backgroundColor: "#545454",
      paddingTop: 10,
      paddingBottom: 10,
      height: getPlayingHeight() - 40
    }}>
      {filters && (
        <View style={[styles.filtersContainer, { flexDirection: count.lng === "en" ? "row" : "row-reverse" }]}>
          {Object.keys(filters).map((filterKey) => (
            <View key={`filter-${filterKey}`} style={styles.filterBox}>
              <View style={styles.filterTitle}>
                <Text style={{
                  textAlign: count.lng === "en" ? "left" : "right",
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
                    styles.filterTag,
                    { backgroundColor: isActive(filterKey, tagKey) ? "#730874" : "#d3d3d3" },
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
  filtersContainer: {
    justifyContent: 'space-around',
  },
  filterBox: {},
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
