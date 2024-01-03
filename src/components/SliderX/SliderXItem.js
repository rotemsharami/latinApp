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
  const {width, height} = Dimensions.get('screen');
  const logoWidth = width / 5;
  const textWidth = width - logoWidth; 
  const SlideItem = ({item}) => {


    return (
		<ImageBackground source={{uri:"https://latinet.co.il/"+item}} resizeMode="cover" style={styles.image}></ImageBackground>
    );
  };
  export default SlideItem;
  const styles = StyleSheet.create({
    image: {
		width:width,
		flex: 1,
		justifyContent: 'flex-end',
	},
  });