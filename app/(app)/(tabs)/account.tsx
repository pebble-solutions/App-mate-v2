import {SafeAreaView, Text, View} from "react-native";
import {globalStyles} from "../../../shared/globalStyles";
import LoginForm from "../../../components/Auth/LoginForm";
import AccountOverview from "../../../components/Auth/AccountOverview";
import LogoutButton from "../../../components/Auth/LogoutButton";
import {useRequestsContext} from "../../../shared/contexts/RequestsContext";

export default function AccountScreen() {

    const {auth, user} = useRequestsContext()

    return <SafeAreaView style={[globalStyles.mainContainer, globalStyles.mh3Container]}>
        <AccountOverview auth={auth} user={user} />
        <LogoutButton auth={auth} />
    </SafeAreaView>
}