import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Node {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', nullable: true })
  parentId: string | null;

  @Column()
  name: string;

  @Column({ default: false })
  hasChildren: boolean;
}
