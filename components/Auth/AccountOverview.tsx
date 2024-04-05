import { Text, View } from "react-native";
import Title from "../../components/Title";
import { User } from "firebase/auth";
import { Auth } from "../../shared/classes/Auth";

type AccountOverviewOptions = {
    auth: Auth,
    user: User | null
}

export default function AccountOverview({ auth, user }: AccountOverviewOptions) {

    if (!user) return <View><Text>Pas d'utilisateur</Text></View>

    return (
        <View>
            {user.displayName && <Title title={user.displayName} size="md" center />}
            <Title title={user.email ?? ''} size="md" center />
        </View>
    );
}
