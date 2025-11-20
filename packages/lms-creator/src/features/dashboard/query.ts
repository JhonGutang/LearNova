import { gql } from "@apollo/client";

export const GET_STAT_CARDS_AND_BAR_CHARTS = gql`
  query StatCards {
    statisticData {
      statCards {
        totalCourses
        totalEnrollees
      }
      barCharts {
        id
        title
        totalEnrollees
        completionRate
      }
    }
  }
`;