import React, { useContext, useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import styles from "./style";
import Item from "./Item";
import { getTicketsByToken } from "../../services/getTicketsByToken";
import AuthContext from "../../contexts/auth";
import Loading from "../../Components/Loading";

export default function MyTickets() {
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

    useEffect(() => {
        setPage(0)
        if (auth.refreshToken && page == 0) {
            global.hasMore = true;
            getTicketsByToken(form)
                .then((response) => {
                    setData(response.data.content);
                })
                .finally(() => {
                    setLoading(false);
                    setFirstLoad(false);
                });
        }
    }, [auth]);

    if (loading || firstLoad) {
        return <Loading />;
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => {
                    //console.log("Item:", item);
                    return <Item item={item} />;
                 }}
                keyExtractor={(item) => item.ticketId.toString()}
                style={{ width: "100%" }}
                ListFooterComponent={loading ? <Loading /> : null}
            />
        </View>
    );
}