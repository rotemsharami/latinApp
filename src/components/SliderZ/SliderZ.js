import React, { PureComponent, useRef, useState} from 'react';
import { View, Text, FlatList, StyleSheet, Animated, ImageBackground, TouchableOpacity} from 'react-native';
import SlideItem from '../SliderZ/SliderZItem';
import { setRowType, setTextDirection} from '../../tools/tools';
import { useSelector, useDispatch } from 'react-redux';
// Custom PureComponent for rendering each item
class MyListItem extends PureComponent {
	
  render() {
    const { item } = this.props;
    return (
		<ImageBackground source={{uri:"https://latinet.co.il/"+item.gallery[0]}} resizeMode="cover" style={styles.image}>
		<TouchableOpacity style={styles.logoAndTextBox} onPress={() => navigate("Organization", {nid: item.nid, type:"global", selectedNid:0})}>
		  <View style={{
			flexDirection: setRowType(),
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
  }
}

const SliderZ = ({ organizationsCarusel }) => {
const renderItem = ({ item }) => <MyListItem item={item} />;
const [index, setIndex] = useState(0);
const scrollX = useRef(new Animated.Value(0)).current;
const dataFetchedRef = useRef(false).current;


const handleOnScroll = event => {
	Animated.event([{
			nativeEvent: {
				contentOffset: {
					x: scrollX,
				},
			},
		},],{
		useNativeDriver: false,
	},
	)(event);
};

const handleOnViewableItemsChanged = useRef(({viewableItems}) => {
	
}).current;

const viewabilityConfig = useRef({
	itemVisiblePercentThreshold: 1,
}).current;



  return (
    <FlatList
      data={organizationsCarusel}
      renderItem={renderItem}
      keyExtractor={(item, index) => item.nid.toString()}
	  horizontal
	  vertical={false}
	  pagingEnabled
	  snapToAlignment="start"
	  showsHorizontalScrollIndicator={true}
	  onScroll={handleOnScroll}
	  viewabilityConfig={viewabilityConfig}
	  nestedScrollEnabled={false}

    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
  },
});

export default SliderZ;
