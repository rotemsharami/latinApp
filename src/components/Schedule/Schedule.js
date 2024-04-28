import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ImageBackground,
	TouchableOpacity,
	I18nManager
	} from 'react-native';

import React, {useRef, useState, useEffect} from 'react';
import {setArray, setTextDirection, setRowType} from "../../tools/tools.js";
import { Icon } from 'react-native-elements';
import RenderHtml from 'react-native-render-html';
import { useSelector, useDispatch } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const {width, height} = Dimensions.get('screen');
const logoWidth = width/5;
const textWidth = width - logoWidth;
const Schedule = (schedule) => {

    

	const count = useSelector((store) => store.count.count);
	const dir = setTextDirection(count.lng);
    const setText = (text) => {
        return {html:text}
    }

    const NumberToStringTime = (number) => {
        let intNumber = (parseInt(number) / 60) / 60;
        let hower = Math.floor(intNumber);
        let minuts =  Math.round((intNumber - hower) * 60);
        minuts = minuts == 0 ? "00" : minuts;
        return hower+":"+minuts;
    }

    return(
        <View style={styles.section}>
            <View style={styles.sectionTitle}>
                <Text style={styles.sectionTitleText}> {count.lines.global_metadata.labels[count.lng][1]}:</Text>
            </View>
            <View style={styles.scheduleList}>
                
                {schedule.opening != undefined &&
                        <View style={[styles.scheduleListItemIconAndLabel, {
                            flexDirection: count.lng == "en" ? "row" : "row-reverse",
                        }]}>
                        <View style={styles.scheduleListItemIcon}>
                            <MaterialCommunityIcons name="door-open" size={14} color="#000" />
                        </View>
                        
                        <View style={styles.scheduleListItemLabel}>
                            <Text>{count.lines.global_metadata.labels[count.lng][6]}:</Text>
                        </View>
                        <View style={styles.scheduleListItemHour}>
                            <Text>{NumberToStringTime(schedule.opening)}</Text>
                        </View>
                    </View>
                }
                {schedule.lessons != undefined &&
                        <View style={[styles.scheduleListItemIconAndLabel, {
                            flexDirection: count.lng == "en" ? "row" : "row-reverse",
                        }]}>
                        <View style={styles.scheduleListItemIcon}>
                            <MaterialCommunityIcons name="school" size={14} color="#000" />
                        </View>
                        <View style={styles.scheduleListItemLabel}>
                            <Text>{count.lines.global_metadata.labels[count.lng][7]}:</Text>
                        </View>
                        <View style={styles.scheduleListItemHour}>
                            <Text>{NumberToStringTime(schedule.lessons)}</Text>
                        </View>
                    </View>
                }
                {schedule.party != undefined &&

                        <View style={[styles.scheduleListItemIconAndLabel, {
                            flexDirection: count.lng == "en" ? "row" : "row-reverse",
                        }]}>
                        <View style={styles.scheduleListItemIcon}>
                            <MaterialCommunityIcons name="music" size={14} color="#000" />
                        </View>
                        <View style={styles.scheduleListItemLabel}>
                            <Text>{count.lines.global_metadata.labels[count.lng][8]}:</Text>
                        </View>
                        <View style={styles.scheduleListItemHour}>
                            <Text>{NumberToStringTime(schedule.party)}</Text>
                        </View>
                    </View>
                }
            </View>
        </View>
    );
}
export default Schedule;
const styles = StyleSheet.create({
    section:{

    },
    sectionTitleAndIcon:{
        flexDirection:"row"
    },
    sectionIcon:{
        
    },
    sectionTitle:{
        
    },
    sectionTitleText:{
        
    },
    scheduleList:{
        
    },

    scheduleListItem:{

    },

    scheduleListItemIconAndLabel:{
        
    },
    scheduleListItemIcon:{
        padding:1,
        paddingTop:5

    },

    scheduleListItemLabel:{
        width:100
    },



});
              
