/**
 * Copyright (c) Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 */

import { SolrSuggest } from '../core/solr-suggest';
import {SolrSelect} from '../core/solr-select';
import {Log} from '@utils/logger';
import {ISolrResponse} from '../models/solr-response';

export interface IGameDoc {
	id:            string;
	title:         string;
	genre:         string;
	full_title:    string;
	barcode:       string;
	thumb_image:   string;
}

export class SuggestItem implements IGameDoc {
	constructor(public id: string,
				public term: string,
				public title: string = "",
				public genre: string = "",
				public full_title: string = "",
				public barcode: string =  "",
				public thumb_image: string = ""
			) {}
}


export class ProductSuggest {
	suggester: SolrSuggest;

/*
"infixSuggester":{
      "\"Swift Mystery\"":{
        "numFound":2,
        "suggestions":[{
            "term":"Samantha Swift - Mystery From Atlantis, PC, May 2010",
            "weight":0,
            "payload":"97799"},
          {
            "term":"Samantha Swift Mystery Trilogy, PC, May 18, 2012",
            "weight":0,
            "payload":"97802"
           }
       ]
       }}

            */
	constructor() {
		this.suggester = new SolrSuggest();
	}

	private getGameDoc(gameId: string, gameDocs: IGameDoc[]): any {
		let result: IGameDoc;
		for (let doc of gameDocs) {
			result = doc;
		}

		return result;
	}

	public mergeResult(items: SuggestItem[], gameDocs: IGameDoc[]): any {
		let result = new Array<SuggestItem>();

		for (let item of items) {
			let doc = this.getGameDoc(item.id, gameDocs);
			item.title = doc.title;
			item.barcode = doc.barcode;
			item.genre = doc.genre;
			item.thumb_image = doc.thumb_image;
			result.push(item);
		}

		return items;
	}

	public getProducts(productIds: string[]): Promise<ISolrResponse<IGameDoc>> {
		let solrSelect = new SolrSelect<any>();

		return new Promise((resolve, reject) => {
			let idStr = productIds.join(" OR ");
			let value = "select?q=" + idStr;

			solrSelect.select("topzap", value).then(res => {
				let docs = res.response.docs;

				for (const doc of docs) {
					console.log("doc ::", doc.full_title);
				}

				resolve(res);

			}).catch(err => {
				Log.error("getProducts ::", err);
				resolve(err);
			});
		});
	}

	public suggest(value: string): Promise<SuggestItem> {
		return new Promise((resolve, reject) => {
			this.suggester.suggest("topzap", value).then(res => {

				let terrm = Object.keys(res.suggest)[0];
				let obj = res.suggest[terrm];
				let key2 = Object.keys(obj)[0];

				return obj[key2].suggestions;

			}).then(suggestions => {

				let ids = new Array<string>();
				let suggestData = new Array<SuggestItem>();

				for (const item of suggestions) {
					console.log("term ::", item.term);
					console.log("payload ::", item.payload);
					ids.push("id:" + item.payload);

					suggestData.push(
						new SuggestItem(item.term, item.payload)
					);
				}

				this.getProducts(ids).then(prodResp => {
					console.log("PRODUCTS ::", prodResp);

					let result = this.mergeResult(suggestData, prodResp.response.docs);
					resolve(result);

				}).catch(err => {
					reject(err);
				});

			}).catch(err => {
				console.log("ProductSuggest ::", err);
				reject(err)
			});
		});
	}
}

let app = new ProductSuggest();
app.suggest("3D").then(res => {
	console.log("SUGGEST ::", res);

}).catch(err => {
	console.log("ERR ::", err);
});