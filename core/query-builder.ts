/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * March 2019
 */

/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * February 2019
 */

export enum Condition {
	Unset,
	Operator,
	Not,
	Equals,
	Contains,
	Default
}

export class Query {
	query = [];

	_ignoreNextWherePrefix: boolean;
	_buildingWhere: boolean;

	constructor() {
	}

	public where(field, val = null, opt: Condition = Condition.Unset): Query {
		let prefix = '';

		if (!this._ignoreNextWherePrefix && this.query.length > -1) {
			//prefix =  (opt.Operator) || 'AND ';
		}

		if (opt && opt === Condition.Not) prefix += '-';

		delete this._ignoreNextWherePrefix;

		this._buildingWhere = true;

		this.query.push(prefix + field + ':');

		if (val) this.equals(val);

		return this;
	}

	private _ensureIsBuildingWhere(method): void {
		if (!this._buildingWhere) {
			let msg = method + '() must be used after where() when called with these arguments';
			throw new Error(msg);
		}
	}

	private isString(val: any) {
		return (typeof val === 'string');
	}

	public equals(val: any, opt: Condition = Condition.Equals): Query {
		this._ensureIsBuildingWhere('equals');

		if (this.isString(val)) {
			switch (opt) {
				case Condition.Equals:
					val = this.quote(val);
					break;
				case Condition.Contains:
					val = '(*' + val.split(' ').join(' AND ') + '*)';
					break
			}
		}

		this.query.push(val);
		this._buildingWhere = false;
		return this;
	}

	public in(values, separator): Query {
		this._ensureIsBuildingWhere('in');

		if (!Array.isArray(values)) values = values.split(separator || ',');


		values = values.map(function (val) {
			return typeof val === 'string' ? this.quote(val) : val;
		});

		this.query.push('(' + values.join(' ') + ')');

		this._buildingWhere = false;
		return this;
	}

	public begin(): Query {
		if (this.query.length && !this._ignoreNextWherePrefix) this.query.push('AND ');
		this._ignoreNextWherePrefix = true;
		this.query.push('(');
		return this;
	}

	public end(): Query {
		this.query.push(')');
		return this;
	}

	public or(): Query {
		this._ignoreNextWherePrefix = true;
		this.query.push(' OR ');
		return this;
	}

	public any(conditions, opt: Condition = Condition.Unset): Query {
		this.begin();

		let first = true;
		for (let field in conditions) {
			if (first) first = false; else this.or();

			this.where(field).equals(conditions[field], opt);
		}

		this.end();

		return this;
	}

	public between(start: number, end: number, caller = null): Query {
		this._ensureIsBuildingWhere('between' || caller);

		let startVal = start > -1 ? start.toString() : "*";
		let endVal = end > -1 ? end.toString() : "*";

		this.query.push(`[${startVal} TO ${endVal}]`);

		this._buildingWhere = false;
		return this;
	}

	public betweenWithOpenIntervals(start: number = -1, end: number = -1, caller = null): Query {
		this._ensureIsBuildingWhere('between' || caller);

		let startVal = start > -1 ? start.toString() : "*";
		let endVal = end > -1 ? end.toString() : "*";

		this.query.push(`{${startVal} TO ${endVal}}`);

		this._buildingWhere = false;
		return this;
	}

	public lt(val): Query {
		return this.betweenWithOpenIntervals(null, val);
	}

	public gt(val): Query {
		return this.betweenWithOpenIntervals(val, null);
	};

	public lte(val): Query {
		return this.between(null, val);
	}

	public gte(val) {
		return this.between(val, null);
	}

	public build(): string {
		let result: string = "";

		if (this.query.length > 0) {
			result = this.query.join(' ');
		} else {
			result = "*:*";
		}

		return result;
	}

	public quote(value) {
		return '"' + value + '"';
	}
}
