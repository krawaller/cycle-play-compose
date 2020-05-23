import { basicFactory } from "../../common";

export const [reload, isReloadAction] = basicFactory("STATS::RELOAD");
export const [clear, isClearAction] = basicFactory("STATS::CLEAR");

export type StatsAction = ReturnType<typeof reload> | ReturnType<typeof clear>;
