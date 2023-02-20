import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { apiURL, getData, storeData } from '../../utils/localStorage';
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

export default function Riwayat({ navigation }) {

    const isFocused = useIsFocused();

    const [data, setData] = useState([]);
    const [data2, setData2] = useState([]);
    let totalBeli = 0;
    let totalJual = 0;
    useEffect(() => {

        if (isFocused) {
            axios.post(apiURL + 'beli').then(res => {
                console.log(res.data);
                setData(res.data);

            })

            axios.post(apiURL + 'jual').then(res => {
                console.log(res.data);
                setData2(res.data);

            })
        }

    }, [isFocused]);

    data.map(i => {
        totalBeli += parseFloat(i.total);
    })
    data2.map(i => {
        totalJual += parseFloat(i.total);
    })


    const __renderItem = ({ item }) => {

        return (
            <View style={{
                borderBottomWidth: 1,
                borderBottomColor: colors.zavalabs,
                marginVertical: 5,
                paddingVertical: 5,
                flexDirection: 'row'
            }}>
                <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[400],
                    fontSize: windowWidth / 30,
                    color: colors.black
                }}>{item.tanggal}</Text>
                <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[400],
                    fontSize: windowWidth / 30,
                    color: colors.black
                }}>{item.nama_barang}</Text>
                <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[400],
                    fontSize: windowWidth / 30,
                    color: colors.black
                }}>{new Intl.NumberFormat().format(item.harga)} x {new Intl.NumberFormat().format(item.jumlah)}</Text>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 30,
                    color: colors.black
                }}>Rp{new Intl.NumberFormat().format(item.total)}</Text>
            </View>
        )

    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.border,
            padding: 10,
        }}>
            <View style={{
                flex: 1,
                marginVertical: 5,
                backgroundColor: colors.white,
                padding: 10,
                borderRadius: 10,
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 20,
                    color: colors.primary
                }}>Pembelian</Text>
                <FlatList data={data} renderItem={__renderItem} />
                <View style={{
                    flexDirection: 'row',
                    paddingVertical: 10,
                }}>
                    <Text style={{
                        flex: 1,
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 25,
                        color: colors.black
                    }}>Total</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 20,
                        color: colors.black
                    }}>Rp{new Intl.NumberFormat().format(totalBeli)}</Text>
                </View>
            </View>

            <View style={{
                flex: 1,
                marginVertical: 5,
                backgroundColor: colors.white,
                padding: 10,
                borderRadius: 10,
            }}>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 20,
                    color: colors.primary
                }}>Penjualan</Text>
                <FlatList data={data2} renderItem={__renderItem} />
                <View style={{
                    flexDirection: 'row',
                    paddingVertical: 10,
                }}>
                    <Text style={{
                        flex: 1,
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 25,
                        color: colors.black
                    }}>Total</Text>
                    <Text style={{
                        fontFamily: fonts.secondary[600],
                        fontSize: windowWidth / 20,
                        color: colors.black
                    }}>Rp{new Intl.NumberFormat().format(totalJual)}</Text>
                </View>
            </View>
            <View style={{
                flexDirection: 'row',
                paddingVertical: 10,
                backgroundColor: colors.white,
                padding: 10,
                borderRadius: 10,
            }}>
                <Text style={{
                    flex: 1,
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 20,
                    color: colors.primary
                }}>Keuntungan</Text>
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 20,
                    color: colors.danger
                }}>Rp{new Intl.NumberFormat().format(totalJual - totalBeli)}</Text>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})