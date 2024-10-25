export interface AnnotationModel {
    fk_id_event_type: number;
    frames: number[];
    fk_id_annotation?: number;
}

export interface ResultModel {
    fk_id_result_type: number;
    fk_id_result_type_option: number;
    scalar_result: number;
    fk_id_annotation: number;
}