import {React, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Image,StyleSheet,Text,View,Dimensions,Animated,Easing,ImageBackground,TouchableOpacity,I18nManager,ScrollView, SafeAreaView, StatusBar, Pressable} from 'react-native';
import OrganizationBoxLink from '../OrganizationBoxLink/OrganizationBoxLink';
import LearnBoxLink from '../LearnBoxLink/LearnBoxLink';
import { changeLearnsSelectedFilters } from '../../actions/counterActions';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Filters from '../Filters/Filters';
import { useSelector, useDispatch } from 'react-redux';
import { setArray, filterDataItem } from '../../tools/tools';

const Learns = (info) => {
	const count = useSelector((store) => store.count.count);
	const [events, setEvents] = useState(undefined);
	const [showFilter, setShowFilter] = useState(false);
  	const dispatch = useDispatch();

	const _changeLearnsSelectedFilters = (learnSelectedFilters) => {
		dispatch(changeLearnsSelectedFilters(learnSelectedFilters));
	};

  const setFilterColor = () => {
    let result = false;
    if (Object.keys(count.learnsSelectedFilters).length > 0) {
      Object.keys(count.learnsSelectedFilters).forEach(key => {
        if (count.learnsSelectedFilters[key].length > 0) {
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
    let filterdEvents = count.lines.learn.filter((item) => {
      return filterDataItem(item, count.learnsSelectedFilters);
    });
	
    return filterdEvents;
  };

  useEffect(() => {
    if (events === undefined) {
      if(count.lines.learn != undefined)
        setEvents(setArray(count.lines.learn));
    }
  }, [events]);

  useEffect(() => {
    if(count.lines.learn != undefined){
      filterAll().then(function (all) {
        setEvents(all);
      });
    }
  }, [count.learnsSelectedFilters]);

	
	return(

	<View style={{ flex: 1 }}>
      {events != undefined && 
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
        flexDirection: count.lng === "en" ? "row" : "row-reverse",
      }}>
        {!showFilter && <View></View>}
        {(showFilter) && 
          <TouchableOpacity
            onPress={() => { setShowFilter(false); }}
            style={[styles.calenderListSwitch, {
              flexDirection: count.lng === "en" ? "row" : "row-reverse",
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
          flexDirection: count.lng === "en" ? "row" : "row-reverse",
          alignSelf: "center",
        }}>
          {setFilterColor() &&
            <TouchableOpacity
              onPress={() => { _changeLearnsSelectedFilters({}) }}
              style={{
                borderWidth: 2,
                borderColor: "#730874",
                backgroundColor: "#730874",
                borderRadius: 3,
                marginRight: 3,
                marginLeft: 3,
              }}
            >
              <MaterialCommunityIcons name="trash-can" size={18} color="#FFF" />
            </TouchableOpacity>
          }
          <TouchableOpacity
            onPress={() => { setShowFilter(showFilter ? false : true) }}
            style={{
              flexDirection: count.lng === "en" ? "row" : "row-reverse",
              height: 27,
              paddingLeft: count.lng === "en" ? 0 : 2,
              paddingRight: count.lng === "en" ? 2 : 0,
              borderWidth: 2,
              borderRadius: 3,
              borderColor: showFilter ? (setFilterColor() ? "#730874" : "#545454") : (setFilterColor() ? "#730874" : "#545454"),
              backgroundColor: showFilter ? (setFilterColor() ? "#730874" : "#545454") : "#d3d3d3"
            }}
          >
            <View style={{
              paddingTop: 2,
              paddingLeft: count.lng === "en" ? 0 : 2,
              paddingRight: count.lng === "en" ? 2 : 0,
            }}>
              <MaterialCommunityIcons name={showFilter ? "minus-circle" : "plus-circle"} size={16} color={showFilter ? "#fff" : (setFilterColor() ? "#730874" : "#545454")} />
            </View>
            <View>
              <Text style={{
                fontSize:14,
                fontWeight:"normal",
                color: showFilter ? "#fff" : (setFilterColor() ? "#730874" : "#545454")
              }}>
                {count.lines.global_metadata.labels[count.lng][18]}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      }
      {(showFilter && events != undefined) &&
        <Filters type={"learn"}></Filters>
      }
      {!showFilter &&



		<ScrollView>

			{events != undefined &&
				<View>

				{events != undefined &&
					<View>
						        
						{events.map((item, key) => {
							return (
								<LearnBoxLink _setOrganizationScreen={info._setOrganizationScreen} _setSelectedScreen={info._setSelectedScreen} _setOrganizationNid={info._setOrganizationNid} organization={item} key={"org-"+key}></LearnBoxLink>
								//<OrganizationBoxLink organization={item} key={"org-"+key}></OrganizationBoxLink>
								
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


export default Learns;
const styles = StyleSheet.create({
	calenderListSwitch: {
	  // your custom styles for calenderListSwitch
	}
  });