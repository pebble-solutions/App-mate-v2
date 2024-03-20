import React, { useState, useCallback } from 'react';
import { FlatList, View, TouchableOpacity, StyleSheet } from 'react-native';
import { SequenceItem } from './SequenceItem';
import { variables } from '../../shared/globalStyles';
import EditSequenceModal from './EditSequenceModal';
import { SequenceType } from '../../shared/types/SequenceType';

type SequenceListProps = {
    sequence: SequenceType[];
    editable?: boolean;
    style?: object[];
    setSequence? : (sequence: SequenceType) => void;
};

const SequenceList: React.FC<SequenceListProps> = ({ sequence, editable, style, setSequence }) => {
    const [visible, setVisible] = useState(false);
    const [selectedSequence, setSelectedSequence] = useState<SequenceType | null>(null);

    const toggleModal = useCallback((item: SequenceType) => {
        setSelectedSequence(item);
        setVisible(true);
    }, []);

    const saveModal = useCallback((newItem: SequenceType) => {
        setVisible(false);
        const index = sequence.findIndex(seq => seq === selectedSequence);
        if (index !== -1) {
            const updatedSequence = [...sequence];
            updatedSequence[index] = newItem;
            // Mettre à jour la séquence dans l'état parent
            setSequence(updatedSequence);
        }
    }, [sequence, selectedSequence]);

    const renderItem = ({ item }: { item: SequenceType }) => {
        const RenderComponent = editable ? TouchableOpacity : View;
        const onPress = editable ? () => toggleModal(item) : undefined;

        return (
            <RenderComponent onPress={onPress}>
                <SequenceItem item={item} editable={editable} />
            </RenderComponent>
        );
    };

    return (
        <View style={[styles.container, ...(style ? [style] : [])]}>
            <FlatList
                data={sequence}
                renderItem={renderItem}
                keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
            />
            <EditSequenceModal
                sequence={selectedSequence}
                visible={visible}
                closeModal={() => setVisible(false)}
                saveModal={saveModal}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderTopColor: variables.color.grey,
        borderTopWidth: 1,
        borderBottomColor: variables.color.grey,
        borderBottomWidth: 1,
        backgroundColor: variables.color.black,
        flex: 1,
    },
});

export default SequenceList;