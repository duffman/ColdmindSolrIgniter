export interface IDoc {
	id:         string;
	cat:        string[];
	name:       string;
	price:      number;
	price_c:    string;
	inStock:    boolean;
	author:     string;
	author_s:   string;
	series_t:   string;
	sequence_i: number;
	genre_s:    string;
}

export class Doc implements IDoc {
	constructor(
		public id: string,
		public cat: string[] = null,
		public name: string = "",
		public price: number = 0,
		public price_c: string = "",
		public inStock: boolean = false,
		public author: string = "",
		public author_s: string = "",
		public series_t: string = "",
		public sequence_i: number = 0,
		public genre_s: string = ""
	) {}
}

// Converts JSON strings to/from your types
export namespace Convert {
	export function toDoc(json: string): Doc[] {
		return JSON.parse(json);
	}

	export function docToJson(value: Doc[]): string {
		return JSON.stringify(value);
	}
}
