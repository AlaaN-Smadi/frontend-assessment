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
  makeMember(24, 'Yara Haddad', 'yara.haddad@example.com', 'CREATOR'),
  makeMember(25, 'Zane Brooks', 'zane.brooks@example.com', 'ADMIN'),
  makeMember(26, 'Aisha Rahman', 'aisha.rahman@example.com', 'CREATOR'),
  makeMember(27, 'Basil Farouk', 'basil.farouk@example.com', 'AGENT'),
  makeMember(28, 'Cecilia Grant', 'cecilia.grant@example.com', 'ADMIN'),
  makeMember(29, 'Darius Cole', 'darius.cole@example.com', 'CREATOR'),
  makeMember(30, 'Elena Popov', 'elena.popov@example.com', 'AGENT'),
  makeMember(31, 'Faris Nader', 'faris.nader@example.com', 'ADMIN'),
  makeMember(32, 'Gabriella Torres', 'gabriella.torres@example.com', 'CREATOR'),
  makeMember(33, 'Hassan Malik', 'hassan.malik@example.com', 'AGENT'),
  makeMember(34, 'Ingrid Johansson', 'ingrid.johansson@example.com', 'CREATOR'),
  makeMember(35, 'Jonas Becker', 'jonas.becker@example.com', 'ADMIN'),
  makeMember(36, 'Karima Said', 'karima.said@example.com', 'AGENT'),
  makeMember(37, 'Lorenzo De Luca', 'lorenzo.deluca@example.com', 'CREATOR'),
  makeMember(38, 'Mariam Khoury', 'mariam.khoury@example.com', 'ADMIN'),
  makeMember(39, 'Nikolai Sokolov', 'nikolai.sokolov@example.com', 'AGENT'),
  makeMember(40, 'Omar Jalal', 'omar.jalal@example.com', 'CREATOR'),
  makeMember(41, 'Paula Schneider', 'paula.schneider@example.com', 'ADMIN'),
  makeMember(42, 'Qasim Idris', 'qasim.idris@example.com', 'CREATOR'),
  makeMember(43, 'Rosa Mendes', 'rosa.mendes@example.com', 'AGENT'),
  makeMember(44, 'Selim Arafat', 'selim.arafat@example.com', 'CREATOR'),
  makeMember(45, 'Tatiana Morozov', 'tatiana.morozov@example.com', 'ADMIN'),
  makeMember(46, 'Umar Rashid', 'umar.rashid@example.com', 'AGENT'),
  makeMember(47, 'Valeria Costa', 'valeria.costa@example.com', 'CREATOR'),
  makeMember(48, 'Wahid Samir', 'wahid.samir@example.com', 'ADMIN'),
  makeMember(49, 'Xenia Volkov', 'xenia.volkov@example.com', 'CREATOR'),
  makeMember(50, 'Youssef Darwish', 'youssef.darwish@example.com', 'AGENT')
];

