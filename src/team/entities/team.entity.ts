import { Team } from '@prisma/client';
import { CreateTeamDto } from '../dto/create-team.dto';

export class TeamEntity implements Team {
  id: number;
  name: string;
  createdAt: Date;

  private constructor(name: string) {
    Object.assign(this, { name });
  }

  static create(name: string): TeamEntity {
    return new TeamEntity(name);
  }
}
