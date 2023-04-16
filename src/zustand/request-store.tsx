import { create } from 'zustand';
import { Prisma } from '@prisma/client';

const requestInclude = {
  recipient: true,
  sender: true,
} satisfies Prisma.RequestInclude;

export type RequestWithSenderAndRecipients = Prisma.RequestGetPayload<{
  include: typeof requestInclude;
}>;

interface RequestState {
  requests: RequestWithSenderAndRecipients[];
  addTodo?: (description: string) => void;
  removeTodo?: (id: string) => void;
  toggleCompletedState?: (id: string) => void;
}

export const useRequest = create<RequestState>((set) => ({
  // initial state
  requests: [],
  // methods for manipulating state
}));
