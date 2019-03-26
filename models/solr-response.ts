/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

export interface ISolrResponse<T> {
	responseHeader: {
		status: number;
		QTime: number;
		params: object;
	};
	response: {
		numFound: number;
		start: number;
		docs: T[];
	};
	nextCursorMark?: string;
}
