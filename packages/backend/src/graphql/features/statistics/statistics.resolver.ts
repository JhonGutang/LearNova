import prisma from "../../../config/prisma";
import { MyContext } from "../../../types/context";
import { BarChart } from "../../../generated/graphql";
import { StatisticsService } from "./statistics.services";

const statisticsService = new StatisticsService(prisma);

export const resolvers = {
  Query: {
    barCharts: async (
      _: unknown,
      __: unknown,
      context: MyContext
    ): Promise<BarChart[]> => {
      const { userId, role, creatorId } = context.session || {};

      // Ensure user is authenticated and is a Creator
      if (
        userId === undefined ||
        !role ||
        role !== "CREATOR" ||
        creatorId === undefined
      ) {
        throw new Error("Access denied. Creator authentication required.");
      }

      // Delegate logic to the statistics service
      return statisticsService.getBarChartsForCreator(creatorId);
    },

    statCards: async (
      _: unknown,
      __: unknown,
      context: MyContext
    ): Promise<{ totalCourses: number; totalEnrollees: number }> => {
      const { userId, role, creatorId } = context.session || {};

      if (
        userId === undefined ||
        !role ||
        role !== "CREATOR" ||
        creatorId === undefined
      ) {
        throw new Error("Access denied. Creator authentication required.");
      }

      // Delegate logic to the statistics service
      return statisticsService.getTotalEnrolleesAndCoursesForCreator(creatorId);
    },

    statisticData: async (
      _: unknown,
      __: unknown,
      context: MyContext
    ): Promise<{
      barCharts: BarChart[];
      statCards: { totalCourses: number; totalEnrollees: number };
    }> => {
      const { userId, role, creatorId } = context.session || {};

      if (
        userId === undefined ||
        !role ||
        role !== "CREATOR" ||
        creatorId === undefined
      ) {
        throw new Error("Access denied. Creator authentication required.");
      }

      // Get both charts and card data
      const [barCharts, statCards] = await Promise.all([
        statisticsService.getBarChartsForCreator(creatorId),
        statisticsService.getTotalEnrolleesAndCoursesForCreator(creatorId),
      ]);

      return {
        barCharts,
        statCards,
      };
    }
  }
};
