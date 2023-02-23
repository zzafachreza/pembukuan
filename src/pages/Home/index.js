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
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel';
import { SliderBox } from "react-native-image-slider-box";


export default function Home({ navigation }) {


  const [ENTRIES, SETENTITIES] = useState([]);
  const [user, setUser] = useState({});
  const isFocused = useIsFocused();
  useEffect(() => {

    __getTransaction();
    if (isFocused) {
      axios.post(apiURL + 'slider').then(res => {
        console.log(res.data)
        SETENTITIES(res.data);
      })
    }

  }, [isFocused]);

  const __getTransaction = () => {
    getData('user').then(res => {
      setUser(res);
    })



  }


  const [entries, setEntries] = useState([]);
  const carouselRef = useRef(null);

  const goForward = () => {
    carouselRef.current.snapToNext();
  };



  const MyMenu = ({ img, judul, onPress, desc }) => {
    return (
      <TouchableOpacity onPress={onPress} style={{
        width: windowWidth / 3.5,
      }} >
        <View style={{
          width: windowWidth / 3.5,
          borderWidth: 0,
          borderColor: colors.primary,
          backgroundColor: colors.primary,
          height: windowHeight / 7,
          borderRadius: 10,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Image source={img} style={{
            width: windowHeight / 6,
            height: windowHeight / 12,
            resizeMode: 'contain'
          }} />
        </View>
        <Text style={{
          marginTop: 5,
          fontFamily: fonts.secondary[600],
          color: colors.black,
          textAlign: 'center'

        }}>{judul}</Text>
      </TouchableOpacity>
    )
  }


  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: colors.white,
    }}>
      {/* header */}
      <View style={{
        backgroundColor: colors.primary,
        paddingHorizontal: 10,
        paddingVertical: 10,
      }}>

        <View style={{
          flexDirection: 'row',
        }}>
          <View style={{
            flex: 1,
          }}>
            <Text style={{
              fontFamily: fonts.secondary[400],
              fontSize: windowWidth / 28,
              color: colors.white
            }}>Selamat datang, {user.nama_lengkap}</Text>
            <Text style={{
              fontFamily: fonts.secondary[600],
              fontSize: windowWidth / 28,
              color: colors.white
            }}>{MYAPP}</Text>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('Account')} style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30
          }}>
            <Icon type='ionicon' name='person' color={colors.white} />

          </TouchableOpacity>

        </View>


      </View>
      <SliderBox
        images={ENTRIES}
        sliderBoxHeight={240}
        onCurrentImagePressed={index => console.warn(`image ${index} pressed`)}
        dotColor={colors.white}
        inactiveDotColor="#90A4AE"
      />

      <View style={{
        flex: 1,
        justifyContent: 'center'
      }}>
        <View style={{
          marginVertical: 10,
          flexDirection: 'row',
          padding: 10,
          justifyContent: 'space-around'
        }}>

          <TouchableOpacity onPress={() => navigation.navigate('Beli')} style={{
            width: windowWidth / 3.5,
          }} >
            <View style={{
              width: windowWidth / 3.5,
              borderWidth: 0,
              borderColor: colors.primary,
              backgroundColor: colors.primary,
              height: windowHeight / 7,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Image source={require('../../assets/A4.png')} style={{
                width: windowHeight / 6,
                height: windowHeight / 12,
                resizeMode: 'contain'
              }} />
            </View>
            <Text style={{
              marginTop: 5,
              fontFamily: fonts.secondary[600],
              color: colors.black,
              textAlign: 'center'

            }}>Pembelian</Text>
          </TouchableOpacity>


          <TouchableOpacity onPress={() => navigation.navigate('Jual')} style={{
            width: windowWidth / 3.5,
          }} >
            <View style={{
              width: windowWidth / 3.5,
              borderWidth: 0,
              borderColor: colors.primary,
              backgroundColor: colors.primary,
              height: windowHeight / 7,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Image source={require('../../assets/A2.png')} style={{
                width: windowHeight / 6,
                height: windowHeight / 12,
                resizeMode: 'contain'
              }} />
            </View>
            <Text style={{
              marginTop: 5,
              fontFamily: fonts.secondary[600],
              color: colors.black,
              textAlign: 'center'

            }}>Penjualan</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Riwayat')} style={{
            width: windowWidth / 3.5,
          }} >
            <View style={{
              width: windowWidth / 3.5,
              borderWidth: 0,
              borderColor: colors.primary,
              backgroundColor: colors.primary,
              height: windowHeight / 7,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Image source={require('../../assets/A3.png')} style={{
                width: windowHeight / 6,
                height: windowHeight / 12,
                resizeMode: 'contain'
              }} />
            </View>
            <Text style={{
              marginTop: 5,
              fontFamily: fonts.secondary[600],
              color: colors.black,
              textAlign: 'center'

            }}>Laporan Pembukuan</Text>
          </TouchableOpacity>




        </View>

        <View style={{
          marginVertical: 10,
          flexDirection: 'row',
          padding: 10,
          justifyContent: 'space-around'
        }}>

          <TouchableOpacity onPress={() => navigation.navigate('Barang')} style={{
            width: windowWidth / 3.5,
          }} >
            <View style={{
              width: windowWidth / 3.5,
              borderWidth: 0,
              borderColor: colors.primary,
              backgroundColor: colors.primary,
              height: windowHeight / 7,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Image source={require('../../assets/A6.png')} style={{
                width: windowHeight / 6,
                height: windowHeight / 12,
                resizeMode: 'contain'
              }} />
            </View>
            <Text style={{
              marginTop: 5,
              fontFamily: fonts.secondary[600],
              color: colors.black,
              textAlign: 'center'

            }}>Data Barang</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Slider')} style={{
            width: windowWidth / 3.5,
          }} >
            <View style={{
              width: windowWidth / 3.5,
              borderWidth: 0,
              borderColor: colors.primary,
              backgroundColor: colors.primary,
              height: windowHeight / 7,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Image source={require('../../assets/A1.png')} style={{
                width: windowHeight / 6,
                height: windowHeight / 12,
                resizeMode: 'contain'
              }} />
            </View>
            <Text style={{
              marginTop: 5,
              fontFamily: fonts.secondary[600],
              color: colors.black,
              textAlign: 'center'

            }}>Data Slider</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Pengguna')} style={{
            width: windowWidth / 3.5,
          }} >
            <View style={{
              width: windowWidth / 3.5,
              borderWidth: 0,
              borderColor: colors.primary,
              backgroundColor: colors.primary,
              height: windowHeight / 7,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Image source={require('../../assets/A5.png')} style={{
                width: windowHeight / 6,
                height: windowHeight / 12,
                resizeMode: 'contain'
              }} />
            </View>
            <Text style={{
              marginTop: 5,
              fontFamily: fonts.secondary[600],
              color: colors.black,
              textAlign: 'center'

            }}>Data Pengguna</Text>
          </TouchableOpacity>





        </View>
      </View>



    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: windowHeight,
    height: windowWidth / 2,
  },
  imageContainer: {
    flex: 1,
    marginBottom: 1, // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
});