import Twitter from "../../../assets/images/expert/twitter.png";
import Linkedin from "../../../assets/images/expert/linkedin.png";
import Instagram from "../../../assets/images/expert/instagram.png";
import Facebook from "../../../assets/images/expert/facebook.png";
import github from "../../../assets/images/expert/github.png";
import youtube from "../../../assets/images/expert/youtube.png";
import personal from "../../../assets/images/expert/personal_website.png";
import otherWebsite from "../../../assets/images/expert/other_website.png";

export const getImg = (portal: any) => {
  switch (portal) {
    case "Linkedin":
      return Linkedin;
    case "Twitter":
      return Twitter;
    case "Facebook":
      return Facebook;
    case "Instagram":
      return Instagram;
    case "GitHub":
      return github;
    case "Youtube":
      return youtube;
    case "personal":
      return personal;
    case "Any_Other":
      return otherWebsite;
  }
};
