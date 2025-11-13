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
  role: TeamMemberRole,
  avatar: string
): TeamMemberRecord => ({
  id: id.toString(),
  name,
  email,
  role,
  avatar
});

export const teamMembers: TeamMemberRecord[] = [
  makeMember(1, 'Ayman Khalil', 'ayman.khalil@example.com', 'ADMIN', "https://randomuser.me/api/portraits/men/57.jpg"),
  makeMember(2, 'Omar Saleh', 'omar.saleh@example.com', 'AGENT', "https://randomuser.me/api/portraits/men/19.jpg"),
  makeMember(3, 'Hassan Nasser', 'hassan.nasser@example.com', 'CREATOR', "https://randomuser.me/api/portraits/men/4.jpg"),
  makeMember(4, 'Tariq Mansour', 'tariq.mansour@example.com', 'AGENT', "https://randomuser.me/api/portraits/men/82.jpg"),
  makeMember(5, 'Fadi Youssef', 'fadi.youssef@example.com', 'ADMIN', "https://randomuser.me/api/portraits/men/28.jpg"),
  makeMember(6, 'Khaled Farah', 'khaled.farah@example.com', 'CREATOR', "https://randomuser.me/api/portraits/men/7.jpg"),
  makeMember(7, 'Rami Samir', 'rami.samir@example.com', 'AGENT', "https://randomuser.me/api/portraits/men/95.jpg"),
  makeMember(8, 'Adel Karim', 'adel.karim@example.com', 'CREATOR', "https://randomuser.me/api/portraits/men/90.jpg"),
  makeMember(9, 'Nabil Hadi', 'nabil.hadi@example.com', 'ADMIN', "https://randomuser.me/api/portraits/men/20.jpg"),
  makeMember(10, 'Ziad Jaber', 'ziad.jaber@example.com', 'AGENT', "https://randomuser.me/api/portraits/men/39.jpg"),
  makeMember(11, 'Salim Ali', 'salim.ali@example.com', 'CREATOR', "https://randomuser.me/api/portraits/men/83.jpg"),
  makeMember(12, 'Mahmoud Omar', 'mahmoud.omar@example.com', 'ADMIN', "https://randomuser.me/api/portraits/men/48.jpg"),
  makeMember(13, 'Faris Zidan', 'faris.zidan@example.com', 'AGENT', "https://randomuser.me/api/portraits/men/62.jpg"),
  makeMember(14, 'Amin Rashed', 'amin.rashed@example.com', 'CREATOR', "https://randomuser.me/api/portraits/men/74.jpg"),
  makeMember(15, 'Yahya Khoury', 'yahya.khoury@example.com', 'ADMIN', "https://randomuser.me/api/portraits/men/76.jpg"),
  makeMember(16, 'Ibrahim Nader', 'ibrahim.nader@example.com', 'CREATOR', "https://randomuser.me/api/portraits/men/53.jpg"),
  makeMember(17, 'Jamal Fathi', 'jamal.fathi@example.com', 'AGENT', "https://randomuser.me/api/portraits/men/4.jpg"),
  makeMember(18, 'Rashid Hassan', 'rashid.hassan@example.com', 'CREATOR', "https://randomuser.me/api/portraits/men/44.jpg"),
  makeMember(19, 'Samir Wahid', 'samir.wahid@example.com', 'ADMIN', "https://randomuser.me/api/portraits/men/21.jpg"),
  makeMember(20, 'Tamer Aziz', 'tamer.aziz@example.com', 'AGENT', "https://randomuser.me/api/portraits/men/55.jpg"),
  makeMember(21, 'Othman Nasser', 'othman.nasser@example.com', 'CREATOR', "https://randomuser.me/api/portraits/men/50.jpg"),
  makeMember(22, 'Karim Abdel', 'karim.abdel@example.com', 'ADMIN', "https://randomuser.me/api/portraits/men/9.jpg"),
  makeMember(23, 'Hadi Fawzi', 'hadi.fawzi@example.com', 'AGENT', "https://randomuser.me/api/portraits/men/55.jpg"),
  makeMember(24, 'Youssef Haddad', 'youssef.haddad@example.com', 'CREATOR', "https://randomuser.me/api/portraits/men/99.jpg"),
  makeMember(25, 'Fahd Zaki', 'fahd.zaki@example.com', 'ADMIN', "https://randomuser.me/api/portraits/men/33.jpg"),
  makeMember(26, 'Rami Rahman', 'rami.rahman@example.com', 'CREATOR', "https://randomuser.me/api/portraits/men/33.jpg"),
  makeMember(27, 'Basil Farouk', 'basil.farouk@example.com', 'AGENT', "https://randomuser.me/api/portraits/men/29.jpg"),
  makeMember(28, 'Samir Khalaf', 'samir.khalaf@example.com', 'ADMIN', "https://randomuser.me/api/portraits/men/28.jpg"),
  makeMember(29, 'Nader Sami', 'nader.sami@example.com', 'CREATOR', "https://randomuser.me/api/portraits/men/93.jpg"),
  makeMember(30, 'Omar Jalal', 'omar.jalal2@example.com', 'AGENT', "https://randomuser.me/api/portraits/men/93.jpg"),
  makeMember(31, 'Faris Nader', 'faris.nader2@example.com', 'ADMIN', "https://randomuser.me/api/portraits/men/44.jpg"),
  makeMember(32, 'Hassan Malik', 'hassan.malik2@example.com', 'CREATOR', "https://randomuser.me/api/portraits/men/48.jpg"),
  makeMember(33, 'Adnan Malik', 'adnan.malik@example.com', 'AGENT', "https://randomuser.me/api/portraits/men/11.jpg"),
  makeMember(34, 'Karim Johar', 'karim.johar@example.com', 'CREATOR', "https://randomuser.me/api/portraits/men/35.jpg"),
  makeMember(35, 'Rashid Becker', 'rashid.becker@example.com', 'ADMIN', "https://randomuser.me/api/portraits/men/94.jpg"),
  makeMember(36, 'Omar Said', 'omar.said@example.com', 'AGENT', "https://randomuser.me/api/portraits/men/64.jpg"),
  makeMember(37, 'Tamer De Luca', 'tamer.deluca@example.com', 'CREATOR', "https://randomuser.me/api/portraits/men/63.jpg"),
  makeMember(38, 'Youssef Khoury', 'youssef.khoury2@example.com', 'ADMIN', "https://randomuser.me/api/portraits/men/72.jpg"),
  makeMember(39, 'Hussein Sokolov', 'hussein.sokolov@example.com', 'AGENT', "https://randomuser.me/api/portraits/men/41.jpg"),
  makeMember(40, 'Omar Jalal', 'omar.jalal3@example.com', 'CREATOR', "https://randomuser.me/api/portraits/men/0.jpg"),
  makeMember(41, 'Rami Samir', 'rami.samir2@example.com', 'ADMIN', "https://randomuser.me/api/portraits/men/65.jpg"),
  makeMember(42, 'Qasim Idris', 'qasim.idris@example.com', 'CREATOR', "https://randomuser.me/api/portraits/men/89.jpg"),
  makeMember(43, 'Ayman Mansour', 'ayman.mansour@example.com', 'AGENT', "https://randomuser.me/api/portraits/men/23.jpg"),
  makeMember(44, 'Selim Arafat', 'selim.arafat2@example.com', 'CREATOR', "https://randomuser.me/api/portraits/men/26.jpg"),
  makeMember(45, 'Tamer Morozov', 'tamer.morozov@example.com', 'ADMIN', "https://randomuser.me/api/portraits/men/26.jpg"),
  makeMember(46, 'Umar Rashid', 'umar.rashid2@example.com', 'AGENT', "https://randomuser.me/api/portraits/men/47.jpg"),
  makeMember(47, 'Wahid Costa', 'wahid.costa@example.com', 'CREATOR', "https://randomuser.me/api/portraits/men/44.jpg"),
  makeMember(48, 'Wahid Samir', 'wahid.samir2@example.com', 'ADMIN', "https://randomuser.me/api/portraits/men/55.jpg"),
  makeMember(49, 'Youssef Volkov', 'youssef.volkov@example.com', 'CREATOR', "https://randomuser.me/api/portraits/men/37.jpg"),
  makeMember(50, 'Youssef Darwish', 'youssef.darwish2@example.com', 'AGENT', "https://randomuser.me/api/portraits/men/0.jpg")
];

