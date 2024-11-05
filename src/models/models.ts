export interface EventModel {
    eventTypeId: number;
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
    comment: string;
    projectVideoTypeId: number;
    events: EventModel[];
    results: ResultModel[];
}

export interface OptionsModel{
    id: number;
    name: string;
    description: string;
    isTemporal: boolean;
}

export interface UserModel {
    id: number;
    name: string;
}