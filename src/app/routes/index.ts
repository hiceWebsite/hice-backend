import { Router } from "express";

import { UserRoutes } from "../modules/user/user.route";
import { AdminRoutes } from "../modules/Admin/admin.route";
import { BuyerRoutes } from "../modules/Buyer/buyer.route";
import { TrainingVideoRoutes } from "../modules/TrainingVideo/trainingVideo.route";
import { DisclaimerRoutes } from "../modules/Disclaimer/disclaimer.route";
import { ProductRoutes } from "../modules/Product/product.route";
import { AuthRoutes } from "../modules/Auth/auth.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/admins",
    route: AdminRoutes,
  },
  {
    path: "/buyers",
    route: BuyerRoutes,
  },
  {
    path: "/training-videos",
    route: TrainingVideoRoutes,
  },
  {
    path: "/disclaimers",
    route: DisclaimerRoutes,
  },
  {
    path: "/products",
    route: ProductRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
