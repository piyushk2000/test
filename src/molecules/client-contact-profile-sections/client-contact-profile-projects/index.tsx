import "./client-profile-projects.scss";
import { ClientProjectData, ClientStatsData } from "./helper";

const ClientContactProfileProjects = () => {
  return (
    <>
      <section className="client-profile-projects-section">
        <div className="client-profile-project-container">
          <div className="client-profile-project">
            <p>Projects</p>
            <p>(5)</p>
          </div>
          <div className="client-profile-project-desc">
            <div className="description">
              <p>Project ID</p>
              <p>Project Name</p>
              <p>Account Manager</p>
              <p>Profiles Shared</p>
              <p>Calls Done</p>
              <p>Revenue $</p>
            </div>
            <hr />
          </div>
          <div className="project-data">
            {ClientProjectData.map((data) => {
              return (
                <div className="client-projects-details">
                  <p className="font-style">{data.ProjectId}</p>
                  <p>{data.ProjectName}</p>
                  <p>{data.AccountManager}</p>
                  <p className="font-style">{data.ProfileShared}</p>
                  <p className="font-style">{data.CallsDone}</p>
                  <p>{data.Revenue}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="client-profile-stats-container">
          <div className="client-profile-stats">
            <p>Stats</p>
          </div>
          <div className="client-profile-stats-desc">
            <div className="description">
              <p>Month</p>
              <p>Projects</p>
              <p>Calls</p>
              <p>Revenue $</p>
            </div>
            <hr />
          </div>
          <div className="stats-data">
            {ClientStatsData.map((data) => {
              return (
                <div className="client-stats-details">
                  <p>{data.Month}</p>
                  <p className="font-style">{data.Projects}</p>
                  <p className="font-style">{data.Calls}</p>
                  <p>{data.Revenue}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default ClientContactProfileProjects;
