import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ImageBackground,
	TouchableOpacity,
	I18nManager
} from 'react-native';
import React from 'react';
import {navigate} from "../../../RootNavigation";
import { useSelector, useDispatch } from 'react-redux';
import { setRowType, getSelectedLang, setTextDirection} from '../../tools/tools';
const {width, height} = Dimensions.get('screen');
const logoWidth = 80;
const textWidth = 80; 




const SlideItem = ({item}) => {
	const lng = getSelectedLang();
	const count = useSelector((store) => store.count.count);
	const dir = setTextDirection(count.general.lng);
	//count.general.lng
    return (
		<ImageBackground source={{uri:"https://latinet.co.il/"+item.gallery[0]}} resizeMode="cover" style={styles.image}>
			<TouchableOpacity style={styles.logoAndTextBox} onPress={() => navigate("Organization", {nid: item.nid, type:"global", selectedNid:0})}>
				<View style={{
					flexDirection: setRowType(count.general.lng),
				}}>
					<View style={styles.logo}>
						<ImageBackground source={{uri:"https://latinet.co.il/"+item.general_image[0]}} resizeMode="cover" style={styles.logoImage}></ImageBackground>
					</View>
					<View style={styles.text}>
						<Text style={{
							paddingRight: lng =="he" ? 10 : 0,
							paddingLeft: lng =="he" ? 0 : 10,
							color: 'white',
							fontSize: 24,
							fontWeight: 'bold',
							textAlign: dir,
							direction:"ltr"
						}}>{item.title}</Text>
						<Text style={{
							paddingRight: lng =="he" ? 10 : 0,
							paddingLeft: lng =="he" ? 0 : 10,
							color: 'white',
							fontSize: 18,
							lineHeight:20,
							marginTop:5,
							marginBottom:5,
							textAlign: dir
						}}>{item.slogen}</Text>
					</View>
				</View>
			</TouchableOpacity>
		</ImageBackground>
    );
  };
  
  export default SlideItem;
  
  const styles = StyleSheet.create({
    image: {
		width:width,
		flex: 1,
		justifyContent: 'flex-end',
	},
	logoAndTextBox:{
		backgroundColor: '#000000c0',
		padding:10,
	},

	logo:{
		
	},

	logoImage:{
		width:logoWidth,
		height:logoWidth,
	},

    text: {
      color: 'white',
      justifyContent:"center",
	  height:logoWidth,
    },
    description: {
		marginTop:5,
		marginBottom:5,
    },
  });