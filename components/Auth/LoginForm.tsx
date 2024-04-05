import {Alert, View, Image, StyleSheet} from "react-native";
import Title from "../Title";
import FormInput from "../Form/FormInput";
import Button from "../Button";
import {useState} from "react";
import {globalStyles} from "../../shared/globalStyles";
import {Auth} from "../../shared/classes/Auth";

type LoginFormOptions = {
    initialUsername?: string,
    auth: Auth
}

export default function LoginForm({initialUsername, auth}: LoginFormOptions) {
    const [username, setUsername] = useState(initialUsername || "");
    const [password, setPassword] = useState("");
    const [isPending, setIsPending] = useState(false);

    const handleLogin = async () => {
        setIsPending(() => true);
        try {
            await auth.loginWithPassword(username, password);
        } catch (e: any) {
            Alert.alert("Erreur d'autentification", e?.message || "Erreur inconnue");
        } finally {
            setIsPending(false);
        }
    }

    const handlePasswordChange = (newValue: string) => {
        setPassword(() => newValue);
    }

    const handleUsernameChange = (newValue: string) => {
        setUsername(() => newValue);
    }

    return (
        <View style={[globalStyles.body, globalStyles.contentCenter]}>
            <Image source={require('../../assets/MateAppLogos/rsz_matelogoblack.png')} style={styles.logo} resizeMode="contain" />

            <Title title={"Saisissez vos identifiants de connexion"} style={[globalStyles.textCenter]} size={"sm"} />

            <View style={globalStyles.my2Container}>
                <FormInput
                    type={"text"}
                    value={username}
                    onChange={handleUsernameChange}
                    placeholder="Adresse mail"
                    options={{
                        autoCapitalize: "none",
                        autoComplete: "email",
                        autoFocus: true,
                        inputMode: "email"
                    }}
                />

                <FormInput
                    type={"text"}
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Mot de passe"
                    options={{
                        secureTextEntry: true,
                        autoCapitalize: "none"
                    }}
                />

                <Button
                    title={"Connexion"}
                    onPress={handleLogin}
                    variant={"lg"}
                    options={{
                        isPending,
                        disabled: isPending
                    }}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    logo: {
        width: '50%',
        alignSelf: 'center',
    },
});
