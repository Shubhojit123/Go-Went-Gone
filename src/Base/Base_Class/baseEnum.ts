import { prop } from "@typegoose/typegoose";

export enum USERROLE {
    ADMIN = "admin",
    USER = "user",
    MERCHANT = "merchant"
}

export enum GENEDER {
    MALE = "male",
    FEMALE = "female",
    OTHER = "other"
}

export enum  PROPERTYSTATUS {
    OPEN = "open",
    CLOSE = "close"
}

export enum ServiceProvided {
  WIFI = "wifi",
  AC = "ac",
  TV = "tv",
  FRIDGE = "fridge",
  PARKING = "parking",
  HOUSEKEEPING = "housekeeping",
  LAUNDRY = "laundry",
  POWER_BACKUP = "power_backup",
  GEYSER = "geyser",
  SECURITY = "security",
  BREAKFAST = "breakfast",
  MEALS = "meals",
}


export enum PaymentStatus {
    NOT_RECIVED = "NOT_RECIVED",
    RECIVED = "RECIVED",
    SEND = "SEND",
    REFUND = "REFUND"
}



export enum CommissionType {
    RENT = "RENT",
    TOP_SEARCH = "TOP_SEARCH",
    HOME_PAGE = "HOME_PAGE",
    BANNER_AD = "BANNER_AD"
}


export enum AddMoney{
    RECIVED = "RECIVED",
    NOT_RECIVED = "NOT_RECIVED"
}