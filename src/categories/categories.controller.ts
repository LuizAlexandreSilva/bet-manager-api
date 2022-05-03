import { Controller, Get, Request } from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private service: CategoriesService) {}

  @Get('/')
  async getUserCategories(@Request() req) {
    const { userId } = req.query;
    return this.service.getCategoriesByUser(userId);
  }
}
