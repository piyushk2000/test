export type ProjectData = {
  topic: string;
  description: string;
};

export type InvitationDetail = {
  date: string;
  projectId: string;
  peId: string;
  sharedLinkId: string;
  userId: string;
  expertId: string;
  clientType: string;
  agendaId?: string;
};
