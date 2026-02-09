
export interface GreetingMessage {
  content: string;
  sender?: string;
}

export enum AppState {
  CLOSED = 'CLOSED',
  OPENING = 'OPENING',
  OPENED = 'OPENED'
}
