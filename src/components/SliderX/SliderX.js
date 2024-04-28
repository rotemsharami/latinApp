import {Animated, FlatList, StyleSheet, Text, View, Dimensions} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import SlideItem from './SliderXItem';
const {width, height} = Dimensions.get('screen');
const SliderX = (gallery) => {

	

	const [data, setData] = useState([]);
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
		setIndex(viewableItems[0].index);
	}).current;

	const viewabilityConfig = useRef({
		itemVisiblePercentThreshold: 50,
	}).current;

	return (
		<View style={styles.container}>
			<FlatList
				data={gallery.gallery.split(",")}
				renderItem={({item}) => <SlideItem item={item} />}
				horizontal
				pagingEnabled
				snapToAlignment="start"
				showsHorizontalScrollIndicator={false}
				onScroll={handleOnScroll}
				viewabilityConfig={viewabilityConfig}
			/>
		</View>
	);
};

export default SliderX;
const styles = StyleSheet.create({
	container:{
		height:height/3,
	}
});