import { Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @Column({
    name: 'created_by',
    type: 'int',
    nullable: true,
    comment: '생성자',
  })
  createdBy: number;
  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    nullable: false,
    comment: '생성일자',
  })
  createdAt: Date;

  @Column({
    name: 'updated_by',
    type: 'int',
    nullable: true,
    comment: '수정자',
  })
  updatedBy: number;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    nullable: true,
    comment: '수정일자',
  })
  updatedAt: Date;

  @Column({
    name: 'deleted_by',
    type: 'int',
    nullable: true,
    comment: '삭제자',
  })
  deletedBy: number;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
    comment: '삭제일자',
  })
  deletedAt: Date;
}
