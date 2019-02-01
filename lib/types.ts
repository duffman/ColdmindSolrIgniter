/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * February 2019
 */

export enum ContentType {
	Json = "application/json",
	Form = "application/x-www-form-urlencoded"
}

export enum ServerProtocol {
	HTTP = "http://",
	HTTPS = "https://"
}

export enum SolrRequestHandler {
	Select = "select",
	Update = "update"
}