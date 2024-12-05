interface Change {
  field: string;
  currentValue: string;
  previousValue: string | number;
}

interface ActorDetail {
  name: string;
  role: string;
}

export default interface timelineTypes {
  id: number;
  action: any;
  actor: number;
  changes: Change[];
  tableName: string;
  cardId: number;
  timeStamp: string;
  actor_detail: ActorDetail;
}
