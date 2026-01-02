
export interface Project {
  id: number;
  title: string;
  fileSize: string;
  date: string;
  status: 'CORRUPTED' | 'COMPLETED';
  description: string;
  tags: string[];
  image: string;
}

export interface AppState {
  fatigue: number; // 0 to 100
  isChaos: boolean;
  isResting: boolean;
  activeProjectIndex: number;
}
