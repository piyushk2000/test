import React from "react";
import PageLayout from "../../atoms/page-layout";
import AcceptInvitationHeader from "../../molecules/app-bars/accept-invitation";
import AcceptInvitationForm from "../../organisms/accept-invitation-form";
import { useGetParams } from "../../utils/hooks/useGetParams";

export default function AcceptInvitation() {
  const id = useGetParams("id");
  const invitationStatus = useGetParams("invitation_status");
  
  return (
    <PageLayout>
      <AcceptInvitationHeader />
      {id ? <AcceptInvitationForm showAcceptInvitationForm={!invitationStatus} id={id} /> : null}
    </PageLayout>
  );
}
