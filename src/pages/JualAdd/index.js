import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Linking,
    Alert,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import { windowWidth, fonts } from '../../utils/fonts';
import { apiURL, getData, MYAPP, storeData, urlAPI, urlApp, urlAvatar } from '../../utils/localStorage';
import { colors } from '../../utils/colors';
import { MyButton, MyGap, MyInput, MyPicker } from '../../components';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import { showMessage } from 'react-native-flash-message';
import 'intl';
import 'intl/locale-data/jsonp/en';

export default function JualAdd({ navigation, route }) {

    const [barang, setBarang] = useState([]);

    const [kirim, setKirim] = useState({
        fid_barang: '',
        harga: 0,
        jumlah: 0,
        total: 0
    });



    useEffect(() => {
        axios.post(apiURL + 'barang_get').then(rs => {
            console.log(rs.data);
            setBarang(rs.data);
            setKirim({
                ...kirim,
                fid_barang: rs.data[0].value
            })
        })
    }, [])

    const [loading, setLoading] = useState(false);
    const sendServer = () => {
        setLoading(true);
        console.log(kirim);
        axios.post(apiURL + 'jual_add', kirim).then(res => {

            setLoading(false);

            if (res.data.status == 200) {
                Alert.alert(MYAPP, res.data.message);
                console.log(res.data);

                navigation.goBack();
            } else {
                showMessage({
                    type: 'danger',
                    message: res.data.message
                })
            }
        })
    }

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: colors.white,
            padding: 10,
        }}>
            <ScrollView showsVerticalScrollIndicator={false}>


                <MyPicker label="Barang" value={kirim.fid_barang} onValueChange={x => setKirim({ ...kirim, fid_barang: x })} iconname="cube" data={barang} />
                <MyGap jarak={10} />
                <MyInput label="Harga" placeholder="Masukan harga" keyboardType='number-pad' iconname="pricetag" value={kirim.harga} onChangeText={x => setKirim({ ...kirim, harga: x })} />

                <MyGap jarak={10} />
                <MyInput label="Jumlah" placeholder="Masukan jumlah" keyboardType='number-pad' iconname="apps" value={kirim.jumlah} onChangeText={x => setKirim({ ...kirim, jumlah: x })} />
                <MyGap jarak={10} />
                <Text style={{
                    fontFamily: fonts.secondary[600],
                    fontSize: windowWidth / 20,
                    textAlign: 'center',
                    marginVertical: 10,
                }}>Rp{new Intl.NumberFormat().format(kirim.harga * kirim.jumlah)}</Text>
                <MyGap jarak={20} />
                {loading && <ActivityIndicator color={colors.primary} size="large" />}

                {!loading && <MyButton onPress={sendServer} title="Simpan Perubahan" Icons="download-outline" />}
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})