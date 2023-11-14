import react, { useEffect, useState, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "react-native-vector-icons";
import { getStatus } from "../../../services/getStatus";
import AuthContext from "../../../contexts/auth";
import ChangeTicket from "../../../Components/ChangeTicket";
import { getAnalysts } from "../../../services/getAnalysts";
import { putTicket } from "../../../services/putTicket";
import moment from "moment-timezone";

import styles from "./style";

export default function Options({ route }) {
    const item = route.params.item;
    const authContext = useContext(AuthContext);
    const [status, setStatus] = useState([]);
    const [optionsStatus, setOptionsStatus] = useState([]);
    const [analysts, setAnalysts] = useState([]);
    const [optionsAnalysts, setOptionsAnalysts] = useState([]);
    const [filters, setFilters] = useState({
        page: 0,
        size: 10,
        sortBy: "userId",
        direction: "desc"
    })

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

    hanldeAnalystsOptions = () => {
        let analystsOptions = [];
        analysts.forEach(item => {
            analystsOptions.push({ id: item.userId, label: item.userName })
        })
        return analystsOptions;
    }

    useEffect(() => {
        console.log(item)
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
        getAnalysts({ authContext, filters })
            .then((response) => {
                setAnalysts(response.data.content)
                const options = hanldeAnalystsOptions();
                setOptionsAnalysts(options);
            }
            )
            .catch((error) => {
                console.log(error);
            }
            )
    }, [])

    function onChangeSelectStatus(id) {
        console.log(id)
        const ticket = {
            content: item.content,
            department: {
                departmentId: item.department.departmentId
            },
            modificationDate: moment().tz("America/Sao_Paulo").format('YYYY-MM-DDTHH:mm:ss'),
            openingDate: item.openingDate,
            priority: {
                priorityId: item.priority.priorityId
            },
            requester: {
                userId: item.requester.userId
            },
            status: {
                statusId: id
            },
            teamUser:  item.teamUser? item.teamUser: null,
            ticketId: item.ticketId,
            title: item.title,
            category: {
                categoryId: item.category.categoryId
            }
        }
        putTicket({ authContext, ticket })
            .catch((error) => {
                console.log(error);
            }
            )
    }
    function onChangeSelectAnalyst(id) {
        const ticket = {
            teamUser: {
                teamUserId: 1
            },
            content: item.content,
            department: {
                departmentId: item.department.departmentId
            },
            modificationDate: moment().tz("America/Sao_Paulo").format('YYYY-MM-DDTHH:mm:ss'),
            openingDate: item.openingDate,
            priority: {
                priorityId: item.priority.priorityId
            },
            requester: {
                userId: item.requester.userId
            },
            status: {
                statusId: item.status.statusId
            },
            ticketId: item.ticketId,
            title: item.title,
            category: {
                categoryId: item.category.categoryId
            }
        }
        putTicket({ authContext, ticket })
            .catch((error) => {
                console.log(error);
            }
            )
    }

    return (
        <View style={styles.container}>
            <FontAwesome5 name="cog" color="#B1B1B1" size={100} style={{ marginBottom: "5%", marginTop: "15%" }} />
            <Text style={styles.title}>Alterar dados do chamado</Text>
            <ChangeTicket title="Status" options={optionsStatus} onChangeSelect={onChangeSelectStatus} text="Alterar Status" initial={handleStatus()} />
            <ChangeTicket title="Analista Responsável" options={optionsAnalysts} onChangeSelect={onChangeSelectAnalyst} text="Alterar Analista" initial={item.teamUser?.user?.userName || "Não Atribuído"} />
            <TouchableOpacity style={styles.containerField}>
                <View style={styles.labelField}>
                    <Text style={[styles.titleField, { paddingVertical: "3%" }]}>Senha</Text>
                </View>
                <FontAwesome5 name="chevron-right" color="#B1B1B1" size={20} />
            </TouchableOpacity>
        </View>
    )
}