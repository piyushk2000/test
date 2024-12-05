export const formatToLV = <A extends { id: number; name: string }>(
  Data: Array<A>
) => {
  return Data.map((d) => ({
    label: d.name,
    value: d.id,
  }));
};

export const FormatToLVCommon = <A, K1 extends keyof A, K2 extends keyof A>(
  Data: Array<A>,
  labelKey: K1,
  valueKey: K2
) => {
  return Data.map((d) => ({
    label: d[labelKey],
    value: d[valueKey],
  }));
};

export const formatToLVProjectClient = <
  A extends { id: number; external_topic: string }
>(
  Data: Array<A>
) => {
  return Data.map((d) => ({
    label: d.external_topic,
    value: d.id,
  }));
};

export const formatOpenProjectToLV = <
  A extends {
    id: number;
    topic: string;
    client_name: string;
    status: string;
  }
>(
  Data: Array<A>
) => {
  return Data.filter((d) => d.status !== "Closed").map((d) => ({
    label: d.topic,
    value: d.id,
    client_name: d.client_name,
  }));
};
