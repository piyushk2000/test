import { Grid } from "@mui/material";
import CardsLoadingScreen from "../../atoms/cardsLoader";
import PageLayout from "../../atoms/page-layout"
import { APIRoutes } from "../../constants";
import ExpertProjectHeader from "../../molecules/app-bars/expert-project-page"
import ExpertProjectCard from "../../molecules/expert-project/card";
import { useFetch } from "../../utils/hooks/useFetch"
import { ExpertProjectDetails } from "./types";
import NoResultFoundFilters from "../../atoms/noResultsFilters";


const ExpertProjectPage = () => {
    const expert_id = localStorage.getItem("expert_id");
    const { data: projects, loading: projectsLoading, refetch: refetchProjects } = useFetch<ExpertProjectDetails[]>(
        `${APIRoutes.peMapping}?fk_expert=${expert_id}&embed=YES&notnull___expert_invitation=1`, {
        variables: [expert_id]
    }
    );

    console.log(projects);

    return (
        <PageLayout>
            <ExpertProjectHeader />
            {!projectsLoading ?
                <Grid container spacing={2} mt={0}>
                    {projects?.length ? projects?.map((project) =>
                        <Grid key={project.id} item xs={12} md={6} lg={4}>
                            <ExpertProjectCard project={project} refetch={refetchProjects} />
                        </Grid>
                    ) :
                        <NoResultFoundFilters text="No Project Found" />
                    }
                </Grid>
                : <CardsLoadingScreen />}

        </PageLayout>
    )
}

export default ExpertProjectPage