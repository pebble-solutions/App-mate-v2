import {Auth} from "../../shared/classes/Auth";
import Button from "../Button";

type LogoutButtonOptions = {
    auth: Auth,
    label?: string
}

export default function LogoutButton({auth, label}: LogoutButtonOptions) {

    label = label || "Déconnexion"

    const handleLogout = async () => {
        await auth.logout()
    }

    return <Button title={label} onPress={handleLogout} />
}