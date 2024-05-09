import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ImageBackground,
	TouchableOpacity,
    Linking,
	I18nManager
	} from 'react-native';

import React, {useRef, useState, useEffect} from 'react';
import {setArray} from "../../tools/tools.js";
import { Icon } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {LinearGradient} from 'expo-linear-gradient';

const {width, height} = Dimensions.get('screen');
const logoWidth = width/5;
const textWidth = width - logoWidth;
const ContactInfo = (organization) => {



    return(


        <LinearGradient style={styles.container}
            colors={['#9f86ab','#d8b8e7']}
        >


            <View style={styles.list}>
                {organization.organization.facebook != undefined &&
                    <TouchableOpacity onPress={() => { Linking.openURL(organization.organization.facebook); }}>
                        <View style={styles.listItem}>
                            <View style={styles.iconBox}>
                                <Icon style={styles.mainMenuListItemIcon} name='facebook' color='#FFF' size={30}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                }

                {organization.organization.phone_number != undefined &&
                    <TouchableOpacity onPress={() => { Linking.openURL(`tel:${organization.organization.phone_number}`); }}>
                        <View style={styles.listItem}>
                            <View style={styles.iconBox}>
                                <Icon style={styles.mainMenuListItemIcon} name='call' color='#FFF' size={30}/>
                            </View>
                        </View>
                    </TouchableOpacity>
                }

                {organization.organization.instegram != undefined &&
                    <TouchableOpacity onPress={() => { Linking.openURL(organization.organization.instegram); }}>
                        <View style={styles.listItem}>
                            <View style={styles.iconBox}>
                                <MaterialCommunityIcons name="instagram" size={30} color="#FFF" />
                            </View>
                        </View>
                    </TouchableOpacity>
                }

                {organization.organization.site != undefined &&
                    <TouchableOpacity onPress={() => { Linking.openURL(organization.organization.site); }}>
                        <View style={styles.listItem}>
                            <View style={styles.iconBox}>
                                <MaterialCommunityIcons name="web" size={30} color="#FFF" />
                            </View>
                        </View>
                    </TouchableOpacity>
                }


                {organization.organization.info_link != undefined &&
                    <TouchableOpacity onPress={() => { Linking.openURL(organization.organization.info_link); }}>
                        <View style={styles.listItem}>
                            <View style={styles.iconBox}>
                                <MaterialCommunityIcons name="credit-card-outline" size={30} color="#FFF" />
                            </View>
                        </View>
                    </TouchableOpacity>
                }





                {organization.organization.waze != undefined &&
                    <TouchableOpacity onPress={() => { Linking.openURL(organization.organization.waze); }}>
                        <View style={styles.listItem}>
                            <View style={styles.iconBox}>
                                <MaterialCommunityIcons name="waze" size={30} color="#FFF" />
                            </View>
                        </View>
                    </TouchableOpacity>
                }


                
            </View>



        </LinearGradient>
    );
}
export default ContactInfo;
const styles = StyleSheet.create({
    container:{
        borderTopColor:"#7f6c893",
        borderTopWidth:2,
        height:50
    },
    list:{
        flexDirection:'row',
        justifyContent:"space-around",
    },

    listItem:{
        flexDirection:'column',
        padding:10,
        height:48
    },


});