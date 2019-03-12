/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * March 2019
 */

export interface IQueryRecord {
	name: string
	value: any;
}

export class QueryRecord implements IQueryRecord {
	constructor(public name: string, public value: any) {}
}
