export interface BaseCodeObject {
  pctOperator: number;
  pctRep1: number;
  pctRep2: number;
  codeType: "player" | "representative";
  repType?: string
}

export interface PlayerCode extends BaseCodeObject {
  codeType: "player";
}

export interface RepresentativeCode extends BaseCodeObject {
  codeType: "representative";
  repType: "rep1" | "rep2";
}

export type CodeObject = PlayerCode | RepresentativeCode;