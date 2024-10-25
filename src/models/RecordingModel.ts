export interface RecordingModel {
  id: number;
  ignore: boolean;
  observation: string|null;
  babyId: number;
  babyInfo: BabyModel;
  recordingDate: string;
  moveId: number;
  moveInfo: MoveModel;
  moveAux: boolean;
  projectId: number;
  project: ProjectModel;
  camInfoId: number|null;
  recordVideoTypes: [];
  createdAt: string;
  updatedAt: string;
  videos: VideoModel[];
}

export interface BabyModel {
  id: number;
  name: string;
  birthDate: string;
  isPremature: boolean,
  gestationalAge: number,
  atipicidade: string,
  createdAt: string,
  updatedAt: string
}

export interface VideoModel {
  url: string;
  isMain: boolean;
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