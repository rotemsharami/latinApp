import {
    StyleSheet,
    Text,
    View,
    Dimensions,
	TouchableOpacity,
	I18nManager,
	} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import { setRowType, getSelectedLang, setTextDirection, setArray, nice_list_text} from '../../tools/tools';
import Schedule from '../Schedule/Schedule.js';
import Prices from '../Prices/Prices.js';
import { useSelector, useDispatch } from 'react-redux';
const {width, height} = Dimensions.get('screen');

const OrganizationLines = (organizationLines) => {


	const count = useSelector((store) => store.count.count);

    return(
        <View style={styles.listBox}>
            <View style={{
					flexDirection: setRowType(count.lng),
				}}>
        {setArray(organizationLines.organizationLines.organizationLines).map((prop, key) => {
            let week_day = prop.week_day == "7" ? 0 : prop.week_day;
            return (
                <TouchableOpacity key={prop.nid} style={styles.menuListItem} onPress={() => {organizationLines._setSelectedLine(prop.nid)}}>
                    <View style={{
                        borderBottomWidth:prop.nid == organizationLines._selectedLine ? 3 : 0,
                        paddingRight:10,
                        paddingLeft:10,
                        marginLeft:  I18nManager.isRTL ? 0 : 0,
                        marginRight:  I18nManager.isRTL ? 0 : 0,
                        paddingBottom:3,
                    }}>
                        <Text style={{
                            fontSize:14,
                            fontWeight:"bold"
                        }}>{count.lines.global_metadata.days_of_week[count.lng][week_day]}</Text>
                    </View>
                </TouchableOpacity>
            );
        })}
            </View>
            {organizationLines.organizationLines.organizationLines.filter(item => item.nid == organizationLines._selectedLine).length > 0 && 
            <View style={styles.contentBox}>
                <View style={styles.dance_floors}>
                    <Text style={styles.danceFloorsText}>
                        {nice_list_text(
                            organizationLines.organizationLines.organizationLines.filter(item => item.nid == organizationLines._selectedLine)[0].dance_floors != null ? 
                            organizationLines.organizationLines.organizationLines.filter(item => item.nid == organizationLines._selectedLine)[0].dance_floors :
                            count.lines.organizations[organizationLines.organizationLines.organizationLines.filter(item => item.nid == organizationLines._selectedLine)[0].org_nid].dance_floors,
                            count.lines.taxonomy_terms.dance_floors,
                            count.lng)}
                        </Text>
                </View>
                <Schedule
                    opening={organizationLines.organizationLines.organizationLines.filter(item => item.nid == organizationLines._selectedLine)[0].opening}
                    lessons={organizationLines.organizationLines.organizationLines.filter(item => item.nid == organizationLines._selectedLine)[0].lessons}
                    party={organizationLines.organizationLines.organizationLines.filter(item => item.nid == organizationLines._selectedLine)[0].party}

                    ></Schedule>
                    
                    {count.lines.organizations[organizationLines.organizationLines.organizationLines.filter(item => item.nid == organizationLines._selectedLine)[0].org_nid].prices != undefined && 
                        <Prices
                            prices={count.lines.organizations[organizationLines.organizationLines.organizationLines.filter(item => item.nid == organizationLines._selectedLine)[0].org_nid].prices}
                        ></Prices>
                    }
                </View>
            }
        </View>
    );
}
export default OrganizationLines;
const styles = StyleSheet.create({
    menuList:{
        flexDirection:"row"
    },
    menuListItem:{
        flexDirection:"column"
    },
    listItem:{
        flex:1
    },
    listBox:{
        padding:10,
        height:height-110-100-30-50-70-2
        
    },
    fullInfoBox:{
        

    },
    dance_floors:{
        marginTop:10,
        
    },
    danceFloorsText:{
        fontSize:30,
        lineHeight:32,
    },
    list:{
        
    },
    iconAndDay:{
        flexDirection:"row"
    },
    iconBox:{
        flexDirection:"column"
    },
    textBox:{
        flexDirection:"column"
    },
    text:{
        paddingRight: I18nManager.isRTL ? 4 : 0,
        paddingLeft: I18nManager.isRTL ? 0 : 4,
        fontSize:15
    },
});