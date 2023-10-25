import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import styles from "./style";
import Item from "./Item";
import { getTicketsByAnalyst } from "../../services/getTicketsByAnalyst";
import AuthContext from "../../contexts/auth";
import Loading from "../../Components/Loading";

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

    const form = {
        authContext: auth,
        filters: {
            page: page,
            size: size,
            sortBy: sortBy,
            direction: direction,
            userId: loggedUser.data.userId
        },
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
        if (auth.refreshToken && page==0) {
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
            <FlatList
                data={data}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={(item) => Math.floor(Math.random() * 10000000).toString()}
                style={{ width: "100%" }}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.1}
                ListFooterComponent={loading ? <Loading /> : null}
            />
        </View>
    );
}