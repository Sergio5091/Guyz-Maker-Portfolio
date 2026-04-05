import { Router, type IRouter } from "express";
import healthRouter from "./health";
import articlesRouter from "./articles";
import projectsRouter from "./projects";
import analyticsRouter from "./analytics";
import seoRouter from "./seo";

const router: IRouter = Router();

router.use(healthRouter);
router.use(articlesRouter);
router.use(projectsRouter);
router.use(analyticsRouter);
router.use(seoRouter);

export default router;
