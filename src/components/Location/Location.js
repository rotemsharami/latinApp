import {
    StyleSheet,
    Text,
    View,
    Linking,
    Dimensions,
    ImageBackground,
	TouchableOpacity,
	I18nManager
	} from 'react-native';

import {setArray} from "../../tools/tools.js";
import { Icon } from 'react-native-elements';
import { Flex } from '@react-native-material/core';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';

const {width, height} = Dimensions.get('screen');
const logoWidth = width/5;
const textWidth = width - logoWidth;
const Location = (organization) => {

    const count = useSelector((store) => store.count.count);


    return(
        <View style={styles.container}>
            <View style={[styles.iconAndText, {
                flexDirection: count.lng == "en" ? "row" :"row-reverse"
            }]}>
                <View style={styles.icon}>
                    <MaterialCommunityIcons name="map-marker" size={16} color="#730874" />
                </View>
                <View style={[styles.text, {
                    alignSelf:"flex-end"
                }]}>
                    <Text style={{fontWeight:"bold"}}>{organization.organization[count.lng].address}, {organization.organization[count.lng].city}</Text>
                </View>
            </View>
        </View>
    );
}
export default Location;
const styles = StyleSheet.create({
    iconAndText:{
        
    }
});