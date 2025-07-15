import { Document, Schema, Types, model } from "mongoose";
import {
  BasePage,
  basePageSchema,
} from "../../../core/mongoose-controller/basePage/model";

export default interface Brand extends BasePage {
  title: string;
  description: string;

  // values: any[];
}

// const schema = Object.assign(
//   {
//     title: String,
//     // phone: Number,
//     description: String,
//     // addrresses: [
//     //   new Schema(
//     //     {
//     //       f1: String,
//     //     },
//     //     {
//     //       // _id: false
//     //     }
//     //   ),
//     // ],
//   },
//   basePageSchema
// );
// console.log(JSON.parse(JSON.stringify(basePageSchema)));
let schema = { ...basePageSchema };
// console.log(Object.keys(schema));
const brandSchema = new Schema(
  Object.assign(
    {
      title: {
        type: String,
        reqired: true,
      },
      description: {
        type: String,
        required: false,
      },
      // values: {
      //   type: Types.ObjectId,
      //   required: false,
      //   default: [],
      // },
      // refrence_id: { type: String, required: true },
      // seo: { type: String, required: true },
      // viewmode: { type: String, required: true },
      // seo_id: { type: String, required: true },
      // seo_url_last_response: { type: String, required: true },
      // is_seo_url_ok: { type: String, required: true },
      // language: { type: String, required: true },
      // isdraft: { type: String, required: true },
      // publishdate: { type: Date, required: true },
      // percentage_ceiling: { type: String, required: true },
      // percentage_floor: { type: String, required: true },
      // inserted_at: { type: String, required: true },
      // deleted_at: { type: Date, required: false },
      // url: { type: Date, required: true },
      // video: { type: String, required: true },
      // alt_logo: { type: String, required: true },
      // logo: { type: String, required: true },
      // title_en: { type: String, required: true },
    },
    schema
  )
);

// const brandSchema = new Schema(schema);
export const BrandModel = model<Brand>("brand", brandSchema);
