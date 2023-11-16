import React, { useContext, useState } from "react";
import moment from "moment-timezone";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import { getRelatory } from "../../services/getRelatory";
import Select from "../../Components/Select";
import styles from "./styles";
import AuthContext from "../../contexts/auth";
import PieChart from 'react-native-pie-chart';

export default function Relatory() {
    const [data, setData] = useState({
        startDate: moment().tz("America/Sao_Paulo").format('YYYY-MM-DDTHH:mm:ss'),
        endDate: moment().tz("America/Sao_Paulo").format('YYYY-MM-DDTHH:mm:ss'),
        departmentId: 1
    })
    const widthAndHeight = 200
    const [series, setSeries] = useState([1, 1, 1])
    const [sliceColor, setSliceColor] = useState(['#fbd203', '#ffb300', '#ff9100'])
    const [total, setTotal] = useState(0)

    const authContext = useContext(AuthContext);
    const handleRelatory = async (data) => {
        setData({
            ...data,
            startDate: `${yearStart}-${monthStart}-${dayStart}T${hourStart}:${minuteStart}:00`,
            endDate: `${year}-${month}-${day}T${hour}:${minute}:00`
        })
        const response = await getRelatory(authContext, data);
        const numbers = response.data
        setSeries([numbers.assignedTickets, numbers.notAssignedTickets, numbers.onHoldTickets])
        setTotal(numbers.totalTickets)
    }

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

    const departments = [
        { id: "1", label: "Pedagógico" },
        { id: "2", label: "Seleção" },
        { id: "3", label: "Social" },
        { id: "4", label: "Departamento Pessoal" },
        { id: "5", label: "Comercial" },
    ];

    return (
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
            <Text>Relatório</Text>
            <Text style={{color: "#fbd203"}}>Chamados atribuídos: {series[0]}</Text>
            <Text style={{color: "#ffb300"}}>Chamados não atribuídos: {series[1]}</Text>
            <Text style={{color: "#ff9100"}}>Chamados em espera: {series[2]}</Text>
            <Text style={{marginBottom: "2%"}}>Total de chamados: {total}</Text>
            <PieChart widthAndHeight={widthAndHeight} series={series} sliceColor={sliceColor} />
        </View>
    );
}