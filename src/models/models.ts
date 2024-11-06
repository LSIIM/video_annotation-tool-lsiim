export interface EventModel {
    name: string;
    eventTypeId: number;
    frames: number[];
}

export interface ResultModel {
    id: number;
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
    recordingVideoId: number;
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