export interface AnnotationModel {
    projectVideoTypeId: number;
    annotationTypeId: number;
    frames: number[];
    description: string;
}

export interface VideoInfoModel {
    id_recording: number;
    id_video_type: number;
    annotation: [AnnotationModel];
}
  
export interface UserModel {
    id?: number;
    name?: string;
    // email?: string;
    password?: string;
}

export interface BabyInfoModel {
    id: number;
    name: string;
    birthDate: string;
    isPremature: boolean,
    gestationalAge: number,
    atipicidade: string,
    createdAt: string,
    updatedAt: string
}

export interface RecordingModel {
    id: number;
    ignore: boolean;
    observation: string|null;
    babyId: number;
    babyInfo: BabyInfoModel;
    recordingDate: string;
    moveId: number;
    moveInfo: MoveInfoModel;
    moveAux: boolean;
    projectId: number;
    project: ProjectModel;
    camInfoId: number|null;
    recordVideoTypes: [];
    createdAt: string;
    updatedAt: string;
    videos: VideoInfoModel[];
}

export interface MoveInfoModel {
    id: number;
    description: string;
    projectId: number;
    createdAt: string;
    updatedAt: string;
}

export interface ProjectModel {
    id: number;
    projectName: string;
    createdAt: string;
    updatedAt: string;
}

export interface AtypicalityModel {
    id_atypicality: number;
    atypicality_type: string;
}