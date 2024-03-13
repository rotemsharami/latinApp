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
import {setArray, getSelectedLang, setTextDirection, setRowType} from "../../tools/tools.js";
import { Icon } from 'react-native-elements';
import RenderHtml from 'react-native-render-html';
import { useSelector, useDispatch } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const {width, height} = Dimensions.get('screen');
const logoWidth = width/5;
const textWidth = width - logoWidth;
const Schedule = (schedule) => {
	const lng = getSelectedLang();
	const count = useSelector((store) => store.count.count);
	const dir = setTextDirection(count.general.lng);
    const setText = (text) => {
        return {html:text}
    }
    return(
        <View style={styles.section}>
            <View style={styles.sectionTitle}>
                <Text style={styles.sectionTitleText}> {schedule.schedule.labels[4]}:</Text>
            </View>
            <View style={styles.scheduleList}>
                <View style={styles.scheduleListItemIconAndLabel}>
                    <View style={styles.scheduleListItemIcon}>
                        <MaterialCommunityIcons name="door-open" size={14} color="#000" />
                    </View>
                    <View style={styles.scheduleListItemLabel}>
                        <Text>Opening:</Text>
                    </View>
                    <View style={styles.scheduleListItemLabel}>
                        <Text>21:00</Text>
                    </View>
                </View>
                <View style={styles.scheduleListItemIconAndLabel}>
                    <View style={styles.scheduleListItemIcon}>
                        <MaterialCommunityIcons name="school" size={14} color="#000" />
                    </View>
                    <View style={styles.scheduleListItemLabel}>
                        <Text>Lessons:</Text>
                    </View>
                    <View style={styles.scheduleListItemLabel}>
                        <Text>21:30</Text>
                    </View>
                </View>
                <View style={styles.scheduleListItemIconAndLabel}>
                    <View style={styles.scheduleListItemIcon}>
                        <MaterialCommunityIcons name="music" size={14} color="#000" />
                    </View>
                    <View style={styles.scheduleListItemLabel}>
                        <Text>Party:</Text>
                    </View>
                    <View style={styles.scheduleListItemLabel}>
                        <Text>22:30</Text>
                    </View>
                </View>
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
        flexDirection:"row"
    },
    scheduleListItemIcon:{
        padding:1,
        paddingTop:5

    },

    scheduleListItemLabel:{
        padding:2,
        width:60
    },



});
              
