import type {TeamMemberRole} from '../../stores/team-directory-store';

export interface TeamMemberRecord {
  id: string;
  name: string;
  email: string;
  role: TeamMemberRole;
  avatar: string;
}

const AVATAR_BASE = 'https://api.dicebear.com/7.x/initials/png?seed=';

const makeMember = (
  id: number,
  name: string,
  email: string,
  role: TeamMemberRole
): TeamMemberRecord => ({
  id: id.toString(),
  name,
  email,
  role,
  avatar: `${AVATAR_BASE}${encodeURIComponent(name)}`
});

export const teamMembers: TeamMemberRecord[] = [
  makeMember(1, 'Amelia Johnson', 'amelia.johnson@example.com', 'ADMIN'),
  makeMember(2, 'Benjamin Carter', 'ben.carter@example.com', 'AGENT'),
  makeMember(3, 'Charlotte Nguyen', 'charlotte.nguyen@example.com', 'CREATOR'),
  makeMember(4, 'Daniel Ortiz', 'daniel.ortiz@example.com', 'AGENT'),
  makeMember(5, 'Ella Fitzgerald', 'ella.fitzgerald@example.com', 'ADMIN'),
  makeMember(6, 'Felix Müller', 'felix.mueller@example.com', 'CREATOR'),
  makeMember(7, 'Grace Lee', 'grace.lee@example.com', 'AGENT'),
  makeMember(8, 'Henry Kim', 'henry.kim@example.com', 'CREATOR'),
  makeMember(9, 'Isabella Rossi', 'isabella.rossi@example.com', 'ADMIN'),
  makeMember(10, 'Jack Thompson', 'jack.thompson@example.com', 'AGENT'),
  makeMember(11, 'Khadija Ali', 'khadija.ali@example.com', 'CREATOR'),
  makeMember(12, 'Liam Anderson', 'liam.anderson@example.com', 'ADMIN'),
  makeMember(13, 'Maya Patel', 'maya.patel@example.com', 'AGENT'),
  makeMember(14, 'Noah Silva', 'noah.silva@example.com', 'CREATOR'),
  makeMember(15, 'Olivia Martinez', 'olivia.martinez@example.com', 'ADMIN'),
  makeMember(16, 'Penelope Howard', 'penelope.howard@example.com', 'CREATOR'),
  makeMember(17, 'Quentin Blake', 'quentin.blake@example.com', 'AGENT'),
  makeMember(18, 'Rania Hassan', 'rania.hassan@example.com', 'CREATOR'),
  makeMember(19, 'Samuel Wright', 'samuel.wright@example.com', 'ADMIN'),
  makeMember(20, 'Tariq Aziz', 'tariq.aziz@example.com', 'AGENT'),
  makeMember(21, 'Uma Narayanan', 'uma.narayanan@example.com', 'CREATOR'),
  makeMember(22, 'Victor Chen', 'victor.chen@example.com', 'ADMIN'),
  makeMember(23, 'Willow Evans', 'willow.evans@example.com', 'AGENT'),
  makeMember(24, 'Yara Haddad', 'yara.haddad@example.com', 'CREATOR')
];

