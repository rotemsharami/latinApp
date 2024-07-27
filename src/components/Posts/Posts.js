import React, { useRef } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Animated, TouchableOpacity} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import {setArray, setTextDirection, setRowType, getPlayingHeight, getImageUrl, setAlignItems} from "../../tools/tools.js";
import {navigate} from "../../../RootNavigation";
const { width } = Dimensions.get('screen');
const logoWidth = width / 3;
import moment from 'moment';
import { LinearGradient } from 'expo-linear-gradient';

const Posts = () => {
    const count = useSelector((store) => store.count.count);

    return (
        <View style={[styles.container, { flex: 1 }]}>
            <ScrollView>
                {count.lines.posts.items.map((item, index) => (





                    <TouchableOpacity
						onPress={() => navigate("Post", {item: item})}
                        key={"article-"+index}

                    >

						<LinearGradient 
							colors={['#efdbf7','#FFF']}
							style={{
								width:"100%",
								flexDirection: setRowType(count.lng),
								padding:10
							}}
							
						>



                        <View style={styles.image}>
                            <Image
                                style={{ width: '100%', height: '100%' }}
                                source={{ uri: "https://latinet.co.il/" + item.general_image[0].uri }}
                            />
                        </View>

                        <View style={{
							flex: 1,
							paddingRight:10,
							paddingLeft:10,
							paddingTop:5,
							alignItems:setAlignItems(count.lng),
							
						}}>
                            <Text
								style={{
									fontSize:20,
									fontWeight:"bold",
									lineHeight:21
								}}
							>{item.title}</Text>

								<Text
								style={{
									fontSize:17,
									fontWeight:"normal",
									lineHeight:23
								}}
								>{item.published_by}</Text>
								<Text
								style={{
									fontSize:15,
									fontWeight:"normal",
									lineHeight:23
								}}
								>{moment(item.published_time, "YYYY-MM-DD").format("DD/MM/YYYY") }</Text>


                        </View>
						</LinearGradient>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default Posts;

const styles = StyleSheet.create({
    container: {
        flex: 1,
		
    },
    image: {
		height: 100,
		width: 100,
    },
});
