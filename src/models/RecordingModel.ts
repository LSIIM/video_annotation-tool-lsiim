export interface RecordingModel {
  id: number;
  ignore: boolean;
  observation: string|null;
  patientId: number;
  patient: PatientModel;
  recordingDate: string;
  moveId: number;
  moveInfo: MoveModel;
  moveAux: boolean;
  projectId: number;
  project: ProjectModel;
  recordVideoTypes: [];
  createdAt: string;
  updatedAt: string;
  recordingsVideos: VideoModel[];
}

export interface PatientModel {
  id: number;
  name: string;
  birthDate: string;
  isPremature: boolean,
  gestationalAge: number,
  atipicidades: string,
  createdAt: string,
  updatedAt: string
}

export interface VideoModel {
  id: number;
  projectVideoTypeId: number;
  camIdUsed: number;
  projectVideoType:{
    isMain: boolean;
  };
  url: string;
  thumb: string;
}

export interface ProjectModel {
  id: number;
  projectName: string;
  createdAt: string;
  updatedAt: string;
}

export interface MoveModel {
  id: number;
  description: string;
  projectId: number;
  createdAt: string;
  updatedAt: string;
}