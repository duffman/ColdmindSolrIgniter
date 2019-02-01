/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * February 2019
 */

export class Log {
	public static info(info: string, data: any): void {
		console.log("INFO ::" + info, data);
	}

	public static error(info: string, err: Error): void {
		console.log("ERROR ::" + info, err);
	}
}
