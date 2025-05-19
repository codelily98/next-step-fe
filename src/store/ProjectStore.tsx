import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

type Project = {
    id: number;
    title: string;
    description: string;
    createdAt: string;
};

type ProjectState = {
    projects: Project[];
    currentPage: number;
    setProjects: (projects: Project[]) => void;
    setPage: (page: number) => void;
};

type ProjectStore = PersistOptions<
    ProjectState,
    {
        projects: Project[];
        currentPage: number;
    }
>;

export const useProjectStore = create<ProjectState>()(
    persist(
        (set) => ({
            projects: [],
            currentPage: 1,
            setProjects: (projects) => set({ projects }),
            setPage: (page) => set({ currentPage: page }),
        }),
        {
            name: "project-storage",
            partialize: (state) => ({
                projects: state.projects,
                currentPage: state.currentPage,
            }),
        } as ProjectStore
    )
);
