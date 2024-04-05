import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import { globalStyles, variables } from "../../shared/globalStyles";
import LoginForm from "../../components/Auth/LoginForm";
import AccountOverview from "../../components/Auth/AccountOverview";
import LogoutButton from "../../components/Auth/LogoutButton";
import { useRequestsContext } from "../../shared/contexts/RequestsContext";

export default function AccountScreen() {
    const { auth, user } = useRequestsContext()

    return (
        <SafeAreaView style={[globalStyles.mainContainer, globalStyles.mh3Container]}>
            <View style={styles.container}>
                <View style={styles.centeredContent}>
                    <AccountOverview auth={auth} user={user} />
                    <LogoutButton auth={auth} />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    centeredContent: {
        width: "100%",
        paddingHorizontal: variables.contentPadding[3],
    },
});
