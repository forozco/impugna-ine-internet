export type RegistrantType = 'titular' | 'representantes';

export type RegistroOption = 'nuevo' | 'ampliacion';

export interface Step0Data {
  option: RegistroOption; // nueva impugnación o ampliación
  folio?: string; // requerido SOLO si option === 'ampliacion'
  tipoImpugnacion: string; // select requerido
}

export interface Step1Data {
  registrantType: RegistrantType;
  representatives: string[]; // si registrantType === 'representantes'
}

export interface ImpugnacionData {
  step0?: Step0Data;
  step1?: Step1Data;
  // step2?: ...
  // step3?: ...
  // step4?: ...
}
