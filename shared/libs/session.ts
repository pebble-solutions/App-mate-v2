import { SessionContextType } from "../contexts/SessionContext";
import { SessionStatusContextType } from "../contexts/SessionStatusContext";
import { SessionType } from "../types/SessionType";

export function startSession (activityId: string, sessionContext: SessionContextType, statusContext: SessionStatusContextType){
    if (statusContext.getStatus()) throw new Error("Session already started");
    let r = (Math.random() + 1).toString(36).substring(7);

    const newSession: SessionType = {
        _id: r,
        type: "activity",
        type_id: activityId,
        label: "Pointage de John DOE",
        comment: "",
        status: "started",
        owner: {
            _id: "1",
            firstName: "John",
            lastName: "Doe",
            matricule: "123456",
        },
        raw_datas: [],
        raw_variables: [],
    }
    console.log(newSession, sessionContext, 'newSession')
    sessionContext.addSession(newSession);
    statusContext.setStatus("started");
    statusContext.setPayload(newSession._id);
}