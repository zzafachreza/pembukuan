import { Alert, StyleSheet, Text, View, Image, FlatList, ActivityIndicator, Dimensions, TextInput } from 'react-native'
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
import DatePicker from 'react-native-datepicker'
import moment from 'moment';

export default function Jual({ navigation }) {

    const isFocused = useIsFocused();

    const [data, setData] = useState([]);

    useEffect(() => {

        if (isFocused) {
            getTransaction();
        }


    }, [isFocused]);

    const [filter, setFilter] = useState({
        awal: moment().format('YYYY-MM-DD'),
        akhir: moment().format('YYYY-MM-DD'),
        key: '',
    })

    const [tmp, setTmp] = useState([]);
    const getTransaction = () => {

        getData('user').then(u => {

            axios.post(apiURL + 'jual',
                {
                    fid_user: u.id
                }).then(res => {
                    console.log(res.data);
                    setTmp(res.data);
                    setData(res.data);
                })
        })

    }



    const cariData = () => {
        getData('user').then(u => {
            axios.post(apiURL + 'jual', {
                fid_user: u.id,
                awal: filter.awal,
                akhir: filter.akhir,
            }).then(res => {
                console.log('brli', res.data);
                setData(res.data);
            })
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

            <View style={{
                flexDirection: 'row',
                marginBottom: 10,
            }}>
                <View style={{
                    flex: 1,
                }}>
                    <DatePicker
                        style={{ width: '100%' }}
                        showIcon={false}
                        date={filter.awal}
                        mode="date"
                        format="YYYY-MM-DD"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 0,
                                borderRadius: 10,
                            }
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => { setFilter({ ...filter, awal: date }) }}
                    />
                </View>
                <View style={{
                    flex: 1,
                    paddingLeft: 5,
                }}>
                    <DatePicker
                        style={{ width: '100%' }}
                        showIcon={false}
                        date={filter.akhir}
                        mode="date"
                        format="YYYY-MM-DD"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"

                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 0,
                                borderRadius: 10,
                            }
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => { setFilter({ ...filter, akhir: date }) }}
                    />
                </View>

                <TouchableOpacity onPress={cariData} style={{
                    flex: 1,
                    backgroundColor: colors.primary,
                    marginLeft: 5,
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Icon type='ionicon' name='search' color={colors.white} />
                </TouchableOpacity>

            </View>
            <View style={{
                marginBottom: 10,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: colors.border,
            }}>
                <TextInput onChangeText={x => {

                    if (x.length > 0) {
                        const filtered = data.filter(i => i.nama_barang.toLowerCase().indexOf(x.toLowerCase()) > -1);
                        console.log(filtered.length);
                        if (filtered.length == 0) {
                            setData(tmp)
                        } else {
                            setData(filtered)
                        }

                    } else {
                        setData(tmp)
                    }

                }} placeholder='Cari barang' style={{
                    marginLeft: 5,
                    height: 40,
                    fontFamily: fonts.secondary[400],
                    fontSize: 16
                }} />
            </View>
            <FlatList data={data} renderItem={__renderItem} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})