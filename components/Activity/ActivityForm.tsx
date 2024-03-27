import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import TextInput from '../Form/TextInput'
import { Activity } from "../../shared/classes/Activity"
import { globalStyles } from '../../shared/globalStyles'
import { ReactNode, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

type ActivityFormOptions = {
    activity: Activity,
    title?: string,
    onValidate?: (newVal: Activity) => void,
    icon?: ReactNode,
    onDescriptionChange?: (newVal: string) => void,
    onLabelChange?: (newVal: string) => void,
    onColorChange?: (newVal: string) => void,
}

export default function ActivityForm({ 
    activity, 
    onValidate, 
    title, 
    icon, 
    onColorChange, 
    onDescriptionChange, 
    onLabelChange 
}: ActivityFormOptions) {

    const [label, setLabel] = useState(activity.label)
    const [description, setDescription] = useState(activity.description)
    const [color, setColor] = useState(activity.color)

    const colorSet = [
        "#262729",
        "#701323",
        "#701348",
        "#671370",
        "#341370",
        "#133070",
        "#525252",
        "#13706d",
        "#0f572e",
        "#436903",
        "#b57c02",
        "#b81d06",
    ];

    const handleValidate = () => {
        if (onValidate) {
            const newActivity = activity
            activity.label = label
            activity.description = description
            activity.color = color
            onValidate(new Activity(newActivity))
        }
    }

    const handleLabelChange = (newVal: string) => {
        setLabel(() => newVal)
        if (onLabelChange) {
            onLabelChange(newVal)
        }
    }

    const handleDescriptionChange = (newVal: string) => {
        setDescription(() => newVal)
        if (onDescriptionChange) {
            onDescriptionChange(newVal)
        }
    }

    const handleColorChange = (newVal: string) => {
        setColor(() => newVal)
        if (onColorChange) {
            onColorChange(newVal)
        }
    }

    return (
        <View style={styles.container}>
            { title && <View>
                <Text style={[globalStyles.headTitle, globalStyles.textLight, globalStyles.textCenter]}>
                    {title}
                </Text>
            </View> }

            <View style={globalStyles.contentContainer}>
                <TextInput
                    onChange={handleLabelChange}
                    value={label}
                    placeholder={activity.label || "Nom pour cette activité"}
                />
            </View>
            <View style={globalStyles.contentContainer}>
                <TextInput
                    onChange={handleDescriptionChange}
                    value={description}
                    placeholder={activity.description || "Description pour cette activité"}
                />
            </View>

            <View style={globalStyles.contentContainer}>

                <View style={styles.colorList}>
                    {colorSet.map((col, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.colorButton,
                                { backgroundColor: col, borderColor: col === color ? 'white' : 'transparent' }
                            ]}
                            onPress={() => handleColorChange(col)}
                        />
                    ))}
                </View>

            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleValidate}
                    style={styles.button}
                >
                    {icon || <Ionicons name="checkmark-circle" size={120} color="white" />}
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    colorList: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginVertical: 15,
    },
    colorButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        margin: 10,
        borderWidth: 3,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignItems: 'center',
        marginBottom: 30,
    },
    button: {
        alignItems: 'center',
    },
})
