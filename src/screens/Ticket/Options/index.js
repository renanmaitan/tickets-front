import react, { useEffect, useState, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "react-native-vector-icons";
import { getStatus } from "../../../services/getStatus";
import AuthContext from "../../../contexts/auth";
import ChangeTicket from "../../../Components/ChangeTicket";
import { getAnalysts } from "../../../services/getAnalysts";
import { putTicket } from "../../../services/putTicket";
import moment from "moment-timezone";
import { getPriorities } from "../../../services/getPriorities";
import { getCategories } from "../../../services/getCategories";

import styles from "./style";

export default function Options({ route }) {
    const item = route.params.item;
    const authContext = useContext(AuthContext);
    const [status, setStatus] = useState([]);
    const [optionsStatus, setOptionsStatus] = useState([]);
    const [analysts, setAnalysts] = useState([]);
    const [priorities, setPriorities] = useState([]);
    const [optionsAnalysts, setOptionsAnalysts] = useState([]);
    const [optionsPriorities, setOptionsPriorities] = useState([]);
    const [categories, setCategories] = useState([]);
    const [optionsCategories, setOptionsCategories] = useState([]);
    const [filters, setFilters] = useState({
        page: 0,
        size: 10,
        sortBy: "userId",
        direction: "desc"
    })
    const [ticket, setTicket] = useState({
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
            teamUser: item.teamUser ? item.teamUser : null,
            ticketId: item.ticketId,
            title: item.title,
            category: {
                categoryId: item.category.categoryId
            }
    })

    handleStatusOptions = () => {
        let statusOptions = [];
        status.forEach(item => {
            statusOptions.push({ id: item.statusId, label: item.statusName })
        })
        return statusOptions;
    }

    handleCategoriesOptions = () => {
        let categoriesOptions = [];
        categories.forEach(item => {
            categoriesOptions.push({ id: item.categoryId, label: item.categoryName })
        })
        return categoriesOptions;
    }

    handlePriorityOptions = () => {
        let priorityOptions = [];
        priorities.forEach(item => {
            priorityOptions.push({ id: item.priorityId, label: item.priorityName })
        })
        return priorityOptions;
    }

    hanldeAnalystsOptions = () => {
        let analystsOptions = [];
        analysts.forEach(item => {
            analystsOptions.push({ id: item.userId, label: item.userName })
        })
        return analystsOptions;
    }

    useEffect(() => {
        getStatus(authContext)
            .then((response) => {
                setStatus(response.data);
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
        getPriorities(authContext)
            .then((response) => {
                setPriorities(response.data);
                const options = handlePriorityOptions();
                setOptionsPriorities(options);
            }
            )
            .catch((error) => {
                console.log(error);
            }
            )
        getCategories(authContext, item.department.departmentId)
            .then((response) => {
                setCategories(response);
                const options = handleCategoriesOptions();
                setOptionsCategories(options);
            }
            )
            .catch((error) => {
                console.log(error);
            }
            )
    }, [])

    function onChangeSelectStatus(id) {
        setTicket({ ...ticket, status: { statusId: id } })
    }
    function onChangeSelectAnalyst(id) {
        setTicket({ ...ticket, teamUser: { teamUserId: '1' } })
    }

    function onChangeSelectCategory(id) {
        setTicket({ ...ticket, category: { categoryId: id } }) 
    }

    function onChangeSelectPriority(id) {
        setTicket({ ...ticket, priority: { priorityId: id } })
    }

    function handleSave() {
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
            <ChangeTicket title="Status" options={optionsStatus} onChangeSelect={onChangeSelectStatus} text="Alterar Status" initial={item.status.statusName} />
            <ChangeTicket title="Analista Responsável" options={optionsAnalysts} onChangeSelect={onChangeSelectAnalyst} text="Alterar Analista" initial={item.teamUser?.user?.userName || "Não Atribuído"} />
            <ChangeTicket title="Prioridade" options={optionsPriorities} onChangeSelect={onChangeSelectPriority} text="Alterar Prioridade" initial={item.priority.priorityName} />
            <ChangeTicket title="Categoria" options={optionsCategories} onChangeSelect={onChangeSelectCategory} text="Alterar Categoria" initial={item.category.categoryName} />
            <TouchableOpacity style={styles.button} onPress={() => handleSave()}>
                <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
        </View>
    )
}