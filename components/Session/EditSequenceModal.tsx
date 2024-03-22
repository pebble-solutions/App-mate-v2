import React, { useState, useEffect } from 'react';
import { Modal, View, Button, StyleSheet, Text } from 'react-native';
import DateTimeInput from '../Form/DateTimeInput';
import { SequenceType } from '../../shared/types/SequenceType';
import TitleComponent from "../Title.tsx";
import { diffDateToTime } from "../../shared/libs/date";

type EditSequenceModalProps = {
    sequence: SequenceType;
    sequences: SequenceType[];
    visible: boolean;
    closeModal: () => void;
    saveModal: (sequence: SequenceType) => void;
};

const EditSequenceModal = ({ sequence, sequences, visible, closeModal, saveModal }: EditSequenceModalProps) => {

    const [editStartSequence, setEditStartSequence] = useState<Date | null>(null);
    const [editEndSequence, setEditEndSequence] = useState<Date | null>(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (sequence) {
            setEditStartSequence(sequence[0]);
            setEditEndSequence(sequence[1]);
        }
    }, [sequence]);

    const changeStartValue = (value: Date) => {
        if (testEdit(value, editEndSequence)) setEditStartSequence(value);
    };

    const changeEndValue = (value: Date) => {
        if (testEdit(editStartSequence, value)) setEditEndSequence(value);
    };

    const testEdit = (start: Date | null, end: Date | null) => {
        if (!start || !end) return false;

        const startMilliseconds = start.getTime();
        const endMilliseconds = end.getTime();

        if (startMilliseconds > endMilliseconds) {
            setErrorMessage("Erreur, la date de fin est avant la date de début");
            return false;
        }

        for (const [s, e] of sequences) {
            const sMilliseconds = s.getTime();
            const eMilliseconds = e.getTime();

            if (sequence !== [s, e] && ((sMilliseconds < startMilliseconds && eMilliseconds > startMilliseconds) || (sMilliseconds < endMilliseconds && eMilliseconds > endMilliseconds))) {
                setErrorMessage("Erreur, une séquence existe déjà avec l'intervalle sélectionné");
                return false;
            }
        }

        setErrorMessage("");
        return true;
    }

    const resetDates = () => {
        setEditEndSequence(null);
        setEditStartSequence(null);
    }

    const handleSaveData = () => {
        if (editStartSequence && editEndSequence) {
            const editSequence = [editStartSequence, editEndSequence];
            saveModal(editSequence);
            resetDates();
        }
    };

    const handeCloseModal = () => {
        setErrorMessage("");
        closeModal();
        resetDates();
    }

     const totalTime = () => {
        if (editStartSequence && editEndSequence) {
            return diffDateToTime(editStartSequence, editEndSequence, { hours: true, minutes: true, seconds: true });
        }
        return "";
     };

     const titleValue = () => {
        return 'Modification de séquence';
     };

    return (
        <Modal
            animationType="slide"
            transparent={false}
            visible={visible}
            onRequestClose={handeCloseModal}
        >
            <View style={styles.modalContainer}>

                <View style={styles.titleContainer}>
                    <TitleComponent title={titleValue()} />
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.input}>
                        <Text style={styles.text}>Heure de début : </Text>
                        <DateTimeInput value={editStartSequence} onChange={changeStartValue} type={"time"} />
                    </View>

                    <View style={styles.input}>
                        <Text style={styles.text}>Heure de fin : </Text>
                        <DateTimeInput value={editEndSequence} onChange={changeEndValue} type={"time"} />
                    </View>
                </View>

                {errorMessage ? (
                    <Text style={styles.errorMessage}>{errorMessage}</Text>
                ) : (
                    <Text style={styles.diffDateText}>Temps total : {totalTime()}</Text>
                )}

                <View style={styles.buttonContainer}>
                    <Button title="   Fermer   " onPress={handeCloseModal} color="grey" />
                     {errorMessage ? (
                        <Button title="Enregistrer" onPress={() => handleSaveData()} color="green" disabled/>
                     ) : (
                        <Button title="Enregistrer" onPress={() => handleSaveData()} color="green" />
                     )}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'start',
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        paddingHorizontal: 20,
        paddingBottom: 50,
        marginVertical: 50
    },
    inputContainer: {
        marginHorizontal: 20
    },
    input: {
        marginVertical: 10
    },
    titleContainer: {
        alignItems: 'center',
        marginVertical: 20
    },
    text: {
        fontWeight: 'bold',
        marginLeft: 20,
        marginBottom: 10
    },
    diffDateText: {
        marginLeft: 25,
        marginTop: 10
    },
    errorMessage: {
       backgroundColor: 'rgba(244, 0, 0, 0.5)',
        marginHorizontal: 25,
        marginTop: 10,
        textAlign: 'center',
        paddingVertical: 5,
        borderRadius: 10
    }
});

export default EditSequenceModal;