import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../common/entity/base.entity';

@Entity('t_user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false, comment: '로그인 아이디' })
  account: string;

  @Column({ type: 'varchar', nullable: false, comment: '로그인 비밀번호' })
  passsword: string;

  @Column({ type: 'varchar', nullable: false, comment: '사용자 이름' })
  name: string;
}
