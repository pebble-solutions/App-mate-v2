import {Auth} from "../../shared/classes/Auth";
import {Text, View} from "react-native";
import {User} from "firebase/auth";

type AccountOverviewOptions = {
    auth: Auth,
    user: User | null
}

export default function AccountOverview({auth, user}: AccountOverviewOptions) {

    if (!user) return <View><Text>Pas d'utilisateur</Text></View>

    return <View>
        <Text>{user.displayName}</Text>
        <Text>{user.email}</Text>
    </View>
}