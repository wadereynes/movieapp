import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, SafeAreaView, Image, Platform, StatusBar, TouchableOpacity, ScrollView, Button} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { API_URL } from '../Config/Constants';

const Detail = props => {
    const id = props.route.params.id;
    const [loading,setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}&plot=full&i=${id}`)
        .then((response)=>response.json())
        .then((json)=>{setData(json); setLoading(false); })
        .catch((error) => console.log(error));
    }, [])

    if(loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{ fontSize:20 }}>Loading...</Text>
            </View>
        );
    }
    
    return (
        <SafeAreaView style={style.AndroidSafeArea}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ flex:1 }}>
            <View style={style.header}>
                <View style={style.controls}>
                    <TouchableOpacity
                        onPress={() => props.navigation.goBack()}
                        style={{
                            flexDirection: 'row', alignItems: 'center'
                        }}
                    >
                        <Icon name="chevron-left" size={20} color="white" />
                        <Text 
                        style={{ 
                            marginLeft: 10, color: 'white', fontSize: 16, fontWeight: '700'}}>Back</Text>
                    </TouchableOpacity>
                </View>
                <View style={style.overlay} />
                <Image source={{ uri: data.Poster }} resizeMode="cover" style={style.header_image} />

                <View style={style.informationImageContainer}>
                    <Image style={style.information_image} source={{ uri: data.Poster }} />
                </View>
                <View style={style.informationNameContainer}>
                    <Text style={style.informationName}>{data.Title}</Text>
                </View>
            </View>

            <View style={style.body}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{ flex:1 }} />
                    <View style={style.top_right}>
                        <View style={style.top_right_item}>
                            <Icon name="bullhorn" size={15} />
                            <Text style={style.top_right_item_text}>{data.Director}</Text>
                        </View>
                        <View style={style.top_right_item}>
                            <Icon name="calendar" size={15} />
                            <Text style={style.top_right_item_text}>
                            {data.Year}
                            </Text>
                        </View>
                        <View style={style.top_right_item}>
                            <Icon name="clock" size={15} />
                            <Text style={style.top_right_item_text}>{data.Runtime}</Text>
                        </View>
                        <View style={style.top_right_item}>
                            <Icon name="star" size={15} />
                            <Text style={style.top_right_item_text}>{data.imdbRating}/10</Text>
                        </View>
                    </View>
                </View>
                <View style={style.content}>
                    <Text style={style.content_text}>
                        {data.Plot}
                    </Text>
                </View>
            </View>
        </View>
        </ScrollView>
    </SafeAreaView>
    ); 
};

const style = StyleSheet.create({
    header: {},
    header_image: {
        width: '100%',
        height: 300,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 9,
        width: '100%',
        height: '100%',
    },
    playButtonContainer: {
        position: 'absolute',
        zIndex: 10,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    playButton: {
        width: 60,
        height: 60,
        borderRadius: 100,
        backgroundColor: '#db3069',
        justifyContent: 'center',
        alignItems: 'center',
    },
    controls: {
        position: 'absolute',
        zIndex: 11,
        flexDirection: 'row',
        justifyContent: 'space-between',
        top: 20,
        width: '100%',
        paddingHorizontal: 20,
    },
    information_image: {
        width: 100,
        height: 180,
        borderRadius: 5,
    },
    informationImageContainer: {
        position: 'absolute',
        bottom: -100,
        left: 30,
        zIndex: 11,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    informationNameContainer: {
        position: 'absolute',
        zIndex: 11,
        bottom: 20,
        right: 10,
        width: 230,
    },
    informationName: {
        fontSize: 18,
        fontWeight: '700',
        color: 'white',
    },
    body: {
        flex: 1,
    },
    top_right: {
        flex: 1.8,
        marginHorizontal: 60,
        paddingVertical: 20,
    },
    content: {},
    top_right_item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    top_right_item_text: {
        left: 10,
        textAlign: 'center',
    },
    content: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    content_text: {
        fontSize: 18,
        color: '#666',
    },
    casts: {
        marginTop: 20,
        flexDirection: 'row',
    },
    cast_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cast_image: {
        width: 100,
        height: 150,
    },
    cast_name: {
        fontSize: 12,
        marginTop: 5,
        fontWeight: '300',
        textAlign: 'center',
    },
    modalBody: {
        backgroundColor: 'white',
        height: 300,
        width: '100%',
    },
    modalContainer: {
        backgroundColor: 'white',
        height: 300,
        width: '100%',
    },
    modalCloseButton: {
        position: 'absolute',
        right: -10,
        top: -20,
        zIndex: 99999,
        width: 40,
        height: 40,
        backgroundColor: 'black',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    video: {
        height: 400,
        width: '100%',
    },
    AndroidSafeArea: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        flex: 1,
    }
});

export default Detail;