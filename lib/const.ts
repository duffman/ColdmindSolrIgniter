/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * February 2019
 */

import { ServerProtocol }         from "@lib/types";

export module Constants {
	export const URL_SLASH = "/";
	export const LOCALHOST = "localhost";
	export const LOCALHOST_IP = "127.0.0.1";
	export const DEFAULT_PORT = 8993;
	export const SOLR_DEFAULT_URL = ServerProtocol.HTTP + LOCALHOST + ":" + DEFAULT_PORT.toString() + URL_SLASH;
}
