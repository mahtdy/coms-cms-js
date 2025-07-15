import { Document, Schema, Types, model } from "mongoose";



export default interface Domain extends Document {
    domain: string,
    sslType: "none" | "certificate" | "interim",
    certificate?: {
        public: string,
        private: string,
        "options-ssl": string,
        "ssl-dhparams": string
    },
    isDefault: boolean,
    config?: any,
    adminDomain?: boolean,
    cdns?: (Types.ObjectId | string)[],
    localCDN?: Types.ObjectId | string,
    bucketName?: string
    cptchaInfo?: {
        site_key: string,
        secret_key: string
    },
    notificationConfig?: {
        privateKey: string,
        publicKey: string,
        email: string
    },
    scripts: {
        key: string,
        content: string
    }[]
}

const domainSchema = new Schema({
    domain: {
        type: String,
        required: true
    },
    sslType: {
        type: String,
        enum: [
            "none",
            "certificate",
            "interim"
        ],
        required: true
    },
    certificate: {
        type: new Schema({
            public: {
                type: String,
                required: true
            },
            private: {
                type: String,
                required: true
            },
            "options-ssl": {
                type: String,
                required: false
            },
            "ssl-dhparams": {
                type: String,
                required: false
            }
        }, {
            _id: false
        }),
        required: false
    },
    isDefault: {
        type: Boolean,
        required: true,
        default: false
    },
    config: {
        type: Object,
        required: false
    },
    adminDomain: {
        type: Boolean,
        required: true,
        default: false
    },
    cdns: {
        type: [Types.ObjectId],
        ref: "cdn",
        required: false
    },
    localCDN: {
        type: Types.ObjectId,
        ref: "cdn",
        required: false
    },
    bucketName: {
        type: String,
        required: false
    },
    cptchaInfo: {
        type: new Schema({
            site_key: {
                type: String
            },
            secret_key: {
                type: String
            }
        }, { _id: false }),
        required: false
    },
    notificationConfig: {
        type: new Schema({
            privateKey: {
                type: String,
                required: true,
            },
            publicKey: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                required: true,
            },
        }, {
            _id: false
        }),
        required: false
    },
    scripts: {
        type: [
            new Schema({
                key: String,
                content: String
            }, {
                _id: false
            })
        ],
        required: true,
        default: []
    }

})

export const DomainModel = model<Domain>("domain", domainSchema)