import React, { useContext, useEffect, useState } from "react";
import moment from "moment-timezone";
import { View, Text, TouchableOpacity, TextInput, ScrollView } from "react-native";
import { getRelatory } from "../../services/getRelatory";
import Select from "../../Components/Select";
import styles from "./styles";
import AuthContext from "../../contexts/auth";
import PieChart from 'react-native-pie-chart';

export default function Relatory() {
    const [dayStart, setDayStart] = useState();
    const [monthStart, setMonthStart] = useState();
    const [yearStart, setYearStart] = useState();
    const [hourStart, setHourStart] = useState();
    const [minuteStart, setMinuteStart] = useState();
    const [day, setDay] = useState();
    const [month, setMonth] = useState();
    const [year, setYear] = useState();
    const [hour, setHour] = useState();
    const [minute, setMinute] = useState();
    const [data, setData] = useState({
        startDate: "",
        endDate: "",
        departmentId: null
    })
    const widthAndHeight = 200
    const [total, setTotal] = useState(null)
    const [chartData, setChartData] = useState({
        series: [],
        sliceColor: []
    })
    const [assignedTickets, setAssignedTickets] = useState(0)
    const [notAssignedTickets, setNotAssignedTickets] = useState(0)
    const [onHoldTickets, setOnHoldTickets] = useState(0)

    const authContext = useContext(AuthContext);
    const handleRelatory = async (data) => {
        if (yearStart === undefined || monthStart === undefined || dayStart === undefined || hourStart === undefined || minuteStart === undefined || year === undefined || month === undefined || day === undefined || hour === undefined || minute === undefined) {
            return alert("Preencha todos os campos")
        }
        if(yearStart === "" || monthStart === "" || dayStart === "" || hourStart === "" || minuteStart === "" || year === "" || month === "" || day === "" || hour === "" || minute === "") {
            return alert("Preencha todos os campos")
        }
        if (data.departmentId === null) {
            return alert("Selecione um departamento")
        }
        setData({
            ...data,
            startDate: `${yearStart}-${monthStart}-${dayStart}T${hourStart}:${minuteStart}:00`,
            endDate: `${year}-${month}-${day}T${hour}:${minute}:00`
        })
    }

    useEffect(() => {
        async function Relatory(authContext, data) {
            const response = await getRelatory(authContext, data);
            const numbers = response.data
            setAssignedTickets(numbers.assignedTickets)
            setNotAssignedTickets(numbers.notAssignedTickets)
            setOnHoldTickets(numbers.onHoldTickets)
            const array = [numbers.assignedTickets, numbers.notAssignedTickets, numbers.onHoldTickets]
            const numbersArray = []
            let find = []
            const sliceColor = []
            array.map((number, i) => {
                if (number !== 0) {
                    numbersArray.push(number)
                    find.push(i)
                }
            })
            if (numbersArray.length === 1) {
                if (find[0] === 0) {
                    sliceColor.push('#fbd203')
                } else if (find[0] === 1) {
                    sliceColor.push('#ffb300')
                } else if (find[0] === 2) {
                    sliceColor.push('#ff9100')
                }
            } else if (numbersArray.length === 2) {
                if (find[0] === 0 && find[1] === 1) {
                    sliceColor.push('#fbd203', '#ffb300')
                } else if (find[0] === 0 && find[1] === 2) {
                    sliceColor.push('#fbd203', '#ff9100')
                } else if (find[0] === 1 && find[1] === 2) {
                    sliceColor.push('#ffb300', '#ff9100')
                }
            } else if (numbersArray.length === 3) {
                sliceColor.push('#fbd203', '#ffb300', '#ff9100')
            }
            setTotal(numbers.totalTickets)
            setChartData({
                series: numbersArray,
                sliceColor: sliceColor
            })
        }
        if (data.departmentId !== null && data.startDate !== "" && data.endDate !== "") {
            Relatory(authContext, data)
        }
    }, [data])

    const departments = [
        { id: "1", label: "Pedagógico" },
        { id: "2", label: "Seleção" },
        { id: "3", label: "Social" },
        { id: "4", label: "Departamento Pessoal" },
        { id: "5", label: "Comercial" },
    ];

    return (
        <ScrollView style={{backgroundColor: "#FFF"}}>
        <View style={styles.container}>
            <Text>Escolha o intervalo de datas</Text>
            <Text>De:</Text>
            <View style={styles.date}>
                <TextInput
                    placeholder="Dia"
                    onChangeText={(text) => setDayStart(text)}
                    style={styles.input}
                    maxLength={2}
                    keyboardType="numeric"
                    value={dayStart}
                />
                <Text>/</Text>
                <TextInput
                    placeholder="Mês"
                    onChangeText={(text) => setMonthStart(text)}
                    style={styles.input}
                    maxLength={2}
                    keyboardType="numeric"
                    value={monthStart}
                />
                <Text>/</Text>
                <TextInput
                    placeholder="Ano"
                    onChangeText={(text) => setYearStart(text)}
                    style={styles.input}
                    maxLength={4}
                    keyboardType="numeric"
                    value={yearStart}
                />
                <TextInput
                    placeholder="Hora"
                    onChangeText={(text) => setHourStart(text)}
                    style={styles.input}
                    maxLength={2}
                    keyboardType="numeric"
                    value={hourStart}
                />
                <Text>:</Text>
                <TextInput
                    placeholder="Minuto"
                    onChangeText={(text) => setMinuteStart(text)}
                    style={styles.input}
                    maxLength={2}
                    keyboardType="numeric"
                    value={minuteStart}
                />
            </View>
            <Text>Até:</Text>
            <View style={styles.date}>
                <TextInput
                    placeholder="Dia"
                    onChangeText={(text) => setDay(text)}
                    style={styles.input}
                    keyboardType="numeric"
                    maxLength={2}
                    value={day}
                />
                <Text>/</Text>
                <TextInput
                    placeholder="Mês"
                    onChangeText={(text) => setMonth(text)}
                    style={styles.input}
                    keyboardType="numeric"
                    maxLength={2}
                    value={month}
                />
                <Text>/</Text>
                <TextInput
                    placeholder="Ano"
                    onChangeText={(text) => setYear(text)}
                    style={styles.input}
                    keyboardType="numeric"
                    maxLength={4}
                    value={year}
                />
                <TextInput
                    placeholder="Hora"
                    onChangeText={(text) => setHour(text)}
                    style={styles.input}
                    keyboardType="numeric"
                    maxLength={2}
                    value={hour}
                />
                <Text>:</Text>
                <TextInput
                    placeholder="Minuto"
                    onChangeText={(text) => setMinute(text)}
                    style={styles.input}
                    keyboardType="numeric"
                    maxLength={2}
                    value={minute}
                />
            </View>
            {/* escolher departamento */}
            <Select
                options={departments}
                text="Selecione um Departamento"
                onChangeSelect={(value) => setData({ ...data, departmentId: value })}
            />
            {/* botão para gerar relatório */}
            <TouchableOpacity
                onPress={() => handleRelatory(data)}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Gerar relatório</Text>
            </TouchableOpacity>
            {total === null ? <Text>Selecione o intervalo de datas</Text> : (
                <View style={styles.chart}>
                    <Text>Relatório</Text>
                    <Text style={{ color: "#fbd203" }}>Chamados atribuídos: {assignedTickets}</Text>
                    <Text style={{ color: "#ffb300" }}>Chamados abertos (não atribuídos): {notAssignedTickets}</Text>
                    <Text style={{ color: "#ff9100" }}>Chamados aguardando cliente: {onHoldTickets}</Text>
                    <Text style={{ marginBottom: "2%" }}>Total de chamados: {total}</Text>
                    {chartData.series.length !== 0 ?
                        <PieChart widthAndHeight={widthAndHeight} series={chartData.series} sliceColor={chartData.sliceColor} />
                        : <Text>Nenhum dado a ser exibido</Text>
                    }
                </View>
            )}
        </View>
        </ScrollView>
    );
}