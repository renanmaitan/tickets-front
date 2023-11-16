import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Modal, SafeAreaView } from "react-native";
import styles from "./style";
import Item from "./Item";
import { getTicketsByAnalyst } from "../../services/getTicketsByAnalyst";
import AuthContext from "../../contexts/auth";
import Loading from "../../Components/Loading";
import Checkbox from 'expo-checkbox';
import { FontAwesome5 } from "@expo/vector-icons"

export default function Tickets() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { loggedUser } = useContext(AuthContext);
    const auth = useContext(AuthContext);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [sortBy, setSortBy] = useState("openingDate");
    const [direction, setDirection] = useState("desc");
    const [firstLoad, setFirstLoad] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [statusOptions, setStatusOptions] = useState([1, 2, 3]);
    const [options, setOptions] = useState([
        { id: 1, name: "Exibir chamados abertos", isChecked: true },
        { id: 2, name: "Exibir chamados atribuídos a você", isChecked: true },
        { id: 3, name: "Exibir chamados pendentes", isChecked: true },
        { id: 4, name: "Exibir chamados resolvidos", isChecked: false },
        { id: 5, name: "Exibir chamados fechados", isChecked: false },
    ])

    const form = {
        authContext: auth,
        filters: {
            page: page,
            size: size,
            sortBy: sortBy,
            direction: direction,
            userId: loggedUser.data.userId
        },
        statusList: statusOptions
    };

    const handleLoadMore = () => {
        if (!auth.refreshToken) return;
        setLoading(true)
        if (hasMore) {
            getTicketsByAnalyst({ ...form, filters: { ...form.filters, page: page + 1 } })
                .then((response) => {
                    if (response.data.content.length > 0) {
                        setData([...data, ...response.data.content]);
                        setLoading(false);
                        if (response.data.content.length < size) {
                            hasMore = false;
                        }
                    } else {
                        setLoading(false);
                        hasMore = false;
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    hasMore = false;
                })
                .finally(() => {
                    if (hasMore)
                        setPage(page + 1);
                });
        }
        else {
            setLoading(false);
        }
    };

    useEffect(() => {
        setPage(0)
        if (auth.refreshToken && page == 0) {
            global.hasMore = true;
            getTicketsByAnalyst(form)
                .then((response) => {
                    setData(response.data.content);
                })
                .finally(() => {
                    setLoading(false);
                    setFirstLoad(false);
                });
        }
    }, [auth]);

    if (loading && firstLoad) {
        return <Loading />;
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.containerModal} onPress={() => setModalVisible(true)}>
                <Text style={styles.txt} numberOfLines={1}>Filtros</Text>
                <FontAwesome5 name="chevron-down" size={16} color="#555" style={{ alignSelf: "center" }} />
            </TouchableOpacity>
            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <SafeAreaView>
                    <View style={styles.headerModal}>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.backModal}>
                            <FontAwesome5 name="chevron-left" size={20} color="#555" style={{ padding: "1%" }} />
                        </TouchableOpacity>
                        <Text style={styles.modalTitle}>Filtrar</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.modalCancel}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: "4%" }}>
                        {options.map((item) => {
                            return (
                                <View style={styles.section} key={item.id}>
                                    <Checkbox
                                        value={item.isChecked}
                                        onValueChange={() => {
                                            setOptions(options.map((option) => {
                                                if (option.id == item.id) {
                                                    return { ...option, isChecked: !option.isChecked }
                                                } else {
                                                    return option
                                                }
                                            }))
                                            if (item.isChecked) {
                                                setStatusOptions(statusOptions.filter((status) => status != item.id))
                                            } else {
                                                setStatusOptions([...statusOptions, item.id])
                                            }
                                        }}
                                        color={item.isChecked ? '#182955' : undefined}
                                        style={styles.checkbox}
                                    />
                                    <Text style={styles.paragraph}>{item.name}</Text>
                                </View>
                            )
                        })}
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        setPage(0)
                        hasMore = true;
                        getTicketsByAnalyst(form)
                            .then((response) => {
                                setData(response.data.content);
                            })
                            .finally(() => {
                                setLoading(false);
                                setFirstLoad(false);
                            });

                        setModalVisible(false)
                    }
                    }>
                        <Text style={[styles.txt, { color: "white" }]}>Aplicar</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </Modal>
            {data.length == 0 ? <Text style={styles.noTickets}>Nenhum chamado encontrado</Text> :
                <FlatList
                    data={data}
                    renderItem={({ item }) => <Item item={item} />}
                    keyExtractor={(item) => Math.floor(Math.random() * 10000000).toString()}
                    style={{ width: "100%" }}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={loading ? <Loading /> : null}
                />
            }
        </View>
    );
}