import Image from "next/image";
import CloudImage from "../../../public/cloud-hosting.png";
const About = () => {
  return (
    <section className="fix_height container m-auto">
      <h1 className="text-3xl font-bold text-gray-800 p-5">About Page</h1>
      <div>
        <Image src={CloudImage} alt="cloud" width={500} height={500} />
      </div>
    </section>
  );
};

export default About;
