import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import styles from "./style";
import Item from "./Item";
import { getTicketsByToken } from "../../services/getTicketsByToken";
import AuthContext from "../../contexts/auth";
import Loading from "../../Components/Loading";

export default function MyTickets() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const auth = useContext(AuthContext);
    const { loggedUser } = useContext(AuthContext);

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
        setLoading(true);
        if (hasMore) {
            getTicketsByToken(form)
                .then((response) => {
                    if (response.data.content.length > 0) {
                        setData([...data, ...response.data.content]);
                        setLoading(false);
                        if (response.data.content.length < size) {
                            hasMore = false;
                        } else {
                            setPage(page + 1);
                        }
                    } else {
                        setLoading(false);
                        hasMore = false;
                    }
                })
                .catch((error) => {
                    setLoading(false);
                    hasMore = false;
                });
        }
        else{
            setLoading(false);
        }

    };

    useEffect(() => {
        global.hasMore = true;
        getTicketsByToken(form)
            .then((response) => {
                setData(response.data.content);
                setPage(page + 1);
            })
            .finally(() => {
                setLoading(false);
                setFirstLoad(false);
            });
    }, []);

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
