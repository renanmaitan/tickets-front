import React, { useState } from "react";
import { View, TouchableOpacity, Text, Modal, FlatList, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons"
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChangeTicket({ title, options, onChangeSelect, text, initial }) {
    const [txt, setTxt] = useState(initial)
    const [modalVisible, setModalVisible] = useState(false)
    const [selected, setSelected] = useState(null)
    function renderOption ( item ) {
        return (
            <TouchableOpacity style={[styles.optionContainer,{backgroundColor:item.id==selected? '#eee':'#fff'}]} onPress={() => {
                setTxt(item.label)
                setModalVisible(false)
                setSelected(item.id)
                onChangeSelect(item.id)
            }}>
                <Text style={[styles.optionTxt, {fontWeight:item.id==selected? 'bold':'normal'}]}>{item.label}</Text>
                {item.id == selected && (
                <FontAwesome5 name="check" size={16} color="green" style={{ alignSelf: "center" }} />
                )}
            </TouchableOpacity>
        )
    }

    return (
        <View style={{width: "100%"}}>
            <TouchableOpacity style={styles.containerField} onPress={() => setModalVisible(true)}>
                <View style={styles.labelField}>
                    <Text style={styles.titleField}>{title}</Text>
                    <Text style={styles.contentField}>{txt}</Text>
                </View>
                <FontAwesome5 name="chevron-right" color="#B1B1B1" size={20} />
            </TouchableOpacity>
            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <SafeAreaView>
                    <View style={styles.headerModal}>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.backModal}>
                            <FontAwesome5 name="chevron-left" size={20} color="#555" style={{padding: "1%"}}/>
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>{text}</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.modalCancel}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={options}
                        keyExtractor={(item) => String(item.id)}
                        renderItem={({ item }) => renderOption(item)}
                    />
                </SafeAreaView>

            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    containerField: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#FEFEFE",
        padding: "2%",
        marginVertical: "2%",
        paddingHorizontal: "5%",
        boxShadowColor: "#000",
        boxShadowOffset: {
            width: 0,
            height: 2,
        },
        boxShadowOpacity: .25,
        boxShadowRadius: 3.84,
        elevation: 1,
    },
    titleField: {
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: "sans-serif-light",
    },
    txt: {
        color: "#555",
        fontSize: 16,
        width: "100%",
        textAlign: "center",
    },
    headerModal: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#555",
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    modalTitle: {
        fontSize: 18,
        color: "#555",
    },
    modalCancel: {
        fontSize: 14,
        color: "#086972",
        fontWeight: "bold",
    },
    optionContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    optionTxt: {
        fontSize: 16,
        color: "#555",
    },
    backModal: {
        width: "10%",
    }

});
