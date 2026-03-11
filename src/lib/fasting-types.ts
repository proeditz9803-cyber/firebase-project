export type ProtocolType = '16:8' | '18:6' | '20:4' | 'OMAD' | 'Custom';

export interface FastRecord {
  id: string;
  startTime: string; // ISO string
  endTime: string; // ISO string
  plannedProtocol: ProtocolType;
  plannedHours: number;
  actualHours: number;
  completed: boolean;
}

export interface FastState {
  fastStart: string | null;
  selectedProtocol: ProtocolType;
  customFastingHours: number;
  customEatingHours: number;
  history: FastRecord[];
}