import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, Platform, StatusBar, View, Text, SafeAreaView, FlatList, ScrollView, TextInput, LogBox  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Film from '../Components/Film';
import { API_URL } from '../Config/Constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';



const Home = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const [searchData, setSearchData] = useState([]);
    const [search, setSearch] = useState("");
    const searchRef = useRef();
    const [visible, setVisible] = useState(false);
    const [oldData, setOldData] = useState([]);


    const [page, setPage] = useState(1);
    const [dataLoading, setDataLoading] = useState(false);

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async() => {
        try {
            let query;
            if (search == '') {
                query = 'batman';
            } else {
                query = search;
            }
            setDataLoading(true);
            const response = await fetch(
                `${API_URL}&s=${query}&page=${page}`
            );

            const datalist = await response.json();

            setData(prevData => [...prevData, ...datalist.Search]);
            setOldData(prevData => [...prevData, ...datalist.Search]);
            setDataLoading(false);
            setLoading(false)
        } catch (error) {
            console.error('Error fetching data: ', error);
            setDataLoading(false);
            setLoading(false);
        }
    }

    const handleLoadMore = () => {
        if (!dataLoading) {
            setPage(prevPage => prevPage + 1);
            console.log("Page: "+ page);
            fetchData();
        }
    }


    const renderItem = ({ item }) => {
        return <Film item={item} />
    };

    if(loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Progress.CircleSnail size={100} thickness={5} color={'rgba(118, 74, 188, 1)'} />
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
                    <FlatList key={'_'}
                     numColumns={2}
                      data={data}
                    //   initialNumToRender={10}
                    renderItem={renderItem}
                     showsHorizontalScrollIndicator={false}
                    //  onEndReached={handleLoadMore}
                    //  onEndReachedThreshold={0.5}
                     ListFooterComponent={() => (
                        <TouchableOpacity
                            style={style.loadMoreButton}
                            onPress={handleLoadMore}
                        >
                            <Text style={style.loadMoreButtonText}>{dataLoading ? 'Loading...' : 'Load More'}</Text>

                        </TouchableOpacity>
                     )}
                     />
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
    loadMoreButton: {
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#764abc',
        width: '100%',
        borderRadius: 5,
        marginBottom: 10,
    },
    loadMoreButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    AndroidSafeArea: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    }
  });

export default Home;