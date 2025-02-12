import { components } from "./lib/api";

export type Folder = components["schemas"]["FolderDto"];
export type Card = components["schemas"]["CardDto"];
export type CardVariant = components["schemas"]["CardVariantDto"];

export interface UpdateFolder {
	path: string[];
}

export interface UpdateCard {
	variants: CardVariant[];
}