import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import TitleComponent from "../Title.tsx";
import { EvilIcons, Ionicons } from '@expo/vector-icons';

type TitleSessionProps = {
    editable?: boolean;
    date?: Date;
};

export default function Title({ date, editable} : TitleSessionProps) {
    /*const [isEditing, setIsEditing] = useState(false);
    const [dateEditable, setDateEditable] = useState(date || new Date().toLocaleDateString());

    const handleModif = () => {
        setIsEditing(true);
    }

    const handleClose = () => {
        setIsEditing(false);
    }

    const handleSave = () => {
        handleClose();
    }

    const dateTitle = dateEditable; */

    const dateTitle = date || new Date().toLocaleDateString();

    return (
        <View style={styles.container}>
            {/*{isEditing && editable ? (
                <>
                    <TextInput style={styles.input} type="date" onChangeText={setDateEditable} value={dateEditable} />
                    <TouchableOpacity style={[styles.button, styles.buttonSave]} onPress={handleSave}>
                        <Ionicons name="checkmark" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={handleClose}>
                        <Ionicons name="close" size={24} color="white" />
                    </TouchableOpacity>
                </>
            ) : (
                <>*/}
                    <TitleComponent title={dateTitle} size="md" color={"white"} />

                    {/*{editable && (
                        <TouchableOpacity style={styles.icon} onPress={handleModif}>
                            <EvilIcons name="pencil" size={24} color="white" />
                        </TouchableOpacity>
                    )}
                </>
            )}*/}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    /*icon: {
        marginLeft: 24
    },
    input: {
        width: 150,
        height: 40,
        marginRight: 10,
        backgroundColor: 'white',
        paddingLeft: 45
    },
    button: {
        padding: 10,
        borderRadius: 15,
        marginLeft: 10,
    },
    buttonSave: {
        backgroundColor: 'green',
    },
    buttonClose: {
        backgroundColor: 'red',
    }*/
});