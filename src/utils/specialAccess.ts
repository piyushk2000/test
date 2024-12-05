const SpecialAccessUserIds = {
    projects:[44616]
}



export const SpecialAccessToProjects = (id:number): boolean => {
    return SpecialAccessUserIds.projects.includes(id);
}