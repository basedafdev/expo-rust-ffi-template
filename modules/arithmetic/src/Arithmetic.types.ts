export type OnLoadEventPayload = {
  url: string;
};

export type ArithmeticModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
};

export type ChangeEventPayload = {
  value: string;
};
