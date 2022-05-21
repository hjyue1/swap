
export interface UnKnowObjParam {
  [propName: string]: any;
}


export type CallProtoArrayType = {
  url: string,
  param?: UnKnowObjParam,
};

export interface jsbridgeOpt {
  type: 'live' | 'ws' | 'custom';
  parseCallback?: Function
}
