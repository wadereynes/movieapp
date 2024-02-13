import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Film = ({item}) => {
    const history = useNavigation();
    return (
        <TouchableOpacity onPress={() => history.navigate('detail', {id: item.imdbID})} style={style.container}>
            <View style={style.image_container}>
                <View style={style.category_container}>
                    <Text style={style.category}>{item.Year}</Text>
                </View>
                <Image source={{uri: item.Poster}} style={style.image}/>
            </View>
            <View style={style.details_container}>
                <Text style={style.title}>{item.Title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 10,
        marginVertical: 5,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 220,
        borderRadius: 5,
    },
    image_container: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        width: '100%',
        height: 230,
    },
    details_container: {
        marginBottom: 15,
    },
    title: {
        textAlign: 'center',
        fontSize: 14,
        fontWeight: '500',
    },
    category_container: {
        position: 'absolute',
        zIndex: 99999,
        backgroundColor: '#764abc',
        opacity: 0.7,
        paddingVertical: 5,
        paddingHorizontal: 10,
        top: 5,
        left: 5,
    },
    category: {
        fontSize: 12,
        textAlign: 'center',
        color: 'white',
        fontWeight: '700',
    },
    star_container: {
        position: 'absolute',
        right: 5,
        top: 5,
        zIndex: 99999,
        backgroundColor: '#ec712b',
        width: 40,
        height: 40,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    star: {
        fontSize: 14,
        color: 'white',
        fontWeight: '700',
        textAlign: 'center',
    }
});

export default Film;