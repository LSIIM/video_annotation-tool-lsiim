export interface EventModel {
    fk_id_event_type: number;
    frames: number[];
    fk_id_annotation?: number;
}

export interface ResultModel {
    name: string;
    description: string;
    scalar: number;
    resultTypesOptions: ResultOptionsModel[];
}

export interface ResultOptionsModel {
    id: number;
    name: string;
    description: string;
    resultTypeId: number;
    createdAt: string;
    updatedAt: string;
}

export interface AnnotationModel {
    events: EventModel[];
    results: ResultModel[];
}

export interface OptionsModel{
    name: string;
    description: string;
    isTemporal: boolean;
}

export interface UserModel {
    id: number;
    name: string;
}