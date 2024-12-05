import Avatar from "@mui/material/Avatar";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import "./style.scss";
import IdBadge from "../../assets/images/id-badge.png";
import defaultProfileImage from "../../assets/images/expert/default_profle_image.png";
import DetailsWithIcon from "../details-with-icon/DetailsWithIcon";
import diamondIcon from "../../assets/images/expert/diamond_expert.png";
import { getTotalYearOfExperience, selectedContainerStyle } from "./helper";
import { getPictureUrl } from "../../organisms/expert-cards/helper";
import AceBadge from "../../assets/images/expert/ace-badge.png";
import proBadge from "../../assets/images/expert/crown-badge.png"
import championBadge from "../../assets/images/expert/trophy-badge.png";
import { Link } from "react-router-dom";
import Star from "../../assets/images/expert/star_expert.png";
import Experience from "../../assets/images/experience.png";

export default function ClientLoginProfileCard(props: any) {

    const {
        id,
        name,
        premium_expert,
        pageNo,
        picture,
        meta,
        base_location_value,
        selected,
        toggleSelected,
        selectExpert,
        badge,
        domain_l0_value,
        domain_l1_value,
        domain_l2_value,
        domain_l3_value,
        domain_other,
        internal_rating,
        work_experiences,
        handleShowImageDialogOpen
    } = props;

    const domainValues = [domain_l0_value?.name,
    domain_l1_value?.name,
    domain_l2_value?.name,
    domain_l3_value?.name,
        domain_other].filter(d => !!d).join(", ")

    const totalExp = getTotalYearOfExperience(work_experiences)
    
    return (
        <div
            style={{ background: "white" }}
            className={`card ${selected && selectExpert ? "checked" : ""}`}
        >
            <div className="wrapper card-padding">
                <div className="profile-details-container">
                    <div className="flex gap-4">
                        <div
                            className="profile-picture-container"
                            onClick={() => handleShowImageDialogOpen()}
                        >
                            <Avatar
                                src={getPictureUrl(picture) || defaultProfileImage}
                                alt="Profile name"
                                className="profile-picture"
                            />
                            {premium_expert && (
                                <img
                                    className="diamond-icon"
                                    src={diamondIcon}
                                    alt="Premium Expert Icon"
                                />
                            )}
                            {badge && (
                                <ExpertBadge classname="badges" badge={badge} />
                            )}
                        </div>

                        <div>
                            <div
                                className="profile-header"
                                style={{ justifyContent: "flex-start", gap: "0.25rem" }}
                            >
                                <Link
                                    to={`/layout/expert-profile?id=${id}&page=${pageNo}`}
                                    className="name-heading"
                                >
                                    {name}
                                </Link>
                            </div>

                            <div className="person-detail-subheading">
                                <p>{[
                                    meta?.relevant_company?.designation,
                                    meta?.relevant_company?.name,
                                    
                                    base_location_value?.name
                                ].filter(f => !!f).join(", ")}</p>
                            </div>
                        </div>
                        {selectExpert && (
                            <div className="selected-container">
                                <Checkbox
                                    sx={selectedContainerStyle}
                                    disableRipple
                                    checked={selected}
                                    onChange={toggleSelected}
                                />
                            </div>
                        )}
                    </div>

                    <div className="more-detail">
                        <DetailsWithIcon title="ID" icon={IdBadge} text={id} />
                        <DetailsWithIcon
                            title="Total Years of Experience"
                            icon={Experience}
                            text={totalExp}
                        />
                        <DetailsWithIcon
                            title="Rating"
                            icon={Star}
                            text={internal_rating || "-"}
                        />
                    </div>
                    <div className="more-detail">
                        <DetailsWithIcon
                            title="Domains:"
                            icon={null}
                            text={domainValues}
                            tooltipTitle={domainValues}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}


export function ExpertBadge({ badge, classname, isProfile }: { badge: "Ace" | "Champion" | "Pro", classname: string, isProfile?: boolean }) {
    let src;
    let style = {};
    if (badge === "Ace") {
        src = AceBadge
    } else if (badge === "Pro") {
        src = proBadge
        style = !isProfile ? { backgroundColor: "black" } : {}
    } else if (badge === "Champion") {
        src = championBadge
        style = !isProfile ? { backgroundColor: "black" } : {}
    }

    if (!src) { return <></>; }

    return (
        <Tooltip title={badge} arrow>
            <img
                src={src}
                alt="Badge for Expert"
                className={classname}
                style={style}
            />
        </Tooltip>
    )
}