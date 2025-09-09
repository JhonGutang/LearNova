import { Request, Response } from 'express';  // Import express types
import { ModuleService } from './modules.service';


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

  getSpecificModule = async (req: Request, res: Response) => {
    try {
      const moduleId = Number(req.params.moduleId);
      const module = await this.moduleService.getSpecificModule(moduleId);
      if (module === null) {
        return res.status(404).json({ error: 'Module not Found' });
      }
      return res.status(200).json(module);
    } catch (error) {
      console.error('Error getting specific module:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  }


}
