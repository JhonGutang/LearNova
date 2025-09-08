
import express, { Router } from 'express';
import { ModulesController } from './modules.controller';
import { ModulesValidation } from './modules.middlware';
const router: Router = express.Router();
const moduleController = new ModulesController();

// Sample route for modules
router.get('/modules', moduleController.getAllModules);
router.post('/create-module', ModulesValidation.validateCreateModulePayload, moduleController.createModule);

export default router;
