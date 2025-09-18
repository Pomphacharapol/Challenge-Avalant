import { Controller, Get, Post, Param, Query } from '@nestjs/common';
import { NodesService } from './nodes.service';

@Controller()
export class NodesController {
  constructor(private readonly nodesService: NodesService) {}

  @Post('dev/seed')
  async seed(@Query('breadth') breadth: number, @Query('depth') depth: number) {
    return this.nodesService.seedTree(breadth || 5, depth || 3);
  }

  @Get('api/nodes/root')
  async getRootNodes() {
    return this.nodesService.getRootNodes();
  }

  @Get('api/nodes/:id/children')
  async getChildren(@Param('id') id: string) {
    return this.nodesService.getChildren(id);
  }

  @Get('api/search')
  async search(@Query('q') q: string, @Query('limit') limit: number) {
    return this.nodesService.searchNodes(q, limit || 100);
  }
}
