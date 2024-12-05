import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import Stack from "@mui/material/Stack";
import styles from "./style.module.scss";
import { statusChip, ThreeDotItems } from "./helper";
import ThreeDotMenu from "../../three-dot-menu";
import bankIcon from "../../../assets/images/bank.png";
import certificateIcon from "../../../assets/images/certificate.png";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import { selectedContainerStyle } from "../../profile-cardV1/helper";
import { useIsMobile } from "../../../utils/hooks/useIsMobile";
import CustomBtnFilled from "../../form-molecules/CustomBtnFilled";
import { Link } from "react-router-dom";
import { AppRoutes } from "../../../constants";
import { isAdmin, isClient, isExpert, isInternalUser, isSuperAdmin } from "../../../utils/role";
import { useBoolean } from "../../../utils/hooks/useBoolean";
import PersonIcon from "../../../assets/images/user.png";
import ContactUsDialog from "./ContactUsDialog";
import { isAdminAllowed, priceFormatter, tooltipFormatter } from "../../../pages/Calls/helpers";
import { GroupDataItem } from "../../../organisms/groups/types";
import { CallDetail } from "../../../pages/Calls/types";
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import IconButton from "@mui/material/IconButton";


export type CallCardProps = {
  payableAmount: string;
  chargeableAmount: string;
  payableAmountFull: string;
  chargeableAmountFull: string;
  status: string;
  expertName: string;
  callId: string;
  projectId: string;
  clientName: string;
  researchAnalyst: string;
  accountManager: string;
  billingOffice: string;
  callTime: string;
  callDate: string;
  isBankAvailable: string;
  isPECertificateAvailable: string;
  expert_id: number;
  bank_location: string | undefined;
  onEditCallClick: () => void;
  onDeleteCallClick: () => void;
  onConfirmByExpert: () => Promise<void>;
  onPaidCallClick: () => Promise<void>;
  onUnPaidCallClick: () => Promise<void>;
  onApprovedForPaymentClick: () => Promise<void>;
  project_title: string;
  title: string;
  payable_mins: number;
  RA_email: string;
  RA_mobile: string;
  call_status: string;
  chargeable_mins: number;
  call_medium: string;
  call_type: string;
  casecode: string;
  client_contact?: string;
  isSelectAllowed: boolean;
  groupData: GroupDataItem[] | null;
  callDetail: CallDetail;
  onZoomreportsClick: () => void;
  invoice_url: string | null;
  reviewed_by: { name: string, id: number } | null,
  reviewed_on: string | null;
  review_remarks: string | null;
  net_payable: string;
  net_payable_full: string | number;
  onViewReviewClickHandler: (review_type: "FINANCE" | "CALL" | null) => void;
  viewSoAClickHandler: () => void;
  viewPaymentReceiptClickHandler: () => void;
  addRemarkClickHandler: () => void;
  remark: string | null;
  setPdfLink:any;
  setExpertForBd:any;
};

export type SelectProps = {
  isSelectClicked: boolean;
  selected: boolean;
  toggleSelected: () => void;
  requestPayment: (name: string) => void;
};

export default function ProfileCard({
  payableAmount,
  chargeableAmount,
  status,
  expertName,
  callId,
  projectId,
  clientName,
  researchAnalyst,
  accountManager,
  billingOffice,
  callTime,
  callDate,
  isBankAvailable,
  isPECertificateAvailable,
  expert_id,
  onEditCallClick,
  onConfirmByExpert,
  onPaidCallClick,
  onUnPaidCallClick,
  isSelectClicked,
  selected,
  toggleSelected,
  requestPayment,
  chargeableAmountFull,
  payableAmountFull,
  bank_location,
  project_title,
  title,
  payable_mins,
  RA_email,
  RA_mobile,
  call_status,
  chargeable_mins,
  call_medium,
  call_type,
  casecode,
  client_contact,
  onDeleteCallClick,
  isSelectAllowed,
  groupData,
  callDetail,
  onZoomreportsClick,
  setPdfLink,
  setExpertForBd,
  invoice_url,
  review_remarks,
  reviewed_by,
  reviewed_on,
  net_payable,
  net_payable_full,
  onViewReviewClickHandler,
  viewSoAClickHandler,
  viewPaymentReceiptClickHandler,
  addRemarkClickHandler,
  remark
}: CallCardProps & SelectProps) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const is_expert = isExpert();
  const adminAllowed = (isAdmin() && callDetail) ? isAdminAllowed(callDetail.fk_project_value.fk_group, parseInt(callDetail.account_manager), [callDetail.research_analyst], groupData) : true;


  const threeDotItemsArr = ThreeDotItems(
    status,
    is_expert,
    onConfirmByExpert,
    onEditCallClick,
    () => requestPayment(expertName),
    onDeleteCallClick,
    onPaidCallClick,
    onUnPaidCallClick,
    callDetail.zoom_meeting_id,
    onZoomreportsClick,
    invoice_url,
    () => {
      if (invoice_url) {
        window.open(invoice_url, "_blank", 'noopener,noreferrer');
      }
    },
    {
      reviewed_by,
      review_remarks,
      reviewed_on,
      call_review: remark
    },
    (type) => onViewReviewClickHandler(type),
    viewSoAClickHandler,
    viewPaymentReceiptClickHandler,
    adminAllowed,
    addRemarkClickHandler,
  );
  const {
    value: isWarning,
    setFalse: closeWarning,
    setTrue: openWarning,
  } = useBoolean();
  const {
    value: isContactUsOpen,
    setFalse: CloseContactUs,
    setTrue: openContactUs,
  } = useBoolean();
  const is_client = isClient();
  /**
   * Note - DATED Dec 2023
   * Checking if Admin is allowed or not. 
   * Admin is allowed only If Admin is 
   * 1) Account Manager in the call
   * 2) Research Analyst in the call
   * 3) Project Group Admin
   * else not
   */

  const parseAmount = (amount: string) => {
    if (amount.toLowerCase().includes('k')) {
      return parseFloat(amount.toLowerCase().replace('k', '')) * 1000;
    }
    return parseFloat(amount);
  };

  // Bad Call Check for frontend
  const checkBadCall = () => {
    const payableAmountParts = payableAmountFull?.split(' ');
    const payableCurrency = payableAmountParts[0];
    const payableValue = parseAmount(payableAmountParts[1]);

    const chargeableAmountParts = chargeableAmountFull?.split(' ');
    const chargeableCurrency = chargeableAmountParts[0];
    const chargeableValue = parseAmount(chargeableAmountParts[1]);


    if ((!(callDetail?.exchange_rate_chargeable) && !(callDetail?.exchange_rate_payable))) {
      return false
    }
    if ((payableCurrency === chargeableCurrency)) {
      return chargeableValue < payableValue;
    } else {
      const finalChargeableValue = chargeableValue * (chargeableCurrency === 'INR' ? 1 : callDetail?.exchange_rate_chargeable)
      const finalPayableValue = payableValue * (payableCurrency === 'INR' ? 1 : callDetail?.exchange_rate_payable)
      return finalChargeableValue < finalPayableValue;
    }
  };

  return (
    <>
      <div className={`${styles.card} ${selected ? styles.checked : ""} ${((isAdmin() || isSuperAdmin()) && (checkBadCall())) ? styles.badCall : ""}`}>

        <div className={styles["card-padding"]}>
          <div className={styles["card-body"]}>
            <div className={styles["card-header"]}>
              {is_expert ? (
                <Tooltip title={title} arrow>
                  <div className={styles["project-heading"]}>{title}</div>
                </Tooltip>
              ) : (
                <div
                  onClick={() =>
                    navigate(`/layout/expert-profile?id=${expert_id}&page=1&prev_page=${AppRoutes.CALLS}&prev_page_name=Calls`)
                  }
                  className={styles["name-heading"]}
                >
                  {expertName}
                </div>
              )}

              <Stack direction={"row"} spacing={1} alignItems={"center"}>
                {!isMobile ? (
                  <>
                    {is_client && call_status ? (
                      <Box sx={statusChip(call_status)}>
                        <Typography component="p">
                          {is_client ? call_status : status}
                        </Typography>
                      </Box>
                    ) : null}

                    {!is_client ? (
                      <Box sx={statusChip(status)}>
                        <Typography component="p">{status}</Typography>
                      </Box>
                    ) : null}
                  </>
                ) : null}
                {(isSelectClicked || (isExpert() && isSelectAllowed)) ? (
                  isSelectAllowed ?
                    <Checkbox
                      sx={selectedContainerStyle}
                      disableRipple
                      checked={selected}
                      onChange={toggleSelected}
                    /> : null
                ) : (
                  <>
                    {!is_client && threeDotItemsArr.length > 0 && adminAllowed && (
                      <ThreeDotMenu items={threeDotItemsArr} />
                    )}
                  </>
                )}
              </Stack>
            </div>

            <div className={styles["card-subheading"]}>
              <>
                {is_client ? <p>Call Medium: {call_medium}</p> : null}

                {!is_expert && !is_client && (
                  <>
                    {bank_location && (
                      <Tooltip
                        title={
                          bank_location === "IND" ? "Domestic" : "International"
                        }
                        arrow
                      >
                        <p>
                          ({bank_location === "IND" ? "Domestic" : "Int'l"})
                        </p>
                      </Tooltip>
                    )}
                    {isMobile ? (
                      <Box sx={statusChip(status)}>
                        <Typography component="p">{status}</Typography>
                      </Box>
                    ) : null}
                  </>
                )}
              </>
              {!is_client ? (
                <>
                  <Box sx={{cursor:'pointer'}} onClick={() => setPdfLink(isPECertificateAvailable)}>
                    <DetailsWithIcon
                      title={"No PE Certificate"}
                      icon={certificateIcon}
                      text={isPECertificateAvailable? 'Yes' : 'No'}
                    />
                  </Box>
                  <Box sx={{cursor:'pointer'}} onClick={() => setExpertForBd({expertId:(expert_id), primary_bank_id:callDetail?.fk_expert_value?.primary_bank_value?.id})}>
                    <DetailsWithIcon
                      title={"Bank Account Available"}
                      icon={bankIcon}
                      text={isBankAvailable}
                      classNames={isBankAvailable === "Yes" ? "green" : "red"}
                    />
                  </Box>
                  {remark &&
                    <Tooltip title={remark} arrow>
                      <IconButton sx={{ padding: "5px", marginTop: "3px" }}>
                        <MarkUnreadChatAltIcon sx={{ width: "15px", height: "15px" }} />
                      </IconButton>
                    </Tooltip>
                  }

                  {isBankAvailable === "No" && !isAdmin() && (
                    <Link
                      rel="noopener noreferrer"
                      target="_blank"
                      to={`${AppRoutes.EXPERT_PROFILE}?id=${expert_id}&add_bank=1`}
                      style={{
                        backgroundColor: "red",
                        fontWeight: "bold",
                        color: "white",
                        padding: "2.5px 8px",
                        borderRadius: "15px",
                        fontSize: "12px",
                      }}
                    >
                      Add Bank Account
                    </Link>
                  )}
                </>
              ) : null}
            </div>
            <div className={styles.devider} />

            <div className={styles["more-detail"]}>
              <div className={styles.tableContainer}>
                {is_expert ? (
                  <>
                      <TitleValueTable
                        title={"Call ID: "}
                        text={callId}
                      />
                    <TitleValueTable
                      title={"Amount: "}
                      text={payableAmount.split("@")[0]}
                      tooltipLabel={(`${payableAmountFull.split(" ")[0]}${(Number(payableAmountFull.split(" ")[1]).toFixed(0))}`)}
                    />
                    <TitleValueTable
                      title="Billing Rate: "
                      text={payableAmount.split("@")[1]}
                      tooltipLabel={payableAmountFull.split("@")[1]}
                    />
                    <TitleValueTable
                      title={"Duration: "}
                      text={payable_mins + " mins"}
                    />
                  </>
                ) : (
                    <>
                      <div
                        className={styles["tableRow"]}
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >

                        <p className={styles["table-title"]}>Call ID:</p>
                        <div style={{ display: "flex", alignItems: "center" }}>

                          {isInternalUser() ?
                            <p style={{ cursor: 'pointer' }} className={`${styles["table-text"]}  ${styles["link-text"]}`} onClick={onEditCallClick}>
                              #{callId} </p>
                            :
                            <p className={`${styles["table-text"]}  ${styles["link-text"]}`}> #{callId} </p>}

                        </div>
                      </div>

                    {is_client ? (
                      <TitleValueTable title={"Case Code:"} text={casecode} />
                    ) : (
                      <TitleValueTable title={"Client:"} text={clientName} />
                    )}

                    {is_client ? (

                      <TitleValueTable
                        title={"Client Contact"}
                        text={client_contact || "N/A"}
                        ImgIcons={PersonIcon}
                      />
                    ) : null}

                    <TitleValueTable title={"AM:"} text={accountManager} />

                    {is_client ? (
                      <TitleValueTable
                        title={"Duration:"}
                        text={`${chargeable_mins} Mins`}
                      />
                    ) : (
                      <TitleValueTable title={"RA:"} text={researchAnalyst} />
                    )}
                  </>
                )}
              </div>
              <div className={styles.tableContainer}>
                {is_expert ? (
                  <>
                    <TitleValueTable
                      title={"Research Analyst"}
                      text={researchAnalyst}
                      ImgIcons={PersonIcon}
                    />
                    <TitleValueTable title={"Call Date:"} text={callDate} />
                    <TitleValueTable title={"Start Time:"} text={callTime} />
                    {net_payable &&
                      <TitleValueTable
                        title="Net Payable: "
                        text={net_payable}
                        tooltipLabel={net_payable_full.toString()}
                      />
                    }
                  </>
                ) : (
                  <>
                    <TitleValueTable
                      title={"Project ID:"}
                      text={`#${projectId}`}
                      link={`${AppRoutes.PROJECT_DETAILS}?page=1&id=${projectId}`}
                    />

                    <TitleValueTable
                      title={"Billing City:"}
                      text={billingOffice}
                    />
                    {is_client ? (
                      <TitleValueTable title={"Call Type:"} text={call_type} />
                    ) : null}
                    <TitleValueTable title={"Call Date:"} text={callDate} />
                    <TitleValueTable title={"Call Time:"} text={callTime} />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        {!is_expert && <div className={styles.devider} />}
        <div className={styles["card-padding"]}>
          {is_expert ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {/* {status === "Completed" ? (
                <CustomBtnFilled
                  label="Confirm Details"
                  variant="contained"
                  onClick={onConfirmByExpert}
                />
              ) : (
                <div></div>
              )} */}
              <CustomBtnFilled
                styles={{ justifySelf: "flex-end" }}
                label="Contact Us"
                variant="outlined"
                onClick={openContactUs}
              />
            </div>
          ) : (
            <div className={styles["card-footer"]}>
              {!is_client ? (
                <div className={styles.tableContainer}>
                  {adminAllowed ? <TitleValueTable
                    title={"Payable: "}
                    text={payableAmount}
                    tooltipLabel={tooltipFormatter(payableAmountFull)}
                  /> : <TitleValueTable
                    title={"Cost Price: "}
                    text={`${callDetail.cost_price_currency}  ${priceFormatter(callDetail.cost_price)}/hr`}
                    tooltipLabel={`${callDetail.cost_price_currency} ${callDetail.cost_price}/hr`}
                  />
                  }

                </div>
              ) : null}

              <div className={styles.tableContainer}>
                {adminAllowed ?
                  <TitleValueTable
                    title={"Billable:"}
                    text={chargeableAmount}
                    tooltipLabel={tooltipFormatter(chargeableAmountFull)}
                  /> : <TitleValueTable
                    title={"Selling Price:"}
                    text={`${callDetail.selling_price_currency} ${priceFormatter(callDetail.selling_price)}/hr`}
                    tooltipLabel={`${callDetail.selling_price_currency} ${callDetail.selling_price}/hr`}
                  />
                }
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contact Us Dialog */}
      {isContactUsOpen && (
        <ContactUsDialog
          isOpen={isContactUsOpen}
          handleClose={CloseContactUs}
          name={researchAnalyst}
          email={RA_email}
          phoneNumber={RA_mobile}
        />
      )}
    </>
  );
}

export const TitleValueTable: FC<{
  text: string;
  title: string;
  isCapital?: boolean;
  tooltipLabel?: string;
  ImgIcons?: any;
  link?: string;
}> = ({ text, title, isCapital = false, tooltipLabel, ImgIcons, link }) => {
  return (
    <div
      className={styles["tableRow"]}
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {ImgIcons ? (
        <Tooltip title={title} arrow>
          <img src={ImgIcons} alt={title} width={"12px"} height={"12px"} />
        </Tooltip>
      ) : (
        <p className={styles["table-title"]}>{title}</p>
      )}
      <div style={{ display: "flex", alignItems: "center" }}>
        <Tooltip title={tooltipLabel} arrow>
          {link ? (
            <Link rel="noopener noreferrer" target="_blank" to={link}>
              <p
                className={`${styles["table-text"]} ${isCapital && styles["capital-text"]
                  } ${styles["link-text"]}`}
              >
                {text}
              </p>
            </Link>
          ) : (
            <p
              className={`${styles["table-text"]} ${isCapital && styles["capital-text"]
                }`}
            >
              {text}
            </p>
          )}
        </Tooltip>
      </div>
    </div>
  );
};

export const DetailsWithIcon: FC<{
  icon: string;
  text: string;
  classNames?: string;
  title: string;
  isEmail?: boolean;
}> = ({ icon, text, classNames, title, isEmail = false }) => {
  return (
    <Tooltip title={title} arrow>
      <div className={styles["icon-detail-container"]}>
        <div>
          <img
            alt={title + " icon"}
            src={icon}
            className={styles["detail-icon"]}
          />
        </div>
        <p
          className={`${styles["detail-text"]} ${classNames ? styles[classNames] : ""
            }`}
        >
          {text}
        </p>
      </div>
    </Tooltip>
  );
};
