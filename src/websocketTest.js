import React, { useState } from 'react';
import { SafeAreaView, Button, FlatList, Text, TextInput } from 'react-native';

const ChatScreen = () => {
    const [serverState, setServerState] = useState('Loading...');
    const [messageText, setMessageText] = useState('');
    const [disableButton, setDisableButton] = useState(true);
    const [inputFieldEmpty, setInputFieldEmpty] = useState(true);
    const [serverMessages, setServerMessages] = useState([]);
    var ws = React.useRef(new WebSocket('ws://192.168.0.10:8080/chat/2')).current;
    React.useEffect(() => {
        const serverMessagesList = [];
        ws.onopen = (event) => {
            console.log(event)
            setServerState('Connected to the server')
            setDisableButton(false);
        };
        ws.onclose = (e) => {
            setServerState(`Disconnected. Check internet or server status. ${e.reason}`);
            setDisableButton(true);
        };
        ws.onerror = (e) => {

            setServerState(e.message);
        };
        ws.onmessage = (e) => {
            serverMessagesList.push(e.data);
            setServerMessages([...serverMessagesList])
        };
    }, [])
    const submitMessage = () => {
        ws.send(messageText);
        setMessageText('')
        setInputFieldEmpty(true)
    }

    return (
        <SafeAreaView style={{ marginTop: 200 }}>
            <Text>{serverState}</Text>
            <Text>Enter message:</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => {
                    setMessageText(text)
                    setInputFieldEmpty(false)
                }}
                value={messageText}
            />
            <Text>Messages from server:</Text>
            <Text>{serverMessages}</Text>
            <Button title="Send" onPress={submitMessage} disabled={disableButton || inputFieldEmpty} />
        </SafeAreaView>
    );
};

export default ChatScreen;