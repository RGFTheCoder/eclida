import { JSONObject } from './JSON.js';

export interface ISerializeable {
	serialize(): JSONObject;
	deserialize(data: JSONObject): boolean;
}
