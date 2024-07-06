import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ImageBackground,
	TouchableOpacity,
	I18nManager,
    useWindowDimensions,
    ScrollView,
    Linking
	} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import { setRowType, setTextDirection, setArray, nice_list_text} from '../../tools/tools';
import { Icon } from 'react-native-elements';
import { WebView } from 'react-native-webview';
import RenderHtml from 'react-native-render-html';
import Schedule from '../Schedule/Schedule.js';
import Prices from '../Prices/Prices.js';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
const {width, height} = Dimensions.get('screen');
const logoWidth = width/5;
const textWidth = width - logoWidth;
const renderersProps = {
    ul: {
      enableExperimentalRtl: true
    }
  };
const OrganizationStudies = (info) => {



	const count = useSelector((store) => store.count.count);
	const dir = setTextDirection(count.lng);

    
    
    
    const setText = (text) => {
        return {html:text}
    }
    return(
        <View style={styles.listBox}>

            <ScrollView>


                {setArray(info._organizationLearn).map((prop, key) => {
                return (
                    <TouchableOpacity key={prop.nid} style={styles.menuListItem} onPress={() => info._setSelectedLearn(prop.nid)}>
                        <View style={{
                            alignItems:"center",
                            backgroundColor: prop.nid == info._selectedLearn ? "#545454" : "#FFF",
                            padding:prop.nid == info._selectedLearn ? 10 : 5,
                            
                            
                        }}>
                            <Text style={{
                                fontSize:prop.nid == info._selectedLearn ? 20 : 15,
                                textAlign:"center",
                                color:prop.nid == info._selectedLearn ? "#FFF" : "#000",
                            }}>{count.lines.taxonomy_terms.cours_type[prop.course_type][count.lng]+" "+count.lines.taxonomy_terms.dance_floors[prop.dance_floors][count.lng]+" "+nice_list_text(prop.dance_level, count.lines.taxonomy_terms.dance_level, count.lng)}</Text>
                        
                        {prop.nid == info._selectedLearn && 
                        <View style={{
                            paddingBottom:5
                        }}>
                            <View style={{
                                paddingBottom:10,
                                paddingTop:5
                            }}>
                                <View style={styles.value}>
                                    <Text style={{
                                        textAlign:"center",
                                        color:"#FFF"
                                    }}>{moment(info._organizationLearn.filter(item => item.nid == info._selectedLearn)[0].starting_from, 'YYYY-MM-DD').format("DD/MM/YYYY")}</Text>
                                </View>
                            </View>

                            <View style={{
                                paddingBottom:10,
                            }}>
                                <View style={styles.value}>
                                    <Text style={{
                                        fontWeight:"normal",
                                        textAlign:"center",
                                        color:"#FFF"
                                    }}>{count.lines.global_metadata.labels[count.lng][13]+(count.lng == "he" ? "" : " ")+nice_list_text(prop.gender, count.lines.taxonomy_terms.gender, count.lng)}</Text>
                                </View>
                            </View>
                            

                            {info._organizationLearn.filter(item => item.nid == info._selectedLearn)[0].info_link != undefined &&
                                <TouchableOpacity
                                    style={{
                                        borderWidth:2,
                                        padding:3,
                                        paddingRight:10,
                                        paddingLeft:10,
                                        borderRadius:4,
                                        borderColor:"#f640b2",
                                        backgroundColor:"#000"
                                    }}
                                    onPress={() => { Linking.openURL(info._organizationLearn.filter(item => item.nid == info._selectedLearn)[0].info_link); }}
                                >
                
                                    <Text style={{
                                        fontSize:16,
                                        color:"#f640b2",
                                        fontWeight:"bold"
                                        }}
                                    >{count.lines.global_metadata.labels[count.lng][12]}</Text>

                                </TouchableOpacity>
                            }


                        </View>
                        }

                        </View>
                    </TouchableOpacity>
                );
                })}
            </ScrollView>
        </View>
    );
}
export default OrganizationStudies;
const styles = StyleSheet.create({
    studyTitle:{
        fontSize:16,
        textAlign:"center"
    },
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
        padding:10
    },
    fullInfoBox:{
        flex:1,

    },
    dance_floors:{
        marginTop:10,
        
    },
    danceFloorsText:{
        fontSize:30
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
});