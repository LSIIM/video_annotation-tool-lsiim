export interface EventModel {
    eventTypeId: number;
    frames: number[];
    eventType: {name: string};
}

export interface ResultModelTemplate {
    id: number;
    name: string;
    description: string;
    scalar?: number;
    resultTypesOptions: ResultOptionsModel[];
}

export interface AnnotationResultModel {
    id: number;
    name: string;
    description: string;
    scalar: number;
    resultTypeOptionId: number;
    resultTypeId: number;
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
    comment?: string;
    recordingVideoId: number;
    events: EventModel[];
    results: AnnotationResultModel[];
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