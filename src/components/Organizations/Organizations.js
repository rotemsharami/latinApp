import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View, Dimensions, Animated, Easing, ImageBackground, TouchableOpacity, I18nManager, ScrollView, SafeAreaView, StatusBar, Pressable } from 'react-native';
import OrganizationBoxLink from '../OrganizationBoxLink/OrganizationBoxLink';
import { useSelector, useDispatch } from 'react-redux';
import { setArray, filterDataItem, setRowType, shuffle} from '../../tools/tools';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Filters from '../Filters/Filters';
import { changeOrganizationsSelectedFilters } from '../../actions/counterActions';

const { width, height } = Dimensions.get('window');

const Organizations = (info) => {
  const count = useSelector((store) => store.count.count);
  const [showFilter, setShowFilter] = useState(false);
  const [events, setEvents] = useState(undefined);
  const dispatch = useDispatch();

  const _changeEventsSelectedFilters = (eventsSelectedFilters) => {
    dispatch(changeOrganizationsSelectedFilters(eventsSelectedFilters));
  };

  const setFilterColor = () => {
    let result = false;
    if (Object.keys(count.organizationsSelectedFilters).length > 0) {
      Object.keys(count.organizationsSelectedFilters).forEach(key => {
        if (count.organizationsSelectedFilters[key].length > 0) {
          result = true;
        }
      });
    }
    return result;
  };

  const setFiltersResults = () => {
    if (events !== undefined)
      return events.length + " "+count.lines.global_metadata.labels[count.lng][22];
  };

  const filterAll = async () => {
    let filterdEvents = setArray(count.lines.organizations).filter((event) => {
      return filterDataItem(event, count.organizationsSelectedFilters);
    });


    return shuffle(filterdEvents);
  };

  useEffect(() => {
    if (events === undefined) {
      setEvents(setArray(count.lines.organizations));
    }
  }, [events]);

  useEffect(() => {
    filterAll().then(function (all) {
      setEvents(all);
    });
  }, [count.organizationsSelectedFilters]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 10,
        justifyContent: "space-between",
        height: 40,
        backgroundColor: "#d3d3d3",
        borderTopColor: "#000",
        borderTopWidth: 1,
        flexDirection: setRowType(count.lng),
      }}>
        {!showFilter && <View></View>}
        {showFilter &&
          <TouchableOpacity
            onPress={() => { setShowFilter(false); }}
            style={[styles.calenderListSwitch, {
              flexDirection: setRowType(count.lng),
              alignSelf: "center",
            }]}
          >
            <Text style={{
              textDecorationLine: 'underline',
              fontSize:14,
              fontWeight:"normal"
              }}>
              {setFiltersResults()}
            </Text>
          </TouchableOpacity>
        }
        <View style={{
          flexDirection: setRowType(count.lng),
          alignSelf: "center",
        }}>
							{setFilterColor() &&
							<TouchableOpacity
								onPress={() => {_changeEventsSelectedFilters({})}}
								

								style={{
									paddingTop:2,
									borderColor:"#730874",
									backgroundColor:"#730874",
									borderRadius:3,
									marginRight:3,
									marginLeft:3,
								}}
							>
								<MaterialCommunityIcons name="trash-can" size={22} color="#FFF" />
							</TouchableOpacity>
							}
          <TouchableOpacity
            onPress={() => { setShowFilter(showFilter ? false : true) }}
            style={{
              flexDirection: setRowType(count.lng),
              height: 27,
              paddingLeft: 2,
              paddingRight: 2,
              borderWidth: 2,
              borderRadius: 3,
              borderColor: showFilter ? (setFilterColor() ? "#730874" : "#545454") : (setFilterColor() ? "#730874" : "#545454"),
              backgroundColor: showFilter ? (setFilterColor() ? "#730874" : "#545454") : "#d3d3d3"
            }}
          >
            <View style={{
              paddingTop: 3,
              
            }}>
              <MaterialCommunityIcons name={showFilter ? "minus-circle" : "plus-circle"} size={16} color={showFilter ? "#fff" : (setFilterColor() ? "#730874" : "#545454")} />
            </View>
            <View>
              <Text style={{
                fontSize:14,
                paddingRight:2,
                paddingLeft:2,
                fontWeight:"normal",
                color: showFilter ? "#fff" : (setFilterColor() ? "#730874" : "#545454")
              }}>
                {count.lines.global_metadata.labels[count.lng][18]}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {showFilter &&
        <Filters type={"organizations"}></Filters>
      }
      {!showFilter &&
        <ScrollView style={{ flex: 1 }}
          accessible={true} accessibilityLabel="Organizations List"
        
        >
          {count.lines !== undefined &&
            <View>
              {count.lines.organizations !== undefined &&
                <View>
                  {setArray(events).map((item, key) => {
                    return (
                      <OrganizationBoxLink
                        _setOrganizationScreen={info._setOrganizationScreen}
                        _setSelectedScreen={info._setSelectedScreen}
                        _setOrganizationNid={info._setOrganizationNid}
                        organization={item}
                        key={"org-" + key}
                      />
                    );
                  })}
                </View>
              }
            </View>
          }
        </ScrollView>
      }
    </View>
  );
}

export default Organizations;

const styles = StyleSheet.create({
  calenderListSwitch: {
    // your custom styles for calenderListSwitch
  }
});
