export interface AnnotationModel {
  frames: [number];
  annotation_type: string;
  comment: string;
}

export interface VideoInfoModel {
  id_recording: number;
  id_video_type: number;
  annotation: [AnnotationModel];
}