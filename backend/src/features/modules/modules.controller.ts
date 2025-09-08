import { Request, Response } from 'express';  // Import express types
import { ModuleService } from './modules.service';
import { ModulesValidation } from './modules.middlware';


export class ModulesController {
  private moduleService: ModuleService;

  constructor() {
    this.moduleService = new ModuleService();
  }

  getAllModules = async (req: Request, res: Response) => {
    try {
      const modules = await this.moduleService.getAll();
      res.status(200).json(modules);
    } catch (error) {
      console.error('Error getting modules:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  };

  createModule = async (req: Request, res: Response) => {
    try {
      const newModule = await this.moduleService.create(req.body);
      res.status(201).json(newModule);
    } catch (error) {
      console.error('Error creating module:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  };



}
