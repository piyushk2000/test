import { useEffect } from "react";
import { UsageTab } from "../../organisms/client/client-page/usage/usage";
import { useGetParams } from "../../utils/hooks/useGetParams";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../constants";
import PageLayout from "../../atoms/page-layout";
import UsageHeader from "../../molecules/app-bars/usage-page";


export function Usage() {
    const id = useGetParams("id");
    const navigate = useNavigate();

    useEffect(() => {
        const client_id = localStorage.getItem("client_id");
        navigate(AppRoutes.USAGE + "?id=" + client_id)
    }, [id]);

    return (
        <PageLayout>
            <UsageHeader />
            {id
                && <UsageTab />
            }
        </PageLayout>

    )
}