import {SUBJECT_AREAS, ALL_SUBJECT_AREAS_ALIAS} from "../constants/subjectAreas.js"

export default subjectAreas => {
    if (subjectAreas.includes(ALL_SUBJECT_AREAS_ALIAS)) {
        return SUBJECT_AREAS
    }
    return subjectAreas.filter(subjectArea => SUBJECT_AREAS.includes(subjectArea))
}