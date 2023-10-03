import React, {useContext, useEffect, useState} from "react";

import { View, Text, TouchableOpacity, FlatList } from "react-native";
import styles from "./style";
import Item from "./Item";
import { getTicketsByToken } from "../../services/getTicketsByToken";
import AuthContext from "../../contexts/auth"
import Loading from "../../Components/Loading";

export default function MyTickets() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // {
    //     "ticketId": 1,
    //     "title": "Abri",
    //     "requester": {
    //         "userId": 1,
    //         "userName": "Admin",
    //         "email": "admin@admin.com",
    //         "cpf": "12345678901",
    //         "keycloakId": null,
    //         "phoneNumber": "12345678901",
    //         "birthDate": "1990-01-01",
    //         "cep": "12345678",
    //         "active": true
    //     },
    //     "content": "Foi ",
    //     "priority": {
    //         "priorityId": 1,
    //         "priorityName": "Low"
    //     },
    //     "status": {
    //         "statusId": 1,
    //         "statusName": "Open"
    //     },
    //     "openingDate": "2023-09-25",
    //     "modificationDate": "2023-09-25",
    //     "department": {
    //         "departmentId": 1,
    //         "departmentName": "Pedagógico",
    //         "active": true
    //     },
    //     "teamUser": {
    //         "teamUserId": 1,
    //         "team": {
    //             "teamId": 1,
    //             "leader": {
    //                 "userId": 3,
    //                 "userName": "Rafael Vieira",
    //                 "email": "rafael@email.com",
    //                 "cpf": "12345678901",
    //                 "keycloakId": null,
    //                 "phoneNumber": "12345678901",
    //                 "birthDate": "1990-01-01",
    //                 "cep": "12345678",
    //                 "active": true
    //             },
    //             "active": true,
    //             "teamName": "Time Rafael "
    //         },
    //         "user": {
    //             "userId": 3,
    //             "userName": "Rafael Vieira",
    //             "email": "rafael@email.com",
    //             "cpf": "12345678901",
    //             "keycloakId": null,
    //             "phoneNumber": "12345678901",
    //             "birthDate": "1990-01-01",
    //             "cep": "12345678",
    //             "active": true
    //         },
    //         "active": true
    //     }
    // },
    
    const auth = useContext(AuthContext);
    
    useEffect(() =>{
        getTicketsByToken(auth).then((response) => {
            setData(response.data.content)
            setLoading(false)
        })      
    }, [])

    if (loading) {
        return <Loading />
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => <Item item={item} />}
                keyExtractor={item => item.ticketId}
                style={{ width: "100%" }}
            />
        </View>
    )
}