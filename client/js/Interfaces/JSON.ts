export type JSONPart =
	| JSONObject
	| JSONArray
	| JSONNumber
	| JSONString
	| JSONBool;

export interface JSONObject {
	[key: string]: JSONPart;
}
export type JSONArray = JSONPart[];
export type JSONNumber = number;
export type JSONString = string;
export type JSONBool = boolean;
