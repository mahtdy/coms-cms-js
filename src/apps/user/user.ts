import ticket from "../../core/mongoose-controller/controllers/user/ticket";
import Part from "../../core/part";
import account from "./controllers/account";
import basket from "./controllers/basket";
// import content from "./controllers/content";
import login from "./login";
import order from "./controllers/order";
import discount from "./controllers/discount";

export var userPart = new Part("/user", {
  controllers: [
    account,
    ticket,
    basket,
    order,
    discount,
    // content
  ],
  logInController: login,
});
