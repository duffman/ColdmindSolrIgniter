/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * February 2019
 */

export class Log {
	public static withPrefix(prefix: string, name: string, data: any = null): void {
		prefix = `${prefix} :: ${name}`;

		if (!data) {
			console.log(prefix);

		} else {
			prefix += " ::";
			console.log(prefix, data);
		}
	}

	public static out(name: string, data: any = null): void {
		Log.withPrefix("OUT", name, data);
	}

	public static info(info: string, data: any = null): void {
		console.log("INFO ::" + info, data);
	}

	public static debug(name: string, data: any = null): void {
		Log.withPrefix("DEBUG", name, data);
	}

	public static error(name: string, err: Error = null): void {
		console.log("ERROR ::" + name, err);
	}
}
