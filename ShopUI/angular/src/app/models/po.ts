import { Pol } from "./pol";
import { StockSite } from "./stocksite";
import { Supplier } from "./supplier";

export class Po{
    orderNo!: number;
    supplierNoNavigation!: Supplier;
    stockSiteNavigation!: StockSite;
    stockName!: string;
    orderDate!: Date;
    note!: string;
    address!: string;
    county!: string;
    postCode!: string;
    sentMail!: boolean;
    status!: boolean;
    polList!: Pol[];
}