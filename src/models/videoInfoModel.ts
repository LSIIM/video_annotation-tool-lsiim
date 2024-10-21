export interface AnnotationModel {
    frames: [number];
    annotation_type: string;
    comment: string;
  }
  
  export interface VideoInfoModel {
    fileId: number;
    babyName: string;
    videoUrl: string;
    captureResponsible: string;
    captureDate: number;
    annotationJson: string;
  }