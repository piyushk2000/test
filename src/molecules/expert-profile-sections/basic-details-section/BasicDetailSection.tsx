import RichTextDisplayer from "../../../atoms/rich-text-editor/RichTextDisplayer";
import { isClient, isInfollion } from "../../../utils/role";
import { LocalDayjs } from "../../../utils/timezoneService";
import { isExpert } from "../../../utils/role";
import "./basic-detail-section.scss";

const BasicDetailSection = (props: any) => {
  const {
    headline,
    dob,
    domain_l0_value,
    domain_l1_value,
    domain_l2_value,
    domain_l3_value,
    domain_other,
    functions,
    expert_geographies_value,
    price_per_hour,
    price_per_hour_currency,
    current_base_location,
    expert_geographies,
  } = props.apiData;
  const is_expert = isExpert();

  return (
    <>
      <section className="profile-details-section expert-profile-basic-details">
        <h3>Basic Details</h3>
        <div>
          <div className="basic-detail">
            <h5>Headline:</h5>
            <p>{headline}</p>
          </div>
          {!isClient() && !isInfollion() && dob && (
            <div className="basic-detail">
              <h5>Date of Birth:</h5>
              <p id="date-of-birth">
                {dob && LocalDayjs(dob).format("DD/MM/YYYY")}
              </p>
            </div>
          )}

          {/* This field is only shown when this component will be used in Expert Pending Approval Page */}
          {price_per_hour && price_per_hour_currency && props.show_price && (
            <div className="basic-detail">
              <h5>Cost Price:</h5>
              <p>
                {price_per_hour + " / hr ( " + price_per_hour_currency + " )"}
              </p>
            </div>
          )}

          {!domain_l0_value &&
            !domain_l1_value &&
            !domain_l2_value &&
            !domain_l3_value &&
            !domain_other ? (
            <></>
          ) : (
            <div className="basic-detail">
              <h5>Domains: </h5>
              <div className="domain">
                {!is_expert && (
                  <>
                    {domain_l0_value && <p>{domain_l0_value?.name}</p>}
                    {domain_l1_value && <p>{domain_l1_value?.name}</p>}
                    {domain_l2_value && <p>{domain_l2_value?.name}</p>}
                    {domain_l3_value && <p>{domain_l3_value.name}</p>}
                  </>
                )}

                {domain_other &&
                  domain_other
                    .split(",")
                    .map((domain: any, index: any) => (
                      <p key={domain + index}>{domain}</p>
                    ))}
              </div>
            </div>
          )}

          {functions && (
            <div className="basic-detail">
              <h5>Functions:</h5>
              <div className="function">
                {functions.split(",").map((f_name: any, index: any) => (
                  <p key={f_name + index}>{f_name}</p>
                ))}
              </div>
            </div>
          )}

          {expert_geographies_value && (
            <div className="basic-detail">
              <h5>Expertise geography:</h5>
              <div className="expertise">
                {expert_geographies_value.map((expert: any) => (
                  <p key={expert.id}>{expert.name}</p>
                ))}
              </div>
            </div>
          )}


          {/* These field is only shown when this component will be used in Expert Pending Approval Page */}
          {props.show_geos &&
            <>
              {
                expert_geographies &&
                <div className="basic-detail">
                  <h5>Expertise geography:</h5>
                  <div className="expertise">
                    {expert_geographies.map((expert: any) => (
                      <p key={expert.value}>{expert.label}</p>
                    ))}
                  </div>
                </div>
              }

              {current_base_location &&
                <div className="basic-detail">
                  <h5>Current Base Location:</h5>
                  <p>
                    {current_base_location.label}
                  </p>
                </div>
              }
            </>
          }
        </div>
      </section>
    </>
  );
};
export default BasicDetailSection;
