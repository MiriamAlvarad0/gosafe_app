import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Inter_400Regular } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const PerfilUsuario = ({ navigation }) => {
    let [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_700Bold,
        Inter_400Regular,
    });

    const { user, logout } = useAuth();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (user && user.id) {
            const fetchUserData = async () => {
                try {
                    console.log(`Fetching user data for user ID: ${user.id}`);
                    const response = await api.get(`/pasajeros/${user.id}`);
                    console.log('Response data:', response.data);
                    setUserData(response.data); 
                } catch (error) {
                    console.error('Error al cargar los datos del usuario:', error);
                    Alert.alert("Error", "No se pudieron cargar los datos del usuario.");
                }
            };

            fetchUserData();
        } else {
            console.error('No user ID found');
            Alert.alert("Error", "No se pudo obtener el ID del usuario.");
        }
    }, [user]);

    if (!fontsLoaded || !userData) {
        return <AppLoading />;
    }

    const handleLogout = () => {
        logout();
    };

    return (
        <View style={styles.container}>
            <MaterialCommunityIcons name="account-box" size={150} color={"#4ba961"} />
            
            <View style={styles.nameContainer}>
                <Text style={styles.nameText}>{userData.nombre_completo || "Nombre Completo"}</Text>
            </View>

            <View style={styles.lineav} />

            <View style={styles.infocontainer}>
                <View style={styles.icontextcontainer}>
                    <MaterialCommunityIcons style={{ marginBottom: 20 }} name="email" size={40} color={"#4ba961"} />
                    <Text style={styles.textInfo}>{userData.correo || "correo@example.com"}</Text>
                </View>

                <View style={styles.icontextcontainer}>
                    <MaterialCommunityIcons name="phone" size={40} color={"#4ba961"} />
                    <Text style={styles.textInfo}>{userData.telefono || "0000000000"}</Text>
                </View>

                <TouchableOpacity style={styles.botoncambiar} onPress={() => navigation.navigate('ChangePassword')}>
                    <Text style={{ color: "#fffafa", fontFamily: "Poppins_700Bold" }}>Cambiar Contraseña</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botoncerrar} onPress={handleLogout}>
                    <Text style={{ color: "#fffafa", fontFamily: "Poppins_700Bold" }}>Cerrar Sesión</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fffafa',
        padding: 8,
        marginTop: 50
    },
    nameContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    nameText: {
        fontSize: 24,
        textAlign: 'center',
        fontFamily: 'Poppins_700Bold',
    },
    lineav: {
        height: 2,
        backgroundColor: '#1c1919',
        marginVertical: 10,
        width: '80%',
    },
    infocontainer: {
        flex: 1,
        justifyContent: "space-evenly",
    },
    botoncambiar: {
        backgroundColor: "#67a0ff",
        width: 200,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        marginBottom: 20,  // Mantener espacio entre botones
    },
    botoncerrar: {
        backgroundColor: "#ff3131",
        width: 200,
        height: 40,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    icontextcontainer: {
        flexDirection: "row",
        alignItems: 'center',
        marginBottom: 20,
    },
    textInfo: {
        padding: 10,
        fontFamily: "Inter_400Regular",
        fontSize: 16,
    },
});

export default PerfilUsuario;
