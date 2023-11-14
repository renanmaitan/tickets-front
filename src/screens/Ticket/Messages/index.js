import React, { useContext, useEffect, useState } from "react";
import { View, FlatList, Text, TextInput, ScrollView, TouchableOpacity, Platform, KeyboardAvoidingView } from "react-native";
import Item from "./Item";
import styles from "./style";
import { createInteraction } from "../../../services/createInteraction";
import { getInteractionsByTicket } from "../../../services/getInteractionsByTicket";
import AuthContext from "../../../contexts/auth";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment-timezone";

export default function Messages({ route }) {

    const ticket = route.params.item;
    const authContext = useContext(AuthContext);
    const {loggedUser} = authContext;
    const [messages, setMessages] = useState([]);
    const [form, setForm] = useState({
        interaction: {
            content: "",
            createdAt: null,
            user: { userId: loggedUser.data.userId },
            ticket: { ticketId: ticket.ticketId },
            intern: false
        }
    });
    const [hasMore, setHasMore] = useState(true);
    // const messages = [
    //     {
    //         "messageId": 1,
    //         "content": "Olá, bom dia!",
    //         "date": "2021-06-01T08:00:00",
    //         "user": {
    //             "userId": 1,
    //             "name": "João",
    //         },
    //         "role": "requester"
    //     },
    //     {
    //         "messageId": 2,
    //         "content": "Olá, bom dia!",
    //         "date": "2021-06-01T08:00:05",
    //         "user": {
    //             "userId": 2,
    //             "name": "Maria",
    //         },
    //         "role": "agent"
    //     },
    // ]

    const hanldeGetInteractions = async () => {
        const response = await getInteractionsByTicket({ ticketId: ticket.ticketId, authContext: authContext });
        setMessages(response.data);
    }

    useEffect(() => {
        hanldeGetInteractions();
    }, [hasMore]);

    async function handleCreateInteraction() {
        if (form.interaction.content == "") {
            return;
        }
        form.interaction.createdAt = moment().tz("America/Sao_Paulo").format('YYYY-MM-DDTHH:mm:ss')
        messages.push(form.interaction);
        try {
            const response = await createInteraction({interaction: form, authContext: authContext});
            if (response.status == 201) {
                setForm({ interaction: { ...form.interaction, content: "" } });
            }
            else {
                console.log("Erro ao criar interação");
            }
        }
        catch (error) {
            console.error(error);
        }
    }


    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                keyExtractor={item => item.interactionId}
                renderItem={({ item }) => <Item item={item} />}
                style={styles.flatlist}
                onEndReached={() => {hasMore ? setHasMore(false) : setHasMore(true)}}
            />

            <KeyboardAvoidingView
                behavior="padding"
                enabled={Platform.OS === "ios"}
                style={styles.inputContainer}>
                <View style={styles.input}>
                    <TextInput
                        multiline={true}
                        style={styles.inputMessage}
                        placeholder="Digite sua mensagem"
                        onChangeText={text => setForm({ interaction: { ...form.interaction, content: text } })}
                        value={form.interaction.content}
                    />
                    <TouchableOpacity 
                    style={{ marginHorizontal: "4%" }}
                    onPress={handleCreateInteraction}
                    >
                        <Icon name="send" size={26} color={"#182955"} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}