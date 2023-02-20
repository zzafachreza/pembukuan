import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, MYAPP, storeData } from '../../utils/localStorage';
import { colors, fonts, windowHeight, windowWidth } from '../../utils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { showMessage } from 'react-native-flash-message';
import Sound from 'react-native-sound';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import { MyButton, MyGap, MyInput } from '../../components';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { FloatingAction } from "react-native-floating-action";
import 'intl';
import 'intl/locale-data/jsonp/en';

export default function Jual({ navigation }) {

    const isFocused = useIsFocused();

    const [data, setData] = useState([]);

    useEffect(() => {

        if (isFocused) {
            getTransaction();
        }


    }, [isFocused]);


    const getTransaction = () => {
        axios.post(apiURL + 'jual').then(res => {
            console.log(res.data);
            setData(res.data);
        })
    }


    const __renderItem = ({ item }) => {

        return (
            <View style={{
                borderBottomWidth: 1,
                borderBottomColor: colors.zavalabs,
                backgroundColor: colors.white,
                padding: 15,
                marginVertical: 2,
                flexDirection: 'row'
            }}>

                <View style={{
                    flex: 1,
                }}>
                    <Text style={{
                        color: colors.black,
                        fontFamily: fonts.secondary[400],
                        fontSize: windowWidth / 25,
                    }}>{item.tanggal} {item.jam} </Text>
                    <Text style={{
                        color: colors.black,
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 25,
                    }}>{item.nama_barang}</Text>

                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <Text style={{
                            color: colors.black,
                            fontFamily: fonts.secondary[400],
                            fontSize: windowWidth / 25,
                        }}>{new Intl.NumberFormat().format(item.harga)}</Text>
                        <Text style={{
                            color: colors.black,
                            fontFamily: fonts.secondary[400],
                            fontSize: windowWidth / 25,
                        }}> x </Text>
                        <Text style={{
                            color: colors.black,
                            fontFamily: fonts.secondary[400],
                            fontSize: windowWidth / 25,
                        }}>{new Intl.NumberFormat().format(item.jumlah)}</Text>
                    </View>

                </View>
                <View style={{
                    flex: 1,
                }}>
                    <Text style={{
                        color: colors.black,
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 20,
                    }}>Rp{new Intl.NumberFormat().format(item.total)}</Text>

                </View>


                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity onPress={() => Alert.alert(MYAPP, 'Apakah kamu yakin akan hapus ini ?', [
                        {
                            style: 'cancel',
                            text: 'Batal'
                        },
                        {
                            style: 'default',
                            text: 'Hapus',
                            onPress: () => {

                                console.log(item.id);
                                axios.post(apiURL + 'beli_delete', {
                                    id: item.id
                                }).then(res => {
                                    console.log(res.data);
                                    getTransaction();

                                    showMessage({
                                        type: 'success',
                                        message: 'Data berhasil dihapus !'
                                    })
                                })

                            }
                        }
                    ])}>
                        <Icon type='ionicon' name='trash' color={colors.danger} />
                    </TouchableOpacity>
                </View>

            </View>
        )

    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.zavalabs,
            padding: 10,
        }}>
            <FlatList data={data} renderItem={__renderItem} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})