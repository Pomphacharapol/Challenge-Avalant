import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { faker } from '@faker-js/faker';
import { Node } from './entities/node.entity';

@Injectable()
export class NodesService {
  constructor(
    @InjectRepository(Node)
    private nodesRepo: Repository<Node>,
  ) {}

  async seedTree(breadth = 5, depth = 3) {
    faker.seed(123);
    const nodes: Node[] = [];

    const createNodes = (parentId: string | null, currentDepth: number) => {
      if (currentDepth > depth) return;
      for (let i = 0; i < breadth; i++) {
        const node = this.nodesRepo.create({
          parentId,
          name: faker.commerce.department(),
          hasChildren: currentDepth < depth,
        });
        nodes.push(node);
        createNodes(node.id, currentDepth + 1);
      }
    };

    createNodes(null, 1);

    await this.nodesRepo.save(nodes);
    return { total: nodes.length };
  }

  async getRootNodes(): Promise<Node[]> {
    return this.nodesRepo.find({ where: { parentId: null } });
  }

  async getChildren(parentId: string): Promise<Node[]> {
    return this.nodesRepo.find({ where: { parentId } });
  }

  async searchNodes(
    q: string,
    limit = 100,
  ): Promise<
    { id: string; name: string; path: { id: string; name: string }[] }[]
  > {
    const nodes = await this.nodesRepo
      .createQueryBuilder('node')
      .where('node.name ILIKE :q', { q: `%${q}%` })
      .limit(limit)
      .getMany();

    // สร้าง path ขึ้นไป root
    const results = [];
    for (const node of nodes) {
      const path = [];
      let current: Node | null = node;
      while (current) {
        path.unshift({ id: current.id, name: current.name });
        if (!current.parentId) break;
        current = await this.nodesRepo.findOne({
          where: { id: current.parentId },
        });
      }
      results.push({ id: node.id, name: node.name, path });
    }
    return results;
  }
}
