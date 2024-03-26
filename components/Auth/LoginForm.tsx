import {View} from "react-native";
import Title from "../Title";
import FormInput from "../Form/FormInput";
import Button from "../Button";
import {useState} from "react";
import {globalStyles} from "../../shared/globalStyles";

type LoginFormOptions = {
    initialUsername?: string
}

export default function LoginForm({initialUsername}: LoginFormOptions) {

    const [username, setUsername] = useState(initialUsername || "")
    const [password, setPassword] = useState("")

    const handleLogin = () => {
        console.log("Login")
    }

    const handlePasswordChange = (newValue: string) => {
        setPassword(() => newValue)
    }

    const handleUsernameChange = (newValue: string) => {
        setUsername(() => newValue)
    }

    return (
        <View style={globalStyles.body}>
            <Title title={"Connexion"} />

            <FormInput
                label={"Adresse mail"}
                type={"text"}
                value={username}
                onChange={handleUsernameChange}
            />

            <FormInput
                label={"Mot de passe"}
                type={"text"}
                value={password}
                onChange={handlePasswordChange}
            />

            <Button title={"Connexion"} onPress={handleLogin} />
        </View>
    )

}