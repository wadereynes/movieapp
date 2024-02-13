import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, Platform, StatusBar, View, Text, SafeAreaView, FlatList, ScrollView, TextInput, LogBox  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Film from '../Components/Film';
import { API_URL } from '../Config/Constants';
import { TouchableOpacity } from 'react-native-gesture-handler';



const Home = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const [searchData, setSearchData] = useState([]);
    const [search, setSearch] = useState("");
    const searchRef = useRef();
    const [visible, setVisible] = useState(false);
    const [oldData, setOldData] = useState([]);

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])


    useEffect(() => {
        fetch(`${API_URL}&s=batman`)
        .then((response)=>response.json())
        .then((json)=>{setData(json.Search); setOldData(json.Search); setLoading(false); })
        .catch((error) => console.log(error))
    }, [])


    const renderItem = ({ item }) => {
        return <Film item={item} />
    };

    if(loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{ fontSize:20 }}>Loading...</Text>
            </View>
        );
    }



    const handleSearchBtn = async() => {
        let res = await fetch(
            `${API_URL}&s=${search}`
        );
        let moviesData = await res.json()
        setData(moviesData.Search);
    };

    return (
        <SafeAreaView style={style.AndroidSafeArea}>
            <View>
                <Text style={style.header_title}>Movies</Text>
            </View>
            <View style={style.header}>
                
                <TextInput ref={searchRef}
                    placeholder="Search movie here..."
                    style={{ width: '90%', height: 50, borderRadius: 5, borderWidth: 0.5, flexDirection: 'row', alignItems: 'center', paddingLeft: 20 }}
                    value={search}
                    onChangeText={ txt => {
                        setSearch(txt);
                    }}
                />
                
                {search == '' ? 
                    <TouchableOpacity onPress={() => {
                        searchRef.current.clear();
                        setSearch('');
                        setData(oldData);
                    }}>
                        <Icon name="search" size={20} color="black" />
                    </TouchableOpacity>

                : (
                    <TouchableOpacity onPress={handleSearchBtn}>
                    <Icon name="search" size={20} color="black" />
                    </TouchableOpacity>
                    
                )}
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={style.body}>
                <View style={{paddingHorizontal: 20}}>
                    <Text style={style.body_title}>Films</Text>
                </View>
                <View style={{paddingHorizontal: 10, flex: 1}}>
                    <FlatList key={'_'} numColumns={2} data={data} renderItem={renderItem} showsHorizontalScrollIndicator={false}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 40,
        alignItems: 'center'
    },
    header_title: {
        fontSize: 20,
        fontWeight: '700',
        textTransform: 'uppercase',
        textAlign: 'center',
        paddingTop: 20,
        color: '#764abc',
    },
    body: {
        flex: 1,
    },
    body_title: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 20,
    },
    AndroidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    }
  });

export default Home;