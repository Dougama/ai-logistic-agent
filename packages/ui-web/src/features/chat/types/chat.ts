export interface Chat {
  id: string;
  title: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  lastMessage?: string;
}

export interface ChatSummary {
  id: string;
  title: string;
  lastUpdatedAt: {
    _seconds: number;
    _nanoseconds: number;
  };
}

