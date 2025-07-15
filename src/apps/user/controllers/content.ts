import { ContentPart } from "../../../core/part/content";
import ContentRepository from "../../../core/mongoose-controller/repositories/content/repository";
import ContentController from "../../../core/mongoose-controller/controllers/user/content";
import { UserModel } from "../../../repositories/user/model";
// console.log("content-controller")

// console.log("jdddd" , ContentRepository)
// let contentPart = ContentPart.getInstance()

var content = new ContentController(
  "/content",
  new ContentRepository(),
  UserModel,
  {}
);

export default content;
