import { TeamType } from "@/app/types/team";
import SectionTitle from "../Common/SectionTitle";
import SingleTeam from "./SingleTeam";
import "@/styles/index.css";

const teamData: TeamType[] = [
  {
    id: 1,
    name: "Duy Nghĩa",
    designation: "215052169",
    image: "/images/team/team-01.png",
    facebookLink: "https://www.facebook.com/Duynghia301/",
    twitterLink: "https://www.instagram.com/yuin.ng/",
    instagramLink: "https://www.instagram.com/yuin.ng/",
  },
  {
    id: 2,
    name: "Hoàng Sơn",
    designation: "215052",
    image: "/images/team/team-02.png",
    facebookLink: "https://www.facebook.com/nguyenhoangson.heh",
    twitterLink: "/#",
    instagramLink: "/#",
  },
];

const Team = () => {
  return (
    <section
      id="team"
      className="overflow-hidden bg-gray-1 pb-12 pt-20 dark:bg-dark-2 lg:pb-[90px] lg:pt-[120px]"
    >
      <div className="container">
        <div className="mb-[60px]">
          <SectionTitle
            subtitle="Đồ án"
            title="Nhóm 12 - Lớp 21D1TH-PM02"
            paragraph="Chúng tôi là 2 cá nhân vô tình va vào nhau rồi làm đồ án"
            width="640px"
            center
          />
        </div>

        <div className="-mx-4 flex flex-wrap justify-center">
          {teamData.map((team, i) => (
            <SingleTeam key={i} team={team} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
