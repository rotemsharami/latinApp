import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ImageBackground,
	TouchableOpacity,
	I18nManager,
    useWindowDimensions
	} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import { setRowType, getSelectedLang, setTextDirection, setArray, nice_list_text} from '../../tools/tools';
import { Icon } from 'react-native-elements';
import { WebView } from 'react-native-webview';
import RenderHtml from 'react-native-render-html';
import Schedule from '../Schedule/Schedule.js';
import Prices from '../Prices/Prices.js';
import { useSelector, useDispatch } from 'react-redux';
const {width, height} = Dimensions.get('screen');
const logoWidth = width/5;
const textWidth = width - logoWidth;
const renderersProps = {
    ul: {
      enableExperimentalRtl: true
    }
  };
const OrganizationStudies = (organizationStudies) => {


    const lng = getSelectedLang();
	const count = useSelector((store) => store.count.count);
	const dir = setTextDirection(count.general.lng);
    const { widthA } = useWindowDimensions();
    const [selectedLine, setSelectedLine] = useState(organizationStudies.organizationStudies.selectedNid != 0 ? organizationStudies.organizationStudies.selectedNid : setArray(organizationStudies.organizationStudies.organizationStudies)[0].nid);
    const setText = (text) => {
        return {html:text}
    }
    return(
        <View style={styles.listBox}>
            <View style={{
					flexDirection: setRowType(count.general.lng),
				}}>
        {setArray(organizationStudies.organizationStudies.organizationStudies).map((prop, key) => {
            return (
                <TouchableOpacity key={prop.nid} style={styles.menuListItem} onPress={() => setSelectedLine(prop.nid)}>
                    <View style={{
                        borderBottomWidth:prop.nid == selectedLine ? 3 : 0,
                        paddingRight:10,
                        paddingLeft:10,
                        marginLeft:  I18nManager.isRTL ? 0 : 0,
                        marginRight:  I18nManager.isRTL ? 0 : 0,
                        paddingBottom:3,
                    }}>
                        
                        <Text style={styles.studyTitle}>{prop.course_type[0].name} {nice_list_text(prop.course_dance_style)}</Text>
                    </View>
                </TouchableOpacity>
            );
        })}
            </View>
            <View style={styles.contentBox}>

                <View style={styles.starting_from}>
                    <View style={styles.label}>
                        <Text>Starting From:</Text>
                    </View>
                    <View style={styles.value}>
                        <Text style={styles.dayText}>{organizationStudies.organizationStudies.organizationStudies.filter(item => item.nid == selectedLine)[0].starting_from}</Text>
                    </View>
                </View>

                <View style={styles.danse_level}>
                    <View style={styles.label}>
                        <Text>Level:</Text>
                    </View>
                    <View style={styles.value}>
                        <Text style={styles.danceFloorsText}>{nice_list_text(organizationStudies.organizationStudies.organizationStudies.filter(item => item.nid == selectedLine)[0].danse_level)}</Text>
                    </View>
                </View>



                <View style={styles.gender}>
                    <View style={styles.label}>
                        <Text>Gender:</Text>
                    </View>
                    <View style={styles.value}>
                        <Text style={styles.danceFloorsText}>{nice_list_text(organizationStudies.organizationStudies.organizationStudies.filter(item => item.nid == selectedLine)[0].gender)}</Text>
                    </View>
                </View>


                <View style={styles.fullInfoBox}>
                    <RenderHtml
                        contentWidth={width}
                        source={setText(setArray(organizationStudies.organizationStudies.organizationStudies).filter(item => item.nid == selectedLine)[0].text)}
                        enableExperimentalMarginCollapsing={true}
                        tagsStyles={{
                            li:{
                                paddingLeft:5,
                                textAlign:dir,
                                direction:"ltr",
                            },
                            ul:{
                                direction:"ltr",
                                alignContent:"flex-end"
                            }
                        }}
                        renderersProps={renderersProps}
                        style={{backgroundColor:"none"}}
                    />
                </View>


                

                {setArray(organizationStudies.organizationStudies.organizationStudies).filter(item => item.nid == selectedLine)[0].syllabus.map((prop, key) => {
            return (
                <View style={styles.listItem} key={key}>
                    <View style={styles.iconBox}>
                        <Icon style={styles.mainMenuListItemIcon}
                            name='check-circle'
                            color={prop.active ? "#ed60d6" : "#000"}
                            size={17}/>
                    </View>
                    <View style={styles.textBox}>
                        <Text style={{
                                alignItems:"center",
                                paddingRight: I18nManager.isRTL ? 4 : 0,
                                paddingLeft: I18nManager.isRTL ? 0 : 4,
                                fontSize:11,
                                color: prop.active ? "#fff" : "#000",
                                textAlign: 'center',
                                }}
                        >{prop.title}</Text>
                    </View>
                </View>
            );
        })}







                <Prices prices={{labels:organizationStudies.organizationStudies.labels, prices:setArray(organizationStudies.organizationStudies.organizationStudies).filter(item => item.nid == selectedLine)[0].tickets}}></Prices>
            </View>
        </View>
    );
}
export default OrganizationStudies;
const styles = StyleSheet.create({
    studyTitle:{
        fontSize:16
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