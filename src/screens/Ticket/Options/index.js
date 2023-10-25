import react, { useEffect, useState, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "react-native-vector-icons";
import { getStatus } from "../../../services/getStatus";
import AuthContext from "../../../contexts/auth";
import ChangeTicket from "../../../Components/ChangeTicket";

import styles from "./style";

export default function Options({ route }) {
    const item = route.params.item;
    const authContext = useContext(AuthContext);
    const [status, setStatus] = useState([]);
    const [optionsStatus, setOptionsStatus] = useState([]);

    handleStatus = () => {
        if (item.status.statusName == "Open") {
            return "Aberto"
        } else if (item.status.statusName == "Pending") {
            return "Pendente"
        } else if (item.status.statusName == "On Hold") {
            return "Atribuído"
        } else if (item.status.statusName == "Solved") {
            return "Resolvido"
        } else {
            return "Fechado"
        }
    }

    handleStatusName = () => {
        status.forEach(item => {
            if (item.statusName == "Open") {
                item.statusName = "Aberto"
            } else if (item.statusName == "Pending") {
                item.statusName = "Pendente"
            } else if (item.statusName == "On Hold") {
                item.statusName = "Atribuído"
            } else if (item.statusName == "Solved") {
                item.statusName = "Resolvido"
            } else {
                item.statusName = "Fechado"
            }
        })
    }

    handleStatusOptions = () => {
        let statusOptions = [];
        status.forEach(item => {
            statusOptions.push({ id: item.statusId, label: item.statusName })
        })
        return statusOptions;
    }

    useEffect(() => {
        getStatus(authContext)
            .then((response) => {
                setStatus(response.data);
                handleStatusName();
                const options = handleStatusOptions();
                setOptionsStatus(options);
            }
            )
            .catch((error) => {
                console.log(error);
            }
            )
    }, [])

    function onChangeSelect(id) {
        console.log(id)
    }

    

    return (
        <View style={styles.container}>
            <FontAwesome5 name="cog" color="#B1B1B1" size={100} style={{ marginBottom: "5%", marginTop: "15%" }} />
            <Text style={styles.title}>Alterar dados do chamado</Text>
            <ChangeTicket title="Status" options={optionsStatus} onChangeSelect={onChangeSelect} text="Alterar Status" />

            <TouchableOpacity style={styles.containerField}>
                <View style={styles.labelField}>
                    <Text style={styles.titleField}>Analista Responsável</Text>
                    <Text style={styles.contentField}>{item.teamUser.user.userName}</Text>
                </View>
                <FontAwesome5 name="chevron-right" color="#B1B1B1" size={20} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.containerField}>
                <View style={styles.labelField}>
                    <Text style={[styles.titleField, { paddingVertical: "3%" }]}>Senha</Text>
                </View>
                <FontAwesome5 name="chevron-right" color="#B1B1B1" size={20} />
            </TouchableOpacity>
        </View>
    )
}