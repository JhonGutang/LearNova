import { Request, Response } from 'express';  // Import express types
import { ModuleService } from './modules.service';
import { ModulesValidation } from './modules.middlware';
import { ModulePayload } from '../../interfaces/modules.interface';


export class ModulesController {
  private moduleService: ModuleService;
  private modulesValidation: ModulesValidation;

  constructor() {
    this.moduleService = new ModuleService();
    this.modulesValidation = new ModulesValidation();
  }

  createModule = async (req: Request, res: Response) => {
    try {
      const newModule = await this.moduleService.create(req.body);
      res.status(201).json(newModule);
    } catch (error) {
      console.error('Error creating module:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  };

  sampleMessage = async (req: Request, res: Response) => {
    res.json({ message: 'This is a sample route for modules.' });
  };
}
